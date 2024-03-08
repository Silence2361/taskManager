import jwt from 'jsonwebtoken'



const checkRoles = (roles) => {
    return async(req,res,next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '').trim()
            if(!token){
                return res.status(403).json({message:"User is not authorized"})
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userRoles = decoded.roles;
            let hasRoles = userRoles.some(role => roles.includes(role));
            if (!hasRoles) {
                return res.status(403).json({message:"You don't have access"});
            }
            next();
            } catch (e) {
            console.log(e)
            return res.status(403).json({message:"User is not authorized"})
        }
    }
    
}

export default checkRoles