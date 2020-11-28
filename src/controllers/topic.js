const TopicModel = require('../models/Topic');
const UserModel = require('../models/User');
const CommentModel = require('../models/Comment');

module.exports = {
  /**
   * Crée un document "topic" et renvoi le document si il a bien été créé
   *
   * @param {Object} req - Un objet requête d'express
   * @param {Object} req.body - Le document "sujet" à enregistrer
   * @param {Object} res - Un objet reponse d'express
   *
   */
  create: async (req, res) => {
    await TopicModel.init(); // ?
    // it builds indexes when auto-index is off, mongoose call it automatically when using mongoose model(here => 'TopicModel')
    // We don't need to call it unless we need to call to get back a promise :)

    try {
      req.body.date = new Date(Date.now()); // sets date of topic
      const topic = new TopicModel(req.body);
      const result = await topic.save();
      res.json({ success: true, body: result });
    } catch (error) {
      console.log('err: ', error);
      res.json({ success: false, error });
    }
  },

  /**
   * Renvoie tous les topics
   *
   * @param {Object} req - Un objet requête d'express
   * @param {Object} res - Un objet reponse d'express
   *
   */
  read: async (req, res) => {
    try {
      const topics = await TopicModel.find({}).populate('author').populate('tags');
      const comments = await CommentModel.find({}).populate('author');
      let topicsWithComments = nestCommentsInTopics(topics, comments);

      res.json({ success: true, body: topicsWithComments });
    } catch (error) {
      console.log('err: ', error);
      res.json({ success: false, error });
    }
  },

  /**
   * Renvoie un topic en fonction de l'id passé en paramètres
   *
   * @param {Object} req - Un objet requête d'express
   * @param {Object} req.params.id - L'id du document à renvoyer
   * @param {Object} res - Un objet reponse d'express
   *
   */
  readOne: async (req, res) => {
    try {
      const topics = await TopicModel.find({ _id: req.params.id }).populate('author').populate('tags');
      const comments = await CommentModel.find({ topicID: req.params.id }).populate('author');
      const topicsWithComments = nestCommentsInTopics(topics, comments);

      res.json({ success: true, body: topicsWithComments });
    } catch (error) {
      console.log('err: ', error);
      res.json({ success: false, error });
    }
  },

  /**
   * Modifie un topic en fonction de l'id passé en paramètres
   *
   * @param {Object} req - Un objet requête d'express
   * @param {Object} req.params.id - L'id du document à renvoyer
   * @param {Object} req.body -  Le document "sujet" à modifier
   * @param {Object} res - Un objet reponse d'express
   *
   */
  updateOne: async (req, res) => {
    try {
      const result = await TopicModel.findByIdAndUpdate(req.params.id, { $set: req.body}, { new:true }) 
      //modify(merge) req.body and return updated data
      //mind req.body shouldn't have _id property

      res.json({ success: true, body: result });
    } catch (error) {
      console.log('err: ', error);
      res.json({ success: false, error });
    }
  },

  /**
   * Supprime un topic en fonction de l'id passé en paramètres
   *
   * @param {Object} req - Un objet requête d'express
   * @param {Object} req.params.id - L'id du document à supprimer
   * @param {Object} res - Un objet reponse d'express
   *
   */
  deleteOne: async (req, res) => {
    try {     
      const deleteTopic = await TopicModel.deleteOne({{ _id: req.params.id }})
      const deleteComment = await CommentModel.deleteMany({ topicID: req.params.id });

      res.json({ success: true, body: deleteTopic, deleteComment });
    } catch (error) {
      console.log('err: ', error);
      res.json({ success: false, error });
    }
  },
};

/**
 * Insère les commentaires dans les topics correspondants
 *
 * @param {Array} topics - Un objet requête d'express
 * @param {ObjectId} topics[]._id - l'id du topic
 * @param {Array} comments - Un objet reponse d'express
 * @param {ObjectId} comments[].topicID - L'id du topic correspondant au commentaire
 * @returns {Array} - Un tableau de topics avec leurs commentaires
 *
 */
function nestCommentsInTopics(topics, comments) {
  let nestedArrays = [];
  topics.forEach((topic) => {
    comments.forEach((comment) => {
      if (topic._id.equals(comment.topicID)) {
        topic.comments.push(comment);
      }
    });
    nestedArrays.push(topic);
  });
  return nestedArrays;
}
