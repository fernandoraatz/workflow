/*
|--------------------------------------------------------------------------
| Model - Products
|--------------------------------------------------------------------------
*/

// Mongoose

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// Schema

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

// Paginate

ProductSchema.plugin(mongoosePaginate);

// Create Schema

mongoose.model('Product', ProductSchema)