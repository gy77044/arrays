import { NavigateFunction } from "react-router-dom";
import { formDetails } from "./Login";

export interface AuthProps {
    text?: string
}

interface NewUser {
    fname: string;
    lname: string;
    password: string;
    mobile: string;
    email: any;
    activestatus: boolean;
    //mobileverify: boolean;
    emailverify: boolean;
}
export interface IUser {
    // mobileverify: boolean;
    // emailverify: boolean;
    mobile: string;
    fname: string;
    lname: string;
    password: string;
    email: string;
    activestatus: boolean;
}

export type GProps = {
    newUser: NewUser,
    Navigate: NavigateFunction,
    dispatch : any
}

export type OTPprops = {
    text: string;
    resultOTP: number;
    navigation: NavigateFunction;
    dispatch : any
}

export type ForgetOTPprops = {
    text: string;
    resultOTP: number;
    setNewPassword: React.Dispatch<React.SetStateAction<boolean>>
}

type Data = {
    email: string;
    password: string;
    activestatus: boolean;
}

export type Iprops = {
    newData: Data,
    navigate: NavigateFunction,
    dispatch: any
}

export type TsignIn = {
    emailverify: boolean;
    fname: string;
    lname: string;
    password: string;
    mobile: string;
    email: string;
    activestatus: boolean;
}

export type LoginProps = {
    email: string;
    whichuser: number
    password: string;
    Navigate: NavigateFunction;
    dispatch : any
    wrongAttempt:number
    setFormDetails: React.Dispatch<React.SetStateAction<formDetails[]>>,
    formDetails:formDetails[]
}

///Signup type
export interface IFullName {
    fname: string;
    lname: string;
}

export interface IResetPassword{
    password: string
    cpassword: string
}

export interface ISignUp extends IFullName {
    password: string
    mobile: string
    countrycode: string
    isMobileValid:boolean
    email: string
    activestatus: boolean
    dob:any
    fkorgid:string
    type: boolean
};