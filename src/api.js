import axios from 'axios';

export const fetchData = async (country) => {
    try {
        const {data} = await axios.get(`https://covid19.mathdro.id/api/countries/${country}`);
        const lastUpdateMilliseconds = Date.parse(data.lastUpdate);
        const nowMilliseconds = new Date().getTime();
        const differenceHours = Math.floor((nowMilliseconds - lastUpdateMilliseconds) / 1000 / 60 / 60);

        return {
            confirmed: data.confirmed.value,
            recovered: data.recovered.value,
            deaths: data.deaths.value,
            differenceHours
        };
    } catch (e) {
        console.log(e);
    }
};