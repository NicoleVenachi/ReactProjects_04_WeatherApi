import { ChangeEvent, useEffect, useState } from "react"
import { optionType } from "./types"


const App: React.FC = (): JSX.Element => {

  const [term, setTerm] = useState<string>('') //state para sacar el input del lugar a buscar

  const [options, setOptions] = useState<[]>([]) //state para sacar las optciones de lugares con el nombre de la ciudad

  const [city, setCity] = useState<optionType | null>(null) //state para almacenar la city elegida

  const getSearchOptions = (value: string) => {
    //geolocationfetch
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => setOptions(data))

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
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metrics&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => console.log({ data }))
  }
  useEffect(() => {

    if (city) {
      setTerm(city.name) //asi dejo esa city como value del input
      setOptions([]) //asi limpio el ul
    }
  }, [city])

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">

        <h1 className="text-4xl font-thin"> Weather <span className="font-black">Forecast</span> </h1>

        <p className="text-sm mt-2"> Enter below a place you want to know the weather of and select an option from de dropdown</p>

        <div className="relative flex mt-10 md:mt-4">

          <input type="text" value={term} className="px-2 py-1 rounded-l-md border-2 border-white" onChange={onInputChage} />

          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            { //ul para las opciones
              options.map((option: optionType, index: number) => (
                <li key={option.name + '-' + index}>
                  <button
                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                    onClick={() => onOptionSelect(option)}
                  >{`${option.name} - ${option.country}`}</button>
                </li>
              ))
            }
          </ul>

          <button
            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={onSubmit}
          > Search </button>
        </div>
      </section>
    </main>
  )
}

export default App
