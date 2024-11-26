import { useState } from "react"
import { toggleInfoModal } from "../../ReduxTool/Slice/InfoModal/InfoModalReducer"
import { IconClose } from "../../assests/icons/ModalIcons"
import { useAppDispatch, useAppSelector } from "../../ReduxTool/store/hooks"

const InfoSlider = () => {
    const dispatch = useAppDispatch()
    const { info, isOpen, position } = useAppSelector(state => state.infoModal)

    const handleClose = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(toggleInfoModal(false))
    }

    return (
        <>
            {isOpen && (
                <div className='absolute'
                    style={{ top: `${position.x}px`, left: `${position.y - 100}px` }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="header-title">
                               header
                            </div>
                            <button onClick={e => handleClose(e)}>
                                <IconClose />
                            </button>
                        </div>

                        <div className="modal-body overflow-auto custom-scrollbar-css">
                            Subtext
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default InfoSlider
