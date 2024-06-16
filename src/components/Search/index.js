import React, { useEffect, useRef, useState } from 'react'
import './index.css'

const Search=(props)=>{
    const{icons}=props
    const{clear_icon,wind_icon,humidity_icon,rain_icon,snow_icon,drizzle_icon,cloud_icon}=icons

    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }

    const currentDate=new Date()

    const months=['January','February','March','April','May','June','July','August','September','October','November','December']
    const month=months[currentDate.getMonth()]
    const day=currentDate.getDate();
    const year=currentDate.getFullYear()
    const hours=currentDate.getHours()
    const minutes=currentDate.getMinutes()


    const formatedDate=`${month}${day},${year}`
    const formatedTime=`${hours}:${minutes}`
    
    const inputRef=useRef()
    const [WeatherData,setWeatherData]=useState(false)

    const searchCity = async (city) => {
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2ec8699b252eafed249b7dda22f49215`;
          const response = await fetch(url);
          if (response.status){
            const data = await response.json();
            console.log(data)
          const icon=allIcons[data.weather[0].icon] || clear_icon
          console.log(icon)
          setWeatherData({
            humidity:data.main.humidity,
            windSpeed:data.wind.speed,
            temprature:Math.floor(data.main.temp),
            location:data.name,
            icon:icon,
            description:data.weather[0].description,
          })
        }
          
        } catch (error) {
          alert('Enter a valid City name')
        }
      };
    
      useEffect(() => {
        searchCity('hyderabad');
      }, []);
        return(
            <div className='weather-container'>
                 <div className='search-bar'>
                 <input ref={inputRef} type="text" placeholder='Search'/>
                 <button type="button" onClick={()=>searchCity(inputRef.current.value)}> Hit me</button>
              </div>
              <div className='tdt-container'>
                <div className='time-date-container'>
                <h1 className='time'>{formatedTime}</h1>
                <p className='date'>{formatedDate}</p>
                </div>
                <div className='temp-container'>
                <img src={WeatherData.icon} alt="icon" className='weather-icon'/>
                <div>
                <h1 className='temparature'>{WeatherData.temprature}°C</h1>
                <p className='description'>{WeatherData.description}</p>
                </div>
                </div>
              </div>
              <h1 className='location'>{WeatherData.location}</h1>
              <div className='weather-data'>
               <div className='col'>
               <img src={humidity_icon} alt=""/>
                <div>
                 <p>{WeatherData.humidity} %</p>
                 <span>Humidity</span>
                </div>
               </div>
               <div className='col'>
               <img src={wind_icon} alt=""/>
                <div>
                 <p>{WeatherData.windSpeed} km/h</p>
                 <span>Wind Speed</span>
                </div>
               </div>
              </div>
            </div>
        )
}
export default Search