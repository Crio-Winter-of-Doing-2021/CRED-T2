import React from 'react';
import useStyles from './styles';
import { useState } from 'react';
import { Container, Button, TextField, Dialog, DialogTitle } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pay = (props) => {
    const classes = useStyles();
    const [card_id,setCardID] = useState(props.location.state.id);
    const [card_number,setCardNumber] = useState(props.location.state.card_number);
    const [balance,setBalance] = useState(props.location.state.balance);
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const Success = () => (
        <Dialog className={classes.dialog} open={open}>
            <DialogTitle ><CheckCircleOutlineIcon style={{color:"green",fontSize:"100px"}}/> <br/>
            Success!
            </DialogTitle>
            <Link to='/cards' style={{textDecoration:"none",color:"white"}}><Button style={{width:"100%"}} variant="contained" color="primary">Okay</Button></Link>
        </Dialog>
    )

    const Invalid = () => (
        <div >
          <Alert style={{width:'40%',margin:'auto'}} severity="error">Enter valid amount</Alert>
        </div>
      )

    const handlePay = (e) =>{
        e.preventDefault();
        if (amount>0 && amount<= balance){

            const userObject = {
            amount:amount,
            };

            setOpen(true);

            /*await axios({
            method: 'POST',
            url: `localhost:8000/cards/${id}/pay`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: userObject
            })
            .then((res) => {
                if(res.status==200){
                    setOpen(true)
                }
                else if(res.status==400){
                    
                    
                }
            }).catch((error) => {
                console.log(error);
            });
        */

        }
        else{
            setInvalid(true);
        }
    }



    return(
        <>
        <Container className={classes.container}>
        <h1>Balance - &#8377; {balance}</h1>
        <h2>Amount you want to pay -</h2>
        <form onSubmit={handlePay}>
        <div className={classes.input}>
            <label className={classes.label} htmlFor="amount" >&#8377;</label>
            <TextField className={classes.fields}
                id = "amount"
                variant="outlined"
                size="small"
                onChange={(e) => {setAmount(e.target.value)}}
                required
            />
        </div>
        { invalid ? <Invalid /> : null }
        <div  className={classes.buttondiv} >
        <Button className={classes.button} type="submit" color="primary" variant="contained" >Pay</Button>
        <Link style={{textDecoration:"none",color:"black"}}  to='/cards'><Button  variant="contained" >Cancel</Button></Link>
        </div>
        </form>
        <Success open={open}/>
        </Container>
        </>
    )
}

export default Pay;