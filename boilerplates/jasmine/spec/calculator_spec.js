/*
|--------------------------------------------------------------------------
| Class - Calculator
|--------------------------------------------------------------------------
*/


class Calculator{
    sum(n1, n2){
        return n1 + n2;
    }
    divisor(n1,n2){
      return n1 + n2
    }
}

class Person{
    randomCalc(calculator){
        var n1 = parseInt(Math.random()*10),
            n2 = parseInt(Math.random()*10);
        return `${n1} + ${n2} = ${calculator.sum(n1,n2)}`;
    }
}


xdescribe('Person', function(){

    it('uses the Calculator to sum', function(){
        var calculator = new Calculator();
        var person = new Person();

        spyOn(calculator, 'sum');
        person.randomCalc(calculator);
        expect(calculator.sum).toHaveBeenCalled();
    })

    it('uses the Calculator to sum with parameter', function(){
        var calculator = new Calculator();
        var person = new Person();

        spyOn(person, 'randomCalc');
        person.randomCalc(calculator);
        expect(person.randomCalc).toHaveBeenCalledWith(calculator);
    })
})
