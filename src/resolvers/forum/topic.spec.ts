import request from 'supertest';
import dbHandler from '../../test/db-handler';
import server from '../../test/gql-server-init';

const createTopic = `
  mutation {
    createTopic(
      username: "Test Jane"
      subject: "2"
      body: "3"
    ) {
      _id
      username
    }
  }
`;

const InvalidCreateTopic = `
  mutation {
    createTopic(
      username: false
      subject: "2"
      body: "3"
    ) {
      username
    }
  }
`;

const topicsQueryUsername = `
  query {
    topics {
      username
    }
  }
`;

const topicQueryUsernameById = (_id: string) => `
  query {
    topic(_id: "${_id}") {
      username
    }
  }
`;

describe('graphql resolvers', () => {
  beforeAll(async () => await dbHandler.connect());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

  describe('mutations', () => {
    describe('createTopic mutation', () => {
      it('returns a status code of 200 & the username created', async () => {
        const response = await request(server)
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ query: createTopic });

        expect(response.status).toBe(200);
        expect(response.body.data.createTopic.username).toEqual('Test Jane');
      });

      it('fails and return a status code of 400', async () => {
        const response = await request(server)
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ query: InvalidCreateTopic });

        expect(response.status).toBe(400);
      });
    });
  });

  describe('queries', () => {
    let topic_id: string;
    beforeEach(async () => {
      const mutationResponse = await request(server)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ query: createTopic });

      topic_id = mutationResponse.body.data.createTopic._id;
    });
    describe('query all topics', () => {
      it('returns an array with one username', async () => {
        const response = await request(server)
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ query: topicsQueryUsername });

        expect(response.body.data.topics[0].username).toBe('Test Jane');
      });
    });

    describe('query one topic', () => {
      it('returns the queried username as a string', async () => {
        const response = await request(server)
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ query: topicQueryUsernameById(topic_id) });

        expect(response.body.data.topic.username).toBe('Test Jane');
      });
    });
  });
});
