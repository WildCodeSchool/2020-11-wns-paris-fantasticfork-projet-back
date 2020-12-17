const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

const dbHandler = require('../test/db-handler');
const { create } = require('./topic');
const topicModel = require('../models/Topic')

const payload = {
  username: 'Simba',
  subject: 'HELP ! Ce problème me rend fou 🤯',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  url: ['www.test.com', 'www.test2.com'],
  tags: ['nodejs', 'js', 'graphql'],
};

describe('Create topic', () => {
  beforeAll(async () => await dbHandler.connect());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());

    it('returns the created topic', async () => {
        let response = await request(app)
        .post('/topic')
        .send(payload)
        .set('Accept', 'application/json');

        expect(response.body.result).toMatchObject(payload);
    });

    it('creates the topic in database', async () => {
        let response = await request(app)
        .post('/topic')
        .send(payload)
        .set('Accept', 'application/json');

        let id = response.body.result.id;

        let databaseTopic = await topicModel.find({ id });
        expect(databaseTopic[0].body).toMatch(response.body.result.body);
    });
});
