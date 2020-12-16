const TopicModel = require('../models/Topic');

module.exports = {
  /**
   * Update un document "sujet" en ajoutant un message au tableau "reponses"
   *
   * @param {Object} req  - Un objet requête d'express
   * @param {Object} req.body - Le document "sujet" à enregistrer
   * @param {Object} res - Un objet reponse d'express
   *
   */
  create: async (req, res) => {
    await TopicModel.init(); // ?

    try {
      req.body.date = new Date(Date.now()); // sets date of topic
      const user = new TopicModel(req.body);
      const result = await user.save();
      res.status(201).json({ success: true, result });
    } catch (error) {
      // console.log('err: ', error);
      res.json({ success: false, error });
    }
  },

  /**
   * Renvoie tous les sujets
   *
   * @param {Object} req  - Un objet requête d'express
   * @param {Object} res - Un objet reponse d'express
   *
   */
  read: async (req, res) => {
    try {
      const result = await TopicModel.find({});
      res.status(200).json({ success: true, result });
    } catch (error) {
      console.log('err: ', error);
      res.json({ success: false, error });
    }
  },

  /**
   * Renvoie un sujet en fonction de l'id passé en paramètres
   *
   * @param {Object} req  - Un objet requête d'express
   * @param {Object} req.params.id - L'id du document à renvoyer
   * @param {Object} res - Un objet reponse d'express
   *
   */
  readOne: async (req, res) => {
    await TopicModel.init(); // ?

    try {
      const result = await TopicModel.findOne({ _id: req.params.id });
      res.status(200).json({ success: true, result });
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
      const result = await TopicModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
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
      const deleteTopic = await TopicModel.deleteOne({ _id: req.params.id });
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
