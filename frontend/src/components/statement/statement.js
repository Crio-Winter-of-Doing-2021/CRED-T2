import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { Container, Button, Select, MenuItem, TextField } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const Statement = (props) =>{
    const classes = useStyles();
    const [id,setCardID] = useState(props.location.state.id);
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
    //const [transactions, setTransactions] = useState([]);
    //GET /cards/{id}/statements/{year}/{month}
    const tempdata = [
        {
            id: "1",
            tr_id: "1",
            amount: 101212,
            date: "10/12/2021",
            credit_debit: "Credit",
            vendor: "Amazon",
            category: "Food"
        },
        {
            id: "2",
            tr_id: "1",
            amount: 101212,
            date: "10/12/2021",
            credit_debit: "Credit",
            vendor: "Amazon",
            category: "Food"
        },
        {
            id: "3",
            tr_id: "2",
            amount: 101212,
            date: "10/12/2021",
            credit_debit: "Credit",
            vendor: "Amazon",
            category: "Food"
        },
        {
            id: "4",
            tr_id: "9",
            amount: 101212,
            date: "10/12/2021",
            credit_debit: "Credit",
            vendor: "Amazon",
            category: "Food"
        },
        {
            id: "5",
            tr_id: "8",
            amount: 101212,
            date: "10/12/2021",
            credit_debit: "Credit",
            vendor: "Amazon",
            category: "Misc"
        },
        {
            id: "6",
            tr_id: "6",
            amount: 101212,
            date: "10/12/2021",
            credit_debit: "Credit",
            vendor: "Amazon",
            category: "Food"
        },
        {

            id: "7",
            tr_id: "5",
            amount: 101212,
            date: "10/12/2021",
            credit_debit: "Credit",
            vendor: "Amazon",
            category: "Food"
        },
        {
            id: "8",
            tr_id: "3",
            amount: 101212,
            date: "10/12/2021",
            credit_debit: "Credit",
            vendor: "Flipkart",
            category: "Food"
        },

    ]
    const [transactions, setTransactions] = useState(tempdata);

    /*useEffect(() => {

        axios
            .get('localhost:8000/cards/${id}/statements/${year}/${month}')
            .then((response) => response.data)
            .then((transactionsData) => {
                console.log(cardData);
                setTransactions(transactionsData);
            })
          .catch((error) => console.log(error));
    }, []);
    */


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
                .get('localhost:8000/cards/${id}/statements/${newyear}/${newmonth}')
                .then((response) => response.data)
                .then((transactionsData) => {
                    console.log(transactionsData);
                    setTransactions(transactionsData);
                })
            .catch((error) => console.log(error));

            setMonth(newmonth);
            setYear(newyear)
        }
        else{
            setFilterErr(true)
        }
    }
        



    return (
        <>
        <Container className={`${classes.root} ${classes.container}`}>
        <h1>Statement</h1>
        <h3> Transactions in {month_names[month-1]} {year}</h3>
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

        { filter_err ? <p style={{color:"red"}}>Enter valid month and year</p> : null }
        
        <div className={classes.grid}>
        <DataGrid
        page={page}
        onPageChange={(params) => {
          setPage(params.page);
        }}
        pageSize={5}
        pagination
        columns = {[{ field: 'date', headerName: 'Date', width: 150}, 
        { field: 'vendor', headerName: 'Vendor', width: 200 }, 
        { field: 'credit_debit', headerName: 'Credit/Debit', width: 150 }, 
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 }]}
        rows = {transactions}
        />
        </div>
        <div>
        <Link style={{textDecoration:"none",color:"black"}}  to='/cards'>
            <Button  className={classes.backbutton} variant="contained" color="secondary" size="small">Back</Button>
            </Link>
        </div>
        </Container>
        </>
    )
}

export default Statement;