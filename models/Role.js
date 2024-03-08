import mongoose from "mongoose";

const {Schema, model} = mongoose

const Role = Schema({
    value:{type:String, unique: true, default:'USER'}
})

export default model ("Role", Role)