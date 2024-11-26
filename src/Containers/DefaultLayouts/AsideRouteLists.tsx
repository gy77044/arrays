
import CustomerPlantSummary from "../../Screen/Consumer/RoofAnalysis/ConsumerPlantSummary/CustomerPlantSummary";
import CustomerProjectSetup from "../../Screen/Consumer/RoofAnalysis/ConsumerProjectSetup/CustomerProjectSetup";
import QuickPlantAnalysis from "../../Screen/Consumer/RoofAnalysis/QuickPlantAnalysis/QuickPlantAnalysis";
import { IconDesignSummary, IconProjectSetup, IconWeatherAnalysis } from "../../assests/icons/Icons";

export interface DefaultAsideType {
    Icon: (fill?:any) => JSX.Element,
    tooltip: string,
    title: string,
    path?: string,
    component?:React.Component
}
export type btnTitleTypeCustomer = 'Project Summary' | 'Proceed' | 'Quick Plant Analysis'

export const ConsumerRoofAnalysisRoutes: DefaultAsideType[] = [{
    Icon: IconProjectSetup,
    tooltip: "Project Setup",
    title: "projectsetup",
},
{
    Icon: IconWeatherAnalysis,
    tooltip: "Quick Plant Analysis",
    title: "quickplantanalysis",
},
/* {
    Icon: IconDesignSummary,
    tooltip: "Project Summary",
    title: "projectsummary",
}, */
];

export const CustomerHeaderListItems = {
    projectsetup: {
        title: "projectsetup",       
        headerName: "New Project Setup",
    },
    quickplantanalysis: {
        title: "quickplantanalysis",      
        headerName: "Quick Plant Analysis",
    },
    projectsummary: {
        title: "projectsummary",      
        headerName: "Project Summary",
    },
}

export const CustomerActionList = [
    {
        Icon: IconProjectSetup,
        tooltip: "Project Setup",
        title: "projectsetup",
    },
    {
        Icon: IconWeatherAnalysis,
        tooltip: "Quick Plant Analysis",
        title: "quickplantanalysis",
    },
    {
        Icon: IconDesignSummary,
        tooltip: "Project Summary",
        title: "projectsummary",
    },
    
]

export const DrawerContainerCustomerListItems = {
    projectsetup: {
        title: "projectsetup",
        Component: CustomerProjectSetup,
        btnTitle: "Quick Plant Analysis",
        headerName: "New Project Setup",
    },
    quickplantanalysis: {
        title: "quickplantanalysis",
        Component: QuickPlantAnalysis,
        btnTitle: "Proceed",
        headerName: "Quick Plant Analysis",
    },
    projectsummary: {
        title: "projectsummary",
        Component: CustomerPlantSummary,
        btnTitle: "Proceed",
        headerName: "Project Summary",
    },
}


export const contentlist = {
    content1: "Please add a suitable and unique name for the project. An example name for the project can be: Noida_One_5_kWp_RT_V0.",
    content2: "Consumers are categorized as Residential, Commercial, and Industrial. Residential users typically have a sanctioned load ranging from 2 kW to 10 kW, while Commercial and Industrial users have loads from 10 kW to 1000 kW. Choose your tariff based on your electricity bill.",
    content3: "Sanctioned load is the total electricity supply that is provided to a meter. This is calculated in Kilo-Watt (or kW). It's the permissible total Kilo-Watt provided to a meter based on the devices connected to the meter.",
    content4: "This is the rate at which the DISCOM charges you for the per unit electricity consumption. This is generally expressed in Rs/kWh or Rs/unit.",
    content5: "This is the total electricity consumed by the consumer in a given calendar year i.e., from Jan to Dec.",
    content6: "This is the total electricity bill paid by the consumer to the DISCOM in a given calendar year i.e., Jan to Dec",
    content7: "This is the summary of all the details that have been captured till now. In case any modification required in the project set up, then it can be done through Edit Details button given at the bottom of New Project Set up section.",
    content8: "The quick plant analysis provides you the system generated calculation w.r.t Environmental Impact, Cost of Plant, Financial Savings and Total Electricity Generation.",
    content9: "The quick plant analysis provides you the system generated calculation w.r.t Environmental Impact, Cost of Plant, Financial Savings and Total Electricity Generation.",
};