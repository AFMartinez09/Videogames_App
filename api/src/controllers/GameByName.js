const axios = require('axios');
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const { Videogames, Genres } = require('../db');
const { Op } = require('sequelize');

const gameByName = async(name) => {
  const URL = `${API_URL}/games?key=${API_KEY}&search=${name}&page_size=15`;
  try {
    // API
    const response = await axios.get(URL);
    const apiData = response.data.results.map(
      ({
        id,
        name,
        platforms,
        background_image,
        released,
        rating,
        genres
      }) => ({
        id: id,
        name: name,
        //description: description,
        platforms: platforms.map(p => p.platform.name),
        image: background_image,
        released: released,
        rating: rating,
        genres: genres.map(g => g.name)
      })
      );
    
      // DB
    const dbData = await Videogames.findAll({
      where: {
        name: {
            // compare them, no matter if the word is uppercase or lowcase
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [{
        model: Genres,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }],
      limit: 15,
    })
    const dbDataGames = dbData.map(({
      id,
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      Genres 
    }) => ({
      id: id,
      name: name,
      description: description,
      platforms: platforms,
      image: background_image,
      released: released,
      rating: rating,
      genres: Genres.map(genre => genre.name)
    }))

    // checking don't find data in DB and API
    if (apiData.length === 0 && dbDataGames.length === 0) {
      return { message: "name of Videogame doesn't exist in API and DB" }
    } 
    
    const totalData = apiData.concat(dbDataGames);

    return totalData;
  } 
  catch (error) {
    throw new Error("Error videogame not found")
  }
}

module.exports = gameByName;