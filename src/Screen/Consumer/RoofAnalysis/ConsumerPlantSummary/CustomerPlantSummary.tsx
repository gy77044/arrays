
import { useEffect } from 'react';
import { setAccord, setAccord1 } from '../../../../ReduxTool/Slice/Drawer/DrawerReducer';
import { useAppDispatch, useAppSelector } from '../../../../ReduxTool/store/hooks';
import CustQuickPlantAnalysisSummary from './CustQuickPlantAnalysisSummary';
import ProjectDetailsSummaryTable from './ProjectDetailsSummaryTable';

export default function CustomerPlantSummary() {
  const accord1 = useAppSelector(state=>state.drawer.accord1)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(accord1===""){
      dispatch(setAccord1("Quick Plant Analysis"));
    }
    dispatch(setAccord("New Project Setup"));
  },[])
  return (
    // <div className="body-main">
      <div className='lsb-body'>
        {/* <NewAccordion accordName={'New Project Setup'} content={contentlist.content7} children={<ProjectDetailsSummaryTable />} />
        <NewAccordion accordName={'Quick Plant Analysis'} content={contentlist.content8} children={<CustQuickPlantAnalysisSummary />} /> */}
        {/* <Accordion1 headName={'New Project Setup'}  children={<ProjectDetailsSummaryTable />} open={true} />
        <Accordion1 headName={'Quick Plant Analysis'}  children={<CustQuickPlantAnalysisSummary />} /> */}
      </div>
    // </div>
  );
}
