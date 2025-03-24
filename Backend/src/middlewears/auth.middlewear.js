import jwt  from 'jsonwebtoken'

const auth=(req,res,next)=>{
const token = req.headers.authorization.split(" ")[1]
try{
    const result =jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=result
    next()
}catch(err){
    return res.status(400).json({
        Error:err.message
    })
}
}


export default auth