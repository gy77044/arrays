import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSelect: false as boolean,
  
}

export const NewSelectReducer = createSlice({
    name: "selectslice",
    initialState,
    reducers: {
        setIsSelect: (state, { payload }: PayloadAction<boolean>) => {
            state.isSelect = payload
        },
       
        
    },
});


export const { setIsSelect } = NewSelectReducer.actions
export default NewSelectReducer.reducer;