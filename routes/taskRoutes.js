import express from "express";
import TaskController from "../tasks/taskController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post('/', auth, TaskController.create);
router.get('/', auth, TaskController.getAll);
router.get('/:id', auth, TaskController.getById);
router.patch('/:id', auth, TaskController.update);
router.delete('/delete/:id', auth, TaskController.delete);

export default router;







