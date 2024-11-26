import NewInput from "../Components/New/Input/NewInput";
import NewRadioButton from "../Components/New/RadioButton/NewRadioButton";
import { IconInfo } from "../assests/icons/DrawerIcons";

const EPCEquipmentSelection = () => {
  const ConfirmRadioList = [
    { lablename: "On Grid", name: "On Grid" },
    { lablename: "Off Grid", name: "Off Grid" },
    { lablename: "Hybrid", name: "Hybrid" },
  ];
  const handleChange = () => {};
  return (
    <>
      <div className="drawer-main">
        <div className="drawer-section">Roof Analysis</div>
        <div className="section-body mt-1">
          <NewInput
            id={"rooftype"}
            labelname={"Roof Type"}
            name={"rooftype"}
            value={"RCC Roof Mount"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <NewInput
            id={"structuretype"}
            labelname={"Structure Type"}
            name={"structuretype"}
            value={"Ballasted Roof Mounting System"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <NewInput
            id={"buildingheight"}
            labelname={"Building Height (m)"}
            name={"buildingheight"}
            value={"22"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
        </div>
        <div className="h1"></div>
        <div className="h1"></div>
        <div className="drawer-section">Module Details</div>
        <div className="section-body mt-1">
          <NewInput
            id={"manufacturer"}
            labelname={"Manufacturer"}
            name={"manufacturer"}
            value={"jinkosolar"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <NewInput
            id={"modulecapacity"}
            labelname={"Module Capacity"}
            name={"modulecapacity"}
            value={"330 Wp | 28 V | Si-mono | 72 cells"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <div className="w-full flex justify-end">
            <button className="light-sm-btn">View Module Details</button>
          </div>
        </div>
        <div className="h1"></div>
        <div className="drawer-section">Inverter Details</div>
        <div className="section-body mt-1">
          <div className="radio-main">
            <div className="section-label">
              Inverter Type
              {/* <span className="text-red-100 font-normal">*</span> */}
            </div>
            <div className="radio-body">
              {ConfirmRadioList.map((item) => {
                return (
                  <>
                    <NewRadioButton
                    value={item.name}
                      name={item.name}
                      labelname={item.lablename}
                    />
                  </>
                );
              })}
            </div>
            <div className="h2"></div>
            <NewInput
              id={"manufacturer"}
              labelname={"Manufacturer"}
              name={"manufacturer"}
              value={"Growatt New Energy"}
              type={"text"}
              onChange={handleChange}
              star={true}
              icon={<IconInfo />}
              content={"contentlist.content1"}
            />
            <div className="h2"></div>
            <NewInput
              id={"invertercapacity"}
              labelname={"Inverter Capacity"}
              name={"invertercapacity"}
              value={"Growatt New Energy"}
              type={"text"}
              onChange={handleChange}
              star={true}
              icon={<IconInfo />}
              content={"contentlist.content1"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EPCEquipmentSelection;
