const express =  require('express')
const axios = require('axios')
const path = require('path'); 
require('dotenv').config(); 
const app = express()
const PORT  = process.env.PORT || 3000;
const ENV_WEATHER_API_KEY = process.env.WEATHER_API_KEY;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const WEATHER_API_KEY = ENV_WEATHER_API_KEY
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';



app.post('/getWeather',async(req,res)=>{
    try{
        const cities = req.body.cities;
        const weatherResults = {};
    
        for (const city of cities) {
          const response = await axios.get(WEATHER_API_BASE_URL, {
            params: {
              q: city,
              appid: WEATHER_API_KEY,
              units: 'metric',
            },
          });
    
          const temperature = response.data.main.temp + '°C';
          weatherResults[city] = temperature;
        }
    
        res.json({ weather: weatherResults });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: error });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });