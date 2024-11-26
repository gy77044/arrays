import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imggg from "../../../assests/img/Dashboard/FP_Image.png";
import { CardDesign } from '../../../Components/AllHeaders/AllHeaders';
import { ProjectTy } from '../../../ReduxTool/Slice/Auth/types';
import { useAppDispatch, useAppSelector } from '../../../ReduxTool/store/hooks';


const ProjectMainCard = () => {
    const { projects, isLoading: loading, orderModalOpen, orderstatusmodal } = useAppSelector((state) => state.consumerReducers);
    const dispatch = useAppDispatch(), navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const [cardAdd, setcardAdd] = useState<{ city: string, state: string }[]>([]);
  
    const handleSelection = (data: ProjectTy) => {
        sessionStorage.setItem("projectid", data.projectid);
        navigate('/Consumer/RoofAnalysis');
      };


    

  return (
    <>
        { projects === null ? null : projects.map((data: ProjectTy, i: number) => {
            return (
                <div key={i} className="card-main cursor-pointer">
                    <div className="card-content" onClick={() => handleSelection(data)}>
                    <CardDesign date={new Date(data.createddt)} city={cardAdd[i]?.city! ?? ""} state={cardAdd[i]?.state! ?? ""} capacity={data.sanctionload.toString()} draftbtnTxt="draft" pvnxtbtnTxt={data?.installationmode?.split(" ")[0].toLowerCase() ?? ""} name={data.projectname} imageUrl={imggg} />
                    </div>
                </div>
            )
        }) }
    </>
    
  )
}

export default ProjectMainCard


