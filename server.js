// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');
const mysql = require('mysql');

//Coneccion

const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b4859299f642d6',
    password: 'd73e64fb',
    database: 'heroku_45a5f34f29adc01'
})


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
app.listen(process.env.PORT || port, () => console.log(`Server listening on port ${port}`));

//Motor 
// app.set('view engine', 'ejs');


// var sql = `INSERT INTO ingresos (id, ciudad, sentimiento) VALUES ('2' , 'manta' , 'asdasdasd' , NOW())`;
// connection.query(sql, function (error, rows) {
//     if (error) throw error;

//     if (!error) {
//         console.log(rows)
//     }
// })

// app.post('/registro', function (req, res) {
//     var date = req.body.newDate;
//     var temp = req.body.temp;
//     var feeling = req.body.feelings;

//     connection.query(`INSERT INTO ingresos (id, ciudad, sentimiento) SET ?`, temp, feeling, feeling, function (error, results, fields) {
//         if (error) throw error;
//         res.end(JSON.stringify(results));
//     });
// });


connection.query('SELECT * FROM ingresos WHERE id = "1"', (error, rows) => {
    if (error) throw error;

    if (!error) {
        console.log(rows)
    }
})


// //Renderizar pagina principal
// app.get('/', function (req, res) {
//     res.render('index.ejs')
// })


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

    var date = req.body.newDate;
    var temp = req.body.weather;
    var feeling = req.body.feelings;
    connection.query(`INSERT INTO ingresos (id, ciudad, sentimiento) VALUES ("6","${feeling}","${temp}")`);

}



