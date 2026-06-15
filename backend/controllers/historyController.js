const Analysis = require('../models/Analysis')

async function getHistory(req, res, next) {
  try {
    const analyses = await Analysis.find().sort({ createdAt: -1 }).limit(100).lean()
    res.json(analyses)
  } catch {
    res.json([])
  }
}

async function deleteAnalysis(req, res, next) {
  try {
    await Analysis.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) { next(err) }
}

async function clearHistory(req, res, next) {
  try {
    await Analysis.deleteMany({})
    res.json({ success: true })
  } catch (err) { next(err) }
}

module.exports = { getHistory, deleteAnalysis, clearHistory }