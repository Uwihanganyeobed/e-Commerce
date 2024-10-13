import React, { useState } from "react";
import "./styles.css";
import Select from "react-select";

const OneSearch = ({ options }) => {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = options.map(option => ({
    value: option,
    label: option
  }));

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
  }

  return (
    <div className="dropdown-container">
      <Select
        options={optionList}
        placeholder="Product type"
        value={selectedOptions}
        onChange={handleSelect}
        isSearchable={true}
        isMulti
      />
    </div>
  );
}

export default OneSearch;
