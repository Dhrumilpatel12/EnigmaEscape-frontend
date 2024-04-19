import React from 'react';

function CheckboxDropdown({ options, selectedOptions, onChange }) {
    return (
      <div>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={onChange}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    );
  }

export default CheckboxDropdown;
