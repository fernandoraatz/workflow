/*
|--------------------------------------------------------------------------
| Tests - Integration
|--------------------------------------------------------------------------
*/

const axios = require('axios');
const client = require('../resources/client.json');

// List All

const API = 'http://localhost:5001/api/clients';

// List All

it('async list all', async () => {
    const res = await axios.get(API);
    expect(res.status).toBe(200);
});

// List By Region

it('async list by region', async () => {
    const res = await axios.get(API);
    const client = res.data.docs[0];
    expect(res.status).toBe(200);
});

// List By Type

it('async list by type', async () => {
    const res = await axios.get(`${API}/type/especial`);
    const client = res.data.docs[0];
    expect(res.status).toBe(200);
});

// Saving 

it('async saving client', async () => {
    const res = await axios.post(API, client);
    expect(res.status).toBe(200);
});