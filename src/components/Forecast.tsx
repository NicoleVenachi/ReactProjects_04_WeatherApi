
import React from 'react'
import { forecastType } from '../types'

//props type
interface props {
  data: forecastType;
}

//forma de recibir props y definir props type in line
const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span> {temp} <sup>o</sup></span>
)
//tiny tiny componen para poner el degree

const Forecast: React.FC<props> = ({ data }): JSX.Element => {

  const today = data.list[0]//clima de hoy, de ahorita
  console.log(today);

  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">

      {/* forecast header */}
      <section className="text-center" >

        {/* info de temp y city */}
        <h2 className="text-2xl font-black">
          {data.name}, <span className="font-thin">
            {data.country}
          </span>
        </h2>

        <h1 className="text-4xl font-extrabold">
          <Degree temp={Math.round(today.main.temp / 10)} />
        </h1>

        {/* todays weeather */}
        <p className="text-sm">
          {today.weather[0].main} - ({today.weather[0].description})
        </p>

        {/* todays weeather - highest and lowest*/}
        <p className="text-sm">
          H: <Degree temp={Math.ceil(today.main.temp_max / 10)} /> L:{' '}
          <Degree temp={Math.floor(today.main.temp_min / 10)} />
        </p>

      </section>

      {/* list de weather predictions/forecasts */}
      <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
        {/* x-scroll para poder ver todas */}
        {data.list.map((item, i) => (

          // hora, temepratura e iiconito
          <div
            key={i}
            className="inline-block text-center w-[50px] flex-shrink-0"
          >
            <p className="text-sm">
              {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
              {/* en el cero,tiene la info de justo ahorita. Horas como siempre por 1000 */}
            </p>
            <img
              alt={`weather-icon-${item.weather[0].description}`}
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} //images de la api, esto sale de docs
            />
            <p className="text-sm font-bold">
              <Degree temp={Math.round(item.main.temp / 10)} />
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Forecast
