/*
|--------------------------------------------------------------------------
| Unit Tests - Parser
|--------------------------------------------------------------------------
*/

const Parser = require('../../app/helpers/parserHelper'); 
let client = require('../resources/client.json');

// Parsing Gender

it('parsing gender', async () => {
    const res = Parser.genderParser(client);
    expect(res.gender).toBe('M')
});


// Parsing Nationality

it('parsing nationality', async () => {
    const res = Parser.nationalityParser(client);
    expect(res.nationality).toBe('BR')
});

// Parsing Age

it('parsing age', async () => {
    const res = Parser.ageParser(client);

    const dboExpected = {"date": "1978-05-26T21:31:26Z"};
    const registeredExpected = {"date": "2015-06-28T11:17:25Z"};

    expect(res.dob).toEqual(dboExpected);
    expect(res.registered).toEqual(registeredExpected);
});

// Parsing Parser

it('phone parser', async () => {
    const res = Parser.phoneParser(client);

    const phoneExpected = [ "++2572450951"];
    const cellExpected = [ "++0595616733"];

    expect(res.telephoneNumbers).toEqual(phoneExpected);
    expect(res.mobileNumbers).toEqual(cellExpected);
});

