import { darken, makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/home-card.jpg'
export default makeStyles(() => ({
    grid:{
    },
    heading:{
        color: "white",
        position: "relative",
        textAlign:"center",
        top: "20%",
        width:"60%"
    },

    left:{
        display: "block",
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        
    },
    right:{
        textAlign: "center",
        borderLeft: "1px solid black",
        backgroundColor:"whitesmoke"
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

    fields:{
        margin:"20px 0"
    },
    eyeicon:{
        position:"absolute",
        marginTop:"27px",
        marginLeft:"-27px",
        color:"grey",
        cursor:"pointer"
    },

    createbutton:{
        fontWeight: "bold",
        backgroundColor: "#fe921f",
        "&:hover":{
            backgroundColor: "#fe921f",
            filter: "brightness(90%)",
        }
    },
    
}));