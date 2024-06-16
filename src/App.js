import { createContext, useState } from 'react';
import ReactSwitch from 'react-switch'
import Search from './components/Search'
import './App.css';
import search_icon from './Assets/search.png'
import cloud_icon from './Assets/cloud.png'
import clear_icon from './Assets/clear.png'
import snow_icon from './Assets/snow.png'
import wind_icon from './Assets/wind.png'
import humidity_icon from './Assets/humidity.png'
import rain_icon from './Assets/rain.png'

export const ThemeContext=createContext(null);

function App() {
  const icons={search_icon,clear_icon,cloud_icon,snow_icon,wind_icon,humidity_icon,rain_icon}

  const[theme,setTheme]=useState('white');

  const toggleTheme=()=>{
    setTheme((curr)=>(
      curr==='light'?"dark":"light"
    ));
  }
  return (
   <ThemeContext.Provider value={{theme,toggleTheme}}>
    <div className="App" id={theme}>
      <h1>Weather Application</h1 >
      <label>{theme==='light'?"light Mode":'dark Mode'}</label>
      <ReactSwitch className="switch" onChange={toggleTheme} checked={theme==='dark'}/>
      <Search icons={icons}/>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
