import React from 'react'

export default function BackBtn() {
    return (
        <button
            onClick={() => window.history.back()}
            title="Go back"
            className="relative inline-block p-3 m-0 overflow-hidden font-bold text-black transition-all duration-300 ease-out bg-white border-4 border-black rounded-xl hover:border-white group"
        >
            <span className="absolute top-0 left-0 w-0 transition-all duration-300 ease-out bg-black group-hover:w-full group-hover:h-full"></span>
            <span className="relative group-hover:text-white">Go back</span>
        </button>
    )
}
