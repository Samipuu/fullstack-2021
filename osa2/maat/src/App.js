import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const dummyWeather = {
    current: {
      feelslike: null,
      weather_icons: [null, null],
      wind_speed: null,
      wind_dir: null
    }
  }

  const [ countries, setCountries] = useState([]) 
  const [ filter, setFilter ] = useState("")
  const [ weather, setWeather] = useState(dummyWeather)

  const api_key = process.env.REACT_APP_API_KEY

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const params = {
    access_key: api_key,
    query:  null
  }



  const fetchCountries = () => {

    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
      
  }
  
  useEffect(fetchCountries, [])  


  const fetchWeather = () => {
    params.query = countriesToShow[0].name
    
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data)
      })

    console.log(weather)
  }


  const handleFilter = (event) => {
    setFilter(event.target.value)
  } 

  const handleButton = (event) => {
    setFilter(event.target.value)
  }

  return (
    
    <div>
      <h1>Country finder</h1>
      <Filter countries = {countries} filter = {filter} handleFilter = {handleFilter} />
      <Content weather={weather} fetchWeather = {fetchWeather} list = {countriesToShow} handleButton={handleButton} />
    </div>
  )
}

const Filter = ({filter, handleFilter}) => {
  return (
    <p>
      Filter: <input value = {filter} onChange = {handleFilter} />

    </p>
  )
}

const Content = ({list, handleButton, fetchWeather, weather}) => {
  switch(true) {
    case (list.length === 1):
      return <CountryStats weather = {weather} country = {list[0]} fetchWeather= {fetchWeather} />
    case (list.length < 11):
      return (
        <div>
          {list.map(country => {
          return <Country country = {country} handleButton = {handleButton} />
        })}
        </div>
      )
    default: 
      return "Too many countries to show be more specific"
      
  }

}

const CountryStats = ({country, fetchWeather, weather}) => {

  useEffect(fetchWeather, [])
  console.log(weather)
  return(
    <div key={country.alpha3Code}>
      <h2>{country.name}</h2>
      <p>
        Capital: {country.capital} <br></br>
        Population: {country.population}
      </p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => {
          return <li key={language.name}>{language.name} <br></br> </li>
        })}
      </ul>
      <img src={country.flag} height="200" alt="Country flag" />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {weather.current.feelslike} Celcius <br></br>
      <img src={weather.current.weather_icons[0]} alt="Current weather" /><br></br>
      Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

const Country = (props) => {
  return (
    <p key={props.country.alpha3Code}>
      {props.country.name} <button type="button" onClick={props.handleButton} value= {props.country.name}>Show</button>
      <br></br>
    </p>
  )
}


export default App;
