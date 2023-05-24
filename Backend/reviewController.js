const config = require('./db');
const sql = require('mssql/msnodesqlv8');
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.getReviews = async (req,res) => {
    
  const id = req.params.id;
  let pool = await sql.connect(config);
  let reviews = pool.request()
  .input('locationID', id)
  .query('SELECT * FROM reviews WHERE locationID = @locationID');
  if ((await reviews).recordset.length == 0){
    res.status(404).send("reviews not found")
  }
  else {
    res.send((await reviews).recordset);
  }
}

exports.postReviews = async (req, res) => {
  const {review} = req.body;
  console.log(review);
  const locationID = req.params.id;
  const authheader = req.headers['authorization'];
  const token = authheader.split(' ')[1];
  const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
  let pool = await sql.connect(config);
  
  
  const id = decoded.id;
  console.log(decoded.id)

 // const hallExists = await sql.query('SELECT * FROM Location WHERE locationID = ?', [locationID]);
  const request = pool.request();
  const query = 'SELECT * FROM location WHERE locationID = @locationID';
  request.input('locationID', sql.NVarChar, locationID);
  const hallExists = await request.query(query);
  console.log(hallExists.recordsets)
  if (hallExists.recordset.length == 0) {
    return res.status(400).json({ error: 'Hall does not exist' });
  }
  else {
  
     const result = await pool.request()
    .input('locationID', sql.Int, locationID)
    .input('userID', sql.Int, id)
    .input('review', sql.NVarChar, review)
    .query('INSERT INTO reviews (locationID, userID, review) VALUES (@locationID, @userID, @review)');
    
    
  
     res.send("Successfully inserted")
  }
}





// exports.getReviews = async (req,res) => {
//     const id = req.params.id;
//     let pool = await sql.connect(config);
//     let reviews = pool.request().query(`select * from reviews where locationID = ${id}`);
//     res.send((await reviews).recordset);
// }

// exports.postReviews = async (req, res) => {
//     const {review} = req.body;
//     console.log(review);
//     const locationID = req.params.id;
//     const authheader = req.headers['authorization'];
//     const token = authheader.split(' ')[1];
//     const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
//     let pool = await sql.connect(config);
    
    
//     const userExists = await (await sql.query`SELECT * FROM Users WHERE email = ${decoded.email}`);
//     const hallExists = await sql.query`SELECT * FROM Location WHERE locationID = ${locationID}`;
    
//     if (!userExists.recordset[0]) {
//       return res.status(400).json({ error: 'User does not exist' });
//     }
//     else if (!hallExists.recordset[0]) {
//       return res.status(400).json({ error: 'Hall does not exist' });
//     }
//     else {
    
    
//     const result = await pool.request().query(`INSERT INTO reviews (locationID, userID, review) VALUES (${locationID}, ${userExists.recordset[0].userID}, '${review}')`);
//     res.send("Successfully inserted")
//     }
//   }
// exports.postReviews = async (req, res) => {
//     const locationID= req.params.id;
//     const {review} = req.body;
//     console.log(review);
//     //const locationID = req.params.id;
//     const authheader = req.headers['authorization'];
//     const token = authheader.split(' ')[1];
//     const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
//     let pool = await sql.connect(config);
    
    
//     const userExists = await (await sql.query`SELECT * FROM Users WHERE email = ${decoded.email}`);
//     const hallExists = await sql.query`SELECT * FROM Location WHERE locationID = ${locationID}`;
    
//     if (!userExists.recordset[0]) {
//       return res.status(400).json({ error: 'User does not exist' });
//     }
    
//     if (!hallExists.recordset[0]) {
//       return res.status(400).json({ error: 'Hall does not exist' });
//     }
    
//     // Insert review into "reviews" table
//     const result = await sql.query`
//       INSERT INTO reviews (locationID, userID, review)
//       VALUES (@locationID, @userID, @review)
//     `,
//     input = {
//       locationID,
//       userID: userExists.recordset[0].userID,
//       review
//     };

//     await pool.request().input(input).query(result);
    
    
//     return res.json({ success: true });
//   };

