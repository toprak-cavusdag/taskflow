const taskStore = require('../models/taskStore');

function completed(req, res) {
  const data = taskStore.getAllTasks().filter((t) => t.status === 'completed');
  res.status(200).json({ completedCount: data.length, data });
}

function pending(req, res) {
  const data = taskStore.getAllTasks().filter((t) => t.status === 'pending');
  res.status(200).json({ pendingCount: data.length, data });
}

function summary(req, res) {
  const all = taskStore.getAllTasks();

  const byStatus = taskStore.STATUSES.reduce((acc, status) => {
    acc[status] = all.filter((t) => t.status === status).length;
    return acc;
  }, {});

  const byPriority = taskStore.PRIORITIES.reduce((acc, priority) => {
    acc[priority] = all.filter((t) => t.priority === priority).length;
    return acc;
  }, {});

  res.status(200).json({
    totalTasks: all.length,
    byStatus,
    byPriority
  });
}

module.exports = { completed, pending, summary };
