import React from 'react'
import { NavLink } from 'react-router-dom'
function Sidebar() {
    return (
        <div className="w-60 h-screen bg-black text-white p-6 flex flex-col gap-4">
            <NavLink to="/listingAllmovies" className="px-4 py-2 bg-gray-900 rounded shadow-md shadow-pink-500 hover:shadow-pink-400">
                Home Page
            </NavLink>
            <NavLink to="/desktop" className="px-4 py-2 bg-gray-900 rounded shadow-md shadow-green-500 hover:shadow-green-400">
                Desktop
            </NavLink>
            <NavLink to="/setting" className="px-4 py-2 bg-gray-900 rounded shadow-md shadow-pink-500 hover:shadow-pink-400">
                Settings
            </NavLink>

        </div>


    )
}

export default Sidebar