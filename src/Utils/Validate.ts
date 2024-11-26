import { removeWideSpace } from "./commonFunctions"
import { sign } from "./Const"

export const SignUpisValid = ({ email, mobile, fname, lname,isMobileValid }: sign) => {
    if (removeWideSpace(email) === "" || removeWideSpace(mobile) === "" || removeWideSpace(fname) === "" || removeWideSpace(lname) === ""|| isMobileValid===false) {
        return false
    }
    return true
}