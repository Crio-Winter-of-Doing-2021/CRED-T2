import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/bg2.svg'
export default makeStyles(() => ({

    main:{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height:"100vh"
    },
    paper_container:{
        display: "block",
        width: "95%",
        margin:"0 auto",
        
    },
    heading:{
        paddingTop:"20px"
    },
    paper:{
        textAlign:"center",
        backgroundColor:"#FAF9F6",
        height:"95vh"
        
    },

    grid:{
        height: "400px",
        width: "68%",
        margin: "auto"
    },

    form:{
        marginBottom: "20px"
    },

    notrans_div:{
       height:"65.5vh",
    },

    notrans:{
        position:"absolute",
        top:"40%",
        left:"40%"
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