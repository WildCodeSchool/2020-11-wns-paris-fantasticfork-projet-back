import { Request, Response } from 'express';
import UserModel from '../models/User';

const UserController = {};
/**
 * Crée un document "user" et renvoi le document si il a bien été créé
 *
 * @param {Object} req  - Un objet requête d'express
 * @param {Object} req.body - Le document "user" à enregistrer
 * @param {Object} res - Un objet reponse d'express
 *
 */
UserController.create = async (req: Request, res: Response) => {
  try {
    req.body.created_at = new Date(Date.now());
    await UserModel.init(); // ?
    const user = new UserModel(req.body);
    const result = await user.save();
    res.json({ success: true, body: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};

export default UserController;
