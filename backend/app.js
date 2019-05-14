var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var catalogRouter = require("./routes/catalog");
var userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"./angular")));

var url = "mongodb://Sarthak:Sarthak98@ds153766.mlab.com:53766/daily_goals";
mongoose.connect(url,{ useNewUrlParser: true } );
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error",(err)=>{ console.log("Some error has occured",err) });
db.once("open",()=>{ console.log("Database has been connected succesfully") });


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*"),
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept"),
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS,authorization"),
     next();
});


// app.use("/", indexRouter);
app.use("/catalog", catalogRouter);
app.use("/users",userRouter);

// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,"angular","index.html"))
// })
module.exports = app;