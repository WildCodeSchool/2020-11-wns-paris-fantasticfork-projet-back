// const mongoose = require('mongoose');
// const request = require('supertest');
// const express = require('express');
// const app = express();

// const dbHandler = require('../test/db-handler');
// const { create } = require('./topic');

// const payload = {
//   username: 'Simba',
//   subject: 'HELP ! Ce problème me rend fou 🤯',
//   body:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac sapien nisi. Mauris ac eleifend felis, et semper arcu. Donec nec condimentum mi. Suspendisse finibus consequat sem vitae pellentesque. Duis ultricies sit amet tellus at aliquet. Ut ut quam tempor, auctor orci non, posuere elit. Nulla blandit ipsum nec aliquet consequat.',
//   date: '2020-10-09T22:00:00.000Z',
//   url: ['www.test.com', 'www.test2.com'],
//   tags: ['nodejs', 'js', 'graphql'],
// };

// describe('Create topic', () => {
//   beforeAll(async () => await dbHandler.connect());
//   afterEach(async () => await dbHandler.clearDatabase());
//   afterAll(async () => await dbHandler.closeDatabase());

//   it('returns the created topic', async () => {
//     app.post('/topic', create);

//     await request(app)
//       .post('/topic')
//       .send(payload)
//       .set('Accept', 'application/json')
//       .then(function (err, res) {
//         if (err) throw err;
//         expect(res.data.body).toMatchObject(payload);
//       });
//   });
// });
