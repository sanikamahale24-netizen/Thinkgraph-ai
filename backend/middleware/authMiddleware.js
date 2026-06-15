function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader?.startsWith('Bearer ')) req.userId = 'demo-user'
  next()
}
module.exports = { requireAuth }