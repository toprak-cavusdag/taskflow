function notFoundHandler(req, res) {
  res.status(404).json({ error: `Endpoint bulunamadi: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Sunucu hatasi' });
}

module.exports = { notFoundHandler, errorHandler };
