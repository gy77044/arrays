export type OTPModalProps = {
    sendOtp: () => void
    text: string,
    otp: string | number,
    setHide: React.Dispatch<React.SetStateAction<boolean>>,
    verified: { email: boolean, mobile: boolean }
    setVerified: React.Dispatch<React.SetStateAction<{
        email: boolean;
        mobile: boolean;
    }>>,
    setToggle: React.Dispatch<React.SetStateAction<{
        emailVerify: boolean;
        mobileVerify: boolean;
    }>>,
    toggle: {
        emailVerify: boolean;
        mobileVerify: boolean;
    }
    

}

export interface SignInOTPProps {
    handleShow: any,
    text: string
}

export type TOTP = { first: string, second: string, third: string, fourth: string }