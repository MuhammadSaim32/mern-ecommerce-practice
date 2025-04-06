import api from "./axios.api"

class usersAuth{
    
    async  registerUser({username,email,password},pathname) {

        if(pathname.includes('seller')){
            const response=  await api.post('/users/register/seller',{username,email,password})
        return response
        }else{
     const response=  await api.post('/users/register',{username,email,password})
        return response
        }
    }

    async  loginUser({email,password}) {
        const response=  await api.post('/users/login',{email,password},{ withCredentials: true })
           return response
       }
    
    async GetUserById(token){
        const response = await api.post('/users/User/id',{},{
            headers:{
                'Authorization' :`Bearer ${token}`

            }
        })
        return response
    }

    async ForgotPassword(email){
        const response = await api.post('/users/forgot-password',
            email,
        )
        return response 
    }

    async ResetPassword({password},resetToken){
        console.log(password)
        const response = await api.post('/users/reset-password',
            {password,
             resetToken 
            },
        )
        return response 
    }
    
    async GetAllUser(token) {
     const response  = await api.post('/users/admin/get-all-users',{},{
        headers:{
            'Authorization' :`Bearer ${token}`
        }
     })
     return response
    }
}


const userAuth = new usersAuth()

export default userAuth