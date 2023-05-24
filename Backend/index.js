var express = require('express');
var app = express();
//const router = require("./router");
const userRouter = require("./routers/userRouter");
const landlordRouter = require("./routers/landlordRouter");
const reviewRouter = require("./routers/reviewRouter");
const locationRouter = require("./routers/locationRouter");
const adminRouter = require("./routers/adminRouter");
const cors =require('cors');


app.use(express.json()); //express.json parses a string into a json object
app.use(cors());

app.use("/user",userRouter); //route to user routes
app.use("/landlord",landlordRouter); //route to landlord routes
app.use("/review",reviewRouter); //route to review routes
app.use("/location",locationRouter);//route to location routes
app.use("/admin",adminRouter);


const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`Hello guys Server is on ${PORT}`);
});

