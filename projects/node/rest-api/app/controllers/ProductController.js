/*
|--------------------------------------------------------------------------
| Controller - Todos
|--------------------------------------------------------------------------
*/

// Modules

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// Controller Class

class ProductController{

    async list(req, res){
        const {page = 1} = req.query;
        const products = await Product.paginate({}, {page, limit: 5});
        return res.json(products);
    }

    async save(req, res){
        const product = await Product.create(req.body);
        return res.json(product); 
    }

    async getById(req, res){
        const product = await Product.findById(req.params.id);
        return res.json(product); 
    }

    async update(req, res){
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
        return res.json(product);  
    }

    async delete(req, res){
        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    }
    
}


module.exports = new ProductController();