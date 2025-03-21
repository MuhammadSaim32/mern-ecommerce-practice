import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from 'jwt-decode';
import { ClearCart } from '../store/CartSlice';

function NavBar() {
const dispatch = useDispatch()
const navigate = useNavigate()
const count=useSelector(state=>state.CartSlice.count)
const [data,setData] = useState(0)
  const Auth= useSelector(state => state.AuthSlice.status)
  const decode = useSelector(state=> state.AuthSlice.userDetails)
console.log(Auth)



useEffect(()=>{
setData(count)
},[count])


  let  userDetails
if(decode){
    userDetails =jwtDecode(decode)
    console.log(userDetails)
}
  console.log(userDetails)
const navbar = [
    { navItem: 'Home', path: '/',Auth:true },
    { navItem: 'Login', path: '/login',Auth:!Auth },
    { navItem: 'Register', path: '/register',Auth:!Auth },
    { navItem: 'Seller Signup', path: '/register/seller',Auth:!Auth },
    { navItem: 'AdminPanel', path: '/AdminPanel',Auth: (Auth && userDetails.role==='admin') ? true:false },
    { navItem: 'Seller Desk', path: '/SellerDashborad',Auth: (Auth && userDetails.role==='seller') ? true:false },

  ];

 const  logoutHandler=()=>{
  dispatch(logout())
  dispatch(ClearCart())
  navigate('/')
  
 }

  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">MyShop</h1>
      <ul className="flex space-x-6 items-center">
        {navbar.map((item) => (
          <li key={item.navItem}>
            {item.Auth && (
              <Link to={item.path} className="cursor-pointer">
                {item.navItem}
              </Link>
            )}
          </li>
        ))}
        {Auth && (
          <li>
            <button 
              onClick={logoutHandler} 
              className="cursor-pointer bg-red-500 px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600">
              Logout
            </button>
          </li>
        )}
         {Auth && ( 
  <li>
    <button 
      
      className="cursor-pointer bg-blue-500 px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-600">
        
 <FontAwesomeIcon icon={faCartShopping}  className='text-2xl' />   
        <p className='inline-block text-black font-bold pl-1 '>{data}</p>
  </button>
  </li>
)}

      </ul>
    </div>
  </nav>
  
  );
}

export default NavBar;