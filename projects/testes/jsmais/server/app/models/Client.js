/*
|--------------------------------------------------------------------------
| Model - Products
|--------------------------------------------------------------------------
*/

// Mongoose

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// Schema

const ClientSchema = new mongoose.Schema({
    type:String,
    gender:String,
    name:{
        title:String,
        first:String,
        last:String
    },
    location:{
        region:String,
        street:String,
        city:String,
        state:String,
        postcode:Number,
        coordinates:{
            latitude:String,
            longitude:String,
        },
        timezone:{
            offset:String,
            description:String,
        }
    },
    email:String,
    dob:{
         date:String
    },
    registered:{
        date:String
    },
    telephoneNumbers:[String],
    mobileNumbers:[String],
    picture:{
        large:String,
        medium:String,
        thumbnail:String
    },
    nationality:String,
    createdAt:{
        type: Date,
        default: Date.now
    }
})

// Paginate

ClientSchema.plugin(mongoosePaginate);

// Create Schema

mongoose.model('Client', ClientSchema)