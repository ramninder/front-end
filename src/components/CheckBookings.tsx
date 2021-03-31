import React, { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    makeStyles,
  } from "@material-ui/core";
import { Booking } from './models/Booking';
import { viewAllBookings } from '../remote/createbookings';


  const useStyles = makeStyles({
    root: {
        minWidth: 250,
        background: "#fff2be",
      },
      text: {
        fontWeight: 'bold',
      },
      col: {
        color: "#fff2be",
      },
      button1: {
        color: "#FF0000",
        borderColor: "#FF0000",
        hoverOver: "#FF0000",
      },
      button2: {
        color: "#228B22",
        
        borderColor: "#228B22",
      },
  });


export const CheckBookings: React.FunctionComponent = ()=>{
    const classes = useStyles();


    const [bookings, viewBookings] = useState<Booking[]>();

  useEffect(() => {
    const getBookings= async () => {
      let booking = await viewAllBookings()
      console.log(booking);
      viewBookings(booking);
    };
    getBookings();
  }, []);


    return(
        <>
            <h1>List of Bookings</h1>
        
        <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>

             <TableCell  className={classes.text} align="center">Booking Number</TableCell>
              <TableCell  className={classes.text} align="center">Name</TableCell>
              <TableCell  className={classes.text} align="center">check-In</TableCell>
              <TableCell  className={classes.text} align="center">Check-Out</TableCell>
            </TableRow>
          </TableHead>
         
          <TableBody>
          {(bookings) ? (bookings.map((row) => (
                <TableRow key={row.bookingId}>

                <TableCell align="center">{row.bookingId}</TableCell>
                  <TableCell align="center">{row.customerName}</TableCell>
                  <TableCell align="center">{new Date(row.checkInDate).toLocaleString()}</TableCell>
                  <TableCell align="center">{new Date (row.checkOutDate).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key={1}>
                  <TableCell component="th" scope="row">
                    Loading...
                  </TableCell>
              </TableRow>
            )}
              
  
              </TableBody>
          </Table>
          </TableContainer>

          </>
    );
}