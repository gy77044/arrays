import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IWeatherDataTypes, IWeatherSelect } from "./weatherAnalysisType"
const initialState = {
    dataType: "Synthetic Monthly",
    city: "Delhi",
    latlng: "19.1066,72.8836",
    distancefromsite: 48,
    elevation: 437,
    ghi: 1989,
    dni: 0,
    gic: 200,
    windspeed: 10,
    snowfall: "-",
    lastupdateOn: "4 Aug, 2023",
    avgambintTemp: 26.73,
    isSaveweatherdata: false,
    csvData:[],
    toggleOrientationModal:false
} as IWeatherDataTypes


export const WeatherAnalysisReducer = createSlice({
    name: "projectsetup",
    initialState,
    reducers: {
        setweatherData: (state, { payload }: PayloadAction<IWeatherDataTypes>) => {
            state.corrosivity = payload.corrosivity
            state.weatherdatasource = payload.weatherdatasource
            state.dataType = payload.dataType
            state.city = payload.city
            state.latlng = payload.latlng
            state.distancefromsite = payload.distancefromsite
            state.elevation = payload.elevation
            state.ghi = payload.ghi
            state.dni = payload.dni
            state.gic = payload.gic
            state.windspeed = payload.windspeed
            state.snowfall = payload.snowfall
            state.lastupdateOn = payload.lastupdateOn
            state.avgambintTemp = payload.avgambintTemp
        },
        setSaveWeatherData: (state, { payload }: PayloadAction<boolean>) => {
            state.isSaveweatherdata = payload
        },      
        setSelectData: (state, { payload }: PayloadAction<IWeatherSelect>) => {
            state.corrosivity = payload.corrosivity;
            state.weatherdatasource = payload.weatherdatasource;
        },
        setCsvFileData: (state, { payload }: PayloadAction<any[]>) => {
            state.csvData = payload;
           
        },
        toggleTheNoOfOrientationModal:(state,action)=>{
            state.toggleOrientationModal = action.payload
        }

    },
});


export const { toggleTheNoOfOrientationModal,setweatherData, setSaveWeatherData, setSelectData, setCsvFileData } = WeatherAnalysisReducer.actions

export default WeatherAnalysisReducer.reducer;





