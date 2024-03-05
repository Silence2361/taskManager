import Task from "../models/Task.js"



class TaskService{
    static async createTask(body, userId){
        const task = new Task({
            ...body ,
            assign: userId
        })
        await task.save()
        return task
    }


    static async findAllTasks(userId){
        return await Task.find({assign: userId})
    }

    static async findTaskById(taskId,userId){
        if(!userId){
            throw new Error("Id is not found")
        }
        return await Task.findOne({_id: taskId, assign: userId})
    }

    static async updateTaskById(taskId, userId, updates){
        const task = await Task.findOne({_id: taskId, assign: userId});
        if(!task){
            throw new Error("Task not found")
        }
        Object.keys(updates).forEach(update => task[update] = updates[update]);
        await task.save();
        return task;
    }

    static async deleteTaskByid(taskId,userId){
        const task = await Task.findOneAndDelete({_id: taskId, assign: userId})
        if(!task){
            throw new Error("Task not found")
        }
        return task
    }
}

export default TaskService