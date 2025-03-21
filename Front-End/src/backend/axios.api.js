import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:3000/api/v1",
    timeout: 50000 
   });
  

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    }
  );
  

  export default api