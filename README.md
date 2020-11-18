# 2020-11-wns-paris-fantasticfork-projet-back


## Routes
```javascript
// get all topics
app.get('/topics', TopicController.read);

// get one topic by _id
app.get('/topic/:id', TopicController.readOne);

// creates a topic (from req.body)
app.put('/topic', TopicController.create);

// creates a message (from req.body) in the in a topic (identified by his _id)
app.post('/message/:topicID', MessageController.create);
```
