const videoGameById = require('../controllers/GameById');

const getVideoGameById = async(req, res) => {
    const { id } = req.params;
    try {
        const response = await videoGameById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}




module.exports = {
    getVideoGameById
}