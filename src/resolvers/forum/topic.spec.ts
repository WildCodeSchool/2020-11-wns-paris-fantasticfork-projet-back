import request from 'supertest';
import dbHandler from '../../test/db-handler';
import server from '../../test/gql-server-init';

const fakeMutation = `
  mutation {
    createTopic(
      username: "Test Jane"
      subject: "2"
      body: "3"
      url: ["4", "5"]
      tags: ["6"]
    ) {
      username
    }
  }
`;

describe('graphql resolvers', () => {
  beforeAll(async () => await dbHandler.connect());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

  describe('create a topic mutation', () => {
    it('must return a status code of 200 & the username created', async () => {
      const response = await request(server)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ query: fakeMutation });

      expect(response.status).toBe(200);
      expect(response.body.data.createTopic.username).toEqual('Test Jane');
    });
  });
});
