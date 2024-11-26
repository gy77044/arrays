import React from 'react'

const SliderButton = ({index,setIndex}:{index:number,setIndex: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <>
       <div className="absolute bottom-[10%] left-[45.4%] ">
        <div className="flex justify-between items-center gap-1">
          <div onClick={()=>{setIndex(0)}}
            className={`cursor-pointer w-[2.5vh] h-[0.3vh] ${
              index == 0 ? "bg-yellow-100" : "bg-primary-900"
            }`}
          ></div>
          <div  onClick={()=>{setIndex(1)}}
            className={`cursor-pointer w-[2.5vh] h-[0.3vh] ${
              index === 1 ? "bg-yellow-100" : "bg-primary-900"
            }`}
          ></div>
          <div  onClick={()=>{setIndex(2)}}
            className={`cursor-pointer w-[2.5vh] h-[0.3vh] ${
              index === 2 ? "bg-yellow-100" : "bg-primary-900"
            }`}
          ></div>
          <div  onClick={()=>{setIndex(3)}}
            className={`cursor-pointer w-[2.5vh] h-[0.3vh] ${
              index === 3 ? "bg-yellow-100" : "bg-primary-900"
            }`}
          ></div>
        </div>
      </div>
    </>
  )
}

export default SliderButton
