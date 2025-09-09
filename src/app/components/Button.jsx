import React from 'react'

const Button = ({text}) => {
  return (
   <>
   <button className={`text-red hover:before:bg-redborder-red-500 relative h-[50px] w-40 overflow-hidden border border-[#a855f7] bg-[#a855f7] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#ea7a2d] before:transition-all before:duration-500 hover:text-white hover:shadow-[#ea7a2d] hover:before:left-0 hover:before:w-full`}>
     <span className="relative z-10">{text}</span>
   </button>
   </>
  )
}

export default Button