
import React from 'react'
import { forecastType } from '../types'

//props type
interface props {
  data: forecastType;
}

const Forecast: React.FC<props> = ({ data }): JSX.Element => {

  const today = data.list[0]//clima de hoy, de ahorita
  console.log(today);

  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
      <section className="text-center" >

        <h2 className="text-2xl font-black">
          {data.name}, <span className="font-thin">
            {data.country}
          </span>
        </h2>

        <h1 className="text-4xl font-extrabold"> {Math.round(today.main.temp / 10)} </h1>
      </section>
    </div>
  )
}

export default Forecast
