/*
|--------------------------------------------------------------------------
| Class - Exams
|--------------------------------------------------------------------------
*/


function hello(){
    return 'Hello World!';
}


xdescribe('Hello', function(){
    it('has to print "Hello World!"', function(){
        var text = hello();
        expect(text).toEqual('Hello World!');
    })
})
