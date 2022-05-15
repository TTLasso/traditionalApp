/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
let apiKey = '&appid=13862fd0b0c3a6fa22692ba012e4163f';



//asigna funciones a los botones de la UI
document.getElementById('generate').addEventListener('click', nuevaEntrada);
document.getElementById('getData').addEventListener('click', obtenerEntradas);
document.getElementById('errase').addEventListener('click', clearUI);

//Obtiene datos ingresados por el usuario, para hacer el llamado a la API
function nuevaEntrada(e) {
    let zipCode = document.getElementById('zip').value;
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    let feelings = document.getElementById('feelings').value;
    /*api call*/
    addTemp(`${baseURL}${zipCode}${apiKey}`)
        .then(function (data) {
            var weather = Math.round(parseFloat(data.main.temp) - 273.15);
            postData('/addTemp', { newDate: newDate, weather: weather, feelings: feelings, zipCode: zipCode })
            updateUI()
        })
}

function obtenerEntradas(e) {
    clearUI();
    getPosts();

}


//Envia los datos al lado servidor
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }

}

//Hace el llamando a la API
const addTemp = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }

}

// Muestra ingreso generado en el momento 
const updateUI = async () => {

    const req = await fetch('/all')
    try {
        const allData = await req.json()
        document.getElementById('date').innerHTML = allData[0].newDate;
        document.getElementById('temp').innerHTML = allData[0].weather + '&deg;';
        document.getElementById('content').innerHTML = allData[0].feelings;
    } catch (error) {
        console.log('error', error)
    }
}


//Borra el campo de ingresos
function clearUI() {
    document.getElementById('date').innerHTML = "";
    document.getElementById('temp').innerHTML = "";
    document.getElementById('content').innerHTML = "";
    document.getElementById('entradas').innerHTML = "";
    
};


//obtiene todas las entradas de la BD
const getPosts = async () => {

    const req = await fetch('/getPosts')
    try {
        const allData = await req.json();
        allData.forEach(element =>  {
            let entradas = document.createElement("div");
            console.log(element);
            document.getElementById('entradas').appendChild(entradas);
            entradas.innerHTML = `${element.fecha}, ${element.ciudad}, ${element.temperatura}&deg;, ${element.entrada}`;
        });
    } catch (error) {
        console.log('error', error)
    }
    
}
