import express from 'express'
const UserRouter= express.Router()
import { registerUser,loginUser,UserDetailsById} from '../controllers/user.controller.js'
import setupRoles from "../middlewears/roles.middlewear.js"
import auth from '../middlewears/auth.middlewear.js'

UserRouter.post('/register',setupRoles('customer'),registerUser)
UserRouter.post('/register/seller',setupRoles('seller'),registerUser)

UserRouter.post('/login',loginUser)
UserRouter.post('/User/id',auth,UserDetailsById)


export default UserRouter