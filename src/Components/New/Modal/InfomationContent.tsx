import React from 'react'
import { IconClose, IconNewClose } from '../../../assests/icons/ModalIcons'
import { toogleTooltip } from '../../../ReduxTool/Slice/Map/MapReducer';
import { useAppDispatch } from '../../../ReduxTool/store/hooks';

const InfomationContent = ({displayDrawer,isToolTip}:{displayDrawer: boolean,isToolTip: {dipx?: number;dipy: number;istooltip: string;msg: string;}}) => {
  const dispatch = useAppDispatch()
  return (
    <>
    <div className={`info-content absolute w-[12vh] h-fit epc-tooltip-model z-50  rounded-default ${displayDrawer ? "block" : "hidden"}`}
       style={{ left: isToolTip.dipx ? `${isToolTip.dipx+20}px` : '45vh', top: `${isToolTip.dipy-31}px` }}>
      <div className="info-header">
        <div className="info-title  text-1.6xl font-semibold leading-[2vh]">{isToolTip.istooltip.includes("Roof")?"Roof Design":isToolTip.istooltip}</div>
        <div  className='cursor-pointer' onClick={()=>{  dispatch(toogleTooltip({dipy:0,istooltip:"",msg:""}))}}>
          <IconNewClose />
        </div>
      </div>
      <div className="info-body" onClick={(e)=>{e.stopPropagation()}}>
        {isToolTip.msg} 
        {isToolTip.istooltip.length > 0 && (
    <>
    &nbsp;
      <a 
        href="https://terranxt.com/?page_id=2034" 
        target="_blank" 
        rel="noopener noreferrer"
        className=" info-body underline hover:font-medium hover:text-primary-100"
      >
        Explore
      </a>
    </>
  )}
      </div>
      <div className={`absolute left-[-10px] top-[1vh] transform -translate-y-1/2 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-white`}></div>
    </div>
    </>
  )
}

export default InfomationContent
