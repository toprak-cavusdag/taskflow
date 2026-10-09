const { PRIORITIES, STATUSES } = require('../models/taskStore');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateTask(req, res, next) {
  const { title, description, priority, assignee, status } = req.body;
  const details = [];

  if (!isNonEmptyString(title)) {
    details.push('title alani zorunludur ve bos olmayan bir metin olmalidir.');
  }
  if (!isNonEmptyString(description)) {
    details.push('description alani zorunludur ve bos olmayan bir metin olmalidir.');
  }
  if (!isNonEmptyString(priority)) {
    details.push('priority alani zorunludur.');
  } else if (!PRIORITIES.includes(priority)) {
    details.push(`priority alani su degerlerden biri olmalidir: ${PRIORITIES.join(', ')}.`);
  }
  if (!isNonEmptyString(assignee)) {
    details.push('assignee alani zorunludur ve bos olmayan bir metin olmalidir.');
  }
  if (status !== undefined && !STATUSES.includes(status)) {
    details.push(`status alani gecerliyse su degerlerden biri olmalidir: ${STATUSES.join(', ')}.`);
  }

  if (details.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details });
  }

  next();
}

module.exports = validateTask;
