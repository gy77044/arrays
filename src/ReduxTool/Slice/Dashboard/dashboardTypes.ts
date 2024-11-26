export interface UserTypeOpt {
  usertypeid: string;
  usertype: string;
  createdat: string;
}

export interface UserMapApiRes {
  createdat: string;
  usersubtypeid: null | string;
  usertypeid: string;
}
export interface SubUserTypeOpt {
  // usersubtypeid: string;
  // usertypeid: string;
  // type: string;
  // createdat: string;
  subusertypeid: string
  type: string
  createdat: string
  updatedat: string
  activestatus: boolean
  createdby: string
  createdbyname: string
  usertypeid: string
  usertype: string
}
export interface epcObjectType {
  usertypeid: string
  subusertypeid: string
  supusertypeid: string
  createdby: string
}

export interface IConsumerTypeObj {
  usertypeid: string;
}

export interface IEPCTypeObj {
  subusertypeid?: string;
  supusertypeid?: string;
}
export interface IEPCTypeOpt {
  userid: string;
  usertypeid?: string;
  subusertypeid?: string;
  supusertypeid?: string;
  companyId: string;
  companyName: string;
  companyAddress: string;
  registrationNumber: string;
  registrationDoc: string;
  dippDoc: string;
  statename: any[];
  cityname: any[];
  isstartup: boolean
}
export type Tusertype_map = IConsumerTypeObj & IEPCTypeOpt
export interface FileData {
  name: string;
  icon: string;
  file: File | string;
}
export interface FileDataProps {
  acceptType: string;
  btnLabel?: string;
  uploaded?: IEPCTypeOpt;
  setUploaded?: React.Dispatch<React.SetStateAction<IEPCTypeOpt>>
  name?: string,
  label?: string,
  isSingle?: boolean,
  filenames:FileData[],
  setFileNames:React.Dispatch<React.SetStateAction<FileData[]>>
  handlePreviewClick: (file: File | string) => void,
  errors?:string,
  helpertext?:string
}



