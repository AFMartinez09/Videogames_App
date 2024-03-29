const gameByName = require("../controllers/GameByName");


const getGamesByName = async(req, res) => {
    try {
        const { name } = req.query;
        const response = await gameByName(name);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}




module.exports = {
    getGamesByName
}