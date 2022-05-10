// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');


// Start up an instance of app

const app = express();

/* Middleware*/

const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(process.env.PORT || port, () => console.log(`Server listening on port${port}`)); 
// TODO-ROUTES!
//GET

const data = [];
app.get('/all', getData)

function getData(req, res) {
    res.send(data)
    console.log(`${data}`)
}


//POST

app.post('/addTemp', addTemp)

function addTemp(req, res) {
    newEntrie = {
        newDate: req.body.newDate,
        feelings: req.body.feelings,
        weather: req.body.weather
    }
    data.push(newEntrie)
    res.send(data)
    console.log(data)
}


