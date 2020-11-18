# 2020-11-wns-paris-fantasticfork-projet-back


## Routes
```javascript
// get all topics
app.get('/topics', TopicController.read);

// get one topic by id
app.get('/topic/:id', TopicController.readOne);

// creates a topic from req.body
app.put('/topic', TopicController.create);

// creates a message in the in the topic passed in req.body
app.post('/message/:topicID', MessageController.create);
```
