const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.authenticateAdmintoken = async (req,res,next) => {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if (token == null){
        res.status(404).send("Token not send")
    }
    else{
            jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,user) => {
            if(err){
                res.send(err)
            }
            else{
                const decoded = jwt.decode(token)
                if (decoded.userType == "admin"){
                    next()
                }
                else {
                    res.status(400).send("No access allowed")
                }
                
            }
        })
    }

}

exports.authenticateAdminLandlordtoken = async (req,res,next) => {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if (token == null){
        res.status(404).send("Token not send")
    }
    else{
            jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,user) => {
            if(err){
                res.send(err)
            }
            else{
                const decoded = jwt.decode(token)
                if (decoded.userType == "landlord" || decoded.userType == "admin"){
                    next()
                }
                else {
                    res.status(400).send("No access allowed")
                }
                
            }
        })
    }

}

exports.authenticateAdminUsertoken = async (req,res,next) => {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if (token == null){
        res.status(404).send("Token not send")
    }
    else{
            jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,user) => {
            if(err){
                res.send(err)
            }
            else{
                const decoded = jwt.decode(token)
                if (decoded.userType == "user" || decoded.userType == "admin"){
                    next()
                }
                else {
                    res.status(400).send("No access allowed")
                }
                
            }
        })
    }

}

exports.authenticateAdminLandlordUsertoken = async (req,res,next) => {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if (token == null){
        res.status(404).send("Token not send")
    }
    else{
            jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,user) => {
            if(err){
                res.send(err)
            }
            else{
                const decoded = jwt.decode(token)
                if (decoded.userType == "admin" || decoded.userType == "landlord" || decoded.userType == "user"){
                    next()
                }
                else {
                    res.status(400).send("No access allowed")
                }
                
            }
        })
    }

}


