
import { createSlice } from "@reduxjs/toolkit"


interface ACCBTableType {
    id:any
   name:string,
   details:string,
   actions:boolean
}


interface EEDType{
    accbTableDetails:ACCBTableType[]
}

type incomingTy={
    name:string,
    type:string,
    rating:string
  }
  interface PropsType{
    incomming:incomingTy[],
    outgoing:incomingTy[]
  }
  

type accbTableListType = {
    id:string,
    ACCBName:string,
    noOfMFMs:string,
    noOfIncomingTeriminals:string,
    SPDType:string,
    accuracyClassOfMFMs:string,
    noOfOutGoingTeriminals:string,
    // inAndOutTerminals:PropsType
} 


interface InitialStateType{
    toggleEDDModal:boolean,
    accbTableList:accbTableListType[],
    accbTableDetails:ACCBTableType[],
}


const initialState:InitialStateType={
    toggleEDDModal:false,
    accbTableDetails:[],
    accbTableList:[]
}

export const EEDSlice = createSlice({
    name:"electricalEquipmentDesigningSlice",
    initialState,
    reducers:{
         toggleTheEDDModal:(state,action)=>{       
            state.toggleEDDModal = action.payload
         },
         addTheAccbRow:(state,action)=>{
            state.accbTableDetails=[...state.accbTableDetails,action.payload]
         },
         deleteTheAccbRow:(state,action)=>{
            state.accbTableDetails = state.accbTableDetails.filter((each)=>each.id!==action.payload)
            state.accbTableList = state.accbTableList.filter((each)=>each.id!==action.payload)
         },
         duplicateTheAccbRow:(state,action)=>{
             const array = state.accbTableDetails.map((each)=>({...each}))
             const originalItem = array.find(each=>each.id===action.payload.id)
             const arrayOfList = state.accbTableList.map((each)=>({...each}))
             const Item = arrayOfList.find(each=>each.id===action.payload.id)
             if (originalItem!==undefined && Item!==undefined){
                 state.accbTableDetails = [...state.accbTableDetails,{...originalItem,id:action.payload.newId,actions:false}]
                state.accbTableList = [...state.accbTableList,{...Item,id:action.payload.newId}]

             }
         },
         ToggleTheActionModal:(state,action)=>{
            const updatedAccbData = state.accbTableDetails.map((each)=>{
                if (each.id===action.payload){
                    return {...each,actions:!each.actions}
                }
                return {...each,actions:false}
            })
            state.accbTableDetails = updatedAccbData
         },
         addACCBDesignDetails:(state,{payload})=>{  
            const accbTableArray = state.accbTableDetails.map((each)=>({...each}))
            const array = state.accbTableList.map(each=>({...each}))
            const FormatedAccbTableDetails = {id:payload.id,name:payload.ACCBName,details:`Incoming${payload.noOfIncomingTeriminals} || Outgoing${payload.noOfOutGoingTeriminals}`,actions:false}
           const isExisted = array.find(item=>item.id===payload.id)
           if (isExisted){
            const indexOfExistedItem = array.findIndex(item=>item.id===payload.id)
            array.splice(indexOfExistedItem,1,payload)
            accbTableArray.splice(indexOfExistedItem,1,FormatedAccbTableDetails)
               state.accbTableDetails = accbTableArray
               state.accbTableList = array          

           }
           else{
               state.accbTableList = [...state.accbTableList,payload]
               state.accbTableDetails = [...state.accbTableDetails,FormatedAccbTableDetails]
           }
            
         },
         updateTheAccbTable:(state,{payload})=>{
            const array = state.accbTableList.map((each)=>({...each})) 
            const accbTableArray = state.accbTableDetails.map((each)=>({...each}))
            const index = array.findIndex((each:accbTableListType)=>each.id===payload.id)
            const indexOfAccbTable = accbTableArray.findIndex((each)=>each.id===payload.id)
            const FormatedAccbTableDetails = {id:payload.id,name:payload.ACCBName,details:`Incoming${payload.noOfIncomingTeriminals} || Outgoing${payload.noOfOutGoingTeriminals}`,actions:false}
            array.splice(index,1,payload)
            accbTableArray.splice(indexOfAccbTable,1,FormatedAccbTableDetails)
            state.accbTableList  = array
            state.accbTableDetails = accbTableArray

         },
         toggleACCBArrayActionModal:(state,action)=>{
            const updatedPvArray = state.accbTableDetails.map((each)=>{
                if (each.id===action.payload){
                    return {...each,actions:!each.actions}
                }
                return {...each,actions:false}
            })

            state.accbTableDetails = updatedPvArray
        },
    }
})



export const  {toggleACCBArrayActionModal,updateTheAccbTable,toggleTheEDDModal,addTheAccbRow,deleteTheAccbRow,duplicateTheAccbRow,ToggleTheActionModal,addACCBDesignDetails} = EEDSlice.actions
export default EEDSlice.reducer;