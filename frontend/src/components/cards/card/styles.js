import { makeStyles } from '@material-ui/core/styles';
import Bg from '../../../assets/texture2.jpg'
export default makeStyles(() => ({

    card_container: {
       borderRadius: "5px",
       boxShadow: "2px 2px 2px 2px #666666",
       textAlign: "center",
       paddingTop: "10px",
       backgroundColor: "#ffffff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23dddddd' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
    
    },


    paybutton:{
        marginBottom:"10px",
        marginRight: "40px",
        backgroundColor: "#36454F",
        "&:hover":{
            backgroundColor: "#36454F",
            filter: "brightness(90%)",
        }
    },

    trbutton:{
        display:"inline",
        marginBottom:"10px",
        backgroundColor: "#36454F",
        "&:hover":{
            backgroundColor: "#36454F",
            filter: "brightness(90%)",
        }
    },

    buttondiv:{
        marginBottom:"5px"
    },


}));
