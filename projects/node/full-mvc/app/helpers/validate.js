/*
|--------------------------------------------------------------------------
|  Validate
|--------------------------------------------------------------------------
*/

class Validate {

	post(req){
		req.assert("title", "Insira um título").notEmpty();
		req.assert("content", "Insira uma descrição").notEmpty();
		req.assert("category", "Insira uma Categoria").notEmpty();

		return req.validationErrors();
	}

}

module.exports = new Validate();