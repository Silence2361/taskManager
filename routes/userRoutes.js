import {Router} from "express";
import controller from '../controllers/authController.js'
import userValidationSchema from "../models/validationSchema.js";
import { validationResult } from "express-validator";


const router = new Router()

const validationErrors = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}

router.post("/registration", userValidationSchema, validationErrors, controller.registration)
router.post("/login", userValidationSchema, validationErrors , controller.login)

export default router

