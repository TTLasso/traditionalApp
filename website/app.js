/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
let apiKey = '&appid=xxxxxxxxxxxxxxxxxxxxxxx';


//WEB API call
//api call pathern => api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
document.getElementById('generate').addEventListener('click', perfomeAction);
document.getElementById('errase').addEventListener('click', clearUI);

function perfomeAction(e) {
    let zipCode = document.getElementById('zip').value;
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    let feelings = document.getElementById('feelings').value;
    /*api call*/
    addTemp(`${baseURL}${zipCode}${apiKey}`)
        .then(function (data) {
            var weather = Math.round(parseFloat(data.main.temp)-273.15);
            postData('/addTemp', { newDate: newDate, weather: weather, feelings: feelings })
            updateUI()
        })
}

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


const updateUI = async () => {

    const req = await fetch('/all')
    try {
        const allData = await req.json()
        document.getElementById('date').innerHTML = allData[allData.length-1].newDate;
        document.getElementById('temp').innerHTML = allData[allData.length-1].weather + '&deg;';
        document.getElementById('content').innerHTML = allData[allData.length-1].feelings;
    } catch (error) {
        console.log('error', error)
    }
}

function clearUI() {
        document.getElementById('date').innerHTML = "";
        document.getElementById('temp').innerHTML = "";
        document.getElementById('content').innerHTML = "";
    
};
