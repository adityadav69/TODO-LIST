import React from 'react'

const navbar = () => {
  return (
   <nav className="flex justify-between items-center bg-slate-800 text-white px-10 w-full h-10">
    <div className="logo">
        <span className='font-bold text-xl'>TaskSage</span>
    </div>
    <ul className='flex gap-10 items-center '>
        <li className='cursor-pointer hover:font-bold list-none'>Home</li>
        <li className='cursor-pointer hover:font-bold list-none'>Your Tasks</li>
    </ul>
   </nav>
  )
}

export default navbar