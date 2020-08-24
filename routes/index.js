const express = require('express');
const router = express.Router();

router.use('/home', require('./home'));
router.use('/genre', require('./genre'))
router.use('/band', require('./band'));

router.get('/', (req, res) => {
    res.status(200).json({success: true, message: 'API is running.'});
});
//resource not found error handler
router.use((req,res,next)=>{
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error to json middleware
router.use((error, req, res,next) => {
    res.status(error.status || 500).json({error: error.message || ''})
});

module.exports = router;
