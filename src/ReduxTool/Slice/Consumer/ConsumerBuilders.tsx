import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { calcTariffRate, fetchFinanceby, fetchpVAPIMonthly, fetchpVAPIMonthlyCase2, generationdegradation, getCostBracket } from "./ConsumerActions";
import { FinRes, initialstateType } from "./types";
import { ProjectTy } from "../Auth/types";
import { deleteProjectbyId, saveConsumerProjects, updateOrderStatusCard, getProjectsByProjectid ,getPrtojects } from "./ProjectServices/projectServices";
import { initailFromdata, initialState } from "./ConsumerReducers";

export const ConsumerBuilders = (builder: ActionReducerMapBuilder<initialstateType>) => {
  builder
    .addCase(getPrtojects.fulfilled, (state, { payload }: PayloadAction<ProjectTy[]>) => {
      state.projects = payload;
      state.isLoading = false;
    }).addCase(getPrtojects.pending, (state, { payload }) => {
      state.isLoading = true;
      state.projects = null;
    }).addCase(getPrtojects.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.projects = null;
    })
    //getProjectsByProjectid
    .addCase(getProjectsByProjectid.fulfilled, (state, { payload }: PayloadAction<ProjectTy>) => {
      state.roofAnalysis.selected_project = JSON.parse(JSON.stringify(payload));
      state.isLoading = false;
    }).addCase(getProjectsByProjectid.pending, (state, { payload }) => {
      state.isLoading = true;
      state.roofAnalysis.selected_project = null;
    }).addCase(getProjectsByProjectid.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.roofAnalysis.selected_project = null;
    })
    //saveConsumerProjects
    .addCase(saveConsumerProjects.fulfilled, (state, { payload }: PayloadAction<ProjectTy>) => {
      state.roofAnalysis.selected_project = payload;
      state.isLoading = false;
    }).addCase(saveConsumerProjects.pending, (state, { payload }) => {
      state.isLoading = true;
      state.roofAnalysis.selected_project = null;
    }).addCase(saveConsumerProjects.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.roofAnalysis.selected_project = null;
    })
    //calcTariffRate
    .addCase(calcTariffRate.fulfilled, (state, { payload }: PayloadAction<number>) => {
      state.roofAnalysis.formDetails.projectSetup.electricityrate = payload;
      state.isLoading = false;
    }).addCase(calcTariffRate.pending, (state, { payload }) => {
      state.isLoading = true;
      state.roofAnalysis.formDetails.projectSetup.electricityrate = 0;
    }).addCase(calcTariffRate.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.roofAnalysis.formDetails.projectSetup.electricityrate = 0;
    })
    //updateOrderStatusCard
    .addCase(updateOrderStatusCard.fulfilled, (state, { payload }: PayloadAction<any>) => {
      const index = state.projects!.findIndex((item) => item.projectid === payload.projectid);
      if (index !== -1) {
        state.projects![index] = payload;
        state.isLoading = false;
      } else {
        state.projects!.push(payload);
      }
    })
    .addCase(updateOrderStatusCard.pending, (state, { payload }) => {
      state.isLoading = true;
    })
    .addCase(updateOrderStatusCard.rejected, (state, { payload }) => {
      state.isLoading = false;
    })
    .addCase(getCostBracket.fulfilled, (state, { payload }) => {
      state.roofAnalysis.formDetails.quickplantAnalysis.costbracket = payload;
      state.isLoading = false
    })
    .addCase(getCostBracket.pending, (state, { payload }) => {
      state.isLoading = true
    })
    .addCase(getCostBracket.rejected, (state, { payload }) => {
      state.roofAnalysis.formDetails.quickplantAnalysis.costbracket = "";
      state.isLoading = false
    })
    .addCase(fetchpVAPIMonthly.fulfilled, (state, { payload }: PayloadAction<{ generation: any, stringPerModule: number }>) => {
      const data = payload?.generation??null
      state.roofAnalysis.formDetails.quickplantAnalysis.stringPerModule = payload?.stringPerModule
      if (typeof data === 'object' && data !== null && Object.keys(data).length > 0){
        state.roofAnalysis.formDetails.quickplantAnalysis.electricityGenerated = data['Annual AC energy in Year 1']
        state.roofAnalysis.formDetails.quickplantAnalysis.performanceRatio = data['Performance ratio in Year 1']
      }
      state.isLoading = false;
    })
    .addCase(fetchpVAPIMonthly.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(fetchpVAPIMonthly.rejected, (state, { payload }) => {
      state.isLoading = false;
    })
    .addCase(fetchpVAPIMonthlyCase2.fulfilled, (state, { payload }: PayloadAction<string>) => {
      const data = JSON.parse(payload);
      // state.roofAnalysis.formDetails.quickplantAnalysis.electricityGenerated2 = data['Annual AC energy in Year 1']
      if (typeof data === 'object' && data !== null && Object.keys(data).length > 0) {
        state.roofAnalysis.formDetails.quickplantAnalysis.electricityGenerated2 = data['Annual AC energy in Year 1'];
      } else {
        console.error('Data is either not an object or is empty');
      }
      state.isLoading = false
    })
    
    .addCase(fetchpVAPIMonthlyCase2.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(fetchpVAPIMonthlyCase2.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.roofAnalysis.formDetails.quickplantAnalysis.electricityGenerated2 = null;
    })
    .addCase(fetchFinanceby.fulfilled, (state, { payload }:PayloadAction<FinRes>) => {
      state.roofAnalysis.formDetails.projectSummary.financial = payload;
      state.isLoading = false;

    })
    .addCase(fetchFinanceby.pending, (state, { payload }) => {
      state.isLoading = true;
    })
    .addCase(fetchFinanceby.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.roofAnalysis.formDetails.projectSummary.financial = null;
    })
    .addCase(generationdegradation.fulfilled, (state, { payload }) => {
      state.roofAnalysis.formDetails.projectSummary.degradation = payload
      state.isLoading = false;
    })
    .addCase(generationdegradation.pending, (state, { payload }) => {
      // Add user to the state array
      state.isLoading = true;
  })
  .addCase(generationdegradation.rejected, (state, { payload }) => {
    state.roofAnalysis.formDetails.projectSummary.degradation = null
    state.isLoading = false;
  })

  // project api services builder 
  .addCase(deleteProjectbyId.pending,  (state, { payload }) => {})
  .addCase(deleteProjectbyId.rejected,  (state, { payload }) => {
    console.warn(payload, 'project could not be deleted')
  })
  .addCase(deleteProjectbyId.fulfilled,  (state, { payload }) => {
    if(state.projects){
      state.projects = state.projects.filter(ele => ele.projectid !== payload)
    }
    state.roofAnalysis.selected_project = null;
    state.roofAnalysis.formDetails = initailFromdata

  })
}
