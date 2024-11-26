
import NewInput from "../Components/New/Input/NewInput";
import NewRadioButton from "../Components/New/RadioButton/NewRadioButton";
import SelectPicker from "../Components/New/Select/SelectPicker";
import { IconInfo } from "../assests/icons/DrawerIcons";

const ElectricalDesignMMS = () => {
  const DGinPremiseRadioList = [
    { lablename: "Yes", name: "Yes" },
    { lablename: "No", name: "No" },
  ];
  const handleChange = () => {};
  return (
    <>
      <div className="drawer-main">
        <div className="drawer-section">Obstruction Analysis</div>
        <div className="section-body mt-2 ">
          <NewInput
            id={"strtoinvpowerloss"}
            labelname={"Avg. %power loss (String & Inverter) *"}
            name={"strtoinvpowerloss"}
            value={"1.5"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <div className="h1"></div>
          {/* <SelectPicker labelname={"Cable b/w Module & Inverter"} /> */}
          {/* <NewInput
            id={"modtoinvcable"}
            labelname={"Cable b/w Module & Inverter"}
            name={"modtoinvcable"}
            value={"1CX4 sqmm, Cu. XLPO, Un. Cable, 1.1 kV"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          /> */}
          <div className="h1"></div>
          <NewInput
            id={"pwrloss"}
            labelname={"Avg. %power loss (Inverter & ACCB)"}
            name={"pwrloss"}
            value={"1.5"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <div className="h1"></div>
          <NewInput
            id={"invtoaccb"}
            labelname={"Avg. Distance (Inverter & ACCB, m)"}
            name={"invtoaccb"}
            value={"10"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <div className="h1"></div>
          {/* <SelectPicker labelname={"Cable b/w Inverter & ACCB"} /> */}
          <NewInput
            id={"invtoaccbcable"}
            labelname={"Cable b/w Inverter & ACCB"}
            name={"invtoaccbcable"}
            value={"3CX35 sqmm, Al. XLPE, Ar. Cable, 1.1 kV"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <div className="h1"></div>
          <NewInput
            id={"accbevacpowerloss"}
            labelname={"Avg. %power loss (ACCB & Evac Point)"}
            name={"accbevacpowerloss"}
            value={"1.5"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <div className="h1"></div>
          <NewInput
            id={"accbevacpoint"}
            labelname={"Avg. Distance (ACCB & Evac Point, m)"}
            name={"accbevacpoint"}
            value={"2"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          />
          <div className="h1"></div>         

          {/* <SelectPicker labelname={"Cable b/w ACCB & Evac. Point"} /> */}
          {/* <NewInput
            id={"cableaccb"}
            labelname={"Cable b/w ACCB & Evac. Point"}
            name={"cableaccb"}
            value={"3CX50 sqmm, Al. XLPE, Ar. Cable, 1.1 kV"}
            type={"text"}
            onChange={handleChange}
            star={true}
            icon={<IconInfo />}
            content={"contentlist.content1"}
          /> */}
        </div>

        <div className="section-body mt-1">
          <div className="radio-main">
            <div className="section-label">Do you have DG in your premise?</div>
            <div className="radio-body">
              {DGinPremiseRadioList.map((item) => {
                return (
                  <>
                    <NewRadioButton value={item.name}
                      name={item.name}
                      labelname={item.lablename}
                    />
                  </>
                );
              })}
            </div>
            <div className="h2"></div>
          </div>
        </div>
        <div className="h1"></div>
        <NewInput
          id={"dgpv"}
          labelname={"Do you need DG-PV Synch. Equipment?"}
          name={"dgpv"}
          value={"0.3"}
          type={"text"}
          onChange={handleChange}
          star={true}
          icon={<IconInfo />}
          content={"contentlist.content1"}
        />
      </div>
    </>
  );
};

export default ElectricalDesignMMS;
