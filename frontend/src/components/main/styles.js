import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/home-card.jpg'
export default makeStyles(() => ({
    grid:{
    },
    left:{
        display: "block",
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        
    },
    right:{
        textAlign: "center",
        borderLeft: "1px solid black"
    },

    loginbutton:{
        marginTop: "10px",
        marginBottom: "30px",
    },


    label:{
        fontSize: "1.3rem",
        color: "black",
        margin: "5px 0",
        display: "block",
    },

}));