import axios from "axios";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5500'
})
const useAxiosSecure = () => {
   axiosSecure.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token');
    config.headers.authorization = `Bearer ${token}`
    return config;
   },function(error){
       return Promise.reject(error);
   });
   axiosSecure.interceptors.response.use(function(response){
       return response;
   }),function(error){


    if(error.response.status === 401 || error.response.status === 403){
    return Promise.reject(error);
       
   } }
   return axiosSecure ;
};

export default useAxiosSecure;