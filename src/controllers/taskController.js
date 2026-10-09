const taskStore = require('../models/taskStore');

function create(req, res) {
  const { title, description, priority, assignee, status } = req.body;
  const task = taskStore.createTask({ title, description, priority, assignee, status });
  res.status(201).json(task);
}

function list(req, res) {
  const { status, priority, sort, page, limit } = req.query;

  let result = taskStore.filterTasks({ status, priority });
  result = taskStore.sortTasks(result, sort);
  const { data, pagination } = taskStore.paginate(result, { page, limit });

  res.status(200).json({ data, pagination });
}

function search(req, res) {
  const { keyword } = req.query;
  if (!keyword || !keyword.trim()) {
    return res.status(400).json({ error: 'Validation failed', details: ['keyword query parametresi zorunludur.'] });
  }
  const results = taskStore.searchTasks(keyword);
  res.status(200).json({ data: results, count: results.length });
}

function byAssignee(req, res) {
  const { name } = req.params;
  const results = taskStore.getTasksByAssignee(name);
  res.status(200).json({ data: results, count: results.length });
}

function getById(req, res) {
  const task = taskStore.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `Gorev bulunamadi: ${req.params.id}` });
  }
  res.status(200).json(task);
}

function update(req, res) {
  const { title, description, priority, assignee, status } = req.body;
  const task = taskStore.updateTask(req.params.id, { title, description, priority, assignee, status });
  if (!task) {
    return res.status(404).json({ error: `Gorev bulunamadi: ${req.params.id}` });
  }
  res.status(200).json(task);
}

function remove(req, res) {
  const deleted = taskStore.deleteTask(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: `Gorev bulunamadi: ${req.params.id}` });
  }
  res.status(204).send();
}

module.exports = { create, list, search, byAssignee, getById, update, remove };
