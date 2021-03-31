import axios from 'axios';



//this is where we config every single request for a certain api
export const  bookingApi = axios.create({
    //You might need to add project name at end of url
    baseURL:"http://localhost:9093/",
    headers:{
        'Content-Type': "application/json"
    }
})
