import mongoose from "mongoose";

const {Schema, model} = mongoose

const taskSchema = new Schema({
    description: { type: String, required: true},
    status: { type: String, required: true, enum: ["To do", "In progress", "Ready to Test", "Testing", "Done"]},
    deadline:{ type: Date, required: false },
    priority:{ type: String, required: true, enum: ["Low", "Medium", 'High']},
    assign: [{ 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'}]// format of id
    } 
,{
    timestamps: true
})
    

export default model("Task", taskSchema)