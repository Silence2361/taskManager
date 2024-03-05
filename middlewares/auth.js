import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','').trim()
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        {
            const user = await User.findOne({
                _id: decoded._id,
            })

            if(!user){
                throw new Error("Enable to login, invalid credentials")
            }
            req.user = user
            req.token = token
            next()
        }

    } catch(error){
        res.status(401).send({error: error.message})
    }
}

export default auth

