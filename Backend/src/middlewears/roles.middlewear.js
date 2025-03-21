const setupRoles=(role)=>(req,res,next)=>{
req.role=role
next()
}

export default setupRoles
















// import jwt from "jsonwebtoken"
// const checkAuth=async(req,res,next)=>{
//  const {token}=req.cookies
//  console.log(token)
//  jwt.verify(token,"secretkey",(error,user)=>{
//     if(error){
//          res.status(401).send('unatuoraixed')
//  }else{
//    console.log(user)
//     req.user=user
//     next()

//  }

// })
// }

// export default checkAuth