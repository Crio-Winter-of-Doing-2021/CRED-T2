import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Button, AppBar, Toolbar, useScrollTrigger, Slide, Backdrop, Container} from '@material-ui/core';
import { Link, useHistory, withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './styles';
import CardItem from './card/card';
import UserProfile from '../UserProfile';
import axios from 'axios';


function HideOnScroll(props) {
    const { children } = props;
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
    const token = UserProfile.getToken();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    //const [cards, setCards] = useState([])
    const [cards, setCards] = useState([]);


    useEffect(() => {

        axios
            .get(`http://localhost:8081/cards/${user_id}`,
            {headers: {"token" : `${token}`}}
            )
            
            .then((response) => response.data)
            .then((cardData) => {
                console.log(cardData);
                setCards(cardData.data);
            })
          .catch((error) => console.log(error));
    }, []);
    


    const handleLogout = () => {
        UserProfile.logout();
        history.push('/') ;

    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };



    const CardsGrid = () => (
        <>
        <Grid className={classes.container} container alignItems="stretch" spacing={2}>
        {cards.map((card) => (
            <Grid className={classes.card_item} item key={card.card_id} xs={12} sm={6}>
                <CardItem card={card}/>
            </Grid>
        ))}
        </Grid>
        </>
    )

    const NoCard = () => (
        <>
        <div className={classes.nocard_div}>
            <h1>No cards.</h1>
            <Link style={{textDecoration:"none"}}  to='/addcard'>
                <Button style={{display:"block"}} variant="contained" color="primary" size="large">Add Card</Button>
            </Link>
        </div>
        </>
    )


   
    



    return(
        <>
        <Helmet><title>Cards</title></Helmet>
        <div className={classes.main}>
        <HideOnScroll {...props}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
            <Toolbar>
            <MenuIcon/>
            <h2 className={classes.heading} align="center">
                Welcome {name} !
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
        { cards.length>0 ? <CardsGrid /> : <NoCard />}
        </div>
        </>
    )
}

export default withRouter(Cards);