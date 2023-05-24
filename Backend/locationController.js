const config = require('./db');
const sql = require('mssql/msnodesqlv8');
const jwt = require("jsonwebtoken")
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
    });

const Landlord = sequelize.define('Landlord', {
    landlordID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    tableName: 'Landlord', // specify the table name explicitly
    timestamps: false // disable automatic creation of createdAt and updatedAt columns
    })

//for adding location defining 
const Location = sequelize.define('Location', {
  locationID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  landlordID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Landlord',
        key: 'landlordID'
      }
  },
  locationName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  locationArea: {
    type: DataTypes.STRING,
    allowNull: false
  },
  locationAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  locationRent: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  Capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
    tableName: 'Location', // specify the table name explicitly
    timestamps: false // disable automatic creation of createdAt and updatedAt columns
    })

Landlord.hasMany(Location, { foreignKey: 'landlordID' });
Location.belongsTo(Landlord, { foreignKey: 'landlordID' });

exports.getLocations = async (req, res) => {
    try {
      const locations = await Location.findAll();
      res.send(locations);
    } catch (error) {
      console.log(error);
    }
    } 

//only those that are no archived
exports.displayLocations = async (req, res) => {
    try {
      const locations = await Location.findAll({ where: { Archived: 0 } });
      res.send(locations);
    } catch (error) {
    //   console.log("not connected");
    console.log(error);

    }
    // test the connection
    // try {
    //   await sequelize.authenticate();
    //   console.log('Connection has been established successfully.');
    // } catch (error) {
    //   console.error('Unable to connect to the database:', error);
    // }
    const users = await Location.findAll();
    // console.log(users);
    }
 
exports.displayLandlordLocations = async (req, res) => {
    try {
      const authheader = req.headers['authorization'];
      const token = authheader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
      const landlord = await Landlord.findOne({ where: { email: decoded.email } });
      const locations = await Location.findAll({ where: { landlordID: landlord.landlordID, Archived:0 } });
      res.send(locations);
    } catch (error) {
      console.log(error);
    }
    }

exports.getLocationArea = async(req,res) => {
      try{
          let pool = await sql.connect(config);
          let locations = pool.request().query('select distinct locationArea from Location');
          
          res.send((await locations).recordset);
          }
          catch {
              res.status(404).send("Could not increment");
          }
}

exports.addLocation = async (req, res) => {
  const { locationName, locationArea, locationAddress, locationRent, image, Archived, Capacity } = req.body;
  const authheader = req.headers['authorization'];
  const token = authheader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);

  const landlord = await Landlord.findOne({ where: { email: decoded.email } });
  if (!landlord) {
    res.status(401).send('Unauthorized');
    return;
  }

  const location = await Location.create({
    landlordID: landlord.landlordID,
    locationName,
    locationArea,
    locationAddress,
    locationRent,
    image,
    Archived,
    Capacity
  });

  res.send('Successfully entered location');
    }

exports.archiveLocation = async (req,res) => {
    locationID = req.params.id;
    const authheader = req.headers['authorization'];
    const token = authheader.split(' ')[1];
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);

    try {
        const landlord = await Landlord.findOne({
          where: {
            email: decoded.email
          }
        });
        const location = await Location.findOne({
          where: {
            locationID: locationID
          }
        });
    
        if (landlord.landlordID !== location.landlordID) {
          return res.status(400).send("You cannot archive this location");
        }
    
        await location.update({
          Archived: 1
        });
    
        res.send("Successfully archived");
      } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while archiving location");
      }
    }

exports.archiveLocation = async (req,res) => {
    locationID = req.params.id;
    const authheader = req.headers['authorization'];
    const token = authheader.split(' ')[1];
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);

    try {
        const landlord = await Landlord.findOne({
          where: {
            email: decoded.email
          }
        });
        const location = await Location.findOne({
          where: {
            locationID: locationID
          }
        });
    
        if (landlord.landlordID !== location.landlordID) {
          return res.status(400).send("You cannot archive this location");
        }
    
        await location.update({
          Archived: 1
        });
    
        res.send("Successfully archived");
      } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while archiving location");
      }
    }

exports.unarchiveLocation = async (req,res) => {
    locationID = req.params.id;
    const authheader = req.headers['authorization'];
    const token = authheader.split(' ')[1];
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);    
    try {
        const landlord = await Landlord.findOne({
            where: {
                email: decoded.email
                }
            });
        const location = await Location.findOne({
            where: {
                locationID: locationID
                }
            });
        
        if (landlord.landlordID !== location.landlordID) {
              return res.status(400).send("You cannot unarchive this location");
            }
        
        await location.update({
              Archived: 0
            });
        
            res.send("Successfully unarchived");
          } catch (error) {
            console.log(error);
            res.status(500).send("An error occurred while unarchiving location");
          }
    }

//filters
exports.FilterSearch =  async (req, res) => {
    try {
        const {location, maxPrice, minCapacity, maxCapacity, minPrice } = req.query;
        console.log(location);
        console.log(req.query);
        const pool = await sql.connect(config);
        
        let queryString = ' ';
        // queryString += 'locationArea =', location;
        let queryParams = [];
        console.log(maxCapacity)
        // console.log('aha', queryString);
        queryString += 'SELECT * FROM Location WHERE ';
        if (location) {
            if (queryParams.length > 0) {
                queryString += ' AND ';
            }
            
            queryString += `locationArea = '${location}'`;
            queryParams.push({ name: 'location', type: sql.NVarChar, value: location });
        }
        if (maxCapacity && minCapacity) {
            if (queryParams.length > 0) {
                queryString += ' AND ';
            }
            queryString += `Capacity >= ${minCapacity} AND Capacity <= ${maxCapacity}`;
            queryParams.push({ name: 'minCapacity', type: sql.Int, value: minCapacity });
            queryParams.push({ name: 'maxCapacity', type: sql.Int, value: maxCapacity });
        }
        else{
          if (maxCapacity) {
              if (queryParams.length > 0) {
                  queryString += ' AND ';
              }
              queryString += `locationRent <= '${maxCapacity}'`;
              queryParams.push({ name: 'maxCapacity', type: sql.Int, value: maxCapacity });
          }
          if (minPrice) {
              if (queryParams.length > 0) {
                  queryString += ' AND ';
              }
              queryString += `locationRent >= '${minCapacity}'`;
              queryParams.push({ name: 'minCapacity', type: sql.Int, value: minCapacity });
          }
      }
        if (minPrice && maxPrice) {
            if (queryParams.length > 0) {
                queryString += ' AND ';
            }
            queryString += `locationRent >= ${minPrice} AND locationRent <= ${maxPrice} `;
            queryParams.push({ name: 'minPrice', type: sql.Int, value: minPrice });
            queryParams.push({ name: 'maxPrice', type: sql.Int, value: maxPrice });
        }
        else{
            if (maxPrice) {
                if (queryParams.length > 0) {
                    queryString += ' AND ';
                }
                queryString += `locationRent <= '${maxPrice}'`;
                queryParams.push({ name: 'maxPrice', type: sql.Int, value: maxPrice });
            }
            if (minPrice) {
                if (queryParams.length > 0) {
                    queryString += ' AND ';
                }
                queryString += `locationRent >= '${minPrice}'`;
                queryParams.push({ name: 'minPrice', type: sql.Int, value: minPrice });
            }
        }
        console.log(queryString)
        
        // if (hallType) {
        //     if (queryParams.length > 0) {
        //         queryString += ' AND ';
        //     }
        //     queryString += 'hallType = @hallType';
        //     queryParams.push({ name: 'hallType', type: sql.NVarChar, value: hallType });
        // }

        const result = await pool.request()
            .query(queryString, ...queryParams);
        res.send(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
    }

//orders  
exports.OrderBy = async (req, res) => {
    try{
        const {asc, desc} = req.query;        
        const pool = await sql.connect(config);
        let queryParams = [];
        let sortQuery='SELECT * FROM Location ORDER BY locationRent ';
        if(asc){
            sortQuery += `${asc}`;
            queryParams.push({ name: 'asc', type: sql.Int, value: asc });
        }
        else if(desc){
            sortQuery += `${desc}`;
            queryParams.push({ name: 'desc', type: sql.Int, value: desc });
        }
        const result = await pool.request()
            .query(sortQuery, ...queryParams);
        res.send(result.recordset); 
    }catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
    }

exports.getLocationLength = async (req,res) => {
      try {
          let pool = await sql.connect(config);
          let length = pool.request().query('SELECT MAX(locationID) AS last_id FROM Location');
          res.send((await length).recordsets[0]);
      } catch(error){
          console.log(error);
      }
}

exports.getLocationByID = async (req,res) => {
  const id = req.params.id;
  try {
      let pool = await sql.connect(config);
      let locations = pool.request().query(`Select * from location where locationID = ${id}`);
      res.send((await locations).recordset);
  }
  catch(error) {
      console.log("not connected");
  }

}

exports.getArchivedLocations = async(req,res) => {
  const authheader = req.headers['authorization'];
  const token = authheader.split(' ')[1];
  const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
  let pool = await sql.connect(config);
  let id = pool.request().query(`select * from Landlord where email = '${decoded.email}' `)
  let locations = pool.request().query(`Select * from location where landlordID = ${(await id).recordset[0].landlordID} and archived = 1` );
  res.send((await locations).recordset);

}

exports.incrementCount = async(req,res) => {
  locationID = req.params.id;

  try{
  let pool = await sql.connect(config);
  let locations = pool.request().query(`UPDATE Location
  SET clicked = clicked + 1
  WHERE locationID = ${locationID}`);
  res.send("Successfulyy incremented");
  }
  catch {
      res.send("Could not increment")
  }
}



//before prevetnion code:

// exports.getLocations = async(req,res) => {
//     try {
//         let pool = await sql.connect(config);
//         let locations = pool.request().query('Select * from Location');
//         res.send((await locations).recordset);
//     }
//     catch(error) {
//         console.log(error);
//     }
// }

// exports.displayLocations = async(req,res) => {
//     try {
//         let pool = await sql.connect(config);
//         let locations = pool.request().query('Select * from Location where archived = 0');
//         res.send((await locations).recordset);
//     }
//     catch(error) {
//         console.log("not connected");
//     }
// }
// exports.displayLandlordLocations = async(req,res) => {
//     const authheader = req.headers['authorization'];
//     const token = authheader.split(' ')[1];
//     const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
//     let pool = await sql.connect(config);
//     let id = pool.request().query(`select * from Landlord where email = '${decoded.email}' `)
//     let locations = pool.request().query(`Select * from Location where landlordID = ${(await id).recordset[0].landlordID}`);
//     res.send((await locations).recordset);
    
// }

// exports.addLocation = async (req,res) => {
//     const {locationName,locationArea,locationAddress,locationRent,image,Archived, Capacity} = req.body;
//     const authheader = req.headers['authorization'];
//     const token = authheader.split(' ')[1]; 
//     const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
//     let pool = await sql.connect(config);
    
//     let id = pool.request().query(`select * from Landlord where email = '${decoded.email}' `)
//     let addLocation = pool.request().query(`insert into Location values (${(await id).recordset[0].landlordID},'${locationName}','${locationArea}','${locationAddress}',${locationRent},'${image}',${Archived},${Capacity})`);
//     res.send("Successfully entered location");
    
// }

// exports.archiveLocation = async (req,res) => {
//     locationID = req.params.id;
//     const authheader = req.headers['authorization'];
//     const token = authheader.split(' ')[1];
//     const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
//     let pool = await sql.connect(config);
//     let landlordid = (await pool.request().query(`select * from Landlord where email = '${decoded.email}' `)).recordset[0].landlordID
//     let landlordidfromlocation = (await pool.request().query(`select * from Location where locationID = ${locationID} `)).recordset[0].landlordID
//     if (landlordid == landlordidfromlocation) {
//         let archive = pool.request().query(`Update Location set Archived = 1 where locationID = ${locationID}`)
//         res.send("Successfully archived")
//     }
//     else {
//         res.status(400).send("You cannot archive this location")
//     }
// }