const bcrypt = require("bcryptjs");
const mysql = require('mysql')

const dotenv = require("dotenv");
dotenv.config();

const allSession = (req, res) => {
    const con = mysql.createConnection({
        host: process.env.LOCALHOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      
      con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM T_SESSIONS", function (err, result, fields) {
          if (err) throw err;
          const jsonContent = JSON.stringify(result);
          res.end(jsonContent);
          

        });
      });
}

const upCommingSession = (req, res) => {
    var con = mysql.createConnection({
        host: process.env.LOCALHOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      var currentdate = new Date();
            var datetime = currentdate.getFullYear() + "-" + currentdate.getMonth() 
            + "-" + currentdate.getDay() ;
      console.log(currentdate);
      con.connect(function(err) {

        if (err) throw err;
        con.query(`SELECT * FROM T_SESSIONS where date(session_time)>${datetime}`, function (err, result, fields) {
          if (err) throw err;
          const jsonContent = JSON.stringify(result);
          res.end(jsonContent);
          

        });
      });
}

const getSessionData = (req, res) => {
    const { Id } = req.body;
    if (Id)
    {
        var con = mysql.createConnection({
            host: process.env.LOCALHOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
          });
          
          con.connect(function(err) {
            if (err) throw err;
            // console.log(`id is ${Id}`);
            con.query(`SELECT * FROM T_SESSIONS  where ID=${Id}`, function (err, result, fields) {
              if (err) throw err;
              const jsonContent = JSON.stringify(result);
              res.end(jsonContent);
              
    
            });
          });
        
    }
    
}
const joinSession=(req, res) => {
    const { Session_ID , User_ID  } = req.body;
    
    var responseData={}
    if (Session_ID && User_ID ){
    {
        var con = mysql.createConnection({
            host: process.env.LOCALHOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
          });
          var currentdate = new Date();
          var datetime ="'"+ currentdate.getFullYear() + "-" + currentdate.getMonth() 
          + "-" + currentdate.getDay()+" " +currentdate.getHours()+":" +currentdate.getMinutes()+":" +currentdate.getSeconds()+"'";

          con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into  t_attendance (SessionID,User_ID,clocking_time,notes) values(${Session_ID},${User_ID},${datetime},'join')`, function (err, result, fields) {
              if (err) throw err;
              responseData= {
                message:" join session successd",
                sessionData:{                    
                    sessionJoinTime: datetime,
                }     
             }      
             const jsonContent = JSON.stringify(responseData);
             res.end(jsonContent);
    
            });
          });
        
    }
   
    }
}
const disJoinSession=(req, res) => {
    const { Session_ID , User_ID  } = req.body;
    
    var responseData={}
    if (Session_ID && User_ID ){
    {
        var con = mysql.createConnection({
            host: process.env.LOCALHOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
          });
          var currentdate = new Date();
          var datetime ="'"+ currentdate.getFullYear() + "-" + currentdate.getMonth() 
          + "-" + currentdate.getDay()+" " +currentdate.getHours()+":" +currentdate.getMinutes()+":" +currentdate.getSeconds()+"'";

          con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into  t_attendance (SessionID,User_ID,clocking_time,notes) values(${Session_ID},${User_ID},${datetime},'disjoin')`, function (err, result, fields) {
              if (err) throw err;
              responseData= {
                message:" disjoin session successd",
                sessionData:{                    
                    sessionDisJoinTime: datetime,
                }     
             }      
             const jsonContent = JSON.stringify(responseData);
             res.end(jsonContent);
    
            });
          });
        
    }
   
    }   
}            
module.exports ={
    allSession,
    upCommingSession,
    getSessionData,
    joinSession,
    disJoinSession,

}
