import 'dotenv/config'
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    secure:true,
    host:'smtp.gmail.com',
    port:465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  

  
 async  function SendEmail(mailOptions){
 
try {
    const res = await transporter.sendMail(mailOptions)
    return res
} catch (error) {
    console.log(error)
}

}

export default SendEmail;