import React from 'react'

function Footerbar() {
  return (
  <div className="w-full bg-gray-900 text-white text-center py-4 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Your Company Name. All rights reserved Khatu Wale Shyam.
      </p>
    </div>
  )
}

export default Footerbar