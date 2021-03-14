import React from 'react';
import { Helmet } from 'react-helmet';
import { useState } from "react";
import useStyles from './styles';
import { Link, useHistory } from 'react-router-dom';
import { Grid, Button, TextField} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import UserProfile from '../UserProfile';
import axios from 'axios';

const Main = () => {
    const classes = useStyles();
    const [uname, setName] = useState("");
    const [pass, setPass] = useState("");
    const [alert, setAlert] = useState(false);
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault()
        const userObject = {
            uname: uname,
            pass: pass
        };

        history.push('/cards') ;
        
        /*await axios({
            method: 'POST',
            url: `localhost:8000/login`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: userObject
            })
            .then((res) => {
                if(res.status==200){
                    UserProfile.setName(res.data.name);
                    UserProfile.setId(res.data.user_id);
                    history.push('/cards') ;
                }
                else if(res.status==401){
                    document.getElementById("alert_err").innerHTML="Invalid Password";
                    setAlert(true);
                }
                else if(res.status==404){
                    document.getElementById("alert_err").innerHTML="Username does not exist";
                    setAlert(true);
                }
            }).catch((error) => {
                console.log(error);
            });
        */
        
    }

    
    return(
        <>
        <Helmet><title>CRED</title></Helmet>
        <Grid className={classes.grid} style = {{height:"100vh",width:"100vw",margin:"0"}} container  spacing={3} alignItems="stretch" >
        <Grid className={classes.left} item xs={12} sm={8}>
           
        </Grid>

        <Grid className={classes.right} item xs={12} sm={4}>
            <form onSubmit = {onSubmit}>
            <h2>Login</h2>
            <div>
            <label className={classes.label} htmlFor="username" >Username</label>
            <TextField className={classes.fields}
                id = "username"
                variant="outlined"
                onChange={(e) => {setName(e.target.value)}}
                size="small"
                required
            />
            </div>
            <div>
            <label className={classes.label} htmlFor="pass" >Password</label>
            <TextField className={classes.fields}
                id = "pass"
                variant="outlined"
                type="password"
                onChange={(e) => {setPass(e.target.value)}}
                size="small"
                required
            />
            <div style={{display: alert ? "block" : "none",margin:"10px 0px"}}>
            <Alert id="alert_err" severity="error"></Alert>
            </div>
            </div>
            <div className={classes.loginbutton}>
            <Button type="submit" color="primary" variant="contained">Log In</Button>
            </div>
            </form>
            <h3>Don't have an account? Sign up below!</h3>
            <Link style={{textDecoration:"none"}}  to='/signup'><Button  color="primary" variant="contained">Sign Up</Button></Link>
        </Grid>
        </Grid>

        </>
    )
    }

export default Main;