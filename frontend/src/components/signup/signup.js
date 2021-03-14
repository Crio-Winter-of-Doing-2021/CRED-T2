import React from 'react';
import { Helmet } from 'react-helmet';
import { useState } from "react";
import useStyles from './styles';
import { Container, Button, TextField, Dialog, DialogTitle } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

const Signup = () => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [repass, setRepass] = useState("");
    const [errEmail, setErremail] = useState(false);
    const [errPhone, setErrphone] = useState(false);
    const [errPass, setErrpass] = useState(false);
    const [duplicate, setDuplicate] = useState(false);
    const [open, setOpen] = useState(false)

    const EmailErr = () => (
        <div >
          <Alert style={{width:'20%',margin:'auto'}} severity="error">Please enter valid Email</Alert>
        </div>
      )

    const PhoneErr = () => (
        <div >
          <Alert style={{width:'20%',margin:'auto'}} severity="error">Please enter valid phone number</Alert>
        </div>
      )

    const PassErr = () => (
        <div >
          <Alert style={{width:'20%',margin:'auto'}} severity="error">Passwords do not match</Alert>
        </div>
      )

    const Duplicate = () => (
        <div >
          <Alert style={{width:'40%',margin:'auto'}} severity="error">Account with given Email already exists</Alert>
        </div>
      )

    const Success = () => (
        <Dialog className={classes.dialog} open={open}>
            <DialogTitle ><CheckCircleOutlineIcon style={{color:"green",fontSize:"100px"}}/> <br/>
            Successfully Created!
            </DialogTitle>
            <Link to='/' style={{textDecoration:"none",color:"white"}}><Button style={{width:"100%"}} variant="contained" color="primary">Okay</Button></Link>
        </Dialog>
    )



    const validate = () => {
        let valid = true;
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            setErremail(true);
            valid = false;
        }
        if (!(/^\d{10}$/.test(phone))){
            setErrphone(true);
            valid = false;
        }
        if (pass!=repass){
            setErrpass(true)
            valid = false;
        }
        return valid
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (validate()){


            const userObject = {
                name: name,
                email: email,
                phone: phone,
                pass: pass
            };
            setOpen(true);

            

            /*await axios({
                method: 'POST',
                url: `localhost:8000/signup`,
                headers: {
                  'Content-Type': 'application/json',
                },
                data: userObject
                })
                .then((res) => {
                    if(res.status==201){
                        setOpen(true);
                    }
                    else if(res.status==401){
                        setDuplicate(true);
                    }
                    else if(res.status==404){
                        document.getElementById("alert_err").innerHTML="Username does not exist";
                        setAlert("true");
                    }
                }).catch((error) => {
                    console.log(error);
                });
            */
            
        }
    }

    return(
        <>
        <Helmet><title>User SignUp</title></Helmet>
        <Container className={classes.container}>
            <form onSubmit={onSubmit} className={classes.form}>
                <h2>Enter details</h2>
                <div className={classes.input}>
                <label className={classes.label} htmlFor="name" >Name</label>
                <TextField className={classes.fields}
                    id = "name"
                    variant="outlined"
                    onChange={(e) => {setName(e.target.value)}}
                    size="small"
                    required
                />
                </div>

                <div className={classes.input} >
                <label className={classes.label} htmlFor="email" >Email  </label>
                <TextField className={classes.fields}
                    id = "email"
                    variant="outlined"
                    onChange={(e) => {setEmail(e.target.value)}}
                    size="small"
                    required
                />
                </div>

                { errEmail ? <EmailErr /> : null }

                <div className={classes.input}>
                <label className={classes.label} htmlFor="phone" >Phone</label>
                <TextField className={classes.fields}
                    id = "phone"
                    variant="outlined"
                    onChange={(e) => {setPhone(e.target.value)}}
                    size="small"
                    required
                />
                </div>

                { errPhone ? <PhoneErr /> : null }

                <div className={classes.passinput}>
                <label className={classes.label} htmlFor="pass" >Password</label>
                <TextField className={classes.fields}
                    id = "pass"
                    variant="outlined"
                    type="password"
                    onChange={(e) => {setPass(e.target.value)}}
                    size="small"
                    required
                />

                <label className={classes.passlabel} htmlFor="pass2" >Confirm Password</label>
                <TextField className={classes.fields}
                    id = "pass2"
                    variant="outlined"
                    type="password"
                    onChange={(e) => {setRepass(e.target.value)}}
                    size="small"
                    required
                />
                </div>

                { errPass ? <PassErr /> : null }

                { duplicate ? <Duplicate /> : null }

                <div className={classes.submitbutton}>
                <Button type="submit" color="primary" variant="contained">Create Account</Button>
                </div>
            </form>
            <Link style={{textDecoration:"none",color:"black"}}  to='/'><Button  variant="contained" size="small">Back</Button></Link>
            <Success open={open}/>
        </Container>
        </>
    )
}

export default Signup;