const axios = require('axios');
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const { Videogames, Genres } = require('../db');

const videoGameById = async( id ) => {
    try {
        // API
        id = Number(id);
        if (typeof id === 'number' ) {
          const URL = `${API_URL}/games/${id}?key=${API_KEY}&page_size=40`;

          const response = await axios.get(URL);
          const data = response.data;
      
          const regexHtml = /<\/?[^>]+>|\n/g;
          const idDataGames = {
            id: data.id,
            name: data.name,
            description: data.description.replace(regexHtml, ""),
            platforms: (data.platforms.map((p) => p.platform.name)).join(" | "),
            image: data.background_image,
            released: data.released,
            rating: data.rating,
            genres: (data.genres.map((g) => g.name)).join(' , '),
          };
          return idDataGames;
        } else {
      
          const searchById = await Videogames.findByPk(id, {
            include: {
              model: Genres,
              attributes: ["name"],
              through: { attributes: [] },
            },
          });
          console.log(searchById);
      
          const gameDb = {
            id: searchById.dataValues.id,
            name: searchById.dataValues.name,
            description: searchById.dataValues.description,
            platforms: searchById.dataValues.platforms,
            image: searchById.dataValues.image,
            released: searchById.dataValues.released,
            rating: searchById.dataValues.rating,
            genres: searchById.dataValues.Genres?.map((gen) => gen.name).join(' , '),
          }
          return gameDb;
        }
      } catch (error) {
        throw new Error("Driver not found")
      }
    };
    


module.exports = videoGameById;


