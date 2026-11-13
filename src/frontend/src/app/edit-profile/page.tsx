
export default function EditProfile() {
  return (
    <main className="grow p-12 flex justify-start gap-12">
      <section className="w-96 h-78 p-6 bg-section-bg border border-section-border rounded-3xl flex flex-col gap-7">
        <div className="flex justify-center gap-4">
          <button className={`w-40 h-40 rounded-full border-2 bg-button-bg border-button-border cursor-pointer flex justify-center items-center
          fill-button-border hover:fill-x-green hover:border-x-green": ""}`}>
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white font-black text-3xl text-center">Player_Name</h1>
          <p className="text-center align-top text-base">ID: #UT3-22224</p>
        </div>
      </section>
      <section className="w-xl h-200 object-bottom p-6 bg-section-bg border border-section-border rounded-3xl flex flex-col gap-7">
        <h1 className="text-white font-black text-2xl text-left">ACCOUNT PROFILE SETTINGS</h1>
        <div className="w-xl h-fit flex flex-col gap-7">
          <h2 className="text-x-green font-extrabold text-xl text-left">1. GENERAL INFORMATION</h2>
          <div className="w-fit h-24 flex flex-col">
            <p className="text-white font-semibold text-lg text-left">USERNAME</p>
            <div className="w-lg h-fit p-3 my-2 border border-section-border rounded-lg">
            </div>
            <p className="text-left align-top text-base">Used for search and board claims.</p>
          </div>
          <div className="w-fit h-24 flex flex-col">
            <p className="text-white font-semibold text-lg text-left">EMAIL ADDRESS</p>
            <div className="w-lg h-fit p-3 my-2 border border-section-border rounded-lg">
            </div>
            <p className="text-left align-top text-base">Required for identification.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <hr className="grow block" />
        </div>
        <div className="w-fit h-fit flex flex-col gap-7">
          <h2 className="text-x-green font-extrabold text-xl text-left">2. SECURITY & PASSWORD</h2>
          <div className="w-fit h-24 flex flex-col">
            <p className="text-white font-semibold text-lg text-left">CURRENT PASSWORD</p>
            <div className="w-lg h-fit p-3 my-2 border border-section-border rounded-lg">
            </div>
          <ul className="w-fit h-24 flex mt-7">
            <li>
              <p className="text-white font-semibold text-lg text-left">NEW PASSWORD</p>
              <div className="w-62 h-fit p-3 my-3 mr-2 border border-section-border rounded-lg">
              </div>
            </li>
            <li>
              <p className="text-white font-semibold text-lg text-left">CONFIRM NEW PASSWORD</p>
              <div className="w-62 h-fit p-3 my-3 ml-2 border border-section-border rounded-lg">
              </div>
            </li>
          </ul>
         </div>
        </div>
      </section>
    </main>
  )
}

