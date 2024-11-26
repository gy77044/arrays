import react, { memo, FC } from 'react';
import { IconInfo } from '../../../assests/icons/DrawerIcons';
import './tooltip.css'
const Tooltip: React.FC<{ position?: 'right' | 'left' | 'buttom' | 'top', msg: string }> = ({ position, msg }) => {
    return <span className="float-right relative mt-[-8px]">
        <div className="component--example">
            <p className="cursor-pointer">
                <span className="tooltip" data-tooltip={msg} data-tooltip-pos={position || "right"} data-tooltip-length="medium"><IconInfo /></span>
            </p>
        </div>
    </span>
}
export default memo(Tooltip);