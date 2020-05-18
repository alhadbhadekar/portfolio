import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import regeneratorRuntime from "regenerator-runtime";

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) =>{
    const [dailyData, setDailyData] = useState([]);

    //Above 2 lines are similar to setting 
    // state = {
    //     dailyData: {}
    // }
    //dailyData is an array so used useState([]). Else use useState({})

    useEffect(() => {
        const fetchAPI = async () =>{
            //const dailyData = await fetchDailyData();
            //Below line will set dailyData to response of fetchDailyData(). This is the use of setDailyData.
            setDailyData(await fetchDailyData());
        }

        //console.log("Daily Data", dailyData);

        fetchAPI();
    }, []);

    //useEffect goes on endlessly, so we need to add an ampty [] to make it load once like componentDidMount

    const lineChart = (
        dailyData.length
        ? (<Line
            data={{
                // labels is an array
                // Looping through dailyData and destructure date and return specific date: dailyData(({ date }) => date)
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                   data: dailyData.map(({ confirmed }) => confirmed),
                   label: "Infected",
                   borderColor: '#3333ff',
                   fill: true,     
                }, {
                   data: dailyData.map(({ deaths }) => deaths),
                   label: "Deaths",
                   borderColor: 'red',
                   backgroundColor: 'rgba(255, 0, 0, 0.5)',
                   fill: true, 
                }], 
            }}
        />) : null
    );
    
    //console.log(confirmed, recovered, deaths);
    
    const barChar = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }],
                }}
                options={{
                    legend: {display: false},
                    title: { display: true, text: `Current state in ${country}`}
                }}
            />

        ) : null
    )

    return (
        <div className={styles.container} style={{display: "flex",
            justifyContent: "center",
            width: "85%"}}>
            {country ? barChar: lineChart}
        </div>
    )
}

export default Chart; 