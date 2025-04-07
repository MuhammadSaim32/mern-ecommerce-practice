import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store ,persistor} from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react' //PersistGate delays rendering the app until the persisted Redux state is rehydrated (loaded from storage). 🚀
import { Provider } from 'react-redux'
import { Home ,ResetPassword,RegisterUser,PaymentFailed,NotFound,Login,Product,CartPage,ForgetPassword,Checkout} from './components/export'
import {SellerBashborad,SellerApp,AddProducts,MyProducts,OutOfStockProducts} from "./components/SellerComponents/Seller.export.js"
import {AdminDashboard,AdminApp,Users,Products,ManageUsers} from "./components/AdminComponents/admin.export.js"
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'

const route = createBrowserRouter([
{ 
   path:"/",
  element:<App/>,
  children:[
    {
      path:'/',
      element:<Home/>,
    },
    {
      path:'/register',
      element:<RegisterUser/>,
    },{

      path:"/login",
      element:<Login/>
    },
    {
      path:'/product/:id',
      element:<Product/>
    },
    {
      path:'/SellerDashborad',
      element:<SellerApp/>,
      children:[
        {
          path:'/SellerDashborad',
          element:<SellerBashborad/>
        },{
          path:'/SellerDashborad/Add-product',
          element:<AddProducts/>
        },{
          path:'/SellerDashborad/products',
          element:<MyProducts/>

        },{
          path:"/SellerDashborad/out-of-stock",
          element:<OutOfStockProducts/>
        }
      ],
    },
    {
      path:'/admin',
    element:<AdminApp/>,
    children:[
      {
        path:'/admin',
        element:<AdminDashboard/>
      },
      {
        path:'/admin/Users',
        element:<Users/>
      },
      {
        path:'/admin/Products',
        element:<Products/>
      },
      {
path:'/admin/manage/users',
element:<ManageUsers/>
      },
    ]
    },
    {
      path:'/register/seller',
      element:<RegisterUser/>
    },
    {
      path:'/cart',
      element:<CartPage/>
    },
    {
      path:'/checkout',
      element:<Checkout/>
    },
    {
      path:'/cancel',
      element:<PaymentFailed/>
    },
    {
      path:'/forgot-password',
      element:<ForgetPassword/>

    },
    {
      path:'/reset-password',
      element:<ResetPassword/>
    },
    {
      path:'*',
      element:<NotFound/>
    },
  ]
},

])

createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}> {/*Connects PersistGate to the persistor, which manages loading the saved Redux state.*/}
    <RouterProvider router={route} />  {/*oading={null} → While Redux state is being restored, it shows null (nothing). You could replace null with a loading spinner.*/}
    </PersistGate>  

  </Provider>
)
