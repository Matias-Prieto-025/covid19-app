import React from 'react';

interface SelectOption {
    key: string | number,
    value: string | number
}

interface SelectProps {
    options: Array<SelectOption>
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    sercheable?: boolean,
    emptyOption?: string,
};

const Select: React.FC<SelectProps> = ({ options, handleChange, emptyOption = undefined, sercheable = false}) => (
    <select onChange={handleChange}>
        { emptyOption && <option value=''>{emptyOption}</option>}
        {
            options.map( option => <option  key={option.key} value={option.key}>{option.value}</option>)
        }
    </select>
)

export default Select;