import express from 'express';
import dotenv from 'dotenv';
import { router as mocks } from './routes/weather-mocks.js';
import { router as weather } from './routes/weather.js';

dotenv.config({'path': 'env'});
const app = express();
const port = process.env.PORT;

app.use(express.static('weather'));

app.use('/mocks', mocks);
app.use('/weather', weather);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.listen();
