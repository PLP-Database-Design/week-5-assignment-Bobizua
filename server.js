// import dependencies
const express = require("express")
const app = express()
const mysql = require("mysql2");
const dotenv = require("dotenv");

// configure environment varaiable
dotenv.config();

// create a connection
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME

})

// test for connection
db.connect((err) =>{
    // connection is not successful
    if(err) {
        return console.log("Error connecting to the database", err)
    }
        // Connection is sucessful
    console.log("Sucessfully connected to Mysql:", db.threadId)
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// question 1.  retrieve all patients
app.get('', (req,res) =>{
    const getPatients = "SELECT patient_id,first_name,last_name,date_of_birth FROM patients"
    db.query(getPatients, (err, data) =>{
        // if there is an error
        if(err) {
            return res.status(400).send("Failed to get Patients", err)
        }
        res.status(200).render('data',{data})
        // res.status(200).send(data)
    })
})

// Question 2. retrieve all providers
app.get('', (req,res) =>{
    const getProviders = "SELECT first_name,last_name,provider_specialty FROM providers"
    db.query(getProviders, (err,data) =>{
        if(err) {
            return res.status(400).send("Failed to get Providers", err)
        }
        res.status(200).render('data',{data})
        // res.status(200).send(data)
    })
})

// Question 3. filter patients by first name
app.get('', (req,res) =>{
    const Fname = "SELECT first_name FROM patients"
    db.query(Fname, (err,data) =>{
        if(err){
            return res.status(400).send("Failed to retrieve first name",err)
        }
        res.status(200).render('data',{data})
        // res.status(200).send(data)
    })
})

// Question 4. Retrieve all providers by their specialty
app.get('', (req,res) =>{
    const specialty = "SELECT provider_specialty FROM providers"
    db.query(specialty, (err,data) =>{
        if(err){
            return res.status(400).send("Failed to retrieve specialty",err)
        }
        res.status(200).render('data',{data})
        // res.status(200).send(data)
    })
})

// Listen to the server
app.listen(3000, () =>{
    console.log("server is running on port 3000...")
})

// app.get('', (req,res) => {
//     res.send("Server Sucessful")
// })