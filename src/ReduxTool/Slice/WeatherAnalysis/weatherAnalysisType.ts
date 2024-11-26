export interface IWeatherDataTypes extends IWeatherSelect {
    dataType: string,
    city: string,
    latlng: string,
    distancefromsite: number,
    elevation: number,
    ghi: number,
    dni: number,
    gic: number,
    windspeed: number,
    snowfall: string,
    lastupdateOn: string,
    avgambintTemp: number,
    isSaveweatherdata: boolean,
    csvData:any,
    toggleOrientationModal:boolean
}


export interface IWeatherSelect {
    weatherdatasource: string,
    corrosivity: string,
}
