import express from 'express';
import { getDataFromFile } from '../utils/utils.js';

export const router = express.Router();

router.get('/weatherbit-current', async (req,res) => {
    const weatherbitCurrent = await getDataFromFile('weatherbit_current.json');
    res.json(weatherbitCurrent)
});

router.get('/openweathermap-current', async (req,res) => {
    const openweathermapCurrent = await getDataFromFile('openweathermap_current.json');
    res.json(openweathermapCurrent)
});

router.get('/accuweather-current', async (req,res) => {
    const accuweatherCurrent = await getDataFromFile('accuweather_current.json');
    res.json(accuweatherCurrent)
});

router.get('/accuweather-daily', async (req,res) => {
    const accuweatherDaily = await getDataFromFile('accuweather_daily.json');
    res.json(accuweatherDaily)
});

router.get('/accuweather-location', async (req,res) => {
    const accuweatherLocation = await getDataFromFile('accuweather_location.json');
    res.json(accuweatherLocation)
});
// import express from 'express';
// import { getDataFromFile } from '../utils/utils.js';

// export const router = express.Router();

// router.get('/weatherbit-current', async (req, res) => {
//   const weatherbitCurrent = await getDataFromFile('weatherbit_current.json');
//   res.json(weatherbitCurrent);
// });

// router.get('/openweathermap-current', async (req, res) => {
//   const weatherbitCurrent = await getDataFromFile(
//     'openweathermap_current.json',
//   );
//   res.json(weatherbitCurrent);
// });

// router.get('/accuweather-current', async (req, res) => {
//   const weatherbitCurrent = await getDataFromFile('accuweather_current.json');
//   res.json(weatherbitCurrent);
// });

// router.get('/accuweather-daily', async (req, res) => {
//   const weatherbitCurrent = await getDataFromFile('accuweather_daily.json');
//   res.json(weatherbitCurrent);
// });

// router.get('/accuweather-location', async (req, res) => {
//   const weatherbitCurrent = await getDataFromFile('accuweather_location.json');
//   res.json(weatherbitCurrent);
// });
