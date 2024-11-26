import React from 'react'
import { IconTick } from '../../assests/icons/SussessModalIcons'
import { useAppDispatch } from '../../ReduxTool/store/hooks'
import { openSucessModal } from '../../ReduxTool/Slice/Installer/InstallerReducer'
import { IconClose } from '../../assests/icons/ModalIcons'
import { setTitle } from '../../ReduxTool/Slice/Drawer/DrawerReducer'

const SummaryModal = () => {
    const dispatch = useAppDispatch()
    const handleChange = () => {
        // dispatch(setTitle("orderStatus"))
        dispatch(openSucessModal(false))
    }
    return (
        <>
            <div className="relative p-1">
                <div className="absolute top-[1vh] right-[1vh] cursor-pointer" onClick={e => dispatch(openSucessModal(false))}><IconClose /></div>
                <div className='modal-header flex flex-col justify-center items-center'>
                    <IconTick />
                    <div className="h2"></div>
                    <div className='text-2.4xl font-semibold'>Order placed successfully</div>
                    <div className="h3"></div>
                    <div className="text-1.6xl leading-[2vh] text-grey-200   ">
                        <i>
                            We are delighted to inform you that we received your <br />
                            order. To install the solar kit <span className="font-bold text-primary-200 cursor-pointer" onClick={handleChange}> View Installers Near Me</span>
                        </i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SummaryModal
