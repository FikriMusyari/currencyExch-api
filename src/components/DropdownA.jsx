import React from 'react';
import Select from 'react-select';

const DropdownA = ({ options, selectedCurrency, onCurrencyChange }) => {
  const handleChange = (selectedOption) => {
    onCurrencyChange(selectedOption);
  };

  const customstyle = {
    control: (provided) => ({
      ...provided,
      borderColor: 'gray',
      boxShadow: 'none',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'transparent',
      ':hover': {
        backgroundColor: 'lightblue',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'gray',
    }),
  };

  return (
    <div className='mb-5'>
      <Select
        value={selectedCurrency}
        onChange={handleChange}
        options={options}
        isSearchable={true}
        placeholder="Cari dan pilih..."
        styles={customstyle}
      />
    </div>
  );
};

export default DropdownA;
