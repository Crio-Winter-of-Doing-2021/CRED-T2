import React from 'react';
import Cards from 'react-credit-cards';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import useStyles from './styles';
import { TextField, Button, Dialog, DialogTitle, Grid, Paper} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import UserProfile from '../UserProfile';
import axios from 'axios';


const AddCard = () => {
    const classes = useStyles();
    const user_id = UserProfile.getId();
    const token = UserProfile.getToken();
    const [name_on_card, setName] = useState("");
    const [expiry_date, setExpiry] = useState("");
    const [card_number, setNumber] = useState("");
    const [focus, setFocus] = useState("");
    const [open, setOpen] = useState(false);
    const [errDate, setErrdate] = useState(false);
    const [errNumber, setErrnumber] = useState(false);

    const handleCardNumber = (text) => {
        let formattedText = text.split(' ').join('');
        if (formattedText.length > 0) {
        formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        setNumber(formattedText);
    }

    const handleExpiry = (text) => {
        let textTemp = text;
        if (textTemp[0] !== '1' && textTemp[0] !== '0') {
          textTemp = '';
        }
        if (textTemp.length === 2) {
          if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) === 0) {
            textTemp = textTemp[0];
          } else {
            textTemp += '/';
          } 
        }
        setExpiry(textTemp)
    }

    const handleBackspace = (e) => {
        if (e.keyCode === 8) {
            if (expiry_date.length===3){
                let temp = expiry_date.substring(0, 2);
                setExpiry(temp)
            }
        }
    }

    const DateErr = () => (
        <div style={{display:"inline"}}>
          <Alert style={{width:'70%'}} severity="error">Enter valid date</Alert>
        </div>
      )

    const NumberErr = () => (
        <div >
          <Alert style={{width:'80%'}} severity="error">Card already taken</Alert>
        </div>
      )

    const Success = () => (
        <Dialog className={classes.dialog} open={open}>
            <DialogTitle ><CheckCircleOutlineIcon style={{color:"green",fontSize:"100px"}}/> <br/>
            Card Successfully Added!
            </DialogTitle>
            <Link to='/cards' style={{textDecoration:"none",color:"white"}}><Button style={{width:"100%"}} variant="contained" color="primary">Okay</Button></Link>
        </Dialog>
    )

    const validate = () => {
        let temp_number = card_number.replace(/\s/g,'');
        let valid = true
        
        if (expiry_date.length!==5 ||  !(/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry_date))){
            setErrdate(true);
            valid = false;
        }
        else {
            let month = expiry_date.substring(0,2)
            let year = expiry_date.substring(3,5)
            const curdate = new Date();
            let curmonth = (curdate.getMonth())+1;
            if (curmonth<10){
                curmonth = '0'+curmonth;
            }
            else{
                curmonth = curmonth.toString();
            }
            let curyear = curdate.getFullYear().toString().substr(-2);
            if ((year<curyear) || (month<curmonth && year===curyear)){
                setErrdate(true);
                valid = false
            }
        }
        if (temp_number.length!==16 || !(/^\d+$/.test(temp_number))){
            setErrnumber(true);
            valid = false;
        }
        return valid

    }

    const onSubmit = async(e) => {

        e.preventDefault()
        setErrdate(false);
        setErrnumber(false);
        
        if (validate()){
        let card_no = card_number.replace(/\s/g,'');
        const userObject = {
            name_on_card: name_on_card,
            card_number: card_no,
            expiry_date:expiry_date,
        };

        await axios({
            method: 'POST',
            url: "http://localhost:8081/cards",
            headers: {
              "token": `${token}`,
            },
            data: userObject
            })
            .then((res) => {
                if(res.status===201){
                    setOpen(true)
                }
            }).catch((error) => {
                if(error.response.status===400){
                    setErrnumber(true);
                }
                if(error.response.status===409){
                    setErrnumber(true);
                }
            });
        
        }

    }

    return(
        <>
        <Helmet><title>Add Card</title></Helmet>
        <div className={classes.main}>
        <Paper className={classes.paper}>
        <div className={classes.carddiv}>
        <Cards 
          expiry = {expiry_date}
          name = {name_on_card}
          number = {card_number}
          focused = {focus}
        />
        </div>
        
        <form onSubmit={onSubmit} className={classes.form}>
        
        <div className={classes.input}>
            <TextField className={classes.fields}
                id = "standard-input"
                label="Name on Card"
                onChange={(e) => {setName(e.target.value)}}
                onFocus={(e) => {setFocus(e.target.name)}}
                size="small"
                InputLabelProps={{ required: false }}
                required
            />
        </div>
        
        <div className={classes.input}>
            <TextField className={classes.fields}
                id = "card-number"
                label="Card Number"
                value = {card_number}
                onChange={(e) => {handleCardNumber(e.target.value)}}
                onFocus={(e) => {setFocus(e.target.name)}}
                inputProps={{ maxLength: 19 }}
                InputLabelProps={{ required: false }}
                size="small"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                required
                error={errNumber}
                helperText={errNumber ? "Enter valid card number" : "" }
            />
        </div>
        
        
        
        <div className={classes.input}>
            <TextField className={classes.fields}
                id = "expiry-date"
                label="Expiry Date"
                value={expiry_date}
                onChange={(e) => {handleExpiry(e.target.value)}}
                onKeyDown={(e) => {handleBackspace(e)}}
                onFocus={(e) => {setFocus(e.target.name)}}
                size="small"
                InputLabelProps={{ required: false }}
                inputProps={{ maxLength: 5 }}
                placeholder="MM/YY"
                required
                error={errDate}
                helperText={errDate ? "Enter Valid Date" : "" }
            />
        </div>
        
        <div className={classes.buttondiv}>
        <Button className={classes.submitbutton} type="submit" color="primary" variant="contained">Add Card</Button>
        </div>
        <div className={classes.buttondiv}>
        <Link style={{textDecoration:"none",color:"black"}}  to='/cards'><Button  variant="contained" >Cancel</Button></Link>
        </div>
        </form>
        <Success open={open}/>
        </Paper>
        </div>
        </>
    )
}

export default AddCard;