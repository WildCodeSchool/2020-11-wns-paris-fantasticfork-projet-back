// model
const SujetModel = require("../models/sujet");

module.exports = {
    /**
     * Update un document "sujet" en ajoutant un message au tableau "reponses"
     * Renvoie le tableau de messages mis à jour
     * 
     * @param req {Object} - Un objet requête d'express
     * @param req.params.sujetID {String} - L'id du sujet à mettre à jour
     * @param req.body {Object} - L'objet à ajouter dans le tableau "reponses"
     * @param res {Object} - Un objet reponse d'express
     * 
     */
    create: async (req, res) => {
        await SujetModel.init(); // ?

        try {
            let sujet = await SujetModel.findOneAndUpdate(
                { _id: req.params.sujetID },
                { $push: { reponses: req.body } },
                { new: true }
            );
            res.json({ success: true, body: sujet.reponses });
        } 
        catch (error) {
            console.log("err: ", error);
            res.json({ success: false, error });
        }
    }
};