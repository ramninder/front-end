import React, { useState } from  'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { createNewBooking } from '../remote/createbookings';



export const BookRooms: React.FunctionComponent = ()=>{
    
    let history = useHistory();

    const[customerName,changeCustomerName] = useState("");
    const handleCustomerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeCustomerName(e.target.value);
    };

    const [checkIn, changeCheckInDate] = useState(new Date());
    const handleCheckInChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        changeCheckInDate(event.target.value as Date);
      };


      const [checkOut, changeCheckOutDate] = useState(new Date());
    const handleCheckOutChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        changeCheckOutDate(event.target.value as Date);
      };

      const handleSubmitBooking =  async (e: React.SyntheticEvent) => {
        
        e.preventDefault();

        //to move booking according to time forexample 1 hours
        // var DOcheckInDate = new Date(checkIn);
        // DOcheckInDate.setHours(DOcheckInDate.getHours(),DOcheckInDate.getMinutes()+60,0,0);
        
        var DOcheckInDate = new Date(checkIn);

        var DocheckOutDate = new Date(checkOut);

        try {
            //Submit booking to db
            let booking = await createNewBooking(customerName,DOcheckInDate, DocheckOutDate )  
            console.log(booking);
            history.push('/checkbookings')


        } catch(e) {
          console.log(e);
        }

    };


return(

    <>
     <h1>Book Hotel</h1><br></br>

     <form  onSubmit={handleSubmitBooking} noValidate>

         <TextField
            id = "name"
            label = "Enter your name."
            type = "text"
            value = {customerName}
            onChange = {handleCustomerName}
            />

            <br></br><br></br>

     <TextField
          id="datetime-local"
          label="Check In"
          type="datetime-local"
          value = {checkIn}
          onChange = {handleCheckInChange}
          InputLabelProps={{
            shrink: true,
          }}
        /> 
    <span>   </span> 
<TextField
          id="datetime-local1"
          label="Check Out"
          type="datetime-local"
          value = {checkOut}
          onChange = {handleCheckOutChange}
          InputLabelProps={{
            shrink: true,
          }}
        /> 
<br></br><br></br>
<Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Book
        </Button>

        </form>
    
    </>
)


}