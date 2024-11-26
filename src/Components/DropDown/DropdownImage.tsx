import { useEffect, useState } from "react"
import { useAppSelector } from "../../ReduxTool/store/hooks"

const DropdownImage = ({ filteredData, handleClick }: { filteredData: { name: string, img: string }[], handleClick: (text: string) => void }) => {
    const { Manufactured } = useAppSelector(state => state.equipment.module)
    const [sel, setSel] = useState("false")

    useEffect(() => {
        if (Manufactured) {
            // let filtered = filteredData.filter(ele => ele.toLowerCase() === Manufactured?.toLowerCase())
            // setSel(filtered[0])
        }
    }, [Manufactured])


    return (
        <div id="dropdownHover" className="z-10 top-[6.5vh] w-[29vh] text-1.2xl absolute bg-yellow-200 rounded-default shadow">
            <ul className="py-1 text-sm text-primary-200" aria-labelledby="dropdownHoverButton">
                {filteredData.map((ele, i) => {
                    return (
                        <li className={`cursor-pointer flex flex-start items-center  ${sel === ele.name ? "bg-primary-500 text-white" : "hover:text-white hover:bg-primary-500"}`} onClick={() => handleClick(ele.name)} key={i}>
                            <img src={ele.img} />
                            <p className={` ${sel === ele.name ? "bg-primary-500 text-white" : "hover:text-white hover:bg-primary-500"} block p-2 yellow-200`}>
                                {ele.name}
                                </p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DropdownImage
