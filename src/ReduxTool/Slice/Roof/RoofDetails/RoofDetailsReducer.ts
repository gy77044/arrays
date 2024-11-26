import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const RoofDetailsReducer = createSlice({
    name:'roofdetails',
    initialState:{
        editable:false as boolean
    },
    reducers:{
        setEditable:(state, {payload}: PayloadAction<boolean>)=>{
            state.editable= payload
        }

    }
})

export const {setEditable} = RoofDetailsReducer.actions
export default RoofDetailsReducer.reducer;