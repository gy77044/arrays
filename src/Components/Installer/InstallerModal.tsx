import { openInstallerModal } from '../../ReduxTool/Slice/Installer/InstallerReducer'
import { IconClose } from '../../assests/icons/ModalIcons'
import { IconTick } from '../../assests/icons/SussessModalIcons'
import { useAppDispatch } from '../../ReduxTool/store/hooks'

const InstallerModal = () => {
    const dispatch = useAppDispatch()
    const handleInstaller = () => {
        dispatch(openInstallerModal(false))
    }
    return (
        <>
            <div className="relative p-1">
                <div className="absolute top-[1vh] right-[1vh] cursor-pointer" onClick={e => dispatch(openInstallerModal(false))}><IconClose /></div>
                <div className='modal-header flex flex-col justify-center items-center'>
                    <IconTick />
                    <div className="h2"></div>
                    <div className='text-2.4xl font-semibold'>Instalation Booked successfully</div>
                    <div className="h3"></div>
                    <div className="text-1.6xl leading-[2vh] text-grey-200   ">
                        <i>
                            We are delighted to inform you that we received your <br />
                            order. To install the solar kit <span className="font-bold text-primary-200 cursor-pointer" onClick={handleInstaller}> View Status</span>
                        </i>
                    </div>
                </div>
            </div>

        </>
    )
}

export default InstallerModal
