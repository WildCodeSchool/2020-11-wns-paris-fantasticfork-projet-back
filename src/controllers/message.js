// model
const TopicModel = require("../models/Topic");

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
        await TopicModel.init(); // ?
        req.body.date = new Date(Date.now()) // sets message date

        try {
            let topic = await TopicModel.findOneAndUpdate(
                { _id: req.params.topicID },
                { $push: { responses: req.body } },
                { new: true }
            );
            res.json({ success: true, body: topic.responses });
        } 
        catch (error) {
            console.log("err: ", error);
            res.json({ success: false, error });
        }
    }
};