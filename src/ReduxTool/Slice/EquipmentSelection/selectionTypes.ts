export interface ISelection extends IEquipmentprops {
    module: TModule,
    inverter: TModule,
    mms: IMMS,
    openSolar:boolean,
    showModuleBox:boolean,
    showInverterBox:boolean,
    isSaveEquipmentData:boolean
    moduleData:any
    
}

export interface TModule {
    Manufactured: string
    Name: string
}

export interface IMMS {
    orientation: string
    roofEdgeDistance: string
    riskCategory: string
}


export interface IEquipmentprops{
   inverterName:string
   inverterManufacturer :string
   moduleName:string
   moduleManufacturer:string
}
