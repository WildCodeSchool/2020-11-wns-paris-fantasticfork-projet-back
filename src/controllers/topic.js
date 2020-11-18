const TopicModel = require("../models/Topic");

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
            const user = new TopicModel(req.body);
            const result = await user.save();
            res.json({ success: true, body: result }); 
        } 
        catch (error) {
            console.log("err: ", error);
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
            res.json({ success: true, body: result });
        } 
        catch (error) {
            console.log("err: ", error);
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
            res.json({ success: true, body: result });
        } 
        catch (error) {
            console.log("err: ", error);
            res.json({ success: false, error });
        }
    },
};