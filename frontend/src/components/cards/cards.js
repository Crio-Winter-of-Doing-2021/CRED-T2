import React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Button, AppBar, Toolbar, useScrollTrigger, Slide, Backdrop, Container} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import useStyles from './styles';
import CardItem from './card/card';
import UserProfile from '../UserProfile';
import axios from 'axios';


function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger()
    return (
        <Slide appear={false} direction="down" in={!trigger}>
          {children}
        </Slide>
      );
}

const Cards = (props) => {
    const classes = useStyles();
    const user_id = UserProfile.getId();
    const name = UserProfile.getName();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    //const [cards, setCards] = useState([])

        const tempdata = [
            {
                card_id: "1",
                card_number: "4742745237856401",
                name_on_card: "John",
                balance: 30000,
                expiry_date: "12/21",
                user_id: "1"

            },
            {
                card_id: "2",
                card_number: "2720992863512318",
                name_on_card: "John",
                balance: 50000,
                expiry_date: "05/26",
                user_id: "1"

            },
            {
                card_id: "3",
                card_number: "347846914509953",
                name_on_card: "John",
                balance: 10000,
                expiry_date: "08/23",
                user_id: "1"

            },
            {
                card_id: "4",
                card_number: "347846914509953",
                name_on_card: "John",
                balance: 10000,
                expiry_date: "08/23",
                user_id: "1"

            },
            {
                card_id: "5",
                card_number: "347846914509953",
                name_on_card: "John",
                balance: 10000,
                expiry_date: "08/23",
                user_id: "1"

            },
            {
                card_id: "6",
                card_number: "347846914509953",
                name_on_card: "John",
                balance: 10000,
                expiry_date: "08/23",
                user_id: "1"

            },
            {
                card_id: "7",
                card_number: "347846914509953",
                name_on_card: "John",
                balance: 10000,
                expiry_date: "08/23",
                user_id: "1"

            }
        ]
        const [cards, setCards] = useState(tempdata);


    /*useEffect(() => {

        axios
            .get('localhost:8000/cards')
            .then((response) => response.data)
            .then((cardData) => {
                console.log(cardData);
                setCards(cardData);
            })
          .catch((error) => console.log(error));
    }, []);
    */


    const handleLogout = () => {
        UserProfile.setName('');
        UserProfile.setId('');
        history.push('/') ;

    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };
    



    return(
        <>
        <HideOnScroll {...props}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
            <Toolbar>
            <h2 className={classes.heading} align="center">
                Welcome {name}
            </h2>
            <Link style={{textDecoration:"none"}}  to='/addcard'>
                <Button className={classes.addButton} variant="contained" color="primary" size="small">Add Card</Button>
            </Link>
            <Button className={classes.addButton} variant="contained" size="small" style={{marginLeft:"10px"}} onClick={handleToggle}>
                Logout</Button>
            <Backdrop  open={open} onClick={handleClose} style={{textAlign: "center"}}>
                <Container className={classes.backdrop_container}>
                <h2 className={classes.backdrop_text}>Are you sure you want to logout?</h2>
                <div className={classes.backdrop_buttons}>
                <Button onClick={handleLogout} variant="contained" color="primary">Logout</Button>
                <Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
                </div>
                </Container>
            </Backdrop>
            </Toolbar>
        </AppBar>
        </HideOnScroll>

        <Grid className={classes.container} container alignItems="stretch" spacing={2}>
        {cards.map((card) => (
            <Grid className={classes.card_item} item key={card.card_id} xs={12} sm={6}>
                <CardItem card={card}/>
            </Grid>
        ))}
        </Grid>
        </>
    )
}

export default Cards;