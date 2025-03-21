import userModel from '../models/user.model.js'
import  jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

const redirectUserBasedOnRole=(role)=>{
    if(role==='admin'){
        return  '/admin'
    }else if(role=='seller'){
        return '/SellerDashborad'
    }else{
        return '/'
    }
}


const registerUser=async(req,res)=>{

    const {username,email,password}=req.body

if([username,email,password].some((parameter)=> parameter=="")){
     return res.status(400).send("All fields are required")
    
}


const user=await userModel.find({email})  // return all the user from db in  formate [{},{}] where object representing one user
 if(user.length>0){
   return  res.status(400).send("Email already exists")
     
}

const hashedPassword = await bcrypt.hash(password, 2)

const newUser =await userModel.create({username,email,password:hashedPassword,role:req.role})  // return created user in object formate {new user data}


return res.
status(201).json({
    success: true,
    message: "User registered successfully"
})






}


const loginUser =async(req,res)=>{
    
    const {email,password} = req.body;
    
    const findUser = await userModel.find({email}).select("username email _id password role cart")
    if(findUser.length==0){
      return res.status(400).send("User does not exist")
    }

   let HashedPassword = findUser['0']['password']
  const IsMatched  =await bcrypt.compare(password,HashedPassword)  // return compare operation result  in boolen


   if(!IsMatched){
       return   res.status(400).send("Invalid Password")

    }
    const user = {
        id:findUser['0']['_id'],
        email,
        username:findUser[0].username,
        role:findUser[0].role
    }

    const token=jwt.sign(user,process.env.JWT_SECRET_KEY) // 1️⃣ HS256 (Default) – Uses a secret key (HMAC + SHA256).

console.log(token)
     res.status(200).json({
        token,
        cart:findUser[0].cart,
        redirect:redirectUserBasedOnRole(findUser[0].role)
    })   // last option is directive  for browser to contorl cookie behaviour

}

const deleteUser=async(req,res)=>{
    const {email} = req.body;


    const DeletedCount = await userModel.deleteOne({email})  // returns how many  Number of  documents is deleted 
}

export {
    registerUser,
    loginUser,
    deleteUser
    
}




