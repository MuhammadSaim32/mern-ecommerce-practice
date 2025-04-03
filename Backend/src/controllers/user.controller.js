import userModel from '../models/user.model.js'
import  jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import SendEmail from '../utils/nodemailer.js'

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


const UserDetailsById=async(req,res)=>{
    console.log(req.user)
    const user = await userModel.findById(req.user.id) 
    res.json({
        cart:user.cart
    })   
}

const ForgotPassword=async(req,res)=>{
    const {email} = req.body
  const exist  = await userModel.findOne({email})
  if(!exist){
   return  res.json({
        message:'email not exist in our records'
    })
  }
  let payload={
 email:exist.email,
  }

 const resetToken= jwt.sign(payload,process.env.JWT_SECRET_KEY, { expiresIn: "10m" })


 const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email.toString(),
    subject: 'Reset Your Password',
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: white;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .footer {
            font-size: 12px;
            color: #555;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Request</h2>
        <p>Hello <b>${email.toString().slice(0,email.toString().indexOf('@'))}</b></p>
        <p>We received a request to reset your password. Click the button below to proceed:</p>
        <a href="${process.env.FRONTEND_URI}reset-password?resetToken=${resetToken}" class="button">Reset Password</a>
        <p>If you did not request this, please ignore this email. This link will expire in <b>10 min</b>.</p>
        <p class="footer">For security reasons, do not share this link with anyone.</p>
        <p class="footer">Best Regards, <br>MyShop</p>
    </div>
</body>
</html>
`
  };

 const response =await  SendEmail(mailOptions)
console.log(response)
 return res.json({
        message:'check your email for password reset link'
    
    })
}

const ResetPassword=async(req,res)=>{
const {password,resetToken} = req.body
console.log(req.body)
try{
const {email} =await jwt.verify(resetToken, process.env.JWT_SECRET_KEY)
const user = await userModel.findOne({email})
const hashedPassword = await bcrypt.hash(password, 2)
user.password=hashedPassword
await user.save();
return  res.json({message: 'Password reset successfully.login using new password'})
}catch(err){
    return res.json({
        message:'token is not valid.try again with new token '
    })
}
}


export {
    registerUser,
    loginUser,
    deleteUser,
    UserDetailsById,
    ResetPassword,
    ForgotPassword
}




