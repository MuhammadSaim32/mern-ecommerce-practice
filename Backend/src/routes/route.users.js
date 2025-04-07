import express from 'express'
const UserRouter= express.Router()
import { registerUser,loginUser,UserDetailsById,ResetPassword,ForgotPassword,GetAllUser,deleteUserById,SaveChangesByAdmin} from '../controllers/user.controller.js'
import setupRoles from "../middlewears/roles.middlewear.js"
import auth from '../middlewears/auth.middlewear.js'

UserRouter.post('/register',setupRoles('customer'),registerUser)
UserRouter.post('/register/seller',setupRoles('seller'),registerUser)

UserRouter.post('/login',loginUser)
UserRouter.post('/User/id',auth,UserDetailsById)
UserRouter.post('/reset-password',ResetPassword)
UserRouter.post('/forgot-password',ForgotPassword)
UserRouter.post('/forgot-password',ForgotPassword)
UserRouter.post('/admin/get-all-users',auth,GetAllUser)
UserRouter.delete('/delete',deleteUserById)
UserRouter.post('/save-changes',SaveChangesByAdmin)


export default UserRouter