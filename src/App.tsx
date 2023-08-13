const App = () => {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">

        <h1 className="text-4xl font-thin"> Weather <span className="font-black">Forecast</span> </h1>

        <p className="text-sm mt-2"> Enter below a place you want to know the weather of and select an option from de dropdown</p>

        <div>

          <input type="text" value={'ph'} className="px-2 py-1 rounded-l-md border-2 border-white" />

          <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"> Search </button>
        </div>
      </section>
    </main>
  )
}

export default App
