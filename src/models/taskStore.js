const { randomUUID } = require('crypto');

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['pending', 'in-progress', 'completed'];

let tasks = [];

function createTask({ title, description, priority, assignee, status }) {
  const now = new Date().toISOString();
  const task = {
    id: randomUUID(),
    title,
    description,
    priority,
    assignee,
    status: status || 'pending',
    createdAt: now,
    updatedAt: now
  };
  tasks.push(task);
  return task;
}

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((t) => t.id === id);
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) return null;

  const { title, description, priority, assignee, status } = updates;
  task.title = title;
  task.description = description;
  task.priority = priority;
  task.assignee = assignee;
  task.status = status || task.status;
  task.updatedAt = new Date().toISOString();
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function filterTasks({ status, priority }) {
  let result = tasks;
  if (status) {
    result = result.filter((t) => t.status === status);
  }
  if (priority) {
    result = result.filter((t) => t.priority === priority);
  }
  return result;
}

function sortTasks(list, sort) {
  if (!sort) return list;

  const descending = sort.startsWith('-');
  const field = descending ? sort.slice(1) : sort;

  return [...list].sort((a, b) => {
    if (a[field] === undefined || b[field] === undefined) return 0;
    if (a[field] < b[field]) return descending ? 1 : -1;
    if (a[field] > b[field]) return descending ? -1 : 1;
    return 0;
  });
}

function paginate(list, { page = 1, limit = 10 }) {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / limitNum));
  const start = (pageNum - 1) * limitNum;
  const data = list.slice(start, start + limitNum);

  return {
    data,
    pagination: { page: pageNum, limit: limitNum, total, totalPages }
  };
}

function searchTasks(keyword) {
  const lower = keyword.toLowerCase();
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(lower) ||
      t.description.toLowerCase().includes(lower)
  );
}

function getTasksByAssignee(name) {
  const lower = name.toLowerCase();
  return tasks.filter((t) => t.assignee.toLowerCase() === lower);
}

module.exports = {
  PRIORITIES,
  STATUSES,
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  filterTasks,
  sortTasks,
  paginate,
  searchTasks,
  getTasksByAssignee
};
