export {}
const express = require('express');
const cors = require('cors');
const route = require('./routes/index');

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// init app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use(route);

//GRAPHQL
//schemas
var schema = buildSchema(`
    type Query {
        topics: [Topic]
        topic(_id: ID): Topic
    },
    type Topic {
        _id: ID
        username: String
        subject: String
        body: String
        date: String
        url: [String]
        tags: [String]
        comments: [String]
        responses: [Response]
    },
    type Response {
        date: String
        name: String
        message: String
    },
    
`);

//resolvers
const TopicModel = require('./models/Topic')
const CommentModel = require('./models/Comment')

const getTopics = async function() {
    try {
        const topics = await TopicModel.find({})
        return topics;
    }

    catch (error) {
        console.log('err: ', error);
        return error
    }
}

const getOneTopic = async function (args : Args) {
    const topic = await TopicModel.findById(args._id);
    return topic;
}

interface Args {
    _id: String,
}

const root = {
    topics: getTopics,
    topic: getOneTopic
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


module.exports = app;
