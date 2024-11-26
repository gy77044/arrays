import { JsxElement } from "typescript"
import { TinputType } from "../../Utils/Const"
import { ChangeEvent, ChangeEventHandler, Key } from "react"

export type NewinputType = "text" | "number" | "date" | "checkbox" | "password" | "email"


export interface IInpProps {
    id?: string,
    label?: string,
    info?: string,
    name: string,
    value: string,
    placeholder?: string
    type: TinputType
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onBlur?:()=>void;
    onFocus?:()=>void;
    onBtnTitleClick?:()=>void,
    isRequired?: boolean,
    error?: string | null,
    btntitle?:string,
    disabled?: boolean,
    helpertext?: string,
    btnDisabled?:boolean,
    handlefocus?:(e:any)=>void
    suficon?:JSX.Element
    suftext?:string
    key?:Key | null | undefined
    handleSufIcon?:(e:any)=>void;
    autoComplete?:string
};


export interface Textareaty {
    id?: string,
    label?: string,
    info?: string,
    name: string,
    value: string,
    placeholder?: string
    type: TinputType
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    onBlur?:()=>void;
    onFocus?:()=>void;
    onBtnTitleClick?:()=>void,
    isRequired?: boolean,
    error?: string | null,
    btntitle?:string,
    disabled?: boolean,
    helpertext?: string,
    btnDisabled?:boolean,
    handlefocus?:(e:any)=>void
    suficon?:JSX.Element
    suftext?:string
    key?:Key | null | undefined
};



export interface INewInputProps {
    id?: string,
    labelname?: string,
    name: string,
    value: string | number,
    placeholder?: string
    type: NewinputType
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    star?: boolean,
    icon?: JSX.Element,
    disabled?: boolean
    maxLength?: number
    content?: string
    hideIcon?: boolean
    max?: string,
    min?: string,
    handlefocus?: (e: any) => void
    onBlur?: (e: any) => void
    autoFocus?: boolean
    onKeyPress?: (e: any) => void
    onKeyUp?: (e: any) => void
    isLoging?: boolean
    title?: string
    tooltipInfo?: string,
    tooltipPositon?: 'right' | 'left' | 'buttom' | 'top',
    submitBtnTxt?: string,
    errors?: boolean,
    helpertext?: string
}

export interface IInputPropsHlp {
    id?: string,
    labelname?: string,
    name: string,
    value: string | number,
    placeholder?: string
    type: TinputType
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    star?: boolean,
    autoFocus?: boolean,
    errors?: boolean,
    helpertext?: string
};
export interface IInputProps {
    id?: string,
    labelname?: string,
    name: string,
    value: string | number,
    placeholder?: string
    type: TinputType
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    star?: boolean,
    autoFocus?: boolean,
    icon?: JSX.Element,
    errors?: boolean,
    helpertext?: string
};

export interface IInfoProps {
    id?: string,
    labelname?: string,
    content?: string,
    link?: string,
    linkbtnTxt?: string,
    name: string,
    value: string | number,
    placeholder?: string
    type: TinputType
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    star?: boolean,
    errors?: boolean,
    helpertext?: string
    infoicon?: string | JSX.Element
};
export interface IInfoProps1 {
    id?: string,
    infoicon?: string | JSX.Element
    content?: string,
    link?: string,
    linkbtnTxt?: string,
};
export interface IInfoProps2 {
    id?: string,
    infoicon?: string | JSX.Element
    content?: string,
    link?: string,
    linkbtnTxt?: string,
};


export interface ICheckboxType {
    id?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    labelname: string,
    name: string,
    isChecked: boolean
    disabled?: boolean
    error?: string|undefined
}
export interface IRadioProps<T> {
    options: radioButtonOptions[]; // The array of options with label and value
    name: string; // Name attribute for the radio group
    onChange: ChangeEventHandler<T> | undefined;
    // Callback for the selected value
    id?: string; // Optional id attribute
    labelname?: string; // Optional label name for the radio group
    isChecked?: boolean; // Optional to check default value
    selectedValue?:string
    value:string
    disabled?:boolean
}

export interface radioButtonOptions {
    label: string;
    value: string;
}


export interface IToggle1Props {
    label: string;
    isChecked?: boolean;
    onToggle?: (checked: boolean) => void;
}

export interface IToggle2Props {
    label: string;
    onToggle: (checked: boolean) => void;
    defaultChecked?: boolean;
}

export interface IToastProps {
    msg:string,
    desc:string
}


export interface Modal5Ty{
    name:string;
    modalName:string;
    description:string
    cancelBtn:string;
    yesBtn:string;
    closeModal:()=>void;
    modalSize: 'lg' | 'md' | 'sm' | 'sm-x' | 'small';
    id?:string
    handleModal:()=>void;
    updateModal?:()=>void;

}


export interface ITableProps {
    tableCaption?: string;
    headers: string[];
    data: {}[];
    showCheckboxes?: boolean;
    showBtn?: boolean;
    onRowSelect?: (id: string) => void;
    onSelectAll?: () => void;
    renderButtons?: (id: string) => React.ReactNode;
    secTitle?: string;
  }


export interface EditableTableTy{
    tableCaption?: string;
    header:string[],
    data:{}[];
    handleEditClick:()=>void;
    handleChange:(e:any,i:number)=>void;
    toggleContentEditable:boolean;
    editColName:string;
    isEditAble:boolean;

}  



export interface SubTableTy{
    headers:string[];
    data:any;
    subTableNames:string[]
}

export interface ProfileTy {
    fname: string | null;
    lname: string | null;
    userEmail: string | null;
    userMobile: string | null;
    countrycode: string;
    isvalid: boolean;
    profileimage: any;
  }
  
  export interface SupportDTy {
    fname: string;
    lname: string;
    mobile: string;
    countrycode: string
    subject: string;
    message: string;
  }
  
  export interface SettingTy {
    language: string;
    units: string;
    currrency: string;
  }