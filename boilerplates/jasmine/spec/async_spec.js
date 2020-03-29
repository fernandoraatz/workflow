/*
|--------------------------------------------------------------------------
| Class - Async
|--------------------------------------------------------------------------
*/


var myValue = 0;
function myAsyncFunc(){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            myValue = 10; 
            resolve(myValue);
        }, 2000)
    })
    return promise;

}

/*
|--------------------------------------------------------------------------
| Test - Async
|--------------------------------------------------------------------------
*/


describe('Async Function', function(){

    it('should be 10', function(done){
          myAsyncFunc().then(function(){
              expect(myValue).toEqual(10);
              done();
          });
      })
})
