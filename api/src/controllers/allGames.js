const axios = require('axios');
require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const { Videogames, Genres } = require('../db');
const URL = `${API_URL}/games?key=${API_KEY}&page_size=40`;

const pages = 4;

const getAllVideoGames = async() =>{ 
  let response = [];
  let allResponse = [];

  // Get 20 videogames per page 
  for (let i = 1; i < pages; i++) {
    response = await Promise.all([...response, axios.get(`${URL}&page=${i}`)])
  }
 
  response.forEach(element => {
    allResponse = allResponse.concat(element.data.results);
  });

  // Get necessary information from the API
  const apiDataGames = allResponse.map(
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
      platforms: platforms.map(p => p.platform.name),
      image: background_image,
      released: released,
      rating: rating,
      genres: (genres.map((genre) => genre.name).join(' | ')),
    })
  );


  //findAll send information from DB
  const dbGames = await Videogame.findAll({
    include: [{
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }]
  })
  
  const dbDataGames = dbGames.map(({
    id,
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    Genres //throought VideogamesxGenres
  }) => ({
    id: id,
    name: name,
    description: description,
    platforms: platforms,
    image: background_image,
    released: released,
    rating: rating,
    genres: (Genres.map(genre => genre.name).join(' | '))
  }))
  
  const allGames = apiDataGames.concat(dbDataGames);

  return allGames;
};

module.exports = getAllVideoGames;



// try {
//     let i = 1;
//     let characters = [];
        
// while( i < 5 ) {
//     let apiData = await axios.get(`${URL}page=${i}`);
  
//     characters.push(apiData);
//     i++;
// }
// } catch (error) {
    
// }