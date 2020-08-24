const cheerio = require('cheerio')
const axios = require('axios')

const EVERY_NOISE_URL = "http://everynoise.com"

class GenreService {

    static getGenresDetails(genreLink) {
        return new Promise((resolve, reject) => {
            const genreUrl = `${EVERY_NOISE_URL}/${genreLink}`
            axios.get(genreUrl, {timeout: 10000})
                .then(({data}) => {
                    const $ = cheerio.load(data)

                    let bands = []
                    $('div.genre.scanme').each((i, elem) => {
                        const name = $(elem).text().trim().slice(0, -1)
                        const spotifyLink = $(elem).find('a').attr('href')
                        const color = $(elem).css('color')
                        const size = $(elem).css('font-size')
                        const example = $(elem).attr('title')
                        bands.push({
                            name,
                            spotifyLink,
                            example,
                            color,
                            size
                        })
                    })

                    let playlists = []
                    $('div.title').find('a[title]').each((i, elem) => {
                        const name = $(elem).text()
                        const link = $(elem).attr('href')
                        const title = $(elem).attr('title')
                        playlists.push({
                            name,
                            link,
                            title
                        })
                    })

                    let similarGenres = []
                    $('#tunnel').find('div.genre').each((i, element) => {
                        const link = $(element).find('a').attr('href')
                        const genre = $(element).text().trim().slice(0, -1)
                        const example = $(element).attr('title')
                        const color = $(element).css('color')
                        const size = $(element).css('font-size')

                        similarGenres.push({
                            genre,
                            link,
                            example,
                            color,
                            size
                        })
                    })
                    resolve({bands, playlists, similarGenres})
                }).catch(err => reject(err))
        })
    }
}

module.exports = GenreService
