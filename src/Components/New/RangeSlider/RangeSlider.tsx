import React from 'react';

const RangeSlider = ({ handleChange, value }: { handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, value: string }) => {

  return (
    <div>
      <div className='section-label'>
        Available Weather Station (Radius in km)
        <span className="text-red-100 font-normal">
          *
        </span>
      </div>
      <div className="h2"></div>
      <div className="flex items-center">
        <input
          type="range"
          min="0"
          max="500"
          value={value}
          onChange={handleChange}
          className="range-slider appearance-none w-[30vh] bg-primary-200 h-[0.6vh] rounded-full outline-none"
        />
        <div className="ml-2">
          <input
            type="text"
            value={`${value}`}
            className=" bg-primary-200 text-1.4xl text-white w-[6vh] h-[4vh] p-0.6 rounded-default flex justify-center items-center relative text-center"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
