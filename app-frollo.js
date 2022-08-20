const http = require('https');
const express = require('express');
// const url = 'https://frollolabs-staging.frollo.us';



// const BaseURL = 'https://frollolabs-staging.frollo.us';
const BaseURL = 'https://stoplight.io/mocks/frollo/frollo-api/24091152';
const OAuth2iDPURL = 'https://frollolabs-staging.frollo.us';
const oUrl = 'https://id-staging.frollo.us';
const RedirectURL = 'clientname://authorize';
const ClientID = '<CLIENT_ID>';
const Username = '<EMAIL>';
const Password = '<PASSWORD>';

const apiV = '/api/v2';

const app = express();


// http.get(url, function (response) {
//     let posts = '';

//     response.on('data', function (data) {
//         posts += data.toString();
//     });

//     response.on('end', function () {
//         console.log(posts.length);
//         console.log(posts.toString());
//     });

// });
function init() {
    oAuth();
    listProviders();
    // registerUser();
}

function oAuth() {

    const data = JSON.stringify({
        "grant_type": "client_credentials",
        "domain": "api-sandbox.frollo.us",
        "client_id": "04AA7BA4-B0C7-435E-BEAC-25DC2CA31C03",
        "client_secret": "abc.123.xyz",
        scope: "offline openid email"
    });

    const options = {
        protocol: 'https:',
        hostname: 'stoplight.io',
        path: '/mocks/frollo/frollo-api/24096416/oauth/token',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, (res) => {
        let data = '';

        console.log('Status Code:', res.statusCode);

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Body: ', JSON.parse(data));
        });

    }).on('error', (err) => {
        console.log('Error: ', err.message);
    });

    req.write(data);
    req.end();

}


function listProviders() {

    const options = {
        "method": "GET",
        "hostname": "stoplight.io",
        "port": null,
        "path": "/mocks/frollo/frollo-api/24091152/aggregation/providers",
        "headers": {
            "Content-Type": "*/*",
            "Accept": "*/*",
            "X-Bundle-Id": "1",
            "X-Software-Version": "1",
            "X-Device-Version": "1",
            "X-Api-Version": "1",
            "X-User-Otp": "1",
            "Prefer": "code=200",
            "Authorization": "Bearer 1"
        }
    };

    const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.end();

}

function registerUser() {

    const data = JSON.stringify({
        external_id: 'string',
        first_name: 'string',
        last_name: 'string',
        email: 'string',
        mobile_number: 'string',
        primary_currency: 'string',
        gender: 'male',
        date_of_birth: 'string',
        current_address: {
            line_1: 'string',
            line_2: 'string',
            suburb: 'string',
            state: 'string',
            postcode: 'string'
        },
        previous_address: {
            line_1: 'string',
            line_2: 'string',
            suburb: 'string',
            state: 'string',
            postcode: 'string'
        },
        marital_status: 'single',
        household_size: 0,

    });

    const options = {
        protocol: 'https:',
        hostname: 'stoplight.io',
        path: '/mocks/frollo/frollo-api/24091153/users',
        method: 'POST',
        headers: {
            'Prefer': 'code=201, dynamic=true',
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, (res) => {
        let data = '';

        console.log('Status Code:', res.statusCode);

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Body: ', JSON.parse(data));
        });

    }).on('error', (err) => {
        console.log('Error: ', err.message);
    });

    req.write(data);
    req.end();

}


module.exports.handlers = app;
module.exports.init = init;