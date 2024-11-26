import React, { useState } from 'react';
import ReactSelect from '../../Components/New/Select/ReactSelect';
import { IconThreeDots } from '../../assests/icons/Icons';
import { Button } from '../../Components/AllButton/AllButtons.tsx';
import { toTitleCase } from '../../Utils/commonFunctions';

export interface RowData {
    [key: string]: any;
}

type listType = {
    name: string,
    id: string
}

type optionsType = {
    [key: string]: listType[]
}

type valueType = {
    [key: string]: string
}

interface GlobalTableProps {
    rowData: RowData[],
    columns: string[],
    tableName: string,
    buttonName?: string,
    optionList?: optionsType,
    id?: string,
    value?: valueType,
    onButtonClick?: (e: any) => void
    onChange?: (e: any, row: RowData, column: string) => void
    onClick?: (id: any) => void
    handleTheThreeDots?: (e: any, action: string) => void

}

interface PropsType {
    label: string,
    value: string
}


const GlobalTableForLSBDetails: React.FC<GlobalTableProps> = ({ handleTheThreeDots, onClick, rowData, columns, tableName, buttonName, onButtonClick, id, value, onChange, optionList }) => {


    let optionArray = [] as any

    if (optionList !== undefined) {
        optionArray = Object.keys(optionList)
    }





    const renderTheActions = (id: any) => {
        return (
            <ul className="border-[#FAF3E6] border-[0.4vh] grid gap-y-3 p-1 absolute top-[43px] z-1 bg-white" style={{ zIndex: 1 }}>
                <li>
                    <button type="button" onClick={() => handleTheThreeDots?.(id, "edit")}>Edit</button>
                </li>
                <li>
                    <button type="button" onClick={() => handleTheThreeDots?.(id, "duplicate")}>Duplicate</button>
                </li>
                <li>
                    <button type="button" onClick={() => handleTheThreeDots?.(id, "delete")}>Delete</button>
                </li>
            </ul>
        )
    }



    return (
        <>
            <div className='rounded-lg border border-gray-200 bg-gray-100 p-4'>
                <div className="para-md mb-2">{tableName}</div>
                <div className='overflow-x-auto'>
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-left">
                        <tr className="">
                            {columns.map((column, index) => {
                                return (
                                    <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{toTitleCase(column)}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rowData.length>0?rowData.map((row, index) => {
                            return (
                                <tr key={`${index}/${row}`} className="">
                                    {columns.map((column,) => {
                                        return (
                                            <>
                                                {typeof row[column] === "boolean" ? (
                                                    <>
                                                        <td key={`${column}/${index}`} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 relative" style={{ "whiteSpace": "nowrap",textAlign:'center' }}>
                                                            <button type="button" onClick={(id) => onClick?.(row["id"])}><IconThreeDots /></button>
                                                            {row[column] === true && renderTheActions(row["id"])}
                                                        </td>
                                                    </>
                                                ) :
                                                    (optionArray.includes(column) && optionList !== undefined) ?
                                                        (<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                            <ReactSelect closeMenuOnSelect={true} onChange={(e: any) => onChange?.(e, row, column)} options={optionList[column].map((el: any) => ({ label: el.name, value: el.id }))} value={value?.[column]!} name={column} />
                                                        </td>)
                                                        :
                                                        (<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{row[column]}</td>)
                                                }

                                            </>
                                        )
                                    })}
                                </tr>
                            )
                        }):<tr><td className='text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900' colSpan={columns.length}>No Details Found</td></tr>}
                    </tbody>
                </table>
                </div>
                {buttonName !== undefined && (<div className="mt-1 w-full h-fit flex justify-end items-center">
                    {/* <button type="button" onClick={onButtonClick} className="light-sm-btn">{buttonName}</button> */}
                    <Button className="btn btn-xs-primary" name={buttonName} onClick={onButtonClick}/>

                </div>)}
            </div>
        </>
    )
}

export default GlobalTableForLSBDetails
