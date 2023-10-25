const { Router } = require('express');
const getGenresHandler = require('../handlers/getGenre');

const routerGenre = Router();

routerGenre.get('/', getGenresHandler);

module.exports = routerGenre;