import { useEffect, useState } from "react";
import { BlockquoteList, Breadcrumb, CardDesign, Heading2, HeadingAbout, HeadingDsignBlodUnderLineClm, HeadingDsignBoldClm, HeadingDsignNormClm, HeadingDsignNormlUnderLineClm, HeadingTerranxt, ImageAdd, InfoModal, UlList } from "../Components/AllHeaders/AllHeaders";
import { Input, InputBothIcon, InputCheckbox, InputHelper, InputInfo1, InputInfo2, InputPreIcon, InputRadio, InputSufBtn, InputSufIcon, InputTooltip, InputUpload, Toogle1, Toogle2 } from "../Components/AllInput/AllInput";
import { IconEmail } from "../assests/icons/Icons";
import { IconPerson } from "../assests/icons/LoginIcons";
import { AllButtons } from "../Components/AllButton/AllButtons.tsx";

const Components = () => {
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // loginhandle(e)
    }
  };

  const handleFileUpload = (file: File) => {
    // Call the handleFileUpload function from the InputUpload component
    handleFileUpload(file);
  };

  const handleKeyPress = (e: any) => {
    if (e.key !== undefined) {
      if (e.key === "Enter") {
        // setSubmit(e);
      }
    }
  };

  const handlePreviewClick = (file: File | string) => {
    // let doctype = 0, filename = registrationDoc[0].name;
    // if (file !== "registrationDoc") {
    //   doctype = 1;
    //   filename = startupDoc[0].name
    // }
    // downloadFileFromApi(`${requestUrl.downloadUserDoc}/${user.userid}/${doctype}`,filename)
  };

  const generationModelOption = [{ label: "pvNXT", value: "pvNXT" }, { label: "SAM", value: "SAM" }, { label: "PAM", value: "PAM" }];
  const RadioButtonOptions = [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }, { label: "Go", value: "Go" }];

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    // dispatch(setRoofAnalysisDetails({ ...formDetails, [title]: { ...formDetails.miscellaneousdesign, generationModelType: { ...formDetails.miscellaneousdesign.generationModelType, [name]: !formDetails.miscellaneousdesign.generationModelType[name as keyof object] } } }))
  }


  const handleRadioSelection = (selected: any) => {
  };

  const [isToggled, setIsToggled] = useState(false);

  const handleToggleChange = (checked: boolean) => {
    setIsToggled(checked);
  };

  const handleToggle = (checked: boolean) => {
  };

  const ullist = ["This is a section of some simple filler text", "Also known as placeholder text", "It shares some characteristics of a real written text"];
const [state,setState] = useState({} as any);
const handleChange = () =>{

}
const [registrationDoc,setRegistrationDoc] = useState() as any
const id ='';
const epcData = [] as any
  return (
    <>
      <div className="w-screen h-screen bg-white space-x-2 space-y-2 overflow-auto scroll-smooth md:scroll-auto custom-scrollbar-css">
        <InfoModal />
        <Breadcrumb />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex space-x-8 mt-8">
            <InputBothIcon/>
            <Input value={state.email} id={id + "-email/Mobile"} type="text" name={"email"} label="Email" onChange={handleChange} />
            <InputHelper errors={true} value={state.email} id={id + "-email/Mobile"} type="text" name={"email"} labelname="Email" onChange={handleChange} />
            <InputPreIcon errors={false} value={state.email} id={id + "-email/Mobile"} type="text" name={"email"} labelname="Email" onChange={handleChange} icon={<IconPerson />} />.
            <InputSufIcon  errors={false} value={state.email} id={id + "-email/Mobile"} type="text" name={"email"} labelname="Emails" onChange={handleChange} icon={<IconPerson />} />.
            {/* <InputSufBtn errors={false} submitBtnTxt="Submit" isLoging={true} id={id + "-email"} type="text" value={state.email} disabled={false} name="email" labelname="Email" onChange={handleChange} onKeyPress={handleKeyPress} icon={<IconEmail />} /> */}
            <InputSufBtn errors={false} submitBtnTxt="Submit" isLoging={true} id={id + "-email"} type="text" value={state.email} disabled={false} name="email" labelname="Email" onChange={handleChange} onKeyPress={handleKeyPress} icon={<IconEmail />} />
          </div>
          <div className="flex space-x-8 mt-8">
            <InputUpload isSingle={true} handlePreviewClick={handlePreviewClick} btnLabel="Document (jpg | pdf, 100 kb)" filenames={registrationDoc} setFileNames={setRegistrationDoc} acceptType=".pdf" uploaded={epcData} name={"registrationDoc"} />
            <div className="main-box2">
              <label className="label-box1">Label Name</label>
              <div className="input-main2">
                <InputRadio options={RadioButtonOptions} name="rrrr" value="sdf" onChange={handleRadioSelection} />
              </div>
            </div>
            <div className="main-box2">
              <label className="label-box1">Label Name</label>
              <div className="input-main2">
                {generationModelOption.map((each, index) => (
                  <InputCheckbox key={index} disabled={false} isChecked={true} name={each.value} onChange={handleCheckbox} labelname={each.label} id={each.label} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-8 mt-8">
            <InputTooltip errors={false} value={state.email} id={id + "-email/Mobile"} type="text" name={"email"} labelname="Email" onChange={handleChange} />
            <InputInfo1 />
            <InputInfo2 />
          </div>
          <div className="flex space-x-8 mt-8">
            <div className="main-box2">
              <label className="label-box1">Label Name</label>
              <Toogle1 label="Enable Feature" isChecked={isToggled} onToggle={handleToggleChange} />
            </div>
            <div className="main-box2">
              <label className="label-box1">Label Name</label>
              <Toogle2 label="Label Name" onToggle={handleToggle} defaultChecked={false} />
            </div>
          </div>
          <div className="flex space-x-8 mt-8">
            <div className="bg-white py-6 sm:py-8 lg:py-12">
              <div className="mx-auto max-w-screen-md px-4 md:px-8">
                <HeadingTerranxt />
                <HeadingAbout />
                <UlList ulList={ullist} />
                <BlockquoteList />
                <ImageAdd />
                <HeadingAbout title="Features" />
              </div></div>
            <Heading2 />
          </div>
          <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto w-full px-4 md:px-8 flex space-x-8">
              <HeadingDsignBoldClm />
              <HeadingDsignNormClm />
              <HeadingDsignBlodUnderLineClm />
              <HeadingDsignNormlUnderLineClm />
            </div></div>
          {/* <CardDesign date={new Date()} city="Mumbai" state="Maharashtra" capacity="12" /> */}
          <AllButtons />

        </div>
      </div>
    </>
  );
};

export default Components;