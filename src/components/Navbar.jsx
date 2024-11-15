import React from 'react'
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className='flex text-lg justify-around bg-slate-900 py-5'>
            <div className="logo  font-semibold">
                <span className='text-green-400'>&lt;Rits</span>
                <span className='text-slate-200' >Pass /&gt;</span>
            </div>
            <div className="icon bg-green-400 p-1 rounded-lg ring-white ring-2">
                <button className='flex flex-row gap-1 items-center'>
                <FaGithub/>
                <h1>Github</h1>
                </button>
            </div>
        </div>
    )
}

export default Navbar
