// Objeto JS vacio para usar de endpoint para todas las rutas
projectData = {};

// requisitos de dependencias de la app

const express = require('express');
const mysql = require('mysql');

//Conexion

const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b4859299f642d6',
    password: 'd73e64fb',
    database: 'heroku_45a5f34f29adc01'
})


// Empezar una instancia de la App

const app = express();


/* Middleware*/

const bodyParser = require('body-parser');

//Configurar express como body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors 

const cors = require('cors');
app.use(cors());

// carpeta principal del proyecto
app.use(express.static('website'));


// Establecer coneccion con el servidor
const port = 8000;
app.listen(process.env.PORT || port, () => console.log(`Server listening on port ${port}`));


// RUTAS

//GET
const data = [];
app.get('/all', getData)

function getData(req, res) {
    res.send(data)
    //console.log(`los datos del get son ${data}`)
}

//POST
app.post('/addTemp', addTemp)

function addTemp(req, res) {
    newEntrie = {
        newDate: req.body.newDate,
        feelings: req.body.feelings,
        weather: req.body.weather,
        zipCode: req.body.zipCode
    }
    data.push(newEntrie)
    console.log(data)

    var fecha = req.body.newDate;
    var temp = req.body.weather;
    var feeling = req.body.feelings;
    var ciudad = req.body.zipCode;
    connection.query(`INSERT INTO ingresos (fecha, ciudad, temperatura, entrada) VALUES ("${fecha}", "${ciudad}", "${temp}", "${feeling}")`);


}

//obtener todos las entradas de la tabla  y enviarlas al lado cliente
app.get('/getPosts', (req, res) => {
    connection.query('SELECT * FROM ingresos ORDER BY id DESC', (error, results) => {
        if (error) throw error;
        if (!error) {
            res.send(results);
            console.log(results);
        }
    })
})

app.get('/deletePosts/:id', (req, res) => {
    const postId = req.params.id;
    connection.query(`DELETE FROM ingresos WHERE id = ${postId}`, (error, results) => {
        if (error) throw error;
        if (!error) {
            console.log('entrada eliminada')
        }
    })
})


// app.get('/detelePost', (req, res) => {
//     con.connect(function (err) {
     
//         if (err) throw err;
//         var sql = `DELETE FROM ingresos WHERE id = 'Mountain 21'`;
//         con.query(sql, function (err, result) {
//           if (err) throw err;
//           console.log("Number of records deleted: " + result.affectedRows);
//         });
//     });
// })


