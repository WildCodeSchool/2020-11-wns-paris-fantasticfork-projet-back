const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

const dbHandler = require('../test/db-handler');
const topicModel = require('../models/Topic');

const newTopic = {
  username: 'Simba',
  subject: 'HELP ! Ce problème me rend fou 🤯',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  url: ['www.test.com', 'www.test2.com'],
  tags: ['nodejs', 'js', 'graphql'],
};
const invalideTopic = {};

describe('Create / Read a topic', () => {
  beforeAll(async () => await dbHandler.connect());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

  describe('Create a topic', () => {
    it('Should return the created topic', async () => {
      let response = await request(app).post('/topic').send(newTopic);
      expect(response.body.result).toMatchObject(newTopic);
    });

    it('Should return error when failed', async () => {
      let response = await request(app).post('/topic').send(invalideTopic).expect(400);
      expect(response.body.success).toEqual(false);
    });
  });

  describe('get a topic by id', () => {
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

      const topicById = await topicModel.findOne({ _id: id });
      expect(topicById.subject).toMatch(newTopic.subject);
    });
  });
});
