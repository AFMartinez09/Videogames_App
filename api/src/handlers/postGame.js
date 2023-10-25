const createVideoGame = require("../controllers/createGame");


const postGame = async(req, res) => {
    try {
        const postDataVideoGames = require("../controllers/postGamesController");

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
    const postGame = await postDataVideoGames(
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genres,
    );
    console.log(postGame, 'Juego creado correctamente')
    res.status(200).json(postGame);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
        const response = await createVideoGame();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}




module.exports = {
    postGame
}