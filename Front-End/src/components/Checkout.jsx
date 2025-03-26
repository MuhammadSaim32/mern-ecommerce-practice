import userAuth from '../backend/users.Api';
import Loader from './Loader'
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {CartFromBackend} from "../store/CartSlice";

function Checkout() {
const [loading,setloading] = useState(true)
const token=useSelector((state)=>state.AuthSlice.userDetails)
const dispatch = useDispatch();

useEffect(() => {
  
  userAuth.GetUserById(token).then((data)=>{
    dispatch(CartFromBackend(data.data.cart))
    console.log(data.data.cart)
    setloading(false)
    
  })

}, [])




return  !loading ?(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Payment Successful</h1>
        <p className="text-gray-700">Your payment was processed successfully!</p>
      </div>
    </div>
  ):(
  <Loader/>
)
}

export default Checkout