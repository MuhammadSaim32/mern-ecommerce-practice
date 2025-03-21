import mongoose from "mongoose";

async function Connect_Db(){
  try {
    
   await   mongoose.connect(process.env.MONGODB_URI);
   console.log('Connected to MongoDB');
  } catch (error) {
    console.log("Error in MongoDb Connection in connect.db.js")
  }
}


export default Connect_Db