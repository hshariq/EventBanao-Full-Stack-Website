const config = require('./db');
const sql = require('mssql/msnodesqlv8');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.registerAdmin = async (req,res) => {
   const {email,password} = req.body;
   try {
           let pool = await sql.connect(config);
           let validation = pool.request().query('Select * from Admin');
           var bool = false;
           for(let i = 0; i < (await validation).recordset.length;i++){
                if((await validation).recordset[i].adminEmail == email){
                   bool = true;
                }
           }
           if (bool){
               res.send("Email already in use");
           } 
           else {
              bcrypt.hash(password, 10, function(err, hash) {
              let users = pool.request()
             .input('adminEmail', email)
             .input('adminPassword', hash)
             .query('INSERT INTO Admin (adminEmail, adminPassword) VALUES (@adminEmail, @adminPassword)');

                 res.send("Successfully inserted");
              });
          }
       } 
       catch(error){
            res.send(error);
       }
}

exports.loginAdmin = async (req,res) => {
   const {email,password} = req.body;

   if (!((email)&&(password))){
       res.send("Email or password is missing")
   }
   else {
      try {
         let pool = await sql.connect(config);
         let logininfo = pool.request()
        .input('adminEmail', email)
        .query('SELECT * FROM admin WHERE adminEmail = @adminEmail');

         if ((await logininfo).recordset.length == 0){
            res.send("Email entered is incorrect");
         }
         else {
                 let hashedpassword = (await logininfo).recordset[0].adminPassword
                 let id = (await logininfo).recordset[0].adminID;
                 console.log(id);
                 bcrypt.compare(password,hashedpassword, function(err, result) {
                 if (result) {
                     let token = jwt.sign({"id":id,"email":email,"password": hashedpassword,"userType": "admin"},process.env.ACCESS_SECRET_TOKEN)
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

exports.deleteAdmin = async (req,res) => {
  const id = req.params.id
  let pool = await sql.connect(config);
  //let users = pool.request().query(`Select * from users where userID = ${id}`);
  const request = pool.request();
  const query = 'SELECT * FROM admin WHERE adminID = @adminID';
  request.input('adminID', sql.Int, id);
  const users = await request.query(query);

  if ((await users).recordset[0]){
      //let deletion = sql.query(`Delete from users where userID = ${id}`);
      const request = pool.request();
      const query = 'DELETE FROM admin WHERE adminID = @adminID';
      request.input('adminID', sql.Int, id);
      const users = await request.query(query);
      res.send("Successfully deleted user");
  }
  else {
      res.status(404).send("ID not found")
  }
}

// exports.registerAdmin = async (req,res) => {
//     const {email,password} = req.body;
//     try {
//             let pool = await sql.connect(config);
//             let validation = pool.request().query('Select * from Admin');
//             var bool = false;
//             for(let i = 0; i < (await validation).recordset.length;i++){
//                  if((await validation).recordset[i].adminEmail == email){
//                     bool = true;
//                  }
//             }
//             if (bool){
//                 res.send("Email already in use");
//             } 
//             else {
//                bcrypt.hash(password, 10, function(err, hash) {
//                   let users = pool.request().query(`insert into Admin values ('${email}','${hash}')`);
//                   res.send("Successfully inserted");
//                });
//            }
//         } 
//         catch(error){
//              res.send(error);
//         }
// }

// exports.loginAdmin = async (req,res) => {
//     const {email,password} = req.body;

//     if (!((email)&&(password))){
//         res.send("Email or password is missing")
//     }
//     else {
//        try {
//           let pool = await sql.connect(config);
//           let logininfo = pool.request().query(`select * from admin where adminEmail = '${email}'`);
//           if ((await logininfo).recordset.length == 0){
//              res.send("Email entered is incorrect");
//           }
//           else {
//                   let hashedpassword = (await logininfo).recordset[0].adminPassword
//                   bcrypt.compare(password,hashedpassword, function(err, result) {
//                   if (result) {
//                       let token = jwt.sign({"email":email,"password": hashedpassword,"userType": "admin"},process.env.ACCESS_SECRET_TOKEN)
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

// exports.deleteAdmin = async (req,res) => {
//     const id = req.params.id
//     let pool = await sql.connect(config);
//     let deletion = pool.request().query(`Delete from Admin where adminID = ${id}`);
//     res.send("Successfully deleted user")
// }

