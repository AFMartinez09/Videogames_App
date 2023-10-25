const gameByName = require("../controllers/GameByName");


const getGamesByName = async(req, res) => {
    try {
        const response = await gameByName();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}




module.exports = {
    getGamesByName
}