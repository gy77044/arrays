import React from 'react'
import StatusCard from './StatusCard'
import { IconCall, IconDistance, IconStar } from '../../assests/icons/DrawerIcons'

const OrderStatus = () => {
  const date = new Date().toISOString()
  let star = 5.0
  return (
    <>
      <div className="h2"></div>
      {/* <StatusCard /> */}
      <div className='relative p-0.4'>
        <div className="h1"></div>
        <div className="flex items-center text-primary-200 font-semibold text-1.8xl">Tata Solar Solution</div>
        <div className="h1"></div>
        <div className='flex items-center'>
          <div className='flex text-yellow-100 font-normal'>0.4
            <div className='pl-0.2 font-normal'>km</div>
          </div>
          <div className='border-r-[0.3vh] border-primary-600 h-[1.5vh] pr-0.6'></div>
          <div className='flex items-center pl-0.6 text-yellow-100 font-normal'>{star.toFixed(1)}
            <div className='flex items-center pl-0.4'>
              { new Array(5).fill(star).map((i) => {
                return (
                  <IconStar key={i} />
                )
              }) }

            </div>
          </div>
        </div>
        <div className="h1"></div>
        <div className='flex items-center'>
          <IconDistance />
          <div className='text-primary-200 text-1.2xl font-normal leading-[2vh]'>22 Circular Road, Dhaka1205,
            Bangladesh
          </div>
        </div>
        <div className="h1"></div>
        <div className='flex items-center'>
          <IconCall />
          <button className='text-primary-200 text-1.2xl font-normal '>+91 4564445265</button>
        </div>

      </div>
      <div className="h2"></div>
      <div className="h2"></div>
      <ol className="relative border-l border-gray-200">
        <div className="h2"></div>
        <li className="mb-2 ml-1">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-0.6 -left-[0.7vh] border border-primary-400 bg-primary-400"></div>
          <div className="mb-1 text-1.2xl font-normal text-primay-400 ">{date}</div>
          <div className="h1"></div>
          <h3 className="text-primary-100 font-semibold text-1.8xl">In process</h3>
          <div className="h1"></div>
          <p className="text-primary-200 text-1.2xl font-normal leading-[2vh]">22 Circular Road, Dhaka1205, Bangladesh</p>
          <a href="#" className="text-primary-200 text-1.2xl font-normal ">Learn more.. </a>
        </li>
        <div className="h2"></div>
        <li className="mb-2 ml-1">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-0.6 -left-[0.7vh] border border-primary-600 bg-primary-600"></div>
          <div className="mb-1 text-1.2xl font-normal text-primay-400 ">{date}</div>
          <div className="h1"></div>
          <h3 className="text-primary-100 font-semibold text-1.8xl">On The Way</h3>
          <div className="h1"></div>
          <p className="text-primary-200 text-1.2xl font-normal leading-[2vh]">22 Circular Road, Dhaka1205, Bangladesh</p>
          <a href="#" className="text-primary-200 text-1.2xl font-normal ">Learn more.. </a>
        </li>
        <div className="h2"></div>
        <li className="mb-2 ml-1">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-0.6 -left-[0.7vh] border border-primary-600 bg-primary-600"></div>
          <div className="mb-1 text-1.2xl font-normal text-primary-400 ">{date}</div>
          <div className="h1"></div>
          <h3 className="text-primary-100 font-semibold text-1.8xl">Completed</h3>
          <div className="h1"></div>
          <p className="text-primary-200 text-1.2xl font-normal leading-[2vh]">22 Circular Road, Dhaka1205, Bangladesh</p>
          <a href="#" className="text-primary-200 text-1.2xl font-normal ">Learn more.. </a>
        </li>
      </ol>


    </>
  )
}

export default OrderStatus
