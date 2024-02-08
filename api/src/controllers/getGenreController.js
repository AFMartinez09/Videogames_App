const axios = require('axios');
require('dotenv').config();
const { API_URL, API_KEY, API_KEY_URL_GENRE } = process.env;
const { Genres } = require('../db');
const URL = `${API_KEY_URL_GENRE}`;

const getGenre = async() =>{ 
  const response = await axios.get(URL);
// All genres in array
  const data = response.data.results;
  const nameGenres = data?.map(n => n.name);

// verify if the table Genres is empty
  const genreCount = await Genres.count();
  if (genreCount === 0) {
    const genreData = nameGenres.map(name => ({ name }))
    await Genres.bulkCreate(genreData);
  }
  
  const genresFromDatabase = await Genres.findAll(
    {
      attributes: ['name'],
    }
  );
  const genreNamesFromDatabase = genresFromDatabase.map(genres => (genres));

  return genreNamesFromDatabase;
}

module.exports = getGenre;