import React, { useState } from "react";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  createStyles,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";

import { useHistory } from "react-router";
import { tsLogin } from "../remote/login";
import { Users } from "../models/Users";
import { Toolbar } from "@material-ui/core";

interface ILoginProps {
  updateCurrentUser: (u: Users) => void;
  currentUser: Users;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  root: {
    minWidth: 275,
    background: "#e0a150",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'black',
  },
  headerText: {
    color: "#e0a150",
    fontWeight: 'bold'
  },
  logoDiv: {
    marginBottom: 0,
    marginTop: 70
  }
})
);

export const LoginForm: React.FunctionComponent<ILoginProps> = (props) => {
  const classes = useStyles();

  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");

  let history = useHistory();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeUsername(e.target.value);
  };

  // This will handle the password change and update state
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changePassword(e.target.value);
  };

  // Synthetic event is from react for creating a standard event between different browsers
  const handleSubmitLogin = async (e: React.SyntheticEvent) => {
    // Prevent default html submit behaviour
    e.preventDefault();
    // Send username and password along with token
    try {
      let user = await tsLogin(username, password);
      props.updateCurrentUser(user);
      console.log(user);
      if (user) {
        // navigate based on if user is returned
        history.push("/dashboard");
      }
    } catch (e) {
      changePassword("");
    }
  };

  return (
    <>
     <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
         <Toolbar>
           <Typography className={classes.headerText} variant="h6" noWrap>
              Royal Punjab
                 </Typography>
                     </Toolbar>
                         </AppBar>
       <div className={classes.logoDiv}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.pos} variant="h5" component="h2">
            Login
          </Typography>
          <form onSubmit={handleSubmitLogin} noValidate autoComplete="off">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <TextField
                  value={username}
                  onChange={handleUsernameChange}
                  id="username-input"
                  type="text"
                  label="Username"
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  value={password}
                  onChange={handlePasswordChange}
                  id="password-input"
                  type="password"
                  label="Password"
                  variant="outlined"
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      </div>
    </>
  );
};
