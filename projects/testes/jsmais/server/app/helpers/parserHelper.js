/*
|--------------------------------------------------------------------------
| Helpers - Parsers
|--------------------------------------------------------------------------
*/

// Parser Class

class Parsers{

    genderParser(client){

        if(client.gender === 'female'){
            client.gender = 'F';
        }
        else if(client.gender === 'male'){
            client.gender = 'M';
        }

        return client;
    }

    nationalityParser(client){
        client["nationality"] = 'BR'

        return client;
    }

    ageParser(client){
        delete client.dob.age;
        delete client.registered.age;

        return client;
    }

    phoneParser(client){
        let regexPhone = `++${client.phone.replace(/\D/g,'')}`
        let regexCell = `++${client.cell.replace(/\D/g,'')}`
        client.phone = regexPhone;
        client.cell = regexCell;

        let phones = [],
            cells = [] 

        phones.push(client.phone)
        cells.push(client.cell)

        client.phone = phones;
        client.cell = cells;
        delete Object.assign(client, {telephoneNumbers: client.phone }).phone;
        delete Object.assign(client, {mobileNumbers: client.cell }).cell;

        return client;
    }
} 


module.exports = new Parsers();