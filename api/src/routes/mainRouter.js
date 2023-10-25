const { Router } = require('express');
const routerVideogames = require('./routerVideogames');
const routerGenre = require('./routerGenres');


const router = Router();

router.use('/videogames', routerVideogames);
router.use('/genres', routerGenre);


module.exports = router;
