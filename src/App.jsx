import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footerbar from './Footerbar'
import { Route, Routes } from 'react-router-dom'
import AllMovieListing from './Movies/AllMovieListing'
import CreateMovie from './Movies/CreateMovie'
import MovieRegister from './Register/MovieRegister'
import MovieLogin from './Register/MovieLogin'
import DesktopDashboard from './Pages/DesktopDashboard'
import SettingsUI from './Pages/Setting'
function App() {
  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-60">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">

        <Navbar />

        <div className="flex-1 p-6 overflow-y-auto">
          {/* <h1 className="text-3xl font-bold">Jai Shree Ram</h1> */}
          <Routes>
            <Route path='/listingAllmovies' element={<AllMovieListing/>} />
            <Route path='/create/movies' element={<CreateMovie/>} />
            <Route path='/movie-register' element={<MovieRegister/>}/>
            <Route path='/movie-login' element={<MovieLogin/>} />
            <Route path='/desktop' element={<DesktopDashboard/>} />
            <Route path='/setting' element={<SettingsUI/>} />
          </Routes>
        </div>

        <Footerbar />

      </div>

    </div>
  )
}

export default App
