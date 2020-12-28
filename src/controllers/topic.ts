/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import TopicModel from '../models/Topic';
import CommentModel from '../models/Comment';

const TopicController: Record<string, unknown> = {};

/**
 * Crée un document "topic" et renvoi le document si il a bien été créé
 *
 * @param {Object} req - Un objet requête d'express
 * @param {Object} req.body - Le document "sujet" à enregistrer
 * @param {Object} res - Un objet reponse d'express
 *
 */
TopicController.create = async (req: Request, res: Response) => {
  await TopicModel.init(); // ?
  // it builds indexes when auto-index is off, mongoose call it automatically when using mongoose model(here => 'TopicModel')
  // We don't need to call it unless we need to call to get back a promise :)

  try {
    req.body.date = new Date(Date.now()); // sets date of topic
    const topic = new TopicModel(req.body);
    const result = await topic.save();
    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

/**
 * Renvoie tous les topics
 *
 * @param {Object} req - Un objet requête d'express
 * @param {Object} res - Un objet reponse d'express
 *
 */
TopicController.read = async (req: Request, res: Response) => {
  try {
    const topics = await TopicModel.find({})
      .populate('author')
      .populate('tags');
    const comments = await CommentModel.find({}).populate('author');

    res.status(200).json({ success: true, topics, comments });
  } catch (error) {
    console.log('err: ', error);
    res.json({ success: false, error });
  }
};

/**
 * Renvoie un topic en fonction de l'id passé en paramètres
 *
 * @param {Object} req - Un objet requête d'express
 * @param {Object} req.params.id - L'id du document à renvoyer
 * @param {Object} res - Un objet reponse d'express
 *
 */
TopicController.readOne = async (req: Request, res: Response) => {
  await TopicModel.init(); // ?

  try {
    const topics = await TopicModel.find({ _id: req.params.id })
      .populate('author')
      .populate('tags');
    const comments = await CommentModel.find({
      topicID: req.params.id,
    }).populate('author');
    // const topicsWithComments = nestCommentsInTopics(topics, comments);

    res.status(200).json({ success: true, topics, comments });
  } catch (error) {
    console.log('err: ', error);
    res.json({ success: false, error });
  }
};

/**
 * Modifie un topic en fonction de l'id passé en paramètres
 *
 * @param {Object} req - Un objet requête d'express
 * @param {Object} req.params.id - L'id du document à renvoyer
 * @param {Object} req.body -  Le document "sujet" à modifier
 * @param {Object} res - Un objet reponse d'express
 *
 */
TopicController.updateOne = async (req: Request, res: Response) => {
  try {
    const result = await TopicModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    //modify(merge) req.body and return updated data
    //mind req.body shouldn't have _id property

    res.json({ success: true, body: result });
  } catch (error) {
    console.log('err: ', error);
    res.json({ success: false, error });
  }
};

/**
 * Supprime un topic en fonction de l'id passé en paramètres
 *
 * @param {Object} req - Un objet requête d'express
 * @param {Object} req.params.id - L'id du document à supprimer
 * @param {Object} res - Un objet reponse d'express
 *
 */
TopicController.deleteOne = async (req: Request, res: Response) => {
  try {
    const deleteTopic = await TopicModel.deleteOne({ _id: req.params.id });
    const deleteComment = await CommentModel.deleteMany({
      topicID: req.params.id,
    });

    res.json({ success: true, body: deleteTopic, deleteComment });
  } catch (error) {
    console.log('err: ', error);
    res.json({ success: false, error });
  }
};

export default TopicController;

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
// const nestCommentsInTopics = (
//   topics: typeof TopicModel,
//   comments: typeof CommentModel
// ) => {
//   const nestedArrays = [] as any;
//   topics.forEach((topic: typeof TopicModel) => {
//     comments.forEach((comment) => {
//       if (topic._id.equals(comment.topicID)) {
//         topic.comments.push(comment);
//       }
//     });
//     nestedArrays.push(topic);
//   });
//   return nestedArrays;
// };

// interface Topic {
//   [key: string]: any;
// }

// interface Comment {
//   [key: string]: any;
// }
