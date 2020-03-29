/*
|--------------------------------------------------------------------------
| Helpers - Parsers
|--------------------------------------------------------------------------
*/

// Parser Class

class ClientType{

    constructor(){
        this.special = {
            minLat:-46.361899,
            maxLat:-34.276938,
            minLon:-2.196998,
            maxLon:-15.411580,
        }
        this.special_secondary = {
            minLat:-52.997614,
            maxLat:-44.428305,
            minLon:-19.766959,
            maxLon:-23.966413,
        }
        this.normal = {
            minLat:-54.777426,
            maxLat:-46.603598,
            minLon:-26.155681,
            maxLon:-34.016466,
        }
    }

    verify(client){
        let lat = parseFloat(client.location.coordinates.latitude);
        let lon = parseFloat(client.location.coordinates.longitude);

        if ( lat  >= this.special.minLat &&
             lat  <= this.special.maxLat && 
             lon  <= this.special.minLon &&
             lon  >= this.special.maxLon 
        ){
            client.type = "especial" 
        }

        else if ( lat  >= this.special_secondary.minLat &&
                  lat  <= this.special_secondary.maxLat && 
                  lon  <= this.special_secondary.minLon &&
                  lon  >= this.special_secondary.maxLon 
       ){
           client.type = "especial" 
       }

       else if ( lat  >= this.normal.minLat &&
                 lat  <= this.normal.maxLat && 
                 lon  <= this.normal.minLon &&
                 lon  >= this.normal.maxLon 
        ){
        client.type = "normal" 
        }

        else{
            client.type = "laborious" 
        }

        return client;
    }
} 


module.exports = new ClientType();