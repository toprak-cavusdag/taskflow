const express = require("express");
const taskController = require("../controllers/taskController");
const validateTask = require("../middleware/validateTask");

const router = express.Router();

router.get("/search", taskController.search);
router.get("/assignee/:name", taskController.byAssignee);

router.post("/", validateTask, taskController.create);
router.get("/", taskController.list);
router.get("/:id", taskController.getById);
router.put("/:id", validateTask, taskController.update);
router.delete("/:id", taskController.remove);

module.exports = router;
