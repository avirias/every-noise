const cheerio = require('cheerio')
const axios = require('axios')

const EVERY_NOISE_URL = "http://everynoise.com"

class HomeService {
    static getGenres() {
        return new Promise((resolve, reject) => {
            const genresUrl = `${EVERY_NOISE_URL}/engenremap.html`

            axios.get(genresUrl, {timeout: 10000})
                .then(({data}) => {
                    const $ = cheerio.load(data)
                    let genres = []
                    $('div.genre.scanme').each(function (i, elem) {
                        const link = $(this).find('a').attr('href')
                        const genre = $(this).text().trim().slice(0, -1)
                        const example = $(this).attr('title')
                        const color = $(this).css('color')
                        const size = $(this).css('font-size')
                        genres.push({
                            link,
                            genre,
                            example,
                            color,
                            size
                        })
                    })
                    resolve(genres)
                }).catch(err => reject(err))
        })
    }

    static searchBandGenres(bandName) {
        return new Promise((resolve, reject) => {
            const searchUrl = `${EVERY_NOISE_URL}/lookup.cgi?who=${bandName}&mode=map`

            let genres = []

            axios.get(searchUrl, {timeout: 10000})
                .then(({data}) => {
                    const $ = cheerio.load(data)
                    $('a').each(function (i, elem) {
                        const link = $(this).attr('href')
                        const genre = $(this).html()
                        genres.push({
                            genre,
                            link
                        })
                    })
                    resolve(genres.slice(0, -1))
                }).catch(err => reject(err))
        })
    }
}

module.exports = HomeService
