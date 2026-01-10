import 'dotenv/config'
import Connect_Db from "./connect.db.js";
import  app from './app.js'
import createAdmin from './src/utils/createAdmin.js'
Connect_Db()
    .then(async()=>{

    await  createAdmin()
        
        app.listen(3000,()=>{
            console.log("Application is started at port : 3000")
        })
})
    .catch(()=>{
        console.log("Error in Mongodb connection in index.js")
    })


