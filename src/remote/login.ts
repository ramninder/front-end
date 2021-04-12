import {bookingApi} from "."

export const tsLogin = async (username: string, password: string) => {
    let credentials = {
        username,
        password
    }

    try {
        let res = await bookingApi.post('/auth', credentials);
        console.log(res.data);
        return res.data;
    }catch(e) {
        console.log(e);
        if(e.response){
            throw new Error(e.response.data);
        } else {
            throw new Error("Oops something went wrong")
        }
    }
}


export const createNewUser = async (firstName:string, lastName:string, username:string, password:string, email:string) =>{

    let newUser = {
            firstName,
            lastName,
            username,
            password,
            email,
            userRole: {
                roleId: 1
            }
    }

    console.log(newUser)
    try{

        let res = await bookingApi.post('/users', newUser);
        console.log(res.data);
        return res.data;
    }catch(e) {
        console.log(e);
        if(e.response){
            throw new Error(e.response.data);
        } else {
            throw new Error("Oops something went wrong")
        }
    }

 }
