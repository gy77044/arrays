export interface ICardDesignProps {
    name?: string;
    city: string;
    state: string;
    capacity: string;
    status?: string;
    draftbtnTxt?: string;
   pvnxtbtnTxt?: string;
    imageUrl?: string;
    altname?:string
    date:Date;
    linkto?:string;
  }

export interface IInfoPropToggle {
  id?: string,
  content?: string,
  link?: string,
  linkbtnTxt?: string,
  isShow?: string
  infoicon?: string | JSX.Element
}
export interface IHeadParaProps {
  id?: string,
  title?: string,
  para1?: string,
  para2?: string,
  para3?: string,
  linkTxt?: string,
  link?: string,
}
export interface IHeadAboutProps {
  id?: string,
  title?: string,
  para?: string,
}
export interface IULProps{
  ulList:string[] 
}
export interface IblockquoteProps{
  quotes?:string 
}
export interface IImageProps{
  link?:string
  altname?:string 
}
 
