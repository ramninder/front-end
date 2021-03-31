import {bookingApi} from "."

export const createNewBooking = async (customerName: String, checkInDate: Date, checkOutDate: Date) =>{
    let createBooking = {
        customerName,
        checkInDate,
        checkOutDate

    } 

        console.log(createBooking)
        try{

                let res = await bookingApi.post("/bookings", createBooking)
                console.log(res.data);
                return res.data;
        }catch(e){
            console.log(e);
            if(e.response){
                throw new Error(e.response.data);
            } else {
                throw new Error("Oops something went wrong")
            }

        }
}


export const viewAllBookings = async()=>{

    try{
        let res = await bookingApi.get(`/bookings`)
        console.log(res.data);
        return res.data;
    }catch(e) {
        console.log(e);
        if(e.response){
            throw new Error(e.response.data);
        } else {
            throw new Error("Unable to fetch all bookings")
        }
    }
    }
