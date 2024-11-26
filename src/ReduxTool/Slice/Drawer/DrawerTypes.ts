export type TtitlesPartner = "projectsetup" | "plantinfrastructuredesigning" | "miscellaneousdesign" 
export type TtitlesCustomer =  "" | "projectsetup" | "quickplantanalysis" | "projectsummary" | "completeanalysis" | 'weatheranalysis'
export interface IDrawer {
    title: TtitlesCustomer | TtitlesPartner,
    displayDrawer: boolean,
    accord:string,
    accord1:string,
    openprofile: boolean
    polygonDrawn: string[],
    isbtnHide?:boolean
}