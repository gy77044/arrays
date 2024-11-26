import React, { PropsWithChildren } from 'react'
import { IconClose } from './../../../assests/icons/ModalIcons'

interface MaptoolsContainerProp {
    title: string,
    toggle?: boolean
}

const MaptoolsContainer: React.FC<PropsWithChildren<MaptoolsContainerProp>> = ({ title, children, toggle }) => {
    return (
        <>
            {
                 <div className={`absolute right-[3.4vh] top-[0vh] ${(title === "Maps"|| title === "BaseMaps" || title === "Layers" || title === "Shadow")?"block":"hidden"}`} style={{ display: title ? "flex" : "none" }}>
                    <div className={`relative flex flex-col text-center rounded-default w-[25vh] bg-primary-900 text-primary-200 h-fit z-40 overflow-y-auto
                        ${title ? "translate-x-[0vw] " : "right-[-90vh]"}`}
                    >
                        <div className='   '>
                            <div className="bg-yellow-400/10 flex justify-between items-center h-[5vh] text-primary-100 rounded-default text-1.6xl border-[0.01vh] border-brown-100/10  px-1.8">{title}
                              {/* <div className='hover:bg-primary-800 hover:scale-110 cursor-pointer '><IconClose/></div> */}
                              </div>
                        </div>
                        <div className=''>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MaptoolsContainer
