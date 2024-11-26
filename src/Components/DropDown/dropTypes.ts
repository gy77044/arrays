export type TdropTypes = { filteredData: string[], handleClick: (text: string) => void, upload: boolean, uploadBtnTxt?: string, handleChange: (e: any) => void,typeaccept?: string }
export type SelectPickerDropTypes = {name:string, isRecomm?:boolean, filteredData: string[],  handleClick: ({ name, value }: {name: string;value: string;}) => void, upload: boolean, uploadBtnTxt?: string, handleChange: (e: any) => void,typeaccept?: string,optionText?:string,setState?:React.Dispatch<React.SetStateAction<any | undefined>>; }
