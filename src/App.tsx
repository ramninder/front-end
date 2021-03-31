import logo from './logo.svg';
import './App.css';
import { BookRooms } from './components/BookRooms';
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { CheckBookings } from './components/CheckBookings';


function App() {
  return (
    <div className="App">
      


      <Router>
        <Route  exact path = "/">
        <BookRooms></BookRooms>
        </Route>


        <Route path = "/checkbookings" exact component = {CheckBookings}>
          <CheckBookings></CheckBookings>
        </Route>

    </Router>
    </div>
  );
}

export default App;
