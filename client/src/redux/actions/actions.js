import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const DETAIL_VIDEOGAMES = 'DETAIL_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const FILTER_GENRE = 'FILTER_GENRE';
export const ALL_GENRE = 'ALL_GENRE';
export const SORT_VIDEOGAMES_ASC_DESC = 'SORT_VIDEOGAMES_ASC_DESC';
export const SORT_VIDEOGAMES_RATING = 'SORT_VIDEOGAMES_RATING';
export const RESET_FILTER_GENRES = 'RESET_FILTER_GENRES';
export const RESET_ORDER = 'RESET_ORDER';
export const SET_PAGE = 'SET_PAGE';

// connecting to get all cards
export const getVideogames = () => {
  return async (dispatch) => {
  // connecting my back-end route
    const apiData = await axios.get('http://localhost:3001/videogames');
    const Videogames = apiData.data;
    dispatch({
      type: GET_VIDEOGAMES,
      payload: Videogames,
    });
  }
};

// get of deatil the card by id
export const detailVideogames = (id) => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/videogames/${id}`);
    const DetailGame = apiData.data;
    dispatch({
      type: DETAIL_VIDEOGAMES,
      payload: DetailGame,
    });
  }
};

// get all cards by name (have the same name)
export const searchVideogames = (name) => {
  return async (dispatch) => {
    const apiData = await axios.get(`http://localhost:3001/videogames/name?name=${name}`);
    const Videogames = apiData.data; 
    dispatch({
      type: SEARCH_VIDEOGAMES,
      payload: Videogames,
    })
  }
};

export const AllGenres = () => {
  return async (dispatch) => {
    try {
      const apiData = await axios.get('http://localhost:3001/genres');
      const genres = apiData.data;
      dispatch({
        type: ALL_GENRE,
        payload: genres,
      })
    } catch (error) {
      console.log(error.message, 'error en géneros');
    }
  }
}

// filter by genre
export const filterGenre = (payload) => {
  return{
    type: FILTER_GENRE,
    payload
  }
}

// order videogames
export const orderVideogamesAscDesc = (payload) => {
  return {
    type: SORT_VIDEOGAMES_ASC_DESC,
    payload
  }
}

// order videogames by rating
export const orderVideogamesByRating = (payload) => {
  return {
    type: SORT_VIDEOGAMES_RATING,
    payload
  }
};

//reset filter
export const resetGenres = (payload) => {
  return {
    type: RESET_FILTER_GENRES,
    payload
  }
}

//reset oder
export const resetOrder = (payload) => {
  return {
    type: RESET_ORDER,
    payload
  }
}

//seteo de pagina 1 al aplicar los filtros
export const setPage = (page) =>{
  return {
    type: SET_PAGE,
    payload: page
  }
}