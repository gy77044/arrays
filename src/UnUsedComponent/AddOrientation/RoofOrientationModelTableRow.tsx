import React from 'react'

/*
        index:i,
        name: getRandomValue('Orientation'),
        RoofType: getRandomValue('RoofType'),
        tiltAngle: getRandomValue('tiltAngle'),
        AzimuthAngle: getRandomValue('AzimuthAngle'),
         */

/**
 
 */


const roofType = [
    { id: "BIPV", type: "BIPV Roof" },
    { id: "Tile", type: "Tile Roof" },
    { id: "Metal", type: "Metal Roof" },
    { id: "RCC", type: "RCC Roof" },
    { id: "Carpark", type: "Carpark Roof" }
]

interface Details {
    index: number;
    name: string;
    RoofType: string;
    tiltAngle: string;
    AzimuthAngle: string;
}

interface Data {
    data: Details;
    updateOrientation: (data: Details) => void;
    isEdit: boolean,

}
const RoofOrientationModelTableRow: React.FC<Data> = ({ data, updateOrientation, isEdit }) => {

    const onTiltAngleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        updateOrientation({ ...data, tiltAngle: String(event.target.value) })

    }

    const onAzimuthAngleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateOrientation({ ...data, AzimuthAngle: String(event.target.value) })
    }

    const onRoofTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateOrientation({ ...data, RoofType: event.target.value })
    }

    return (
        <></>
    )
}


export default RoofOrientationModelTableRow