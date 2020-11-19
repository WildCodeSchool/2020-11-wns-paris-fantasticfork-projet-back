// model
const CommentModel = require("../models/Comment");

module.exports = {
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
    create: async (req, res) => {
        await CommentModel.init(); // ?
        req.body.date = new Date(Date.now()) // sets message date
        try {      
            if (!req.query.userID || !req.query.topicID) throw new Error('user id or/and topic id are undefined')
            req.body.author = req.query.userID
            req.body.topic = req.query.topicID

            let commentModel = new CommentModel( req.body )
            let comment = await commentModel.save()

            res.json({ success: true, body: comment })
        } 
        catch (error) {
            console.log("err: ", error);
            res.json({ success: false, error });
        }
    },

    /**
     * Envoie les commentaires de l'article dont l'id est passé en paramètre
     * 
     * @param {Object} req - Un objet requête d'express
     * @param {ObjectId} req.params.topicID - L'id du topic dont on récupère les commentaires
     * @param {Object} res - Un objet reponse d'express
     * 
     */
    readCommentsByTopic: async (req, res) => {
        await CommentModel.init(); // ?
        try {
            let result = await CommentModel.find({ topic: req.params.topicID })
                .populate('author')

            res.json({ success: true, body: result })
        } 
        catch (error) {
            console.log("err: ", error);
            res.json({ success: false, error });
        }
    }
};