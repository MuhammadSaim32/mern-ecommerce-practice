import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store ,persistor} from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react' //PersistGate delays rendering the app until the persisted Redux state is rehydrated (loaded from storage). 🚀
import { Provider } from 'react-redux'
import { Home ,RegisterUser,PaymentFailed,NotFound,Login,Product,SellerDashborad,CartPage,Checkout} from './components/export'
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
      element:<SellerDashborad/>
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
