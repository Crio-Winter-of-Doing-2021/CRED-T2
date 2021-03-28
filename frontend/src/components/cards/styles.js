import { makeStyles } from '@material-ui/core/styles';
import BgImage from '../../assets/bg2.jpg'
export default makeStyles(() => ({

    main:{
        height:"100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight:"100vh",
        backgroundColor: "#c3cbdc",
        background: "linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)",

    },

    appBar:{
        height: "10%",
        backgroundColor: "rgba(0,0,0,0.9)",
        color:"white",
    },

    container:{
       maxWidth: "98%",
       marginLeft: "10px",
       marginRight:"10px",
       marginTop: "4.8%",
    },

    heading:{
        flex: 1,
    },
    

    backdrop_container:{
        height: "20%",
        width: "50%",
        borderRadius: "5px",
        boxShadow: "2px 2px 2px 2px #cccccc",
        backgroundColor: "white"
    },
    backdrop_text:{
        color:"black"
    },
    backdrop_buttons:{
        display:"flex",
        justifyContent: "space-around"
    },
    nocard_div:{
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },


}));