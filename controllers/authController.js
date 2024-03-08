import express from "express";
import User from "../models/User.js"
import Role from "../models/Role.js"
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
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: "User with this username already exist"})
            }
            const userRole = await Role.findOne({value:"USER"})
            const user = new User({username,email,password, roles:[userRole.value]})
            await user.save()
            return res.json({ message: "User successfully registrated!"})
        } catch (e) {
            return res.status(400).json({message: "Registration error" })
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
                _id: user._id.toString(),
                roles: user.roles
            }, process.env.JWT_SECRET_KEY)
    
            res.send({user,token, message: "Logged in successfully"})
        } catch (e) {
            res.status(400).send({error: e })
        }
    }

    
}

export default new AuthController()

