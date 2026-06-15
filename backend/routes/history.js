const express = require('express')
const router = express.Router()
const { getHistory, deleteAnalysis, clearHistory } = require('../controllers/historyController')
router.get('/', getHistory)
router.delete('/:id', deleteAnalysis)
router.delete('/', clearHistory)
module.exports = router