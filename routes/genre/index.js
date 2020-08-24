const express = require('express')
const router = express.Router()

const genreService = require('../../src/service/genreService')

router.get('/', (req, res, next) => {
    genreService.getGenresDetails(req.query.link).then((data) => res.json(data)).catch(err => next(err))
})


module.exports = router
