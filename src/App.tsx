import './App.css';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { Users } from './models/Users';
import { ClippedDrawer } from './components/ClippedDrawer';
import { BookRooms } from './components/BookRooms';
import { CheckBookings } from './components/CheckBookings';
import { Register } from './components/Register';


function App() {
  const [user, changeUser] = useState<Users>();
  

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
        <LoginForm updateCurrentUser={changeUser} currentUser={user}/>
      </Route>

      <Route path="/dashboard" exact component = {ClippedDrawer}>
        <ClippedDrawer updateCurrentUser={changeUser} currentUser={user}/>
      </Route>
      <Route path="/BookRooms" exact component = {BookRooms}>
        <BookRooms updateCurrentUser={changeUser} currentUser={user}/>
      </Route>
      <Route path="/CheckBookings" exact component = {CheckBookings}>
        <CheckBookings updateCurrentUser={changeUser} currentUser={user}/>
      </Route>
      <Route path="/Register" exact component = {Register}>
        <Register/>
      </Route>
    </Router>
    </div>
  );
}

export default App;
