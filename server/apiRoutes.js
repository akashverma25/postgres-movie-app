const express=require('express');

const movieRoutes=require('./movies/movieRoutes');

const apiRouter=express.Router();

module.exports = () =>
    apiRouter
    .use('/movie',movieRoutes());
