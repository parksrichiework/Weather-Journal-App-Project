// Global Variables 
let userTemperature = document.querySelector('#temp')
let userDate = document.querySelector('#date')
let userFeelings = document.querySelector('#feelings')
let userZip = document.querySelector('#zip')

let apiKey = '&appid=7b0c9254718fc6533eca396f3f37052c'
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//add asynch function to make GET request to OpenWeatherMap

const getData = async (baseURL,userZip,apiKey)=>{
      const request = await fetch(`${baseURL}zip=${userZip.value},us${apiKey}`);

      try {
        const newData = await request.json();
        console.log(newData);
        return newData;
      } catch(error) {
      console.log("error", error);
      }
  }

  //event listener for generate button

document.querySelector('#generate').addEventListener('click', generate)

function generate(){
    console.log('Generate button clicked')
    getData(baseURL,userZip,apiKey)
      .then(function (weatherData){
          console.log(weatherData)
          postData('/addData', {
              temperature: weatherData.main.temp,
              date: newDate,
              userResponse: userFeelings.value,
          })
          
        })
        .then(() => updateUi())
}

//add asynch function to make POST request

const postData = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } catch(error) {
    console.log("error", error);
    }
}

const updateUi = async () => {
  const req = await fetch('/all')
  try{
      const data = await req.json()
      userDate.innerHTML = `Date: ${data.date}`
      userTemperature.innerHTML = `Temperature(°C): ${data.temperature}`
      document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`
    } catch(err) {
    console.log("ERROR", err)
  }
  console.log(req)
}

 