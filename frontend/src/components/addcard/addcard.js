import React from 'react';
import Cards from 'react-credit-cards';
import { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import useStyles from './styles';
import { Container,TextField, Button, Dialog, DialogTitle, Grid } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import UserProfile from '../UserProfile';
import axios from 'axios';


const AddCard = ({card}) => {
    const classes = useStyles();
    const user_id = UserProfile.getId();
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
          <Alert style={{width:'20%'}} severity="error">Enter valid date</Alert>
        </div>
      )

    const NumberErr = () => (
        <div >
          <Alert style={{width:'30%'}} severity="error">Enter valid card number</Alert>
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
        if (expiry_date.length!==5){
            setErrdate(true);
            valid = false;
        }
        if (temp_number.length!==16 && /^\d+$/.test(temp_number)){
            setErrnumber(true);
            valid = false;
        }
        return valid

    }

    const onSubmit = async(e) => {

        e.preventDefault()

        
        if (validate()){
        
        const userObject = {
            name_on_card: name_on_card,
            card_number: card_number,
            expiry_date:expiry_date,
            balance:0,
            user_id:user_id,
        };

        setOpen(true)

        /*await axios({
            method: 'POST',
            url: `localhost:8000/cards`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: userObject
            })
            .then((res) => {
                if(res.status==201){
                    setOpen(true)
                }
                else if(res.status==400){
                    
                    
                }
            }).catch((error) => {
                console.log(error);
            });
        */
        }

    }

    return(
        <>
        <Grid className={classes.grid} container  spacing={3} style = {{height:"100vh",width:"100vw",margin:"0"}} alignItems="stretch" >
        <Grid className={classes.left} item xs={12} sm={4}>
        <div className={classes.carddiv}>
        <Cards 
          expiry = {expiry_date}
          name = {name_on_card}
          number = {card_number}
          focused = {focus}
        />
        </div>
        </Grid>
        <Grid className={classes.left} item xs={12} sm={8}>
        <form onSubmit={onSubmit}>
        <h1>Enter card details</h1>

        <div className={classes.input}>
            <label className={classes.label} htmlFor="name" >Name on Card</label>
            <TextField className={classes.fields}
                id = "name"
                variant="outlined"
                onChange={(e) => {setName(e.target.value)}}
                onFocus={(e) => {setFocus(e.target.name)}}
                size="small"
                required
            />
        </div>

        <div className={classes.input}>
            <label className={classes.label} htmlFor="card-number" >Card Number</label>
            <TextField className={classes.fields}
                id = "card-number"
                variant="outlined"
                value = {card_number}
                onChange={(e) => {handleCardNumber(e.target.value)}}
                onFocus={(e) => {setFocus(e.target.name)}}
                inputProps={{ maxLength: 19 }}
                size="small"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                required
            />
        </div>
        { errNumber ? <NumberErr /> : null }

        <div className={classes.input}>
            <label className={classes.label} htmlFor="expiry-date" >Expiry-Date</label>
            <TextField className={classes.fields}
                id = "expiry-date"
                variant="outlined"
                value={expiry_date}
                onChange={(e) => {handleExpiry(e.target.value)}}
                onKeyDown={(e) => {handleBackspace(e)}}
                onFocus={(e) => {setFocus(e.target.name)}}
                size="small"
                inputProps={{ maxLength: 5 }}
                placeholder="MM/YY"
                required
            />
        </div>
        { errDate ? <DateErr /> : null }
        
        <div className={classes.buttondiv}>
        <Button className={classes.submitbutton} type="submit" color="primary" variant="contained">Add Card</Button>
        <Link style={{textDecoration:"none",color:"black"}}  to='/cards'><Button  variant="contained" >Cancel</Button></Link>
        </div>
        </form>
        </Grid>
        </Grid>
        <Success open={open}/>
        </>
    )
}

export default AddCard;