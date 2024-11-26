import Multiselect from "multiselect-react-dropdown";
import React, { memo, useState } from "react";
import { isTruthy } from "../../../Utils/commonFunctions";
import "./style.css";
const MultiSelectPicker: React.FC<any> = ({
  id,
  groupBy,
  labelname,
  options,
  placeholder = "",
  onChange,
  onRemove,
  value,
  infoDetails,
  isRequired = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFoucshandler = () => {
    setIsFocused(true);
  };
  const onBlurHandler = () => {
    setIsFocused(false);
  };

  const style = {
    chips: {
      background: "#069FB1",
      color:'#ffffff',
      borderRadius:2,
      marginBottom:0,
      padding:'2px 7px'
    },
    searchBox: {
      overflow:'auto',
    },
    displayBlock:{
      background:'#e6e6e6',
      zIndex:11
    },
  };
  return (
    <div className="main-box1 group">
      {labelname && (
        <label
          title={
            value
              ? Array.isArray(value)
                ? value.map((el: any) => el.label).toString()
                : typeof value === "object"
                ? value?.value
                : value
              : ""
          }
          className={`label-box1 ${
            isFocused || isTruthy(value) ? "focused" : ""
          }`}
        >
          {labelname}{" "}
          {isRequired && <span className="maindatory-fields">*</span>}
        </label>
      )}
      <Multiselect
        options={options}
        selectedValues={value}
        onSelect={onChange}
        onRemove={onChange}
        onSearch={onFoucshandler}
        displayValue="label"
        groupBy={groupBy}
        showCheckbox={true}
        placeholder={placeholder}
        style={style}
      />
    </div>
  );
};

export default memo(MultiSelectPicker);
