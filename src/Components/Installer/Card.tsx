import { openInstallerModal } from '../../ReduxTool/Slice/Installer/InstallerReducer'
import { IconCall, IconClock, IconDistance, IconStar } from '../../assests/icons/DrawerIcons'
import { useAppDispatch } from '../../ReduxTool/store/hooks'

const Card = ({ cardName }: { cardName: string }) => {
  const dispatch = useAppDispatch()
  return (
    <>
      <div className=' flex items-center rounded-default shadow-default'>
        <div className='relative'>
          <div className='m-0.4 mt-1  absolute bg-yellow-100 rounded-default p-1 text-1xl text-yellow-200'>Service In: 12 hours (IST)</div>
          <img className='rounded-l-default w-[22vh]' src={require("../../assests/img/Installer/Rectangle.png")} alt="" />
        </div>
        <div className='relative p-0.4'>
          <div className="flex  items-center text-primary-100 font-semibold text-1.8xl leading-[2vh]">{cardName}</div>
          <div className="h1"></div>
          <div className='flex items-center'>
            <div className='flex text-yellow-100 font-semibold'>0.4
              <div className='pl-0.2 font-semibold'>km</div>
            </div>
            <div className='border-r-[0.3vh] border-primary-600 h-[1.5vh] pr-0.6'></div>
            <div className='flex items-center pl-0.6 text-yellow-100 font-semibold'>5.0
              <div className='flex items-center pl-0.4'><IconStar /><IconStar /><IconStar /><IconStar /><IconStar /></div>
            </div>
          </div>
          <div className="h1"></div>
          <div className='flex items-center'>
            <IconCall />
            <div className='text-primary-200 text-1.2xl font-semibold pl-0.4'>+91 4564445265</div>
          </div>
          <div className="h1"></div>
          <div className='flex items-center'>
            <IconClock />
            <div className='text-primary-200 text-1.2xl font-semibold'>Open Now</div>
            <div className='border-r-[0.3vh] border-primary-600 h-[1.5vh] pr-0.6'></div>
            <div className='text-red-100 text-1.2xl font-semibold pl-0.6'>Closed 10 PM</div>
          </div>
          <div className="h1"></div>
          <div className='flex items-center'>
            <IconDistance />
            <div className='text-primary-200 text-1.2xl font-semibold leading-[2vh]'>22 Circular Road, Dhaka1205,
              Bangladesh
            </div>
          </div>
          <div className="h1"></div>
          <button className='text-1.2xl text-yellow-200 font-semibold py-1.6 px-1.2 rounded-default bg-primary-200' onClick={(e) => dispatch(openInstallerModal(true))}>Book Now</button>
        </div>
      </div>
    </>
  )
}

export default Card
