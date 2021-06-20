const moment = require('moment');
const { isEmpty } = require('lodash');
const { Op } = require("sequelize");

const { Movie } = require('../../model');

const createNewMovie = async (req, res) => {
    const { title, year, length, actor } = req.body;

    const movieId = `MV-${moment().unix()}`;
    const movieRecord = {
        movieId,
        title,
        year,
        length,
        actor
    }

    const result = await Movie.create(movieRecord);

    console.log(result.toJSON());

    if (!isEmpty(result)) {
        res.send(result);
    } else {
        res.send({ error: "Movie creation failed..." });
    }
}

const listMovies = async (req, res) => {
    const movies = await Movie.findAll();

    const formattedMovie = movies.map(r => r.get({ plain: true }));

    if (!isEmpty(formattedMovie)) {
        res.send(formattedMovie);
    } else {
        res.send({ error: "Movie creation failed.." });
    }
}

const searchMovieTitle = async (req, res) => {
    const { title } = req.params;

    const searchResult = await Movie.findAll({
        where: {
            title: {
                [Op.like]: `%${title}%`,
            }
        },
        raw: true
    });
    console.log(searchResult);

    if (isEmpty(searchResult)) {
        res.send({ message: 'No record found' });
    } else if (!isEmpty(searchResult)) {
        res.send(searchResult);

    }
}

const updateMovie = async (req, res) => {
    const { movieId } = req.params;
    const data = req.body;

    const updated = await Movie.update(data, {
        where: {
            movieId: movieId
        }
    });
    if (updated) {
        return res.json({ message: "Movie updated successfully" });
    } else {
        return res.json({ message: "Movie not successfully" });

    }
};

const deleteMovie = async (req, res) => {
    const { movieId } = req.params;

    const deleted = await Movie.destroy({
        where: {
            movieId: movieId
        }
    });
    if (deleted) {
        return res.json({ message: "Movie deleted successfully" });
    } else {
        return res.json({ message: "Error !!" });

    }
}

module.exports = {
    createNewMovie,
    listMovies,
    searchMovieTitle,
    updateMovie,
    deleteMovie
}