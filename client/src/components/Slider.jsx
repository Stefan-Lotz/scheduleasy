import React, { useState } from "react";

const Slider = ({ min, max, value, onChange }) => {
  const [tooltip, setTooltip] = useState(value);

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setTooltip(newValue);
    onChange(newValue);
  };

  return (
    <div className="relative w-full select-none mt-10">
      <div className="relative w-full h-[50px]">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleInputChange}
          className="slider"
        />
        <div className="absolute -top-[30px] bg-mint text-white p-[5px] rounded-md text-sm whitespace-nowrap -translate-x-1/2 font-sans left-1/2 pointer-events-none">
          {tooltip}
        </div>
      </div>
      <div className="absolute w-[96.5%] ml-2.5">
        <div className="w-full absolute -top-5">
          {[0, 5, 10, 15, 20].map((tick) => (
            <span
              key={tick}
              className="text-222 dark:text-white font-sans text-xs absolute -translate-x-1/2"
              style={{ left: `${((tick - min) / (max - min)) * 100}%` }}
            >
              {tick}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
