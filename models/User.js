import mongoose from "mongoose";
import bcrypt from "bcrypt"

const {Schema, model} = mongoose

const userSchema = new Schema({
    username:{type: String, required: true},
    email:{type: String, unique: true, required: true},
    password:{type: String, required: true},
    roles:[{type:String, ref: 'USER'}]
})

userSchema.pre("save", async function(next){
    const user = this

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
},{
    timestamps: true
})

export default model("User", userSchema)