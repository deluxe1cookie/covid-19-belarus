import axios from 'axios';

export const getCountry = async () => {
    try {
        const {data: {country_name}} = await axios.get('https://json.geoiplookup.io/');

        return country_name;
    } catch (e) {
        console.log(e);
    }
};

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

export const translateCountry = async (text) => {
    const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    const key = process.env.REACT_APP_TRANSLATE_API_KEY;
    const lang = 'ru';
    let data;
    try {
        data = await axios.get(url, {params: {key, text, lang}});
    } catch (e) {
        return text;
    }

    return data.data.text[0];
};