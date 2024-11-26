// export interface NewOption {
//     value: string;
//     label: string;
// }

import React, { Dispatch } from "react";


export interface NewSelectProps {    
    onChange: (e: any) => void;
    placeholder?:string;
    autofocus?:boolean;
    value: string | number
    id?: string 
    labelname?: string 
    star?: boolean 
    data: string[] | { value: string, label: string }[]
    icon?:JSX.Element
    wordEntered?: string
    changeValues?: (value: string, name: string) => void
    setWordEntered?: React.Dispatch<React.SetStateAction<string>>
    isUpload:boolean
    name?: string
    defaultVal?: string,
    uploadBtnTxt?: string,
    typeaccept?:string
    content?:string
    disabled?:boolean
}
export interface selectPickerPropsType {    
    onChange: (e: any) => void;
    onClick:(e:any)=> void;
    placeholder?:string;
    autofocus?:boolean;
    setAutoFocus?:any;
    value: string;
    id?: string;
    labelname?: string 
    star?: boolean 
    data: { value: string, label: string }[]
    icon?:JSX.Element
    changeValues?: (value: string, name: string) => void
    isUpload?:boolean
    name: string
    defaultVal?: string,
    uploadBtnTxt?: string,
    typeaccept?:string
    content?:string
    disabled?:boolean
    isRecomm?:boolean
    isFilter?:boolean
    optionText?:string
    setState?: React.Dispatch<React.SetStateAction<any | undefined>>

}

