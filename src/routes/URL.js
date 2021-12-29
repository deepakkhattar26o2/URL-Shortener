const express = require('express')
const router = express.Router();
const URLController = require('../controllers/URL')

router.post('/', URLController.shorten)

router.get('/:code', URLController.redirect)

router.get('/stat/:code', URLController.getStats)

router.delete('/:code', URLController.deleteByCode)
module.exports = router