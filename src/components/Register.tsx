import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, { useState } from "react";
import{useHistory} from 'react-router-dom'
import { Users } from '../models/Users';
import { Card } from '@material-ui/core';
import { createNewUser } from '../remote/login';

interface ICustomerRegisterProps {
  updateCurrentUser: (u: Users) => void;
  currentUser: Users;
}






const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxHeight: 575,
    background: "#e0a150",
    
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  hd:{
    fontWeight: 'bold'
  }
}));

export const  Register: React.FunctionComponent= (props) => {
  const classes = useStyles();
  let history = useHistory();


  const [firstName, changeFirstName] = useState("");
  const [lastName, changeLastName] = useState("");
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const [email, changeEmail] = useState("");

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeLastName(e.target.value);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeEmail(e.target.value);

  };
    // Synthetic event is from react for creating a standard event between different browsers
    const handleSubmitCustomer =  async (e: React.SyntheticEvent) => {

      // Prevent default html submit behaviour
       e.preventDefault();
      try{
       //Submit new customer to database
       let customer =  await createNewUser(
        firstName,
        lastName,
        username,
        password,
        email
       );
       
          if(customer){
            history.push("/");
          }
       }catch  (e) {
        console.log(e.message);
      }

    };

  return (
    <Card className={classes.root}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
    
        </Avatar>
        <Typography className={classes.hd} component="h1" variant="h6">
          Customer Registration
        </Typography>
      <br></br>
        <form onSubmit={handleSubmitCustomer} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                value = {firstName}
                onChange={handleFirstNameChange}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value = {lastName}
                onChange={handleLastNameChange}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value = {username}
                onChange={handleUsernameChange}
                variant="outlined"
                required
                fullWidth
                id="Username"
                label="User Name"
                name="UserName"
                autoComplete="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value = {password}
                onChange={handlePasswordChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value = {email}
                onChange={handleEmailChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <br></br>
          <Button
            
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </Button>
         
        </form>
      </div>
      <Box mt={3}>
        
      </Box>
    </Container>
    </Card>
  );
}



