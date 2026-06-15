const axios = require('axios')
const { buildSystemPrompt, buildUserPrompt } = require('../utils/promptBuilder')
const Analysis = require('../models/Analysis')

async function analyzeArgument(req, res, next) {
  try {
    const { argument } = req.body

    if (!argument || typeof argument !== 'string') {
      return res.status(400).json({ error: 'argument field is required' })
    }

    const trimmed = argument.trim()
    if (trimmed.length < 10) return res.status(400).json({ error: 'Argument is too short' })
    if (trimmed.length > 5000) return res.status(400).json({ error: 'Argument too long (max 5000 chars)' })

    const apiKey = process.env.ANTHROPIC_API_KEY
    const isMock = !apiKey || apiKey === 'your_anthropic_api_key_here'

    if (isMock) {
      console.log('⚠️  Mock mode — no API key')
      return res.json(buildMockResponse(trimmed))
    }

    console.log(`🧠 Analyzing with Claude... (${trimmed.length} chars)`)

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: buildSystemPrompt(),
        messages: [{ role: 'user', content: buildUserPrompt(trimmed) }],
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        timeout: 45000,
      }
    )

    const rawText = response.data?.content?.[0]?.text || ''
    let parsed

    try {
      const cleaned = rawText.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/)
      if (match) parsed = JSON.parse(match[0])
      else return res.status(500).json({ error: 'AI returned invalid format. Please try again.' })
    }

    if (!Array.isArray(parsed.nodes)) parsed.nodes = []
    if (!Array.isArray(parsed.edges)) parsed.edges = []
    if (!Array.isArray(parsed.fallacies)) parsed.fallacies = []
    if (!parsed.explanation) parsed.explanation = ''

    let dbId = null
    try {
      const saved = await new Analysis({ input: trimmed, nodes: parsed.nodes, edges: parsed.edges, fallacies: parsed.fallacies, explanation: parsed.explanation }).save()
      dbId = saved._id.toString()
    } catch { /* MongoDB not connected */ }

    console.log(`✅ Done — ${parsed.nodes.length} nodes, ${parsed.fallacies.length} fallacies`)
    return res.json({ ...parsed, dbId })

  } catch (err) {
    if (err.response?.status === 401) return res.status(401).json({ error: 'Invalid API key. Check backend/.env' })
    if (err.response?.status === 429) return res.status(429).json({ error: 'Rate limit reached. Please wait.' })
    if (err.code === 'ECONNABORTED') return res.status(504).json({ error: 'Request timed out. Try a shorter argument.' })
    next(err)
  }
}

function buildMockResponse(argument) {
  const lines = argument.split('\n').map(l => l.trim()).filter(Boolean)
  const lower = argument.toLowerCase()

  let fallacies = []
  if (/i met|two|few|some people/i.test(lower) && /all|every|always/i.test(lower)) {
    fallacies = [{ name: 'Hasty Generalization', explanation: 'Drawing a broad conclusion from a small sample size.' }]
  } else if (/either|or else|only two/i.test(lower)) {
    fallacies = [{ name: 'False Dichotomy', explanation: 'Presenting only two options when more exist.' }]
  } else if (/will lead to|eventually|then.*will/i.test(lower)) {
    fallacies = [{ name: 'Slippery Slope', explanation: 'Assuming one event leads to extreme consequences without evidence.' }]
  } else if (/because.*because|true because/i.test(lower)) {
    fallacies = [{ name: 'Circular Reasoning', explanation: 'The conclusion is used as support for itself.' }]
  }

  const premises = lines.slice(0, -1)
  const conclusion = lines[lines.length - 1] || 'Therefore, the conclusion follows.'

  const nodes = [
    ...premises.map((p, i) => ({ id: String(i + 1), type: 'premise', text: p })),
    { id: String(premises.length + 1), type: 'conclusion', text: conclusion },
  ]
  if (fallacies.length) nodes.push({ id: String(nodes.length + 1), type: 'fallacy', text: `⚠ ${fallacies[0].name}` })

  const conclusionId = String(premises.length + 1)
  const edges = [
    ...premises.map((_, i) => ({ from: String(i + 1), to: conclusionId })),
    ...(fallacies.length ? [{ from: String(nodes.length), to: conclusionId }] : []),
  ]

  return {
    nodes, edges, fallacies,
    explanation: fallacies.length
      ? `This argument contains a ${fallacies[0].name} fallacy. ${fallacies[0].explanation}`
      : `This appears to be a valid argument with ${premises.length} premise(s) supporting the conclusion.`,
    mock: true,
  }
}

module.exports = { analyzeArgument }