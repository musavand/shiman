const express = require("express");
const app = express();
const bodyparser = require('body-parser')
const cors = require('cors');

const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();

//BodyParsing
app.use(cors({
  origin: '*'
}));
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "oneboy",
    saveUninitialized: true,
    resave: true,
  })
);


//Routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log("Server has started at port " + PORT));


