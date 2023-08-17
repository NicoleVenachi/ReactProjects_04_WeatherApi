import { ChangeEvent, useEffect, useState } from "react"
import { forecastType, optionType } from "../types"

const useForecast = () => {
  const [term, setTerm] = useState<string>('') //state para sacar el input del lugar a buscar

  const [options, setOptions] = useState<[]>([]) //state para sacar las optciones de lugares con el nombre de la ciudad

  const [city, setCity] = useState<optionType | null>(null) //state para almacenar la city elegida

  const [forecast, setForecast] = useState<forecastType | null>(null) //estado para almacenar clima, y saber si muestro ese componente

  const getSearchOptions = (value: string) => {
    //geolocationfetch
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => setOptions(data))
      .catch((e) => console.log({ e }))
  }



  const onInputChage = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTerm(value)

    if (value === '') return


    getSearchOptions(value)
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option)
  }

  //submit, que haga fethc al weather forecast solo ald ar click al boton
  const onSubmit = () => {
    if (!city) return //sino hay icty, no hace nada

    getForecast(city)
  }

  const getForecast = (city: optionType) => {
    //fetch del weather
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metrics&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        
        const forecastData = {
          ...data.city,
          list: data.list.slice(0,16),
        } //saco predicción de solo unas horas, no días
        setForecast(forecastData)
      })
      .catch((e) => console.log({ e }))
  }
  useEffect(() => {

    if (city) {
      setTerm(city.name) //asi dejo esa city como value del input
      setOptions([]) //asi limpio el ul
    }
  }, [city])

  return {
    term, 
    options,
    forecast,

    onInputChage,
    onOptionSelect,
    onSubmit
  }
}

export default useForecast