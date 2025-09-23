import React from 'react'

export default function Loader() {
  return (
    <>
      {/* <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center h-[100vh] z-[1000]">
    <div className="w-16 h-16 border-4 border-t-blue-500 border-white rounded-full animate-spin"></div>
  </div> */}
  <div className="fixed top-0 left-0 w-screen h-screen  bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-[9999]">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-white rounded-full animate-spin"></div>
    </div>

    </>
  )
}
