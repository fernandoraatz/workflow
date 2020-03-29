/*
|--------------------------------------------------------------------------
| Unit Tests - Region
|--------------------------------------------------------------------------
*/

const Region = require('../../app/helpers/regionHelper'); 
let client = require('../resources/client.json');

// Parsing Age

it('parsing region', async () => {
    const res = Region.verify(client);
    expect(res.location.region).toBe('norte')
});


