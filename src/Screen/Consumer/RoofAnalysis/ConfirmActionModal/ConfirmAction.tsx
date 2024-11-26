import { useNavigate } from "react-router";
import NewRadioButton from "../../../../Components/New/RadioButton/NewRadioButton";
import { useAppDispatch, useAppSelector } from "../../../../ReduxTool/store/hooks";
import { useState } from "react";
import { setSelectedOption, setSubsequentOption } from "../../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { InputRadio } from "../../../../Components/AllInput/AllInput";

const ConfirmAction = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [mode, setMode] = useState(false)

  const ConfirmRadioList = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const ModeRadioList = [
    { label: "PVNxt Mode", value: "PVNxt Mode" },
    { label: "Self Mode", value: "Self Mode" },
  ];

  const { selectedOption, subsequentOption } = useAppSelector(state => state.consumerReducers.roofAnalysis)
  const handleInnerRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    dispatch(setSelectedOption(name))
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    if(name === "PVNxt Mode"){
      setMode(true)
    } else {
      setMode(false)
    }
    dispatch(setSubsequentOption(name))
  };

  return (
    <div className="">
      <p className="para-md">Solar PV (Plant) helps to save cost and reduce your carbon footprints.</p>
      <div className="main-box2 w-[26rem]">
        <label className="label-box1">Let us know if you would like to reduce your electricity bills.</label>
        <div className="input-main2">
          <InputRadio
            options={ConfirmRadioList}
            name="userType"
            onChange={handleInnerRadioChange}
            value={selectedOption}
          />
        </div>
      </div>
      <p className={`para-md mt-4 ${selectedOption === "Yes" ? "" : "hidden"}`}>
        Glad to add you to our growing list of customers!
      </p>
      <div className={`main-box2 w-[26rem] ${selectedOption === "Yes" ? "" : "hidden"}`}>
        <label className="label-box1">We have two modes under which you can choose to Install</label>
        <div className="input-main2">
          <InputRadio
            options={ModeRadioList}
            name="userType"
            onChange={handleRadioChange}
            value={subsequentOption}
          />
        </div>
      </div>
      <div className={`m-2 ${(selectedOption === "Yes" && subsequentOption === "PVNxt Mode") ? "" : "hidden"}`}>
        <div className="para-md-semibold pb-2">
          Why choose PVNxt Mode?
        </div>
        <ul className="ul1">
          <li className="li1"><strong>Expert solar superheroes</strong> at your service. 🦸‍♂️</li>
          <li className="li1"><strong>Hassle-free </strong> solar installation and maintenance.</li>
          <li className="li1"><strong>Honest deals</strong> and <strong>fair prices. 🤝</strong></li>
          <li className="li1"><strong>Expert advice </strong> whenever you need it. 🧙‍♂️</li>
        </ul>
        <p className="para-md text-red-500"><strong>Note: <span>  </span></strong>If selected, it cannot be changed </p>
        <p className="para-md"><strong>Ready to join the solar revolution?</strong> Click <strong>"Proceed"</strong> and let's make it happen! ⚡</p>
      </div>
      <div className={`m-2 ${(selectedOption === "Yes" && subsequentOption === "Self Mode") ? "" : "hidden"}`}>
        <div className="para-md-semibold pb-2">
          Self Mode, Not sure where to start?
        </div>
        <ul className="ul1">
          <li className="li1"><strong>DIY solar!</strong> adventure</li>
          <li className="li1"><strong>Find your EPC match</strong> on our platform.</li>
          <li className="li1"><strong>Negotiate the best deal.</strong> 🤝</li>
        </ul>
        <p className="para-md"><strong>Choose pvNxt Mode</strong> and let our solar experts handle everything. ☀️</p>
      </div>
      <div className={`${selectedOption === "No" ? "" : "hidden"}`}>
        <div className="para-md mt-4">
          How was your experience with pvNXT Platform?
        </div>
        <StarRating />
      </div>

      {/* 
      <div className={`radio-main ${selectedOption === "Yes" ? "" : "hidden"}`}>
        <div className="section-label">
          We have two modes under which you can choose to Install
        </div>
        <div className="radio-body -mt-1">
          {ModeRadioList.map((item) => {
            return (
              <>
                <NewRadioButton  value={item.name} name={item.name} labelname={item.lablename} selectedOption={subsequentOption} onClick={handleRadioChange} />
              </>
            );
          })}
        </div>
      </div>
      <div className="h1"></div> */}



      {/* <div className="radio-main">
        <div className="section-label">
        Let us know if you would like to reduce your electricity bills.
        </div>
        <div className="radio-body">
          {ConfirmRadioList.map((item) => {
            return (
              <>
                <NewRadioButton   value={item.name} name={item.name} labelname={item.lablename} selectedOption={selectedOption} onClick={handleInnerRadioChange} />
              </>
            );
          })}
        </div>
      </div> */}
      {/* <div className="h1"></div> */}
    </div>
  );
};

export default ConfirmAction;

export const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating flex items-center justify-start">
      <span className="para-sm mr-1">Rate Us</span>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star text-4xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
