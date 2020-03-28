import React, { useEffect, useReducer, useContext } from 'react';
import { AppContextDispatch ,SummaryContexDispatch } from '../../App';
import covid19Api from '../../services/Covid19Api';
import { countriesReducer, initialCountriesState } from '../../state/countries/reducer';
import Select from '../Form/Select/Select';
import './header.css';

interface SelectOption {
    key: string,
    value: string
}

const Header: React.FC = () => {

    const summaryDispatch = useContext(SummaryContexDispatch);
    const appDispatch = useContext(AppContextDispatch);

    const [countriesState, countriesDispatch] = useReducer(countriesReducer, initialCountriesState);

    useEffect(() => {
        covid19Api.getCountries()
            .then(countries => countriesDispatch({ type: 'SET_COUNTRIES', countries}))
            .catch(error => console.log(error))
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        appDispatch({ type: 'SET_LOADING', isLoading: true});
        const value = event.target.value;
        covid19Api.summary(value)
            .then(response => summaryDispatch({ type: 'SET_SUMMARY', summary: response}))
            .catch(error => appDispatch({ type: 'SET_ERROR', error }))
            .finally(() => setTimeout( () => {appDispatch({ type: 'SET_LOADING', isLoading: false})}, 300 ));
        
    }

    const selectOptions: Array<SelectOption> = countriesState.map( country => { return { key: country.iso3, value: country.name }} );

    interface SelectProps {
        options: Array<SelectOption>
        handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
        sercheable?: boolean,
        emptyOption?: string,
    };
    return (
        <header className="flex page-header">
            <span className="title">Covid-19</span>
            <Select
                handleChange={handleChange}
                options={selectOptions} />
        </header>
    );
}

export default Header;