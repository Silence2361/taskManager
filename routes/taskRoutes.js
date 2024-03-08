import express from "express";
import TaskController from "../tasks/taskController.js";
import auth from "../middlewares/auth.js";
import checkRoles  from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post('/', auth, checkRoles(['ADMIN']), TaskController.create);
router.get('/', auth, checkRoles(['ADMIN']), TaskController.getAll);
router.get('/:id', auth, TaskController.getById);
router.patch('/:id', auth, TaskController.update);
router.delete('/delete/:id', auth, checkRoles(['ADMIN']), TaskController.delete);

export default router;







