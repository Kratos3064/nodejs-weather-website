const request = require('request');

const geoCode = (address, callback) => {
   const uri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoia3JhdG9zMzA2NCIsImEiOiJjazJnem80Y3owdTlhM21vZTJlZHRpb3JoIn0.CbB4wtr7dlUe1ntANb-Hiw&limit=1';

   request({ uri, json: true }, (err, { body }) => {
      if (err) return callback('Cannot connect to GeoCode services!', undefined);

      if (body.message || body.features.length === 0) return callback('Cannot find provided location.', undefined);

      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const placeName = body.features[0].place_name;
      const data = {
         latitude,
         longitude,
         placeName
      };

      callback(undefined, data);
   });
};

module.exports = geoCode;