export interface initialStateTy{
   allDiscom:IallTypestate[],
   isopenProfile:boolean,
   providertype: ITariffType[],
   modal:modalTy;
  loading: "loading" | "pending" | 'success' | 'failed' | "idle",
}
export interface modalTy{
    isOpen: boolean,
    title: string,
    btnTxt: string,
    secondaryBtnTxt?:string,
    modalData?:any 
}
export interface IallTypestate {    
    providerid: string,
    providername: string
}
export interface ITariffType {
    consumercategoryid: string
    consumercategoryname: string
    activestatus: boolean
    createdat: string
    updatedat: string
    createdby: any
    user: any
    providerid: string
    tariffprovider_mstr: TariffproviderMstr
  }
  
  export interface TariffproviderMstr {
    providerid: string
    providername: string
    refname: string
    createdat: string
    updatedat: string
    createdby: any
    user: any
    activestatus: boolean
    countryid: string
    country_mstr: any
  }
  export interface IUserApiType {
    providertype: ITariffType[],
    loading: "loading" | "pending" | 'success' | 'failed' | "idle",
  }
  
  const initialState: IUserApiType = {
    providertype: [],
    loading: "idle",
  }