import { createSlice } from "@reduxjs/toolkit";
import { EPCFormType } from "../../../Screen/UserVerification/UserTypeList";
import { newgeneratedId } from "../../../Utils/commonFunctions";
import { SubUserTypeOpt, UserTypeOpt } from "../Dashboard/dashboardTypes";
interface initialStateType {
    epcData: EPCFormType,
    usertype:UserTypeOpt
    usersubtype: SubUserTypeOpt,
}
const initialState: initialStateType = {
    epcData: { userid: "", cityname: [], companyId: newgeneratedId(), companyName: "", companyAddress: "", registrationNumber:"", registrationDoc: "", statename: [], dippDoc: "", isstartup: false } as EPCFormType,
    usertype:{} as UserTypeOpt,
    usersubtype: {} as SubUserTypeOpt
};

const UserVerifyReducer = createSlice({
    name: 'userVerifyReducer',
    initialState,
    reducers: {
        setEpcFormData: (state, { payload }) => {
            state.epcData = payload
        },
        setusertype:(state,{payload})=>{
            state.usertype = payload
        },
        setusersubtype: (state, { payload }) => {
            state.usersubtype = payload
        },
    },
});
export const { setEpcFormData, setusersubtype,setusertype } = UserVerifyReducer.actions
export default UserVerifyReducer.reducer