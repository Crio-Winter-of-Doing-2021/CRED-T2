import React from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { Container, Button, Select, MenuItem, TextField, Paper } from '@material-ui/core';
import Image from '../../assets/no_trans.png'
import { DataGrid } from '@material-ui/data-grid';
import UserProfile from '../UserProfile';

const Statement = (props) =>{
    const classes = useStyles();
    const [id,setCardID] = useState(props.location.state.id);
    const [noTrans, setNoTrans] = useState(false)
    const token = UserProfile.getToken();
    const [page,setPage] = useState(0);
    const curdate = new Date();
    let curmonth = (curdate.getMonth())+1;
    if (curmonth<10){
        curmonth = '0'+curmonth;
    }
    else{
        curmonth = curmonth.toString();
    }
    const curyear = curdate.getFullYear().toString();
    const [month,setMonth] = useState(curmonth);
    const [year,setYear] = useState(curyear);
    const [newmonth,setNewMonth] = useState('');
    const [newyear,setNewYear] = useState('');
    const [filter_err,setFilterErr] = useState(false);
    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        axios
            .get(`http://localhost:8081/cards/${id}/statements/${year}/${month}`,
                {headers:{"token":`${token}`}}
            )
            .then((response) => response.data)
            .then((transactionsData) => {
                console.log(transactionsData);
                setTransactions(transactionsData.data);
                setNoTrans(false);
            })
          .catch((error) => {
            if(error.response.status===404){
                setTransactions([]);
                setNoTrans(true);
            }              
          });
    }, []);


    const No_Transactions = () => (
        <>
            <div className={classes.notrans_div}>
                <div className={classes.notrans}>
                <div className={classes.imgdiv}>
                <img src={Image} height="100px"/>
                </div>
                <h3>No transactions</h3>
                <h5>Couldn't fetch any transactions for this month</h5>
                </div>
            </div>
        </>
        )
    
    


    const Validate = () => {
        let valid = true;
        if ((newyear>curyear) || (newmonth>curmonth && newyear===curyear)){
            valid = false
        }
        return valid;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (Validate()){
            setFilterErr(false)
            axios
                .get(`http://localhost:8081/cards/${id}/statements/${newyear}/${newmonth}`,
                {headers:{"token":`${token}`}}
                
                )
                .then((response) => response.data)
                .then((transactionsData) => {
                    console.log(transactionsData);
                    setTransactions(transactionsData.data);
                    setNoTrans(false);
                })
            .catch((error) => {
                if(error.response.status===404){
                    setTransactions([]);
                    setNoTrans(true);
                }
            });

            setMonth(newmonth);
            setYear(newyear)
        }
        else{
            setFilterErr(true)
        }
    }
        



    return (
        <>
        <div className={classes.main}>
        <div className={classes.paper_container}>
        <Paper className={classes.paper}>
        <h2 className={classes.heading}> Transactions in {month_names[month-1]} {year}</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label} htmlFor="select_month" >Month</label>
        <Select
          className={classes.select} 
          id="select_month"
          onChange={(e) => {setNewMonth(e.target.value)}}
          placeholder="Month"
          required
        >
          <MenuItem value={"01"}>January</MenuItem>
          <MenuItem value={"02"}>February</MenuItem>
          <MenuItem value={"03"}>March</MenuItem>
          <MenuItem value={"04"}>April</MenuItem>
          <MenuItem value={"05"}>May</MenuItem>
          <MenuItem value={"06"}>June</MenuItem>
          <MenuItem value={"07"}>July</MenuItem>
          <MenuItem value={"08"}>August</MenuItem>
          <MenuItem value={"09"}>September</MenuItem>
          <MenuItem value={"10"}>October</MenuItem>
          <MenuItem value={"11"}>November</MenuItem>
          <MenuItem value={"12"}>December</MenuItem>
        </Select>
        <label className={classes.label} htmlFor="year" >Year</label>
        <TextField className={classes.fields}
                id = "year"
                variant="outlined"
                onChange={(e) => {setNewYear(e.target.value)}}
                inputProps={{ maxLength: 4 }}
                size="small"
                placeholder="Year"
                required
        />
         <Button className={classes.button} type="submit" color="primary" size="small" variant="contained">Search</Button>
        </form>

        { filter_err ? <p style={{color:"red", margin:"0"}}>Enter valid month and year</p> : null }
        
        <div className={classes.grid} style={{display: noTrans ? "none" : "block" }}>
        <DataGrid
        page={page}
        onPageChange={(params) => {
          setPage(params.page);
        }}
        pageSize={5}
        pagination
        getRowId = {(row) => row.transaction_id}
        columns = {[{ field: 'date', headerName: 'Date', width: 150}, 
        { field: 'vendor', headerName: 'Vendor', width: 200 }, 
        { field: 'credit_debit', headerName: 'Credit/Debit', width: 150 }, 
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 }]}
        rows = {transactions}
        />
        </div>

        {noTrans ? <No_Transactions/> : null }
        <div>
        <Link style={{textDecoration:"none",color:"black"}}  to='/cards'>
            <Button  className={classes.backbutton} style={{ margin: filter_err ? "0" : "10px 0"  }} variant="contained"  size="small">Back</Button>
            </Link>
        </div>
        
        </Paper>
        </div>
        </div>
        </>
    )
}

export default Statement;