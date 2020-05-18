import React from 'react';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './image/image.png';

import regeneratorRuntime from "regenerator-runtime";

class App extends React.Component {
    
    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetcheddata = await fetchData();
        
        this.setState({ data: fetcheddata });
    }

    handleCountryChange = async (country) => {
        const fetcheddata = await fetchData(country);
        //console.log(fetcheddata);
        //fetch the data
        //set the state
        this.setState({ data: fetcheddata, country: country});
    }

    render(){
        
        const { data, country } = this.state;

        return(
            <div className={styles.container} style={{display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"}}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" style={{
                    width: "370px",
                    marginTop: "50px",
                    marginBottom: "80px"
                }}/>
                <CountryPicker handleCountryChange = {this.handleCountryChange} />
                {/* In Above line we are passing entire handleCountryChange function as props to CountryPicker */}
                <Cards data={data}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;