import express from "express";
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {validationResult} from 'express-validator'



class AuthController{
    async registration(req,res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                res.status(400).json({message: "Error of registration", errors})
            }
            const {username,email,password} = req.body
            const user = await User.create({username,email,password})
            res.status(201).send({user, message: "User create successfully!"})
        } catch (e) {
            res.status(400).send({error: "User already existed" })
        }
    
    }
    async login (req,res){
        try {
            const { email,password } = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).send({ error: "Unable to login, user not found" })
            }
    
            const isMatch = await bcrypt.compare(password, user.password )
    
            if(!isMatch){
                return res.status(400).send({ error: "Unable to login, invalid password" });
            }
    
            const token = jwt.sign({
                _id: user._id.toString()
            }, process.env.JWT_SECRET_KEY)
    
            res.send({user,token, message: "Logged in successfully"})
        } catch (e) {
            res.status(400).send({error: e })
        }
    }
}

export default new AuthController()

