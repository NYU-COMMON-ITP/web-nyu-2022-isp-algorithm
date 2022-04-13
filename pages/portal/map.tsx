import { getFileInfo } from 'prettier';
import React, { useState } from 'react';

const App = () => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [nameOfPlace, setName] = useState("");

    const https = require('https');
    const [lat_gg_geo, setLat_gg_geo] = useState(null);
    const [lng_gg_geo, setLng_gg_geo] = useState(null);
    const [distance, setDistance] = useState(null);


    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }
    const inputLocation = () => {

        var geocoder = require('google-geocoder');

        var geo = geocoder({

            key: 'AIzaSyBLgPwK9WQ-sQOl-0kVwHjHMlPPWa7aaaaa'

        });

        geo.find(nameOfPlace, function (err, res) {
            var geoInfo = res;
            console.log("i am here");
            setLat_gg_geo(geoInfo[0].location.lat);
            setLng_gg_geo(geoInfo[0].location.lng);
            // console.log(lat_gg_geo);
            // console.log(lng_gg_geo);
            setDistance(Math.floor(getDistanceFromLatLonInKm(lat_gg_geo, lng_gg_geo, lat, lng)));
            // console.log(distance);
        });
    }


    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }





    return (
        <div className="App">


            <div>
                <button onClick={getLocation}>Get Current Location</button>
            </div>
            <div>

            </div>
            <form>
                <label>Enter the Query Location:
                    <input
                        type="text"
                        value={nameOfPlace}
                        onChange={(e) => setName(e.target.value)}

                    />
                </label>
            </form>
            <div>
                <button onClick={inputLocation}>Start Query</button>
            </div>

            <div>

            </div>


            <h1>Coordinates</h1>
            <p>{status}</p>
            <div>
                Name of Space: {nameOfPlace}
            </div>
            {lat && <p>Current Location Latitude: {lat}</p>}
            {lng && <p>Current Location Longitude: {lng}</p>}
            <div>


            </div>
            {lat_gg_geo && <p>Query Location Latitude: {lat_gg_geo}</p>}
            {lat_gg_geo && <p>Query Location Longitude: {lng_gg_geo}</p>}
            <div>


            </div>
            {distance && <p>Distance between current location and query location: {distance}</p>}
        </div>
    );
}

export default App;