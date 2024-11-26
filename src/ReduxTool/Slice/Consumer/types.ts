import { ProjectTy } from "../Auth/types";


export interface initialstateType {
    isLoading:boolean,
    error:string|null
    orderModalOpen:boolean,
    projects: ProjectTy[] | null,
    roofAnalysis: roofAnalysisType,
    ondFiles:FileUplad | null
    orderstatusmodal:boolean
};
export interface roofAnalysisType {
    isWithRoof: boolean | null;
    isSaved: boolean;
    isSaveplantSummarydata:boolean;
    selected_project:ProjectTy | null;
    esriDraw:boolean;
    obsArea:string|null;
    showConfirmBtn: boolean;
    openNoRoof: boolean;
    formDetails: roofAnalysisFormType;
    regionName:string
    countryName:string
    selectedOption:string
    subsequentOption:string
    cardIconOpen:string
}
export interface roofAnalysisFormType {
    projectSetup: TProjectTypesNew;
    quickplantAnalysis: quickplantAnalysisType;
    projectSummary: ProjectSummaryType;
    error:any;
}
export interface quickplantAnalysisType {
    environmentalImpact: EnvironmentalImpact
    costbracket:string
    currencyresdata:CurrenctResp
    electricityGenerated:any
    stringPerModule:any
    electricityGenerated2:any
    performanceRatio:any
}

export interface EnvironmentalImpact {
    carbonFootProint: string
    treesPlanted: string
}

// export interface FinancitalSaving {
//     monthlyGrossSaving: string
//     netsavings: string
//     annualSavings: string
//     paybackPeriod: string
//     pretaxIRR: string
// }

export type TProjectTypesNew = Pick<ProjectTy, 'createdId' |'plantcapacity'| 'address' |'monthlyunit'| 'consumercategoryid' | 'lat' | 'lng' | 'projectname' | 'projectid' | 'electricityrate' | 'sanctionload' | 'useablearea' | 'totalroofarea' | 'providerid' | 'projecttype'>

export type ILatLong = {
    lat:number,
    lng:number
}
export type ProjectSummaryType = {
    financial:FinRes|null,
    degradation:DegradationType|null

}

export type DegradationType = {
irr:number,
savingperiod:number
}

// export type ProjectSummaryType =  {
//     financial:FinancialType
//     degradation:DegradatioType
//     monthlyfinancialsavings: number,
//     savingperiod: projectSummary.degradation.savingperiod,
//     savingirr: projectSummary.degradation.irr,
//     totaltreesplanted: Math.round(projectSummary.financial.totalTrees),
//     carbonemission: Math.round(projectSummary.financial.totalCarbonfootprint),
//     netsavings: Math.round(projectSummary.financial.netsavings),
// }

// export type FinancialType = {
//     monthlyGrossSaving: string
//     netsavings: string
//     annualSavings: string
//     paybackPeriod: string
//     pretaxIRR: string
// }

// export type DegradatioType =  {

// }


export const currencySymbolMap = {
    '1': '$',       // United States
    '7': '₽',       // Russia
    '20': '£',      // Egypt
    '27': 'R',      // South Africa
    '30': '€',      // Greece
    '31': '€',      // Netherlands
    '32': '€',      // Belgium
    '33': '€',      // France
    '34': '€',      // Spain
    '36': 'Ft',     // Hungary
    '39': '€',      // Italy
    '40': 'lei',    // Romania
    '41': 'CHF',    // Switzerland
    '43': '€',      // Austria
    '44': '£',      // United Kingdom
    '45': 'kr',     // Denmark
    '46': 'kr',     // Sweden
    '47': 'kr',     // Norway
    '48': 'zł',     // Poland
    '49': '€',      // Germany
    '51': '€',      // Peru
    '52': '$',      // Mexico
    '53': '$',      // Cuba
    '54': '$',      // Argentina
    '55': 'R$',     // Brazil
    '56': '$',      // Chile
    '57': '$',      // Colombia
    '58': 'Bs.',    // Venezuela
    '60': 'RM',     // Malaysia
    '61': 'A$',     // Australia
    '62': 'Rp',     // Indonesia
    '63': '₱',      // Philippines
    '64': 'NZ$',    // New Zealand
    '65': 'S$',     // Singapore
    '66': '฿',      // Thailand
    '81': '¥',      // Japan
    '82': '₩',      // South Korea
    '84': '₫',      // Vietnam
    '86': '¥',      // China
    '90': '₺',      // Turkey
    '91': '₹',      // India
    '92': 'Rs',     // Pakistan
    '93': '؋',      // Afghanistan
    '94': 'Rs',     // Sri Lanka
    '95': 'Ks',     // Myanmar
    '98': '﷼',      // Iran
    '211': '£',     // South Sudan
    '212': 'MAD',   // Morocco
    '213': 'د.ج',   // Algeria
    '216': 'د.ت',   // Tunisia
    '218': 'د.ل',   // Libya
    '220': 'D',     // Gambia
    '221': 'CFA',   // Senegal
    '222': 'UM',    // Mauritania
    '223': 'CFA',   // Mali
    '224': 'FG',    // Guinea
    '225': 'CFA',   // Ivory Coast
    '226': 'CFA',   // Burkina Faso
    '227': 'CFA',   // Niger
    '228': 'CFA',   // Togo
    '229': 'CFA',   // Benin
    '230': '₨',     // Mauritius
    '231': '$',     // Liberia
    '232': 'Le',    // Sierra Leone
    '233': '₵',     // Ghana
    '234': '₦',     // Nigeria
    '235': 'FCFA',  // Chad
    '236': 'CFA',   // Central African Republic
    '237': 'FCFA',  // Cameroon
    '238': '$',     // Cape Verde
    '239': 'Db',    // São Tomé and Príncipe
    '240': 'FCFA',  // Equatorial Guinea
    '241': 'CFA',   // Gabon
    '242': 'FCFA',  // Republic of the Congo
    '243': 'FCFA',  // Democratic Republic of the Congo
    '244': 'Kz',    // Angola
    '245': '$',     // Guinea-Bissau
    '246': '$',     // British Indian Ocean Territory
    '247': '$',     // Saint Helena
    '248': 'SR',    // Seychelles
    '249': '£',     // Sudan
    '250': 'FRw',   // Rwanda
    '251': 'Br',    // Ethiopia
    '252': 'S',     // Somalia
    '253': 'Fdj',   // Djibouti
    '254': 'KSh',   // Kenya
    '255': 'TSh',   // Tanzania
    '256': 'USh',   // Uganda
    '257': 'FBu',   // Burundi
    '258': 'MT',    // Mozambique
    '260': 'ZK',    // Zambia
    '261': 'Ar',    // Madagascar
    '262': '€',     // Réunion
    '263': 'R',     // Zimbabwe
    '264': '$',     // Namibia
    '265': 'MK',    // Malawi
    '266': 'L',     // Lesotho
    '267': 'P',     // Botswana
    '268': 'L',     // Swaziland
    '269': 'CF',    // Comoros
    '290': '£',     // Saint Helena, Ascension and Tristan da Cunha
    '291': 'Nfk',   // Eritrea
    '297': 'ƒ',     // Aruba
    '298': 'kr',    // Faroe Islands
    '299': 'kr',    // Greenland
    '350': '£',     // Gibraltar
    '351': '€',     // Portugal
    '352': '€',     // Luxembourg
    '353': '€',     // Ireland
    '354': 'kr',    // Iceland
    '355': 'L',     // Albania
    '356': '€',     // Malta
    '357': '€',     // Cyprus
    '358': '€',     // Finland
    '359': 'лв',    // Bulgaria
    '370': '€',     // Lithuania
    '371': '€',     // Latvia
    '372': '€',     // Estonia
    '373': 'L',     // Moldova
    '374': '֏',     // Armenia
    '375': 'Br',    // Belarus
    '376': '€',     // Andorra
    '377': '€',     // Monaco
    '378': '€',     // San Marino
    '379': '€',
    '966': 'SAR',    // Saudi Arabia
    '971': 'AED',    // United Arab Emirates
    '962': 'د.ا',   // Jordan
    '963': 'ل.س',   // Syria
    '964': 'د.ع',   // Iraq
    '965': 'د.ك',   // Kuwait
    '968': 'ر.ع.',  // Oman
    '970': '₪',     // Palestine
    '972': '₪',     // Israel
} as Record<string, string>

//
import { countryJsonType, user_mstr_modal } from "../Auth/types"
import { commomRes } from "./ConsumerActions";

type comm = string
export type NewPro = {
    name: comm,
    type: comm,
    plantCapacity: comm,
    dc: comm,
    address?: comm,
    ProjectTimeStamp?: comm,
    project_id: comm,
    Loading: comm
}

export type FileUplad = {  inverter: commomRes, module: commomRes }
type ONDfILES = null | FileUplad
export type TProjectNew = {
    userid: string;
    projectid: string;
    projectname: string;
    plantcapacity: number;
    projecttype: string;
    dc: number;
    loading: number;
    consumerCategory?: string;
}
export type TCustomerProjectNew = {
    projectid: string;
    projectname: string;
    projecttype: string;
    consumerCategory?: string;
    address: string
    userid: string;
    providerid: string;
}
export type TProjectUpdate = {
    projectid: string;
    projectname: string;
    plantcapacity: number;
    projecttype: string;
    dc: number;
    loading: number;
}

export interface IProjectLoadType {
    electricityrate: number
    projectid: string,
    pktariffTypeId: string,
    consumercategoryid: string,
    project: null,
    projectloadid: string,
    sanctionload: number,
    tarifftype: {
        activeStatus: boolean,
        createdat: string,
        consumercategoryid: string,
        type: string
    },
    yearlyconsumption: number,
    yearlyelectricbill: number,
}

export interface CurrenctResp{
    pkcurrencyId: string,
    basecurrency: string,
    symbol:string,
    rate: number,
    createdat: string,
    updatedat: string
}
export interface InitState {
    project: currentRequest[],
    Ordersproject: any[],
    acprj: currentRequest[],
    archiveproject: string[],
    deletArchiveproject: string[],
    currentArcName: currentRequest,
    currentremovedName: currentRequest,
    length: number,
    selected_id: string,
    totalRoofArea: number
    useablearea: number
    createdId: string
    selected_project: currentRequest[]
    loading: "pending" | "success" | "failed" | "loading",
    detailsLoading: "pending" | "success" | "failed" | 'idle',
    error: boolean,
    newSubscribe: boolean,
    errorMsg: string,
    confirmdata: string,
    sharedWith: string,
    cardSharedwith: { name: string }[]
    shareableList: { name: string }[]
    formData: any
    // currentData: currentRequest
    loadForm: any
    orderstatusmodal: boolean
    loadingTillDetailsareAvailable: boolean
    projectLoad: loadRequest[]
    costbracket: string
    getProjectLoad: IProjectLoadType
    regionName:string,
    countryName:string,
    currencySymbol:string,
    ondFiles: ONDfILES,
    currencyresdata:CurrenctResp,
    quotemodal:boolean,
    rfpmodal:boolean,
    documentModal:boolean,
    leadDocumentModal:boolean,
    leadOverviewModal:boolean,
    projectDocumentTab:boolean,
    customerDocumentTab:boolean,
    overviewModal:boolean,
    projectInfoTab:boolean,
    TechSpecificationTab:boolean,
    ProjectFinancialsTab:boolean,
    InstallerDetailsTab:boolean
}



export interface currentRequest {
    projectid: string;
      projectname: string;
      plantcapacity: number | null;
      userid: string;
      user: user_mstr_modal | null;
      useablearea: number | null;
      totalroofarea: number | null;
      address: string | null;
      graphicLayer: string | null;
      lat: number | null;
      lng: number | null;
      iscompleted: boolean | null;
      installationmode: string | null;
      reduceelectricitybill: boolean | null;
      providerid: string | null;
      tariffprovider_mstr: tariffprovider_mstr_modal | null;
      carbonemission: string | null;
      projectcost: string | null;
      yearlygensanctioned: string | null;
      monthlyfinancialsavings: string | null;
      savingperiod: string | null;
      savingirr: string | null;
      yearlygenusablearea: string | null;
      netsavings: number | null;
      sanctionload: number | null;
      yearlyconsumption: number | null;
      yearlyelectricbill: number | null;
      electricityrate: number | null;
      consumercategoryid: string | null;
      tariffconsumercategory_mstr: tariffconsumercategory_mstr_modal;
      createddt: string;
      updateddt: string | null;
      createdby: string | null;
      activestatus: boolean;
      projecttype: string | null;
      totaltreesplanted: string;
      //need to descussion
      dc?:string|null
}

export interface tariffprovider_mstr_modal {
    providerid: string;
    providername: string;
    refname: string;
    createdat: string;
    updatedat: string;
    createdby: string | null;
    user: user_mstr_modal | null;
    activestatus: boolean;
    countryid: string;
    country_mstr: countryJsonType | null;
}
export interface tariffconsumercategory_mstr_modal {
    consumercategoryid: string;
    consumercategoryname: string;
    activestatus: boolean;
    createdat: string;
    updatedat: string;
    createdby: string | null;
    user: user_mstr_modal | null;
    providerid: string;
    tariffprovider_mstr: tariffprovider_mstr_modal | null;
}

// export interface newcurrentRequest{
    
//     projectid: string,
//     projectid: string,
//     projectname: string,
//     plantcapacity: number,
//     dc: number,
//     loading: number,
//     projecttype: string,
//     area: string,
//     totalroofarea: string,
//     lat: number,
//     lng: number,
//     address: string,
//     consumerCategory: null | string,
//     graphicLayer: string,
//     isCompleted: boolean,
//     reduceElectricityBill: boolean,
//     installationMode: "PVNxt Mode"|"Self Mode"|"",
//     createddt: string,
//     updateddt: string,
//     userid: string,
//     user: {
//       userid: string,
//       fname: string,
//       lname: string,
//       gender: string,
//       dob: string,
//       activestatus: boolean,
//       entrydt: string,
//       emailid: string,
//       mobile: string,
//       emailotp: number,
//       emaileverify: boolean,
//       verificationstatus: number,
//       entryby: string,
//       fkexternaluserid: string,
//       mstr_organization: string,
//       fkfgid:string,
//       mstr_orginizationroles: string,
//       usertypemapid: string,
//       userTypeMap: string,
//       rating: number
//     },
//     pkstateid: string,
//     mstr_states: string,
//     carbonemission: string,
//     projectcost: string,
//     yearlygensanctioned: string,
//     yearlygenusablearea: string,
//     monthlyfinancialsavings: string,
//     savingperiod: string,
//     savingirr: string,
//     totalroofarea: string
// }


export interface loadRequest {
    electricityrate: number
    projectid: string
    consumercategoryid: string
    project: null
    projectloadid: string
    projecttype:string
    sanctionload: number
    consumercategory: null | any
    yearlyconsumption: number
    yearlyelectricbill: number
    graphicLayer?: string
    mstr_consumercategory: { activestatus: false, consumercategoryid: string, consumercategoryname: string, createdat: string },
}
export interface newProjectTypes {
    projectname: string
    plantcapacity: number
    userid: string
    useablearea: number
    totalroofarea: number
    address: string
    graphicLayer: string
    lat: number
    lng: number
    iscompleted: boolean
    installationmode: string
    reduceelectricitybill: boolean
    providerid: string
    carbonemission: string
    projectcost: string
    yearlygensanctioned: string
    monthlyfinancialsavings: string
    savingperiod: string
    savingirr: string
    yearlygenusablearea: string
    totaltreesplanted: string
    netsavings: number
    sanctionload: number
    yearlyconsumption: number
    yearlyelectricbill: number
    electricityrate: number
    projecttype: string
    consumercategoryid: string
    createdby: string
  }

export type newProjectPostType = Pick<newProjectTypes, 'projectname' | 'projectname' | 'plantcapacity'| 'userid'| 'useablearea'| 'totalroofarea'| 'address'| 'graphicLayer'| 'lat'| 'lng'| 'providerid'| 'sanctionload'| 'electricityrate'| 'projecttype'| 'consumercategoryid'>


export interface IOrderProjectType {
    address: string,
    area: number
    consumerCategory: null | string
    createddt: string
    dc: 0
    graphicLayer: string
    installationmode: "PVNxt Mode"|"Self Mode"|""
    iscompleted?: boolean
    lat: number
    lng: number
    loading: number
    userid: string
    plantcapacity: number
    projectid: string
    projectname: string
    projecttype: string
    reduceElectricityBill: boolean
    totalroofarea: number
    updateddt: null | string
    user: null | string
    sanctionload:number
} 

export interface IConfirmActionTypes {
    selectedOption: string
    subsequentOption: string
    orderproject: IOrderProjectType[],
    currentSelected: any,
    loading: "loading" | "pending" | 'success' | 'failed' | "idle",
    error:boolean
}
export type totalElectricity = {
    "-GHI": string,
    "-DHI": string,
    "-Temperature": string,
    "-GlobInc": string,
    "-DNI": string,
    "-Output": string
}[]
 
interface IFinTpyes {
    monthsave: number,
    annualsave: number,
    lifetime: number
}
 
export type Fin = {
    electricityrate: number,
    monthlyGeneration: number,
    sanctionLoad: number,
    projectid: string
}
export type FinRes = {
    montlyFinancialSaving: number,
    yearlyFinancialSaving: number,
    totalCarbonfootprint: number
    totalTrees: number
    netsavings: number
}
 
interface IQuickAnalysisTypes {
    isSavequickAnalysisdata: boolean,
    electricityGenerated: number,
    performanceRatio?: number,
    electricityGenerated2: number,
    financeDetails: IFinTpyes
    fetching: 'pending' | 'success' | 'failed' | 'idle',
    fetching2: 'pending' | 'success' | 'failed' | 'idle',
    fetchingFin: 'pending' | 'success' | 'failed' | 'idle',
    error: any,
    financial: FinRes,
    stringPerModule: number
    noOfModule: number
}
 