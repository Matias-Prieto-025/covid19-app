import React, { useState, useEffect, useReducer, useContext } from 'react';
import { AppContextDispatch ,SummaryContexDispatch } from '../../App';
import covid19Api from '../../services/Covid19Api';
import { countriesReducer, initialCountriesState } from '../../state/countries/reducer';
import Select from 'react-select';
import './header.css';

interface SelectOption {
    value: string,
    label: string
}

const initialState: SelectOption = {
    value: '',
    label: 'All Countries'
}

const Header: React.FC = () => {

    const [selectedCountry, setSelectedCountry] = useState<SelectOption>(initialState)

    const summaryDispatch = useContext(SummaryContexDispatch);
    const appDispatch = useContext(AppContextDispatch);

    const [countriesState, countriesDispatch] = useReducer(countriesReducer, initialCountriesState);

    useEffect(() => {
        covid19Api.getCountries()
            .then(countries => countriesDispatch({ type: 'SET_COUNTRIES', countries}))
            .catch(error => console.log(error))
    }, []);

    const handleChange = (value: any) => {
        setSelectedCountry(value);
        appDispatch({ type: 'SET_LOADING', isLoading: true});
        covid19Api.summary(value.value)
            .then(response => summaryDispatch({ type: 'SET_SUMMARY', summary: response}))
            .catch(error => appDispatch({ type: 'SET_ERROR', error }))
            .finally(() => setTimeout( () => {appDispatch({ type: 'SET_LOADING', isLoading: false})}, 300 ));
        
    }

    const selectOptions: Array<SelectOption> = countriesState.map( country => { return { value: country.iso3, label: country.name }} );
    selectOptions.unshift(initialState)

    return (
        <header className="flex page-header">
            <span className="title">Covid-19</span>
            <Select
            isSearchable={true}
                className="width-300"
                value={selectedCountry}
                onChange={handleChange}
                options={selectOptions} />
        </header>
    );
}

export default Header;