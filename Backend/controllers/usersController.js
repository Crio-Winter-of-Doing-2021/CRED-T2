const  pool = require('../db/pool');
 let {
   hashPassword,
   comparePassword,
   isValidEmail,
   validatePassword,
   isValidMobile,
   generateUserToken,
   empty
 } = require('../helpers/validations');
 
 let {
   errorMessage, successMessage, status,
 } =require('../helpers/status');
 
const createUser = async (req, res) => {
  const {
    email, name,password,mobile
  } = req.body;
  if (empty(email) || empty(name) || empty(mobile) ||empty(password)) {
    errorMessage.error = 'Email, password,  name and mobile field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }
  if (!validatePassword(password)) {
    errorMessage.error = 'Password must be more than seven(7) characters';
    return res.status(status.bad).send(errorMessage);
  }
  if(!isValidMobile(mobile))
  {
    errorMessage.error='Mobile number must be of 10 digits';
    return res.status(status.bad).send(errorMessage);
  }

  const hashedPassword = hashPassword(password);
  const createUserQuery = 'INSERT INTO users(email, name,password,mobile) VALUES($1, $2, $3, $4) returning *';
  const values = [
    email,
    name,
    hashedPassword,
    mobile
  ];
  try {
    const { rows } = await pool.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    const token = generateUserToken(dbResponse.email, dbResponse.user_id,dbResponse.name, dbResponse.mobile);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.created).send(successMessage);
  } 
  catch (error) 
  {
    if (error.routine === '_bt_check_unique') 
    {
      errorMessage.error = 'User with that EMAIL already exist';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const siginUser = async (req, res) => {
  const { email, password } = req.body;
  if (empty(email) || empty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const signinUserQuery = `SELECT * FROM users WHERE email = $1`;
  try 
  {
    const { rows } = await pool.query(signinUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided is incorrect';
      return res.status(status.bad).send(errorMessage);
    }
    const token = generateUserToken(dbResponse.email, dbResponse.user_id, dbResponse.name, dbResponse.mobile);
    delete dbResponse.password;
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } 
  catch (error)
  {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

module.exports=
 { 
    createUser,
    siginUser
 };