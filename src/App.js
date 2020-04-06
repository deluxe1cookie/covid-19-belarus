import React from 'react';
import './App.css';
import {fetchData, getCountry, translateCountry} from './api';
import styles from './App.module.css';
import Loader from './Loader';
import geolocationPic from './geolocation.svg';

class App extends React.Component {
    state = {
        country: 'Belarus',
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        differenceHours: 0
    };

    async componentDidMount() {
        const country = await getCountry();

        let newState = await fetchData(country);

        const countryInRussian = await translateCountry(country);
        newState.country = countryInRussian;
        this.setState(newState);
    }


    render() {
        let hoursString;
        let arr = [
            [0, 'меньше'], [1, ''], [2, 'два'], [3, 'три'], [4, 'четыре'], [5, 'пять'], [6, 'шесть'], [7, 'семь'],
            [8, 'восемь'], [9, 'девять'], [10, 'десять'], [11, 'одиннадцать'], [12, 'двенадцать'], [13, 'тринадцать'],
            // [14, 'шесть'], [15, 'семь'], ...
        ];
        if (this.state.differenceHours >= 5 && this.state.differenceHours <= 20) {
            hoursString = 'часов';
        } else if (this.state.differenceHours === 1 || this.state.differenceHours === 21) {
            hoursString = 'час';
        } else {
            hoursString = 'часа';
        }

        return (
            <div className="App">
                {(this.state.confirmed === 0)
                    ? <Loader/>
                    : <div className={styles.container}>
                        <div className={styles.infoTop}>
                            <span>
                                <img src={geolocationPic} alt='значок геолокации'/>
                                {this.state.country}, {`${arr[this.state.differenceHours][1]} ${hoursString} назад`}
                            </span>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.boxItem}>
                                <h1 className={styles.confirmed}>{this.state.confirmed}</h1>
                            </div>
                            <div className={styles.boxItem}>
                                <h1 className={styles.recovered}>{this.state.recovered}</h1>
                            </div>
                            <div className={styles.boxItem}>
                                <h1 className={styles.deaths}>{this.state.deaths}</h1>
                            </div>
                        </div>
                        <div className={styles.infoBottom}>
                            <div>
                                <a href='https://systems.jhu.edu/' target='_blank' rel='noopener noreferrer'>
                                    <span>Центр системных наук и инженерии при Университете Джонса Хопкинса</span>
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default App;
