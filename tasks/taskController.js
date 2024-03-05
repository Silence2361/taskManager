import TaskService from "./taskService.js"


class TaskController{
    static async create(req,res){
        try {
            const task = await TaskService.createTask(req.body,req.user._id)
            res.status(201).json({task, message: "Task created successfully!"})
        } catch (err) {
            res.status(400).send({error: err.message})
        }
    } 

    static async getAll(req,res){
        try {
            const tasks = await TaskService.findAllTasks(req.user._id)
            res.status(200).json({tasks, count: tasks.length, message: "Tasks fetched successfully"})
        } catch (err) {
            res.status(500).send({error: err.message})
        }
    }

    static async getById(req,res){
        try {
            const task = await TaskService.findTaskById(req.params.id,req.user._id)
            if(!task){
                return res.status(404).json({message: "Task not found"});
            }
            res.status(200).json({task, message: "Task fetched successfully"});
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    static async update(req,res){
        try {
            const task = await TaskService.updateTaskById(req.params.id, req.user._id, req.body)
            res.json({task, message: "Task updated successfully"});
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }

    static async delete(req,res){
        try {
            await TaskService.deleteTaskByid(req.params.id,req.user._id)
            res.json({message: "Task deleted successfully"});
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }
}

export default TaskController


