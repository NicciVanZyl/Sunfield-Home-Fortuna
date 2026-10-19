const notFound = (req, res) => res.status(404).json({ error: `Route ${req.originalUrl} not found` });

// Any error passed to next(err) or thrown in a controller lands here.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Internal server error' });
};

module.exports = { notFound, errorHandler };
