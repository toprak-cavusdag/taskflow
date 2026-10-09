const express = require('express');
const logger = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'TaskFlow API calisiyor.' });
});

app.use('/tasks', taskRoutes);
app.use('/reports', reportRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
