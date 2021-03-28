import React from 'react';
import { Helmet } from 'react-helmet';
import { useState } from "react";
import useStyles from './styles';
import { Link, useHistory } from 'react-router-dom';
import { Grid, Button, TextField} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Alert } from '@material-ui/lab';
import UserProfile from '../UserProfile';
import axios from 'axios';

const Main = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [alert, setAlert] = useState(false);
    const [passwordShown,setPasswordShown] = useState(false);
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault()
        const userObject = {
            email: email,
            password: pass
        };
        
        await axios({
            method: 'POST',
            url: "http://localhost:8081/login",
            headers: {
                'Content-Type': 'application/json',
              },
            data: userObject,
            })
            .then((res) => {
                if(res.status===200){
                    UserProfile.setName(res.data.data.name);
                    UserProfile.setId(res.data.data.user_id);
                    UserProfile.setToken(res.data.data.token);
                    history.push('/cards') ;
                }
            })
            .catch((error) => {
               if(error.response.status===400){
                document.getElementById("alert_err").innerHTML="Invalid Password";
                setAlert(true);
               }
               else if(error.response.status===404){
                document.getElementById("alert_err").innerHTML="Username does not exist. Please sign up";
                setAlert(true);
               }
            });
        
        
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    
    return(
        <>
        <Helmet><title>CRED</title></Helmet>
        <Grid className={classes.grid} style = {{height:"100vh",width:"100vw",margin:"0"}} container  spacing={3} alignItems="stretch" >
        <Grid className={classes.left} item xs={12} sm={8}>
           <div className={classes.heading}>
               <h1>Managing your Credit cards just got easier!</h1>
               <h4>Don't want to deal with the hassle of maintaining multiple cards? Your solution is here!</h4>
               <h4>Create an account and forget about your worries!</h4>
               <Link style={{textDecoration:"none"}}  to='/signup'><Button className={classes.createbutton} variant="contained">Create Account</Button></Link>
           </div>
        </Grid>

        <Grid className={classes.right} item xs={12} sm={4}>
            <form onSubmit = {onSubmit}>
            <h2>Login</h2>
            <div>
            <TextField  style={{margin:"20px 0"}}
                label="Email"
                variant = "outlined"
                onChange={(e) => {setEmail(e.target.value)}}
                size="small"
                InputLabelProps={{ required: false }}
                required
            />
            </div>
            <div>
            <TextField style={{margin:"20px 0"}}
                id="outlined-password-input"
                label="Password"
                type={passwordShown ? "text" : "password"}
                onChange={(e) => {setPass(e.target.value)}}
                size="small"
                variant="outlined"
                InputLabelProps={{ required: false }}
                required
            />
            <i className={classes.eyeicon} onClick={togglePasswordVisiblity}><VisibilityIcon /></i>
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