import React from 'react';
import Cards from 'react-credit-cards';
import { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import useStyles from './styles';
import { Container, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
const CardItem = ({card}) => {
    const classes = useStyles();

    return(
        <>
        <Container className={classes.card_container}>
        
        <Cards
          expiry={card.expiry_date}
          name={card.name_on_card}
          number={card.card_number}
        />

        {card.balance==0 ? <h3>Fully Paid</h3> : <div><h3 style={{color:"black"}}>Due - {card.balance}</h3></div>}

        <Link style={{textDecoration:"none",display:card.balance>0 ? "inline" : "none"}} 
        to={{ pathname: '/pay', state: { balance: card.balance , card_number: card.card_number, id: card.card_id} }}>
          <Button className={classes.paybutton} color="primary" variant="contained" >Pay Bill</Button> 
        </Link>

        <Link style={{textDecoration:"none"}} 
        to={{ pathname: '/statement', state: { id: card.card_id} }}>
          <Button className={classes.trbutton}  color="primary" variant="contained">Show transactions</Button>
        </Link>
        </Container>
        </>
    )
}

export default CardItem;
