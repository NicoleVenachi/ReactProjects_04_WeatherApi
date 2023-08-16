import { ChangeEvent, useEffect, useState } from "react"
import { optionType } from "./types"
import Search from "./components/Search"
import useForecast from "./hooks/useForecast"


const App: React.FC = (): JSX.Element => {

  const {
    term,
    options,
    forecast,

    onInputChage,
    onOptionSelect,
    onSubmit
  } = useForecast()

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">

      {
        forecast ? (
          <p> hay forecast</p>
        ) : (
          <Search
            term={term}
            options={options}
            onInputChage={onInputChage}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        )
      }

    </main>
  )
}

export default App
