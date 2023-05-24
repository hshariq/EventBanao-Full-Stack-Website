const config = require('./db');
const sql = require('mssql/msnodesqlv8');
const bcrypt = require("bcrypt");
require("dotenv").config()
const jwt = require("jsonwebtoken");

exports.getLandlords = async(req,res) => {
    try {
        let pool = await sql.connect(config);
        const request = pool.request();
        const query = 'SELECT * FROM landlord';
        const students = await request.query(query);
        res.send((await students).recordset);
    }
    catch(error) {
        console.log("not connected");
    }
}

exports.getStars = async(req,res) => {
    const authheader = req.headers['authorization'];
    const token = authheader.split(' ')[1];
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
    try {
        let pool = await sql.connect(config);
        const request = pool.request();
        const query = "SELECT Reviews.locationID,locationName, stars FROM landlord INNER JOIN Location ON landlord.landlordID = Location.landlordID INNER JOIN Reviews ON Location.locationID = Reviews.locationID WHERE Landlord.email= @email"
        request.input('email', sql.NVarChar,`${decoded.email}`);
        const stars = await request.query(query);
        res.send((await stars).recordset);
    }
    catch(error) {
        console.log("not connected");
    }
}

exports.getArch = async(req,res) => {
    const authheader = req.headers['authorization'];
    const token = authheader.split(' ')[1];
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
    try {
        let pool = await sql.connect(config);
        const request = pool.request();
        const query = "SELECT COUNT(*) AS COUNT FROM landlord INNER JOIN Location ON landlord.landlordID = Location.landlordID WHERE Landlord.email = @email AND Location.Archived = 1;"
        request.input('email', sql.NVarChar,`${decoded.email}`);
        const arch = await request.query(query);
        res.send((await arch).recordset[0]);
    }
    catch(error) {
        console.log("not connected");
    }
}

exports.getTotal = async(req,res) => {
    const authheader = req.headers['authorization'];
    const token = authheader.split(' ')[1];
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
    try {
        let pool = await sql.connect(config);
        const request = pool.request();
        const query = "SELECT COUNT(*) AS COUNT FROM landlord INNER JOIN Location ON landlord.landlordID = Location.landlordID WHERE Landlord.email = @email;"
        request.input('email', sql.NVarChar,`${decoded.email}`);
        const stars = await request.query(query);
        res.send((await stars).recordset[0]);
    }
    catch(error) {
        console.log("not connected");
    }
}

exports.getAvgReviews = async(req,res) => {
    const authheader = req.headers['authorization'];
    const token = authheader.split(' ')[1];
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
    try {
        let pool = await sql.connect(config);
        const request = pool.request();
        const query = "SELECT AVG(Reviews.stars) AS AVG FROM landlord INNER JOIN Location ON landlord.landlordID = Location.landlordID INNER JOIN Reviews ON Location.locationID = Reviews.locationID WHERE Landlord.email= @email;"
        request.input('email', sql.NVarChar,`${decoded.email}`);
        const arch = await request.query(query);
        res.send((await arch).recordset[0]);
    }
    catch(error) {
        console.log("not connected");
    }
}

exports.registerLandlord = async(req,res) => {
    const {name,password,cnic,email} = req.body;
    try {
            let pool = await sql.connect(config);
            const request = pool.request();
            const query = 'SELECT * FROM landlord';
            const validation = await request.query(query);
            console.log(validation.recordset);
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
                const request = pool.request();
                const query = 'INSERT INTO landlord (name, password, cnic, email) VALUES (@name, @password, @cnic, @email)';
                request.input('name', sql.NVarChar, name);
                request.input('password', sql.NVarChar, hash);
                request.input('cnic', sql.BigInt, cnic);
                request.input('email', sql.NVarChar, email);
                const result = request.query(query);
                if (result){
                    res.send("Successfully inserted");
                }
                else{
                    res.status(404).send("error");
                }
               
               });
           }
    }
    catch(error) {
        console.log(error);
    }
}

exports.getLandlordByLocation = async (req,res) => {
    const id = req.params.id
    try {
    let pool = await sql.connect(config);
    const request = pool.request();
    const query = 'Select landlordID from Location where locationID = @locationID';
    request.input('locationID', sql.Int, id);
    const users = await request.query(query);
    console.log(users.recordset[0].landlordID);
    const newquery = 'Select name,cnic from Landlord where landlordID = @landlordID';
    request.input('landlordID', sql.Int, users.recordset[0].landlordID);
    const landlordinfo = await request.query(newquery);
    res.send(landlordinfo.recordset[0]);
    } catch(error){
        res.status(404).send(error);
    }

}
exports.loginLandlord = async(req,res) => {
    const {email,password} = req.body;

    if (!((email)&&(password))){
        res.send("Email or password is missing")
    }
    else {
       try {
          let pool = await sql.connect(config);
          const request = pool.request();
          const query = 'SELECT * FROM landlord WHERE email = @email';
          request.input('email', sql.NVarChar, email);
          const logininfo = await request.query(query);
          if ((await logininfo).recordset.length == 0){
             res.send("Email or password incorrect");
          }
          else {
                  let id = (await logininfo).recordset[0].landlordID;
                  console.log(id);
                  const hashedpassword = (await logininfo).recordset[0].password
                  bcrypt.compare(password,hashedpassword, function(err, result) {
                  if (result) {
                      let token = jwt.sign({"id": id,"email":email,"password": hashedpassword,"userType": "landlord"},process.env.ACCESS_SECRET_TOKEN)
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

exports.deleteLandlord = async(req,res) => {
    const id = req.params.id
    let pool = await sql.connect(config);
    //let users = pool.request().query(`Select * from users where userID = ${id}`);
    const request = pool.request();
    const query = 'SELECT * FROM landlord WHERE landlordID = @landlordID';
    request.input('landlordID', sql.Int, id);
    const users = await request.query(query);

    if ((await users).recordset[0]){
        //let deletion = sql.query(`Delete from users where userID = ${id}`);
        const request = pool.request();
        const query = 'DELETE FROM landlord WHERE landlordID = @landlordID';
        request.input('landlordID', sql.Int, id);
        const users = await request.query(query);
        res.send("Successfully deleted user");
    }
    else {
        res.status(404).send("ID not found")
    }
}


// exports.getLandlords = async(req,res) => {
//     try {
//         let pool = await sql.connect(config);
//         let students = pool.request().query('Select * from landlord');
//         res.send((await students).recordset);
//     }
//     catch(error) {
//         console.log("not connected");
//     }
// }

// exports.registerLandlord = async(req,res) => {
//     const {name,password,cnic,email} = req.body;
//     try {
//             let pool = await sql.connect(config);
//             let validation = pool.request().query('Select * from Landlord');
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
//                   let landlords = pool.request().query(`insert into landlord values ('${name}','${hash}',${cnic},'${email}')`);
//                   res.send("Successfully inserted");
//                });
//            }
//     }
//     catch(error) {
//         console.log(error);
//     }
// }

// exports.loginLandlord = async(req,res) => {

//     const {email,password} = req.body;

//     if (!((email)&&(password))){
//         res.send("Email or password is missing")
//     }
//     else {
//        try {
//           let pool = await sql.connect(config);
//           let logininfo = pool.request().query(`select * from landlord where email = '${email}'`);
//           if ((await logininfo).recordset.length == 0){
//              res.send("Email entered is incorrect");
//           }
//           else {
//                   const hashedpassword = (await logininfo).recordset[0].password
//                   bcrypt.compare(password,hashedpassword, function(err, result) {
//                   if (result) {
//                       let token = jwt.sign({"email":email,"password": hashedpassword,"userType": "landlord"},process.env.ACCESS_SECRET_TOKEN)
//                       res.send(token);
//                       
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