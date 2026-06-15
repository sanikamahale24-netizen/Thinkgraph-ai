const mongoose = require('mongoose')

const AnalysisSchema = new mongoose.Schema({
  input: { type: String, required: true, trim: true, maxlength: 5000 },
  nodes: [{
    id: String,
    type: { type: String, enum: ['premise', 'assumption', 'intermediate_conclusion', 'conclusion', 'fallacy'] },
    text: String,
  }],
  edges: [{ from: String, to: String }],
  fallacies: [{ name: String, explanation: String }],
  explanation: { type: String, default: '' },
  userId: { type: String, default: null },
}, { timestamps: true })

module.exports = mongoose.model('Analysis', AnalysisSchema)