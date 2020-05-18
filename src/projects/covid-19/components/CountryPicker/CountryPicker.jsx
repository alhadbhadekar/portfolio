import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css'

import { fetchCountries } from '../../api';

import regeneratorRuntime from "regenerator-runtime";

const CountryPicker = ({ handleCountryChange }) =>{

    const [fetchedCountries, setfetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setfetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setfetchedCountries]);

    //useEffect will run endlessly if second parameter not provided. Here we are providing setfetchedCountries, 
    //so useEffect will change only when setfetchedCountries change

    //console.log(fetchedCountries);

    return (
        <FormControl className={styles.formControl} style= {{width: "30%" , marginBottom: "30px"}}>
            <NativeSelect defaultValue='' onChange={(e) => handleCountryChange(e.target.value)} >
                <option value=''>Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;