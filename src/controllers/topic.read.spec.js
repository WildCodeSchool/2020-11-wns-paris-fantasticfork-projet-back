const request = require('supertest');
const dbHandler = require('../test/db-handler');
const app = require('../app');

const TopicController = require('./topic');
const TopicModel = require('../models/Topic');

const newTopic = {
  username: 'Simba',
  subject: 'HELP ! Ce problème me rend fou 🤯',
  body: 'Lorem ipsum dolor sit amet',
  url: [],
  tags: [],
};

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('readOne ', () => {
  // it('create', async () => {
  //   const newPost = await request(app).post('/topic').send(topic).expect(201);
  //   console.log(newPost.body.result._id);
  // });

  it('Should return an error when id is invalide', async () => {
    const getWithoutId = await request(app).get('/topic/incorrect');
    expect(getWithoutId.body.success).toEqual(false);
  });

  it('Should return a empty result when id does not match', async () => {
    const getWithoutId = await request(app).get('/topic/5fb4f8b489ff8dccc8b36728');
    expect(getWithoutId.body.result).toEqual(null);
  });

  it('Should return a topic with matched id', async () => {
    const newPost = await request(app).post('/topic').send(newTopic);
    const id = newPost.body.result._id;

    const topicById = await TopicModel.findOne({ _id: id });
    expect(topicById.subject).toMatch(newTopic.subject);
  });
});

describe('read ', () => {
  // it('create', async () => {
  //   const newPost = await request(app).post('/topic').send(topic).expect(201);
  //   console.log(newPost.body.result._id);
  // });
  // it('Should return an error when id is invalide', async () => {
  //   const getWithoutId = await request(app).get('/topic/incorrect');
  //   expect(getWithoutId.body.success).toEqual(false);
  // });
  // it('Should return a empty result when id does not match', async () => {
  //   const getWithoutId = await request(app).get('/topic/5fb4f8b489ff8dccc8b36728');
  //   expect(getWithoutId.body.result).toEqual(null);
  // });
  // it('Should return a topic with matched id', async () => {
  //   const newPost = await request(app).post('/topic').send(newTopic);
  //   const id = newPost.body.result._id;
  //   const topicById = await TopicModel.findOne({ _id: id });
  //   expect(topicById.subject).toMatch(newTopic.subject);
  // });
});
