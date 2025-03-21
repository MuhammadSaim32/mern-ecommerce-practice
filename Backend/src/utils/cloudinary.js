import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


    
    cloudinary.config({ 
        cloud_name: COUDINARY_CLOUD_NAME, 
        api_key: process.env.COUDINARY_API_KEY, 
        api_secret: process.env.COUDINARY_API_SECRET, 
    })
    
   const uploadImageOncloudinary=async(localfilepath)=>{

try {
     const uploadResult =   await cloudinary.uploader.upload(localfilepath)
     fs.unlinkSync(localfilepath)
      return uploadResult.url

} catch (error) {
    console.log(error)
}
}

export default uploadImageOncloudinary