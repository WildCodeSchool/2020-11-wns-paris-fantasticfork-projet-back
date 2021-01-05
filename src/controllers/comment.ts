import { Request, Response } from 'express';
// model
import CommentModel from '../models/Comment';

const CommentController: Record<string, unknown> = {};

/**
 * Update un document "sujet" en ajoutant un message au tableau "reponses"
 * Renvoie le tableau de messages mis à jour
 *
 * @param {Object} req - Un objet requête d'express
 * @param {String} req.params.sujetID - L'id du sujet à mettre à jour
 * @param {Object} req.body - L'objet à ajouter dans le tableau "reponses"
 * @param {Object} res - Un objet reponse d'express
 *
 */
CommentController.create = async (req: Request, res: Response) => {
  await CommentModel.init(); // ?
  req.body.date = new Date(Date.now()); // sets message date

  try {
    const commentModel = new CommentModel(req.body);
    const comment = await commentModel.save();

    res.json({ success: true, body: comment });
  } catch (error) {
    console.log('err: ', error);
    res.json({ success: false, error });
  }
};

/**
 * Envoie les commentaires de l'article dont l'id est passé en paramètre
 *
 * @param {Object} req - Un objet requête d'express
 * @param {ObjectId} req.params.topicID - L'id du topic dont on récupère les commentaires
 * @param {Object} res - Un objet reponse d'express
 *
 */
CommentController.readCommentsByTopic = async (req: Request, res: Response) => {
  await CommentModel.init(); // ?
  try {
    const result = await CommentModel.find({
      topic: req.params.topicID,
    }).populate('author');

    res.json({ success: true, body: result });
  } catch (error) {
    console.log('err: ', error);
    res.json({ success: false, error });
  }
};

export default CommentController;
