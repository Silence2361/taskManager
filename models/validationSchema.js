import { checkSchema } from "express-validator";

const userValidationSchema = checkSchema({
    username:{
        in:["body"],
        isString: {
            errorMessage: "Username must be a string"
        },
        isLength:{
            options: {min: 5, max: 10},
            errorMessage: "Username should be at least 5 chars and max 10 chars ",
        }   
    },
    email:{
        in:["body"],
        isEmail: {
            errorMessage: 'Please provide a valid email'
        },
        normalizeEmail: true,
    },
    password:{
        in: ['body'],
        isLength:{
            options: {min: 6, max: 12},
            errorMessage: "Password should be at least 5 chars and max 10 chars "
        }
    }
})

export default userValidationSchema

