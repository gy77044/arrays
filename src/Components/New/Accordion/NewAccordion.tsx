import React, { useEffect } from "react";
import { setAccord, setAccord1 } from "../../../ReduxTool/Slice/Drawer/DrawerReducer";
import { setToolTipModal, toogleTooltip } from "../../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import { IconArrow, IconInfo } from "../../../assests/icons/DrawerIcons";
import { getUserType } from "../../../Utils/AuthRedirections";
const accname = {
  'contentNew Project Setup': `This includes selecting the site, obtaining permits, and organizing resources. Critical aspects are the project location, sanctioned load, and regulatory approvals.`,
  'contentQuick Plant Analysis': `This calculates energy output based on factors like energy production and plant cost. It also assesses CO2 reduction to ensure environmental benefits align with sustainability goals.`,
}
const accnamepartner = {
  'contentRoof 1': `This section provides a comprehensive analysis of Roof 1 for solar system installation, including calculations, drawings, and a detailed report.`,
  'contentWeather Data': `This section provides detailed information about the local weather conditions, including average solar irradiance, temperature, and rainfall patterns.`,
  'contentElectrical Equipment Designing': `This section outlines the design of the electrical equipment, including accb, extension panels, and other components, based on the system's requirements and local standards.`,
  'contentLoss Calculation': `This section details the calculation of energy losses within the system, such as cable losses and inverter losses, to ensure optimal efficiency.`,
  'contentDC Electrical': `This section provides information about the DC components of the solar system, including cables, connectors, and junction boxes.`,
  'contentAC Electrical': `This section details the AC components of the system, such as inverters, transformers, and switchgear.`,
  'contentSafety Infrastructure': `This section outlines the safety measures implemented in the system, including grounding, lightning protection, and emergency shutdown systems.`,
  'contentMonitoring Equipment': `This section describes the monitoring equipment used to track the system's performance, including data loggers and SCADA systems.`,
  'contentModule Inverter & ACCB': `This section provides information about the module inverters and associated AC combiner boxes (ACCBs).`,
  'contentCivil & MMS': `This section covers the civil works and maintenance and supervision (M&S) aspects of the project, including site preparation and ongoing maintenance.`,
  'contentMiscellaneous Equipment': `This section lists any additional equipment required for the system, such as surge protectors or fire suppression systems.`,
  'contentCharts': `This section includes various charts and graphs illustrating the system's performance and data.`,
}
const NewAccordion = ({ accordName, content, children, accordName1 }: { accordName: string, content: string, children: JSX.Element, accordName1?: string }) => {
  const { accord, accord1 } = useAppSelector(state => state.drawer)
  const { title } = useAppSelector(state => state.drawer);
  const { isToolTip } = useAppSelector((state) => state.mapref);

  const dispatch = useAppDispatch()
  const handleAccordions = (val: string, val1?: string) => {
    if (accord === val) {
      dispatch(setAccord(""));
    } else if (accord1 === val1) {
      dispatch(setAccord1(""));
    } else if (val1) {
      dispatch(setAccord1(val1));
    } else {
      dispatch(setAccord(val));
    }
    if (accord1 === "Quick Plant Analysis") {
      dispatch(setAccord1(""));
      dispatch(setAccord("New Project Setup"));
    }
  };

  const handleInfoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }
  const userType = getUserType();


  const handleopen = (event: any, name: string, content: string) => {

    if (isToolTip.istooltip) {
      dispatch(toogleTooltip({ dipy: 0, istooltip: "", msg: "" }))
    }
    else if (userType == "Consumer") {
      dispatch(toogleTooltip({ dipy: event.clientY, istooltip: name, msg: accname[`content${name}` as keyof object] }));
    }
   }



  return (
    <>
      <div className={`accordian ${accord === accordName || accord1 === accordName ? "heading-active" : "bg-white"}`} onClick={(e) => handleAccordions(accordName, accordName1)}>
        <div className={`acc-heading`}>
          <div className={`icon-btn ${accord === accordName || accord1 === accordName ? "rotate-90" : ""}`}><IconArrow /></div>
          {accordName}
        </div>

        {/* { accordName !== 'Weather Data' && accordName !== 'Electrical Equipment Designing' && 
          accordName !== 'Loss Calculation'
        } */}
        <div onClick={e => handleInfoClick(e)}>
          <div onClick={e => handleopen(e, accordName, content)}><IconInfo /></div>
        </div>
      </div>
      {(accordName === accord || accordName === accord1) && (
        <>
          <div className="acc-body">
            {children}
          </div>
        </>
      )}
      

    </>
  );
};

export default NewAccordion;
