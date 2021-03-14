import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({

    appBar:{
        height: "10%"
    },

    container:{
       maxWidth: "98%",
       marginLeft: "10px",
       marginTop: "5%",
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
    backdrop_buttons:{
        display:"flex",
        justifyContent: "space-around"
    },


}));