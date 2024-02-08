const { createVideoGame } = require("../controllers/createGame");


const postVideoGames = async (req, res) => {
  const {
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genres,
  } = req.body;
    if (!name || !description || !platforms || !released ) {
    return res.status(404).send("Something is wrong or some information is require is empty");
  }
  try {
    const postGame = await createVideoGame(
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genres,
    );
    res.status(200).json(postGame);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



module.exports = {
    postVideoGames
}