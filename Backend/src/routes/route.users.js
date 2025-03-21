import express from 'express'
const UserRouter= express.Router()
import { registerUser,loginUser} from '../controllers/user.controller.js'
import setupRoles from "../middlewears/roles.middlewear.js"

UserRouter.post('/register',setupRoles('customer'),registerUser)
UserRouter.post('/register/seller',setupRoles('seller'),registerUser)

UserRouter.post('/login',loginUser)


export default UserRouter