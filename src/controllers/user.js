const UserModel = require('../models/User')

module.exports = {
    /**
     * Crée un document "user" et renvoi le document si il a bien été créé
     * 
     * @param {Object} req  - Un objet requête d'express
     * @param {Object} req.body - Le document "user" à enregistrer
     * @param {Object} res - Un objet reponse d'express
     * 
     */
    create: async (req, res) => {
        try {
            req.body.created_at = new Date(Date.now())
            await UserModel.init() // ?
            let user = new UserModel(req.body)
            let result = await user.save()
            res.json({ success: true, body: result })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false, error })
        }
    }
}