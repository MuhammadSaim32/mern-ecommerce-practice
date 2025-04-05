import api from "./axios.api"

class productsApi {
    async uploadProduct( formData,token,{id}) {
        console.log(token)
        const response = await api.post(
            '/products/upload',
             formData,
             id,{ 
            headers: {
                Authorization: `Bearer ${token}`
            }
            }
        )
        return response
    }

    async GetAllProducts() {
        const response = await api.post('/products/all')
        return response.data.products
    }

    async AddCart(token,product){
        const response = await api.post('/products/cart/add',
            product,
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
    
        return  response 
    }

    async FetchProductById(ids){
        const response  = await api.post('/products/cart/products',
            ids
        )
        return response
    }

    async ClearCartFromBackend(token){
        const  response  =  await api.post('/products/cart/clear',{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            return response
        }

        async DecreaseItem(token,product){
          const  response  = await  api.post('/products/cart/decrease',product,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

                return response 
        }

        async RemoveItem(token,product){
            const  response  = await  api.post('/products/cart/remove',product,{
                  headers:{
                      Authorization:`Bearer ${token}`
                  }
              })
  
                  return response 
          }

        async handlepayment(data,token){
            const response = await api.post('/payment/stripeSession',data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return response 
        }

        async GetSellerProducts(token){
        const resposne =    await api.post('/products/seller/product',token,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            return resposne
    }

    async DeleteProduct(_id){
     const res =  await  api.delete(`/products/seller/delete/product?id=${_id}`)
     return res
        }

        async GetOutOfStockProducts(token){
          const res = await  api.post('/products/seller/outofstock',{},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            return res
        }

}

export const productApi = new productsApi()


