import { useNavigate } from "react-router";
import NewRadioButton from "../../../../Components/New/RadioButton/NewRadioButton";
import { useAppDispatch, useAppSelector } from "../../../../ReduxTool/store/hooks";
import { useState } from "react";
import { setSelectedOption, setSubsequentOption } from "../../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { InputRadio } from "../../../../Components/AllInput/AllInput";

const UpdateOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ModeRadioList = [
    { label: "PVNxt Mode", value: "PVNxt Mode" },
    // { lablename: "Self Mode", name: "Self Mode" },
  ];

  const {selectedOption, subsequentOption} = useAppSelector(state=>state.consumerReducers.roofAnalysis)
  const handleInnerRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch(setSelectedOption(name))
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
   dispatch(setSubsequentOption(name))
  };

  return (
    <div>
      <p className={`text-primary-400 text-1.4xl font-semibold leading-[6vh] ${selectedOption === "Yes" ? "" : "hidden"}`}>
        Glad to add you to our growing list of customers!
      </p>
      {/* <div className={`radio-main ${selectedOption === "Yes" ? "" : "hidden"}`}>      
        <div className="main-box2">
              <label className="label-box1">We have one model under which you can choose to Install  <span className="text-red-400 font-normal pl-1">*</span></label>
              <div className="input-main2">
                <InputRadio 
                options={ModeRadioList}
                onChange={handleRadioChange}
                value={subsequentOption} />
              </div>
            </div>
      </div> */}
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
        <p className="para-md"><strong>Ready to join the solar revolution?</strong> Click <strong>"Update"</strong> and let's make it happen! ⚡</p>
      </div>

      {/* <div className={`m-2 ${(selectedOption === "Yes" && subsequentOption === "PVNxt Mode") ? "" : "hidden"}`}>
        <div className="para-md-semibold pb-2">
          PVNxt Mode:-
          Under this Mode, Consumer has following benefits,
        </div>        
          <ul className="ul1 list-decimal list-outside" >
            <li className="li1">
             Leverage Experience of Solar PV experts from IITs/IIMs with {">"} 50 Years of<br />
              cumulative Solar PV market experience at large corporates
            </li>
            <li className="li1">
              Save time to focus on your primary activities
            </li>
            <li className="li1">
              Be sure of good quality at affordable cost (we know how to strike the right balance)
            </li>
            <li className="li1">
              Continuous support during Execution and Operation Phase
            </li>
            <li className="li1">
              Insights on Solar PV (Plant) Operations and Predictive Maintenance Tips after commissioning
            </li>
            <li className="li1">
              Fair Contract Template
            </li>
            <li className="li1">
              And for many more tangible benefits connect to our team ..
            </li>
          </ul>        
      </div>
      <div className={`m-2 ${(selectedOption === "Yes" && subsequentOption === "Self Mode") ? "" : "hidden"}`}>
        <div className="para-md-semibold pb-2">
          Self Mode:-
          Under this Mode, Consumer has following benefits,
        </div>
        
          <ul className="ul1">
            <li className="li1">
              Where PVNxt will request interested EPC companies on our platform to contact you and<br />
              you directly engage with them to discuss quality, specs, scope, warranty terms,<br />
              pricing, bidding etc on your own and take decision
            </li>
          </ul>
       
      </div>
      <div className={`${selectedOption === "No" ? "" : "hidden"}`}>
        <div className="para-md mt-4">
          How was your experience with pvNXT Platform?
          <span className="text-red-400 font-normal">*</span>
        </div>
        <StarRating />
      </div> */}
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
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star text-[4vh]">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
