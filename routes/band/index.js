const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/', (req, res, next) => {

    const rqParams = {
        baseUrl: 'https://api-partner.spotify.com/pathfinder/v1/query?operationName=queryArtist',
        headers: {
            authorization: 'Bearer BQCvaV4QM4o3kayT2d0RKsYFeyirESVkLkgdY8yirGOkFwVK9Kh2eBI3C9Xz4S99XRKri0-GyQkFemKDlrg'
        },
        query: {
            variables: {"uri": "spotify:artist:2NPduAUeLVsfIauhRwuft1"},
            extensions: {
                "persistedQuery": {
                    "version": 1,
                    "sha256Hash": "6d930d16a5f2cdb1d1add0c00b7d5a0641ff2182e5a24fd3dfa77673052c4de5"
                }
            }
        }
    }
    axios.get(rqParams.baseUrl, {headers: rqParams.headers, query: rqParams.query}).then((response) => {
        console.log(response)
    }).catch(err => next(err))
})



module.exports = router
