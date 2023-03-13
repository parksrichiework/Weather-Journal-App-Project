// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

//Dependencies
const bodyParser = require('body-parser')


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000

// Setup Server

const server = app.listen(port, listening)

function listening(err){
    if(err){
        return console.log('ERROR', err)
    }
    console.log(server)
    console.log(`Listening on localhost: ${port}`)
}

//GET route that returns project data
// '/' = root or "home"
app.get('/all', function(req,res){
    res.send(projectData)
})

//POST route that adds incoming data to project data

//declare variable to store user data
const data =[]

app.post('/addData', addData)

function addData (req, res){
    console.log(req.body)
    projectData = req.body
    res.send(projectData)
}

console.log(data)