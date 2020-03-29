/*
|--------------------------------------------------------------------------
| Class - maxMin
|--------------------------------------------------------------------------
*/

class maxMin{

    getNumbers(numbers){

        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;

        console.log(`Given the numbers: ${numbers}`)

       numbers.map(function(number){
          if(number <  min) min = number;
          if(number > max) max = number;
        })

        return{  min: min,  max: max  }

    }

     getMin(min){
       console.log(`The minor number is: ${min}`)
       return min;
     }

     getMax(max){
       console.log(`The max number is: ${max}`);
       return max;
     }


  }


/*
|--------------------------------------------------------------------------
| Maxmin - Tests
|--------------------------------------------------------------------------
*/

xdescribe("Min and Max", function() {

    var algoritm;

    beforeEach(function() {
            algoritm = new maxMin()
    });

    it("should understand numbers on random order", function() {
        let numbers = algoritm.getNumbers([1,15,5,6])
        expect(algoritm.getMin(numbers.min)).toEqual(1);
        expect(algoritm.getMax(numbers.max)).toEqual(15);
    })

    it("should understand numbers on decrescent order", function() {
        let numbers = algoritm.getNumbers([9,8,7,6])
        expect(algoritm.getMin(numbers.min)).toEqual(6);
        expect(algoritm.getMax(numbers.max)).toEqual(9);
    });


});
