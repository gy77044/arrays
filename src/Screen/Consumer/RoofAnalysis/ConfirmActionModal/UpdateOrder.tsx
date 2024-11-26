import { useNavigate } from "react-router";
import NewRadioButton from "../../../../Components/New/RadioButton/NewRadioButton";
import { useAppDispatch, useAppSelector } from "../../../../ReduxTool/store/hooks";
import { useState } from "react";
import { setSelectedOption, setSubsequentOption } from "../../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { InputRadio } from "../../../../Components/AllInput/AllInput";

const ModeRadioList = [
  { label: "PVNxt Mode", value: "PVNxt Mode" },
];
const UpdateOrder = () => {
  const dispatch = useAppDispatch();
  const { selectedOption, subsequentOption } = useAppSelector(state => state.consumerReducers.roofAnalysis)
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch(setSubsequentOption(name))
  };

  return (
    <div>
      <p className={`para-md ${selectedOption === "Yes" ? "" : "hidden"}`}>
        Glad to add you to our growing list of customers!
      </p>
      <div className={`radio-main ${selectedOption === "Yes" ? "" : "hidden"}`}>
        <div className="main-box1">
          <label className="label-box1">We have one model under which you can choose to install<span className="text-red-500 font-normal pl-1">*</span></label>
          <div className="input-main2">
            <InputRadio value={subsequentOption} options={ModeRadioList} name="PVNxt Mode" onChange={handleRadioChange} />
          </div>
        </div>
      </div>
      <div className={`note-main mt-2 space-y-2 ${(selectedOption === "Yes" && subsequentOption === "PVNxt Mode") ? "" : "hidden"}`}>
        {/* <div className="input-main2 text-custom-primary-default font-semibold">
          PVNxt Mode:- Under this mode, consumer has following benefits
        </div>
        <div className="note-body">
          <ul className="text-primary-100 text-1.4xl font-medium space-y-2">
            <li className="label-box1">
              1. Leverage experience of solar pv experts from IITs/IIMs with {">"} 50 years of cumulative solar pv market experience at large corporates.
            </li>
            <li className="label-box1">
              2. Save time to focus on your primary activities.
            </li>
            <li className="label-box1">
              3. Be sure of good quality at affordable cost (we know how to strike the right balance).
            </li>
            <li className="label-box1">
              4. Continuous support during execution and operation phase.
            </li>
            <li className="label-box1">
              5. Insights on solar pv (plant) operations and predictive maintenance tips after commissioning.
            </li>
            <li className="label-box1">
              6. Fair contract template.
            </li>
            <li className="label-box1">
              7. And for many more tangible benefits connect to our team.
            </li>
          </ul>
        </div> */}
          <div className="para-md-semibold pb-2">
          Why choose PVNxt Mode?
        </div>
        <ul className="ul1">
          <li className="li1"><strong>Expert solar superheroes</strong> at your service. 🦸‍♂️</li>
          <li className="li1"><strong>Hassle-free </strong> solar installation and maintenance.</li>
          <li className="li1"><strong>Honest deals</strong> and <strong>fair prices. 🤝</strong></li>
          <li className="li1"><strong>Expert advice </strong> whenever you need it. 🧙‍♂️</li>
        </ul>
        <p className="para-md"><strong>Ready to join the solar revolution?</strong> Click <strong>"Update"</strong> and let's make it happen! ⚡</p>
      </div>
      <div className={`note-main ${(selectedOption === "Yes" && subsequentOption === "Self Mode") ? "" : "hidden"}`}>
        <div className="note-header">
          Self Mode:- Under this Mode, Consumer has following benefits.
        </div>
        <div className="note-body">
          <ul className="text-primary-100 text-1.4xl font-medium list-disc list-inside leading-3 space-y-[0.6vh]">
            <li className="leading-[2vh]">
              Where PVNxt will request interested EPC companies on our platform to contact you and<br />
              you directly engage with them to discuss quality, specs, scope, warranty terms,<br />
              pricing, bidding etc on your own and take decision
            </li>
          </ul>
        </div>
      </div>
      <div className={`${selectedOption === "No" ? "" : "hidden"}`}>
        <div className="section-label text-primary-200">
          How was your experience with pvNXT Platform? <span className="text-red-100 font-normal">*</span>
        </div>
        <StarRating />
      </div>
    </div>
  );
};

export default UpdateOrder;

export const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating flex items-center justify-start">
      <span className="mr-1 text-1.4xl">Rate Us</span>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button type="button" key={index} className={index <= (hover || rating) ? "on" : "off"} onClick={() => setRating(index)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)} >
            <span className="star text-[4vh]">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
