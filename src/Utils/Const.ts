import { ChangeEvent, Key } from "react"
import { ActionMeta, GroupBase, InputActionMeta, MultiValue, SingleValue } from "react-select"
import { user_mstr_modal } from "../ReduxTool/Slice/Auth/types"
export const USER_TYPE_CONSUMER = 'consumer'
export const USER_TYPE_PARTNER = 'partner'
export const OTP_COUNTER = 60;
export const OTP_COUNT = 3
export interface IUpdateEvent {
    graphics: any
    state: string
    aborted: boolean
    tool: string
    toolEventInfo: ToolEventInfo
    type: string
}

export interface ToolEventInfo {
    dx: number
    dy: number
    mover: any
    type: string
}


export const MINUSEABLEAREA = 15;
export const MAXUSEABLEAREA = 2000;

export const defaultmoduleArea = 3;
export const defaultmoduleWidth = 1.134;
export const defaultmoduleLength = 2.274;
export const defaultmodulePower = 545;
export const voltagepermodule = 500;
export const coverageFactor = 0.8;

export const LocationMarker = 'location-marker'
export interface APIResponse<T> {
    code: string,
    responseData: T,
    message?: string
}
export interface AgGridResponseType<T>{
    page: number
    per_page: number
    total: number
    total_pages: number
    data: T
  }
export type TSignWithOtp = {
    email: string,
    toastId: React.MutableRefObject<any>,
    setShow: (value: React.SetStateAction<boolean>) => void
    show: boolean
}
export type sign = {
    email: string, mobile: string, fname: string, lname: string, isMobileValid: boolean
}

export const elevationIndex  = 'elevationindex'
export const Azimuth  = 'azimuth'
export const TiltAngle  = 'TiltAngle'
export const ElevatedSideHeight  = 'ElevatedSideHeight'
export const zIndex  = 'zIndex'
export const attributeheight  = 'height'
export const attributeElevation  = 'elevation'
export const elevatedSideLength  = 'elevatedSideLength'
export const attributeRings  = 'rings'
export const Panels = 'panels'
export const rooftiltangle = 'rooftiltangle'
export const elevationDirection = 'elevationDirection'
export const originalGeometry = 'originalGeometry'
export const isInvalidGeom = 'isInvalidGeom'

//RoofAnalysis Container
export type TDrawerContainer = {
    title: string;
    Component: () => JSX.Element;
    btnTitle: string;
    headerName: string;
}
//Input Props Type
export type TinputType = "text" | "number" | "date" | "checkbox" | "password" | "email" | "file"

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
    errors?:boolean,
    helpertext?:string
};
export type NewinputType = "text" | "number" | "date" | "checkbox" | "password" | "email"
export interface NewInputProps {
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
    onKeyPress?:(e:any)=>void
    onKeyUp?:(e:any)=>void
    isLoging?:boolean
    title?:string
    tooltipInfo?:string,
    tooltipPositon?:'right'|'left'|'buttom'|'top',
    submitBtnTxt?:string,
    errors?:boolean,
    helpertext?:string,
    suftext?: string
}
export interface InputPropsTy {
    id?: string,
    label?: string,
    name: string,
    value: string | number,
    placeholder?: string
    type: NewinputType
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    icon?: JSX.Element,
    disabled?: boolean
    maxLength?: number
    content?: string
    hideIcon?: boolean
    max?: string,
    min?: string
}
export type selectOptionType = {
    label: string,
    value: string,
}
export interface reactSelectType {
    id?: string,
    name: string,
    placeholder?: string,
    labelname?: string,
    options: any,
    onChange: any,
    value: string | string[] | any ,
    isMulti?: boolean | undefined,
    closeMenuOnSelect?: boolean | undefined,
    isUpload?: boolean | undefined,
    icon?: any,
    isRequired?: boolean,
    infoDetails?: string
    filterOptions?:({ label, value }: {label: any;value: any;}, string: any) => boolean
    disabled?:boolean
    error?: string | null
    pageSize?:number
    isSearchable?:boolean
    handleInputChange?:(newValue: string,name:string,actionMeta: InputActionMeta) => void;
    isLoading?: boolean;
    key?: Key | null | undefined;
    onFoucs?: React.FocusEventHandler<HTMLInputElement> | undefined
}
export const gridOptions = { rowHeight: 60, rowClass: "custom_css_agGrid" };
export const defaultColDef: any = { sortable: true, resizable: true, filter: true, flex: 1, minWidth: 120 };
export interface modalPropsTypes {
    headerTitle: String;
    modalSize: 'lg' | 'md' | 'sm' | 'sm-x' | 'small';
    btnTitle: string;
    secBtnTitle?: string;
    onClick: (isSecBtn?: boolean) => void;
    onSubmit:(e:React.FormEvent) => void;
    children: JSX.Element;
    fontWeight?: string;
    closeModal: (name?: string) => void;
    name?: string;
    subHeaderTitle?: string;
    className?: string;
    overflow?:boolean
    btnVisible?:boolean
};
export type modalPropsType = Omit<modalPropsTypes,"onSubmit">
export type FormModalPropsType = Omit<modalPropsTypes,"onClick">

export const uploadLeadsCsvData = [["First name","Last name", "Address", "Mobile", "Email",], ["Rajat","mishra","Noida one, Noida sec-62, Uttar pradesh","9852122587","example@gmail.com"]];
export type userRole =  "Consumer" |"";
// export type userRole = "Admin" | "Partner" | "Consumer" | "verifyUserType" |"";
export interface AuthState {
    isAuthenticated: boolean
    user: {
        role: userRole
        hassceen: boolean
    }
}
export type AxioMethodType = "put"|"patch"|"get"|"post";
export interface IGeneration {
    pvNxt:string;
    sam:string;
}

export interface CountryLocationInterface {
    address: Address
    location: Location
  }
  
  export interface Address {
    Match_addr: string
    LongLabel: string
    ShortLabel: string
    Addr_type: string
    Type: string
    PlaceName: string
    AddNum: string
    Address: string
    Block: string
    Sector: string
    Neighborhood: string
    District: string
    City: string
    MetroArea: string
    Subregion: string
    Region: string
    RegionAbbr: string
    Territory: string
    Postal: string
    PostalExt: string
    CntryName: string
    CountryCode: string
    X: number
    Y: number
    InputX: number
    InputY: number
  }
  
  export interface Location {
    x: number
    y: number
    spatialReference: SpatialReference
  }
  
  export interface SpatialReference {
    wkid: number
    latestWkid: number
  }


  export const isValidName = (input: string): boolean => {
    return /^[a-zA-Z]+$/.test(input);
  };
  
  export interface authCheckResTy {
    activestatus: boolean
    emailotp: number
    emailverify: boolean
    issignupcomplete: boolean
    userdetails: user_mstr_modal
  }
  export interface suportRequestTy {
    userid: string
    fname: string
    lname: string
    subject: string
    message: string
    mobile: string
  }


  export type TActiveTool = "point" |"polyline" |"polygon" |"circle" |"rectangle" |"move" |"transform" |"reshape" |"rectangle-selection" |"lasso-selection" | null
  