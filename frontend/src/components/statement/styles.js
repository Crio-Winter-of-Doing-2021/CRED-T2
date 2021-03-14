import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root:{
        '& .MuiContainer-root': {
           padding: 0,
          },
    },
    container:{
        textAlign:"center",
    },
    grid:{
        height: "400px",
        width: "68%",
        margin: "auto"
    },

    form:{
        marginBottom: "20px"
    },

    label:{
        marginRight: "20px"
    },
    select:{
        width: "100px",
        marginRight:"20px"
    },
    fields:{
        width:"100px"
    },
    button:{
        marginLeft: "20px"
    },
    backbutton:{
        margin: "10px 0"
    },


}));