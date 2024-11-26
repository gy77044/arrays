
const MdModal = ({ handleClose, buttonText, title, subTitle }: { handleClose: () => void, buttonText: string, title: string, subTitle?: string }) => {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40 text-primary-100"

            ></div>
            <div className="flex items-center min-h-screen px-4">
                <div className="relative w-[46vh] h-[46vh] p-2 mx-auto bg-white rounded-md shadow-default">
                    <div className="flex items-center justify-center">
                        {title}
                        <div className="">
                            <div className="flex items-center justify-center flex-none w-[3.5vh] h-[3.5vh] mx-auto
                                                    bg-white rounded-full">
                                {/* Header Icon here */}
                            </div>
                            <div className="mt-1 text-center ">
                                <button className="text-2.4xl text-red-200 font-medium  leading-[1.3vh] p-1">
                                    {buttonText}
                                </button>
                            </div>

                            <div className="relative bottom-[40vh] left-[36vh]" onClick={() => handleClose}>
                                {/* Close Icon here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MdModal
