import { selectOptionType } from "../../../Utils/Const";
import { tariffconsumercategory_mstr_modal } from "../Consumer/types";

export interface user_mstr_modal extends PayloaUserInfo {
    token: string;
}
export interface PayloaUserInfo {
    userid: string;
    fname: string;
    lname: string | null;
    gender: string | null;
    dob: string | null;
    activestatus: boolean | null;
    createdat: string;
    updatedat: string;
    emailid: string | null;
    mobile: string | null;
    emailotp: number | null;
    emaileverify: boolean | null;
    verificationstatus: number | null;
    createdby: string | null;
    rating: number | null;
    externaluserid: string | null;
    usertype_map: usertype_map_modal | null;
    countryid: string | null;
    country_mstr: countryJsonType | null;
    usertypemapid:string | null
    isapproved: boolean | null
    hassceenlandingpage?: boolean;
    remark?:string | null;
    projects?:ProjectTy[];
    address?:string;
    epcid:string | null;
    image:string;
}
export interface IFullName {
    fname: string;
    lname: string;
}
export interface usertype_map_modal {
    usertypemapid: string;
    createdat: string;
    activestatus: boolean;
    updatedat: string;
    createdby: string | null;
    user: user_mstr_modal | null;
    usertypeid: string;
    usertype_mstr: userTypeMap | null;
    subusertypeid: string | null;
    usersubtype_mstr: usersubtype_mstr_modal | null;
    supusertypeid: string | null;
    usersuptype_mstr: usersuptype_mstr_modal | null;
}
export interface userTypeMap {
    usertypeid: string
    usertype: string
    createdat: string
    updatedat: string
    activestatus: boolean
    createdby: string
    user: any
  }
export interface countryJsonType {
    countryid: string
    countryname: string
    countrycode: string
    currancysymbol: string
    createdat: string
    updatedat: string
    activestatus: boolean
    currencyrate: number
    alpha2code:string
  }

  export interface usersuptype_mstr_modal {
    supusertypeid: string;
    type: string;
    createdat: string;
    activestatus: boolean;
    updatedat: string;
    createdby: string | null;
    user: user_mstr_modal | null;
    subusertypeid: string;
    usersubtype_mstr_modal: usersubtype_mstr_modal | null;
}
export interface usertype_map_modal {
    usertypemapid: string;
    createdat: string;
    activestatus: boolean;
    updatedat: string;
    createdby: string | null;
    user: user_mstr_modal | null;
    usertypeid: string;
    usertype_mstr: userTypeMap | null;
    subusertypeid: string | null;
    usersubtype_mstr: usersubtype_mstr_modal | null;
    supusertypeid: string | null;
    usersuptype_mstr: usersuptype_mstr_modal | null;
}
export interface usersubtype_mstr_modal {
    subusertypeid: string;
    type: string;
    createdat: string;
    updatedat: string;
    activestatus: boolean;
    createdby: string | null;
    user: user_mstr_modal | null;
    usertypeid: string;
    usertype_mstr_modal: userTypeMap | null;
}
export type isState = 'pending' | 'successfull' | 'failed' | 'idle'


export interface logs {
    logIn:string
    logOut:string  
    wrongPass:number
}

export interface IResetPassword{
    password: string
    cpassword: string
}

export interface ISignUp extends IFullName {
    password: string
    mobile: string
    email: string
    activestatus: boolean
    dob:any
    fkorgid:string
    type: boolean
}


export interface mstr_organization {
    orgid: string;
    orgname: string;
    status: boolean;
    contactperson: string | null;
    contactemail: string | null;
    contactnumber: string | null;
    createdby: string | null;
    createddt: string;
}

export type mstr_orginizationroles = {
    fgid: string;
    groupname: string;
    status: boolean;
}
  
export interface EPCResponseTy {
    epcid: string
    companyid: string
    companyname: string
    companyaddress: string
    registrationnumber: string
    activestatus: boolean
    createdat: string
    upatedat: string
    userid: string[]
    isstartup: boolean
    serviceablestate: string[]
    serviceabledistricts: string[]
  }
export interface ProjectTy {
  projectid: string
  projectname: string
  plantcapacity: number
  useablearea: number
  totalroofarea: number
  address: string
  graphicLayer: string
  lat: number
  lng: number
  iscompleted: boolean
  installationmode: string
  reduceelectricitybill: boolean
  providerid: selectOptionType | null
  tariffprovider_mstr: any
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
  yearlyconsumption: any
  yearlyelectricbill: any
  electricityrate: number
  projecttype: selectOptionType | null
  consumercategoryid: selectOptionType | null
  tariffconsumercategory_mstr: tariffconsumercategory_mstr_modal
  createddt: string
  updateddt: string
  createdby: any
  activestatus: boolean
  userid: string
  user: user_mstr_modal
  publishrfpbiddingsepc: any[]
  biddingid: any
  bidding: any
  quoteprice: any
  subscribedlead: boolean
  pvmodid: string
  pvmodule: PvmoduleTy
  pvinvid: any
  pvinverter: any
  bidepc: any[]
  weatherdatasource: string
  meteringpoint: number
  connectedvoltage: number
  loading: number
  moduleorientation: TOrientation,
  lossid: string
  projectlosscalculation: lossCalculationResType
  rooftiltangle: any
  roofazimuthangle: any
  isepccomplete: any
  invertertype: any
  mppt: any
  moduleinseries: any
  numberofstrings: any
  generationpvnxt: any
  generationsam: any
  pvarrayname: string
  rooforientation: string
  havedg: boolean
  needpvanddgsynch: boolean
  needrpfprotection: boolean
  needfireflightingsys: boolean
  needmonitoringsys: boolean
  needwalkway: boolean
  needlifeline: boolean
  buildingheight: number
  mmstype: string
  arrayrows: number
  arraycolumns: number
  rowspacing: number
  modulespacing: number
  mmsazimuthangle: number
  mmstiltangle: number
  stringingtype: boolean
  stringingsize: number
  moduletoinverterdistance: number
  invertertoaccbdistance: number
  corrosioncategory: string
  noofmodules: number
  keepouts: TInfradesign[]
  firefightingdata: any
  lifelinedata: any
  walkwaydata: any
  monitoringdata: any
  modulecleaning: any
  rpfprotectiondata: any
  maxplantcapacity: string
  parapetwall:number
  //consumer
  monthlyunit?:number|string
  createdId?:string
  panelLayer: string | null
  winbyother?:null | 0 | 1
}
  export interface documentUserTy {
    docid: string
    docpath: string
    doctype: number
    createdat: string
    userid: string
  }
  export interface bidepcTy {
    bidepcid: string
    biddingid: string
    biddModal: BiddModal
    epcid: any
    epcMain: any
    bidtype: number
    bidcost: number
    projectid: string
    project: ProjectTy
    iswinning: number
    pvmodid: any
    mstr_pvmodule_modal: any
    pvinvid: any
    pvinverter_modal: any
  }
  export interface BiddModal {
    biddingid: string
    bos: boolean
    turnkey: boolean
    submissiondate: string
    lsttimesubmission: string
  }
  export interface PvmoduleTy {
    pvmodid: string
    name: string
    manufacturer: string
    technology: string
    bifacial: number
    stc: number
    ptc: number
    a_c: number
    length: any
    width: any
    n_s: number
    i_sc_ref: number
    v_oc_ref: number
    i_mp_ref: number
    v_mp_ref: number
    alpha_sc: number
    beta_oc: number
    t_noct: number
    a_ref: number
    i_l_ref: number
    i_o_ref: number
    r_s: number
    r_sh_ref: number
    adjust: number
    gamma_r: number
    bipv: string
    version: string
    date: string
    priority: number
    activestatus: boolean
    createdat: string
    updatedat: string
    type: any
    panfilepath: any
    pdfpath: any
  }


  export interface lossCalculationResType{
    lossid: string
    dccableloss: number
    cablebtwmoduleandinverter: string
    accableloss: number
    cablebtwaccbandtp: string
    moduleefficiencyloss: number
    lidloss: number
    modulemissmatchloss: number
    stringvoltagemissmatchloss: number
    soilingloss: number
    auxloss: number
    unavailloss: number
    climateloss: number
    createdat: string
    updatedat: string
    dcModule?:any,
    acModule?:any
  }

export type Troofdesign = { totalarea: number, useablearea: number, buildingheight: string,  parapetheight: string, parapetoffset: string, totalModules: string, defaultmodulePower: string, plantDCpower : string };
export type TInfradesign = { totalarea: number, infraoffset: string, infraheight: string, infraType: string, uid: number, name: string, graphic: string };
export type TObstruction = { totalarea: number, obstructionoffset: string, obstructionheight: string, obstructiontype: TObstructionType, uid: number, name: string };
export type TObstructionType = "Existing Solar Modules" | "Mobile Tower" | 'Chimney' | 'Nearby Trees' | 'Helipad' | 'Parapet Wall' | 'Skylights' | 'Roof Ridge' | 'HVAC Equipment' | 'Mumty Structure' | 'Extended Columns' |'Pipelines' | 'Turbo Vents' | 'Others' | "" ;
export type TOrientation = 'Landscape' | 'Portrait'