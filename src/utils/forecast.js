const request = require('request');

const forecast = (lat, long, callback) => {
    const uri = 'https://api.darksky.net/forecast/431ee9151bb37ce6064f98c65bf6a2d3/' + lat + ',' + long + '?units=si';

    request({ uri, json: true }, (err, { body }) => {
        if (err) return callback('Cannot connect to Forecast services!', undefined);

        if (body.error) return callback(body.error, undefined)

        const { currently } = body;
        const daily = body.daily.data;
        const data = {
            summary: daily[0].summary +
                ' It is currently ' + currently.temperature + ' degrees out. There is a ' + currently.precipProbability + '% chance of rain.',
            hi: 'Temperature High: ' + daily[0].temperatureMax,
            low: 'Temperature Low: ' + daily[0].temperatureMin,
        };
        callback(undefined, data);
    });
};

module.exports = forecast;