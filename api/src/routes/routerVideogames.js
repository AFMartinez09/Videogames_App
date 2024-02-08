const { Router } = require('express');
const { getVideoGameById } = require('../handlers/getGameById');
const { getVideoGamesHandler } = require('../handlers/getAllGames');
const { postVideoGames } = require('../handlers/postGame');
const { getGamesByName } = require('../handlers/getGameByName');

const routerVideogames = Router();


routerVideogames.get('/', getVideoGamesHandler);
routerVideogames.get('/name', getGamesByName);
routerVideogames.get('/:id', getVideoGameById);
routerVideogames.post('/', postVideoGames );

module.exports = routerVideogames;