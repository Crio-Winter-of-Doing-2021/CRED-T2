import { makeStyles } from '@material-ui/core/styles';
import BgImage from '../../assets/bg4.jpg'
export default makeStyles(() => ({


    main:{
        display:"block",
        height:"100vh",
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        
    },

    paper:{

        width:"50vw",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        backgroundColor:"#FAF9F6"
        
    },

    carddiv:{
        marginTop: "15px"
    },

    form:{
        textAlign:"center"
    },

    label:{
        fontSize: "1.3rem",
        color: "black",
        marginRight: "20px",

    },

    input:{
        margin:"20px 0",
    },

    buttondiv:{
        margin:"20px 0"
    },

    submitbutton:{
        marginTop: "10px",
        width: "80%",
        backgroundColor: "#36454F",
        "&:hover":{
            backgroundColor: "#36454F",
            filter: "brightness(90%)",
        }
    },

    dialog:{
        textAlign:"center",
    }




}));