const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config.
const pubDir = path.join(__dirname, '../public');
const viewDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location.
app.set('view engine', 'hbs');
app.set('views', viewDir);
hbs.registerPartials(partialsDir);

// Setup static directory to serve.
app.use(express.static(pubDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        createdBy: 'Created by Ram PranaV'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        about: 'My name is Ram',
        createdBy: 'Created by Ram PranaV'
    })
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        detail: 'Phone No.: 4698733388',
        createdBy: 'Created by Ram PranaV'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        detail: 'Visit our nearest dealer to help you.',
        createdBy: 'Created by Ram PranaV'
    })
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address)
        return res.send({
            error: 'Address needs to be provided.'
        })

    geoCode(address, (err, { latitude, longitude, placeName } = {}) => {
        if (err)
            return res.send({
                error: err
            });

        forecast(latitude, longitude, (forecastErr, {summary, hi, low} = {}) => {
            if (forecastErr)
                return res.send({
                    error: forecastErr
                });

            res.send({
                location: placeName,
                forecast: summary,
                hi,
                low
            });
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: 'Help page not found.',
        errorMsg: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found.',
        errorMsg: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on the port ' + port + '.');
});