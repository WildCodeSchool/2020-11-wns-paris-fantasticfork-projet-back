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