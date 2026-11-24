
export default function Profile() {
  return (
    <main className="grow p-12 flex justify-start gap-12">
      <section className="w-xl h-78 p-6 bg-section-bg border border-section-border rounded-3xl flex flex-col gap-7">
        <div className="flex justify-center gap-4">
          <button className={`w-40 h-40 rounded-full border-2 bg-button-bg border-button-border cursor-pointer flex justify-center items-center
          fill-button-border hover:fill-x-green hover:border-x-green": ""}`}>
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white font-black text-3xl text-center">Player_Name</h1>
          <p className="text-center align-top text-base">ID: #UT3-22224</p>
        </div>
        <div className="w-fit h-8 p-3 my-2 border border-section-border rounded-lg">
         <p className="text-white font-semibold text-lg text-left">EDIT PROFILE</p>
        </div>
      </section>
    </main>
  )
}

