import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { getStateDiscom, getTerrifData } from "./CommonActions";
import { IallTypestate } from "./types";

export const CommonExtraBuilders = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(getStateDiscom.fulfilled, (state, { payload }: PayloadAction<IallTypestate[]>) => {
         state.allDiscom = payload;
        })
        .addCase(getStateDiscom.pending, (state, { payload }) => {
            state.loading = "loading";
        })
        .addCase(getStateDiscom.rejected, (state, { payload }) => {
            state.allDiscom = []
            state.loading = "failed";
            state.error = true;
        })
        .addCase(getTerrifData.fulfilled, (state, { payload }) => {
            state.loading = "success"
            state.providertype = payload
        })
        .addCase(getTerrifData.pending, (state, { payload }) => {
            state.loading = "loading"
        })
        .addCase(getTerrifData.rejected, (state, { payload }) => {
            state.loading = "failed"
        });
}
