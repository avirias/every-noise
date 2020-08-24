const express = require('express')
const router = express.Router()

const homeService = require('../../src/service/homeService')

router.get('/search', (req, res, next) => {
    homeService.searchBandGenres(req.query.band).then((genres) => res.json(genres)).catch(err => next(err))
})
router.get('/', (req, res, next) => {
    homeService.getGenres().then((genres) => res.json(genres)).catch(err => next(err))
})




module.exports = router
