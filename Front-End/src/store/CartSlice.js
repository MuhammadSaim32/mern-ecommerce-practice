import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart:[
        {
        product:null,
        quantity:0
        },
    ],
    count:0
}



 const CartSlice = createSlice({
  name: 'CartSlice',
  initialState,
  reducers: {

    addToCart:(state,action)=>{
        let  product=action.payload.product
        let quantity =action.payload.quantity
        let obj={product,quantity}
        state.cart=[...state.cart,obj] // never mutate state using push. react might not re-render if refernce not change.
        
      state.count=state.cart.reduce((total,val)=>total+val.quantity,0)
      },
    
      ClearCart:(state)=>{
      let obj={
        product:null,
        quantity:0
      }
      state.cart=[obj]
      state.count=0
    },
    
    CartFromBackend:(state,action)=>{
      state.cart=action.payload
      state.count=state.cart.reduce((total,val)=>total+val.quantity,0)

    },
    
    IncreseItem:(state,action)=>{
      let ItemIndex=  state.cart.findIndex((val)=>val.product==action.payload.product)
          state.cart[ItemIndex].quantity+=action.payload.quantity;
          state.count+=action.payload.quantity
    },
    decreseItem:(state,action)=>{
        let ItemIndex=  state.cart.findIndex((val)=>val.product==action.payload.product)
            state.cart[ItemIndex].quantity=state.cart[ItemIndex].quantity-action.payload.quantity;
            state.count=state.cart.reduce((total,val)=>total+val.quantity,0)
            if(state.cart[ItemIndex].quantity==0){
              state.cart.splice(ItemIndex,1)
            }
            console.log(state.cart)
          }
          ,
    RemoveItem:(state,action)=>{
      let ItemIndex=  state.cart.findIndex((val)=>val.product==action.payload.product)
      state.cart.splice(ItemIndex,1)
      state.count=state.cart.reduce((total,val)=>total+val.quantity,0)

    }
  },
})


export const { addToCart,ClearCart,CartFromBackend,IncreseItem,decreseItem,RemoveItem} = CartSlice.actions

export default CartSlice.reducer

