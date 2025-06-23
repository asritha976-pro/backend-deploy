const jwt = require('jsonwebtoken');

exports.authenticate = async(req,res,next) =>{
    try{
        const token = req?.headers?.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).send({error: 'Access denied. Please login or signup to continue'})
        }
        jwt.verify(token, process.env.JWT_SECRET,(error,decoded) => {
            if(error){
                return res.status(401).send({error:'Session expired or invalid. Please Login again'});
            }
            req.user = null;
            req.user = decoded;
            req.role = decoded.role;
            next();
        })
    }catch(error){
        return res.status(401).send({error:'Authentication error.Please login or signup to access this resource!'})
    }
}