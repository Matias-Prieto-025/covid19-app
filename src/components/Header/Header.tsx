import React, { useEffect, useReducer, useContext } from 'react';
import { AppContextDispatch ,SummaryContexDispatch } from '../../App';
import covid19Api from '../../services/Covid19Api';
import { countriesReducer, initialCountriesState } from '../../state/countries/reducer';
import './header.css';

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
        const countryCode = event.target.value;
        covid19Api.summary(countryCode)
            .then(response => summaryDispatch({ type: 'SET_SUMMARY', summary: response}))
            .catch(error => console.log(error))
            .finally(() => appDispatch({ type: 'SET_LOADING', isLoading: false}));
    }

    return (
        <header className="flex page-header">
            <span className="title">Covid-19</span>
            <select onChange={(event) => handleChange(event)}>
                <option value=''>All countries</option>
                {countriesState.map( country => country.iso3 && <option 
                                                                    key={country.iso3} 
                                                                    value={country.iso3}>
                                                                        {country.name}
                                                                </option>)}
            </select>
        </header>
    );
}

export default Header;