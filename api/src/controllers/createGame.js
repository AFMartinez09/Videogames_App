const { Videogame, Genres } = require ('../db');

const createVideoGame = async(
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genre,
) => {
  
  const newGame = await Videogames.create({
    name,
    description,
    platforms,
    image,
    released,
    rating,
  });

  const addGenres = await Genres.findAll({
    where: {
      name: genre,
    }
  })
  await newGame.addGenre(addGenres);


  const gameRelation = await Videogames.findOne({
    where: {
      id: newGame.id,
    },
    include: [{
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }]
  })
  
  return gameRelation;
};

module.exports = createVideoGame;