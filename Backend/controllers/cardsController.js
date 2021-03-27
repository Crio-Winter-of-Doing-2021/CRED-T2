const  pool = require('../db/pool.js');
let{
  empty,isValidCard
} = require( '../helpers/validations');

let {
  errorMessage, successMessage, status,
} =require( '../helpers/status');


const AddCard = async (req, res) => {
  const {card_number,expiry_date,name_on_card}= req.body;
  const {
     user_id,
  } = req.user;
  if (empty(card_number) || empty(expiry_date) || empty(name_on_card)) {
    errorMessage.error = 'Card Number, Expiry Date and Name on Card field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if(!isValidCard(card_number))
  {
    errorMessage.error = 'Please Enter a Valid Card Number';
    return res.status(status.bad).send(errorMessage);
  }
  const AddCardQuery = `INSERT INTO
          cards(card_number,expiry_date,name_on_card,user_id)
          VALUES($1, $2, $3, $4)
          returning *`;
  const values = [
    card_number,
    expiry_date,
    name_on_card,
    user_id,
  ];
  try 
  {
   
      const { rows } = await pool.query(AddCardQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      
      return res.status(status.created).send(successMessage);
  } 
  catch (error) 
  {
      if (error.routine === '_bt_check_unique') 
      {
        errorMessage.error = 'Card Number is taken already';
        return res.status(status.conflict).send(errorMessage);
      }
      errorMessage.error = 'Unable to add card';
      return res.status(status.error).send(errorMessage);
  }
};

const getAllCards = async (req, res) => {
  const { user_id } = req.params;
    const getAllCardsQuery = 'SELECT * FROM cards WHERE user_id = $1';
    try {
      const  {rows} = await pool.query(getAllCardsQuery, [user_id]);
      const dbResponse = rows;
      if (dbResponse[0] === undefined) {
        errorMessage.error = 'You have no cards';
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'An error Occured';
      return res.status(status.error).send(errorMessage.error);
    }
};

const getAllStatements = async (req, res) => {
  const {card_id,year,month}=req.params;
    const getAllStatementsQuery = 'Select  transaction_id, date ,vendor ,credit_debit, amount ,category from transactions where card_id =$1 and year=$2 and month=$3 order by date desc';
    try {
      const { rows } = await pool.query(getAllStatementsQuery, [card_id,year,month]);
      const dbResponse = rows;
      if (dbResponse[0] === undefined) {
        errorMessage.error = 'You have no transactions for given Year and Month';
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'An error Occured';
      return res.status(status.error).send(errorMessage);
    }
};

const PayBill = async (req, res) => {
  const {card_id}=req.params;
  const {amount_to_pay}=req.body;
  const orig_amount_fetchQuery='select balance from cards where card_id=$1';
  try {
    const { rows } = await pool.query(orig_amount_fetchQuery, [card_id]);
    const dbResponse = rows[0];
    const orig_balance=dbResponse.balance;
    if(orig_balance>amount_to_pay)
    {
         new_balance=orig_balance-amount_to_pay;
    }
    else
    {
          new_balance=amount_to_pay-orig_balance;
          new_balance*=-1;
    }
    const rows_=await pool.query('update cards set balance =$1 where card_id=$2  returning *',[new_balance,card_id]);
    const dbReseponseForBalance=rows_.rows[0];
    successMessage.data = dbReseponseForBalance.balance;
    return res.status(status.success).send(successMessage);
  } 
  catch (error) {
    return res.status(status.error).send(error);
  }
};
const AddStatement = async (req, res) => {
  const {card_id,year,month}=req.params;
  const {amount,vendor,credit_debit,date,category}=req.body;
  console.log(req.body);
  if (empty(amount) || empty(vendor) || empty(credit_debit)|| empty(date)) {
    errorMessage.error = 'amount , vendor , credit_debit ,date and category field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  const {rows} = await pool.query('select balance from cards where card_id=$1',[card_id]);
  const dbResponse = rows[0];
  const old_balance=dbResponse.balance;
  console.log("old_balance",typeof(old_balance));
  let new_balance =0;
  if (credit_debit=="credit"){
     new_balance = Number(old_balance)-amount
  }
  else{
     new_balance = Number(old_balance)+amount
  }
  console.log(new_balance);
  const result = await pool.query('update cards set balance =$1 where card_id=$2 returning *',[new_balance,card_id]);



  const AddStatementQuery = 'INSERT INTO transactions(amount,vendor,credit_debit,card_id,date,month,year,category) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
  try {
    const { rows } = await pool.query(AddStatementQuery, [amount,vendor,credit_debit,card_id,date,month,year,category]);
    const dbResponse = rows[0];
    successMessage.data =  dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Unable to add statement';
    return res.status(status.error).send(errorMessage);
  }
};

module.exports ={
  AddCard,
  getAllCards,
  AddStatement,
  getAllStatements,
  PayBill
};
