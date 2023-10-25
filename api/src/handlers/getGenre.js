const getGenre = require("../controllers/getGenreController");


const getGenresHandler = async(req, res) => {
    try {
        const genres = await getGenre();
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = getGenresHandler;