const config = require('./db');
const sql = require('mssql/msnodesqlv8');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.getUsers = async(req,res) => {
    try {
        let pool = await sql.connect(config);
        const request = pool.request();
        const query = 'SELECT * FROM users';
        const result = await request.query(query);
        res.send((await result).recordset);
    }
    catch(error) {
        console.log("not connected");
    }
}

exports.registerUser = async(req,res) => {
    const {name,password,cnic,birthdate,email} = req.body;
    try {
            let pool = await sql.connect(config);
            const request = pool.request();
            const query = 'SELECT * FROM users';
            const validation = await request.query(query);
            var bool = false;
            for(let i = 0; i < (await validation).recordset.length;i++){
                 if((await validation).recordset[i].email == email){
                    bool = true;
                 }
            }
            if (bool){
                res.send("Email already in use");
            } 
            else {
                  bcrypt.hash(password, 10, function(err, hash) {
                  //let users = poolrequest().query(`insert into users values ('${name}','${hash}',${cnic},'${birthdate}','${email}')`);
                  const request = pool.request();
                  const query = 'INSERT INTO users (name, password, cnic, birthdate, email) VALUES (@name, @password, @cnic, @birthdate, @email)';
                  request.input('name', sql.NVarChar, name);
                  request.input('password', sql.NVarChar, hash);
                  request.input('cnic', sql.Int, cnic);
                  request.input('birthdate', sql.NVarChar, birthdate);
                  request.input('email', sql.NVarChar, email);
                  const result = request.query(query);
                  res.send("Successfully inserted");
               });
           }
    }
    catch(error) {
        console.log(error);
    }
}

exports.loginUser = async(req,res) => {

    const {email,password} = req.body;
    console.log('hello bhai');

    if (!((email)&&(password))){
        res.send("Email or password is missing")
    }
    else {
       try {
          let pool = await sql.connect(config);
         //let logininfo = pool.request().query(`select * from users where email = '${email}'`);
          const request = pool.request();
          const query = 'SELECT * FROM users WHERE email = @email';
          request.input('email', sql.NVarChar, email);
          const logininfo = await request.query(query);
          
          if ((await logininfo).recordset.length == 0){
             res.send("Email or password incorrect");
          }
          else {
                  let id = (await logininfo).recordset[0].userID;
                  let hashedpassword = (await logininfo).recordset[0].password
                  bcrypt.compare(password,hashedpassword, function(err, result) {
                  if (result) {
                      let token = jwt.sign({"id":id,"email":email,"password": hashedpassword,"userType": "user"},process.env.ACCESS_SECRET_TOKEN)
                      res.send(token);
                  }
                 else{
                    res.send("Email or password incorrect");
                 }
          }); 
        }
    }
       catch(error) {
          console.log(error);
        }
   }
}

exports.deleteUser = async(req,res) => {
    const id = req.params.id
    let pool = await sql.connect(config);
    //let users = pool.request().query(`Select * from users where userID = ${id}`);
    const request = pool.request();
    const query = 'SELECT * FROM users WHERE userID = @userID';
    request.input('userID', sql.Int, id);
    const users = await request.query(query);

    if ((await users).recordset[0]){
        //let deletion = sql.query(`Delete from users where userID = ${id}`);
        const request = pool.request();
        const query = 'DELETE FROM users WHERE userID = @userID';
        request.input('userID', sql.Int, id);
        const users = await request.query(query);
        res.send("Successfully deleted user");
    }
    else {
        res.status(404).send("ID not found")
    }
   
}



// exports.getUsers = async(req,res) => { //chalane ke liye have to admin login    
//     try {
//         let pool = await sql.connect(config);
//         let users = pool.request().query('Select * from users');
//         res.send((await users).recordset);
//     }
//     catch(error) {
//         console.log("not connected");
//     }
// }

// exports.registerUser = async(req,res) => {
//     const {name,password,cnic,birthdate,email} = req.body;
//     try {
//             let pool = await sql.connect(config);
//             let validation = pool.request().query('Select * from users');
//             console.log((await validation).recordset);
//             var bool = false;
//             for(let i = 0; i < (await validation).recordset.length;i++){
//                  if((await validation).recordset[i].email == email){
//                     bool = true;
//                  }
//             }
//             if (bool){
//                 res.send("Email already in use");
//             } 
//             else {
//                bcrypt.hash(password, 10, function(err, hash) {
//                   let users = pool.request().query(`insert into users values ('${name}','${hash}',${cnic},'${birthdate}','${email}')`);
//                   res.send("Successfully inserted");
//                });
//            }
//     }
//     catch(error) {
//         console.log(error);
//     }
// }

// exports.loginUser = async(req,res) => {

//     const {email,password} = req.body;

//     if (!((email)&&(password))){
//         res.send("Email or password is missing")
//     }
//     else {
//        try {
//           let pool = await sql.connect(config);
//           let logininfo = pool.request().query(`select * from users where email = '${email}'`);
//           if ((await logininfo).recordset.length == 0){
//              res.send("Email entered is incorrect");
//           }
//           else {
//                   let hashedpassword = (await logininfo).recordset[0].password
//                   bcrypt.compare(password,hashedpassword, function(err, result) {
//                   if (result) {
//                       let token = jwt.sign({"email":email,"password": hashedpassword,"userType": "user"},process.env.ACCESS_SECRET_TOKEN)
//                       res.send(token);
//                   }
//                  else{
//                     res.send("Email or password incorrect");
//                  }
//           }); 
//         }
//     }
//        catch(error) {
//           console.log(error);
//         }
//    }
// }




