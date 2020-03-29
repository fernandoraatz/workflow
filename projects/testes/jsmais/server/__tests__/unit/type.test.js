/*
|--------------------------------------------------------------------------
| Unit Tests - Region
|--------------------------------------------------------------------------
*/

const Type = require('../../app/helpers/typeHelper'); 

// Parsing type Especial

it('parsing type especial', async () => {

    const client = {
        "location": {
            "coordinates": {
                "latitude": "-46.361899",
                "longitude": "-15.411580"
            }
        },
    }

    const res = Type.verify(client);
    expect(res.type).toBe('especial') 
});

// Parsing type Especial

it('parsing type second range', async () => {

    const client = {
        "location": {
            "coordinates": {
                "latitude": "-52.997614",
                "longitude": "-19.766959"
            }
        },
    }

    const res = Type.verify(client);
    expect(res.type).toBe('especial') 
});

// Parsing type Normal

it('parsing type normal', async () => {

    const client = {
        "location": {
            "coordinates": {
                "latitude": "-54.777426",
                "longitude": "-26.155681"
            }
        },
    }

    const res = Type.verify(client);
    expect(res.type).toBe('normal') 
});

// Parsing type Laborious

it('parsing type laborious', async () => {

    const client = {
        "location": {
            "coordinates": {
                "latitude": "46.361899",
                "longitude": "15.411580"
            }
        },
    }

    const res = Type.verify(client);
    expect(res.type).toBe('laborious') 
});


