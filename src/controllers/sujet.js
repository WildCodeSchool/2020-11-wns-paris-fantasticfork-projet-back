const SujetModel = require("../models/sujet");

module.exports = {
    create: async (req, res) => {
        await SujetModel.init();
        try {
            const user = new SujetModel(req.body);
            const result = await user.save();
            res.json({
                success: true,
                result,
            });
        } catch (err) {
            console.log("Error :", err);
        }
    },
    read: async (req, res) => {
        console.log('req :', req.body)
        try {
            const result = await SujetModel.find();
            console.log(result)
            res.json(result);
        } catch (err) {
            console.log("err : ", err);
        }
    },
    readOne: async (req, res) => {
        await SujetModel.init();
        try {
            const result = await SujetModel.findOne({
                _id: req.body,
            });
            res.json(result);
        } catch (err) {
            console.log("err: ", err);
        }
    },
};