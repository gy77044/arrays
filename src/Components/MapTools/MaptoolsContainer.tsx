import React, { PropsWithChildren } from 'react'
import { IconClose, IconNewClose } from '../../assests/icons/ModalIcons'
import { store } from '../../ReduxTool/store/store'
import { setMapToolsTitle } from '../../ReduxTool/Slice/MapTools/MapToolsReducer'

interface MaptoolsContainerProp {
    title: string,
    toggle?: boolean
}

const MaptoolsContainer: React.FC<PropsWithChildren<MaptoolsContainerProp>> = ({ title, children, toggle }) => {
    return (
        <>
            {
                 <div onClick={(e)=>{e.stopPropagation()}} className={`absolute right-[4.2vh] top-[7.1vh] ${(title === "Roof Design"|| title === "Infra Design" || title === "Obstruction Detail" || title === "Module Mounting Structure")?"block":"hidden"}`} style={{ display: title ? "flex" : "none" }}>
                    <div className={`relative flex flex-col w-fit bg-white  h-fit  max-h-[90vh] z-10 overflow-y-auto custom-scrollbar-css ${title ? "translate-x-[0vw] " : "right-[-90vh]"}`}>
                        <div className='flex justify-between items-center pr-1'>
                        <div className=" flex justify-between items-center h-[5vh] text-black rounded-default text-1.6xl p-[0.8vh]">{title}</div>
                        <div  className='cursor-pointer' onClick={()=>store.dispatch(setMapToolsTitle(""))}><IconNewClose /></div>
                        </div>
                        <div className='flex justify-between items-center  p-[0.8vh]'>
                        {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MaptoolsContainer
