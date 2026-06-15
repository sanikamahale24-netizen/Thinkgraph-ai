const express = require('express')
const router = express.Router()
const { analyzeArgument } = require('../controllers/analyzeController')
router.post('/', analyzeArgument)
module.exports = router