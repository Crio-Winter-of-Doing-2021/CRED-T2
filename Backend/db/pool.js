const Pool =require("pg").Pool;
const pool =new Pool({
    user: "postgres",
    password: "qwer123!@#G",
    database: "cred",
    host:"localhost",
    port:5432
});
module.exports=pool;