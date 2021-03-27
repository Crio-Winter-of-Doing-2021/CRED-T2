const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validatePassword = (password) => {
  if (password.length <= 7 || password === '') {
    return false;
  } return true;
};
const isValidCard= (card_number)=>{
     totalsum=0;
     i=0;
    for(let i=0;i<16;i++)
    {
        if(i%2==0)
        {
            num=2;
        }
        else
        num=1;
         let sum=0;
         sum =num*(card_number[i]-'0');
        if(sum>=10)
        {
            if(sum==10) totalsum+=1;
            else if(sum==11) totalsum+=2;
            else if(sum==12) totalsum+=3;
            else if(sum==13) totalsum+=4;
            else if(sum==14) totalsum+=5;
            else if(sum==15) totalsum+=6;
            else if(sum==16) totalsum+=7;
            else if(sum==17) totalsum+=8;
            else totalsum+=9;
        }
        else
        {
            totalsum+=sum;
        }
    }
    return totalsum%10==0;
};
const isValidMobile= (mobile)=>{
  if(mobile.length<=9 || mobile==='')
  {
    return false;
  }
  return true;
}
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  return false;
};

const generateUserToken = (email, id, name,mobile) => {
  const token = jwt.sign({
    email,
    user_id: id,
    name,
    mobile
  },
  "secret", { expiresIn: '3d' });
  return token;
};

module.exports={hashPassword,comparePassword,isValidEmail,validatePassword,generateUserToken,empty,isValidMobile,isValidCard};