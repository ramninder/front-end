import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

import RateReviewIcon from "@material-ui/icons/RateReview";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { Users } from '../models/Users';
import { CssBaseline } from "@material-ui/core";
import { Register } from "./Register";
import { BookRooms } from "./BookRooms";
import { CheckBookings } from "./CheckBookings";

const drawerWidth = 240;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    roots: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: 'black'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
      background: '#e0a150',
      minHeight: '89.7%',
      fontWeight: 'bold'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    infoIcon: {
      color: '#0045ff'
    },
    scheduleIcon: {
      color: '#0045ff'
    },
    businessIcon: {
      color: '#0045ff'
    },
    headerText: {
      color: "#e0a150",
      fontWeight: 'bold'
    },
    listText: {
      fontWeight: 'bold'
    }
  })
);

interface IClippedDrawerprops{
    updateCurrentUser: (u: Users) => void;
    currentUser: Users;
}




export const ClippedDrawer: React.FunctionComponent<IClippedDrawerprops> = (props) =>{


    const classes = useStyles();
    let {path, url} = useRouteMatch();
    let history = useHistory();

    


    function ManagerNavigateLink(index: number) {
      if (index === 0) {
        history.push(`/Register`);
      } else if (index === 1) {
        history.push(`/BookRooms`);
      } else if (index === 2) {
        history.push(`/CheckBookings`);
      } else {
        history.push("/");
      }
    }

    function ReceptionNavigateLink(index: number) {
      if (index === 0) {
        history.push(`/BookRooms`);
      } else if (index === 1) {
        history.push(`/CheckBookings`);
      } else {
        history.push("/");
      }
    }


    return(
 <div className={classes.roots}>
     <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
         <Toolbar>
           <Typography className={classes.headerText} variant="h6" noWrap>
              Royal Punjab
                 </Typography>
                     </Toolbar>
                         </AppBar>
    <Drawer className={classes.drawer} variant="permanent" classes={{paper:classes.drawerPaper}}>
            <Toolbar/>
               <div className={classes.drawerContainer}>
                  {(props.currentUser && props.currentUser.userRole.roleId === 1) ?(
                    <List>
                    {["Add New Employee", "Add Booking","View Booking", "Logout"].map(
                (text, index) => (
                  <ListItem
                    button
                    key={text}
                    onClick={() => {
                      ManagerNavigateLink(index);
                    }}
                  >
                    <ListItemIcon>
                      {index === 0 ? (
                        <InfoIcon className={classes.infoIcon}/>
                      ) : index === 1 ? (
                        <ScheduleIcon className={classes.scheduleIcon}/>
                      ) : index === 2 ? (
                        <BusinessCenterIcon className={classes.businessIcon}/>
                      ) : (
                        <ExitToAppIcon color="secondary"/>
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )} 

                    </List>
                  ): ((props.currentUser && props.currentUser.userRole.roleId === 2) ? 
                  <List>
                    {[
                      "Add Booking",
                      "View Booking",
                      "Logout",
                    ].map((text, index) => (
                      <ListItem
                        button
                        key={text}
                        onClick={() => {
                          ReceptionNavigateLink(index);
                        }}
                      >
                        <ListItemIcon>
                          {index === 0 ? (
                            <AccountCircleIcon className={classes.infoIcon}/>
                          ) : index === 1 ? (
                            <RateReviewIcon className={classes.infoIcon}/>
                          ) : (
                            <ExitToAppIcon color="secondary"/>
                          )}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List> : <div>Please login</div>
                )}
                <Divider />
                </div>
         </Drawer>
         {/* <main className={classes.content}>
          <Toolbar/>
          <Switch>
         <Route path={`${path}/Register`}>
              <Register/>
            </Route>

            <Route path={`${path}/BookRooms`}>
              <BookRooms
              updateCurrentUser={props.updateCurrentUser}
              currentUser={props.currentUser}
              />
            </Route>

            <Route path={`${path}/CheckBookings`}>
              <CheckBookings
              updateCurrentUser={props.updateCurrentUser}
              currentUser={props.currentUser}
              />
            </Route>
          </Switch>

         </main> */}


        </div>

    );

    
};