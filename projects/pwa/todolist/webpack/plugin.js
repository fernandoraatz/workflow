/*
|--------------------------------------------------------------------------
| RmDist
|--------------------------------------------------------------------------
*/

const exec = require('child_process').exec;

class RmDist{
	constructor(options){
		this.options = options;
	}

	apply(compiler){
		console.log('[v] Successfully removed dist folder');
		compiler.plugin('compile', () => {
			exec(`rm -r ${this.options.path}`, function(err, stdout, stderr){
				console.log('Finish');
			})
		})

	}
}

module.exports = RmDist;
