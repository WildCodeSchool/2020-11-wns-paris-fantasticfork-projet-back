// model
const SubjectModel = require("../models/Subject");

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
        await SubjectModel.init(); // ?

        try {
            let subject = await SubjectModel.findOneAndUpdate(
                { _id: req.params.sujetID },
                { $push: { responses: req.body } },
                { new: true }
            );
            console.log(subject)
            res.json({ success: true, body: subject.responses });
        } 
        catch (error) {
            console.log("err: ", error);
            res.json({ success: false, error });
        }
    }
};