import React, { useEffect, useReducer } from 'react';
import covid19Api from '../../services/Covid19Api';
import { countriesReducer, initialCountriesState } from '../../state/countries/reducer';
import './header.css';

const Header: React.FC = () => {

    const [countriesState, countriesDispatch] = useReducer(countriesReducer, initialCountriesState);

    useEffect(() => {
        covid19Api.getCountries()
            .then(countries => countriesDispatch({ type: 'SET_COUNTRIES', countries}))
            .catch(error => console.log(error))
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
    }

    return (
        <header className="flex page-header">
            <span className="title">Covid-19</span>
            <select onChange={(event) => handleChange(event)}>
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