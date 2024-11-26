import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

interface AppProps {}

const DateRangePicker: React.FC<AppProps> = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(11)), // Ensure endDate is a Date object
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };
  return (
    <div className="relative border-[1.2vh] border-primary-700/20 bg-primary-700/20 ml-1.2 ">
      <Datepicker inputClassName="focus:ring-0 font-normal bg-primary-700/20 focus:none focus:outline-none rounded-none m-0 pl-1" showShortcuts={true} popoverDirection="down" value={value} onChange={handleValueChange}/>
    </div>
  );
};

export default DateRangePicker;
