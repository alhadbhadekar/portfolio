import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    try{

        let changeableUrl = url;

        if(country) {
            changeableUrl = `${url}/countries/${country}`;
        }

        // const { data } = await axios.get(url);
        
        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate
        // }

        // Above code can be written as 

        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }    

        return modifiedData

    }catch (error){
        alert(error.message);
    }
}

export const fetchDailyData = async () => {
    try{
        const { data } = await axios.get(`${url}/daily`);

        //console.log(data)
        //data is an array. So map each of data to dailyData and get confirmed, deaths and date from each of them
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))

        return modifiedData
    } catch(error){
        alert(error.message);
    }
}

export const fetchCountries = async () => {
    try{
        const { data: { countries } } = await axios.get(`${url}/countries`);
        
        return countries.map((country) => country.name)

    } catch(error){
        alert(error.message);
    }
}
