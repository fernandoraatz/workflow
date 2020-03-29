/*
|--------------------------------------------------------------------------
| Patient - Class
|--------------------------------------------------------------------------
*/

class Patient{

    constructor(name, age, weight, height){
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
    }

    print(){
      return `${this.name} has age ${this.age}`
    }

    heartbeat(){
       return 'Heartbeat quantity: ' + this.age * 365 * 24 * 60 * 80;
    }

    bmi(){
       return 'BMI: ' + (this.weight / (this.height * this.height)).toFixed(1) + '';
    }
}

/*
|--------------------------------------------------------------------------
| Patient - ClassBuild
|--------------------------------------------------------------------------
*/

class PatientBuilder{

    constructor(){
        this.name = 'Raatz';
        this.age = 27;
        this.weight = 84;
        this.height = 1.70;
    }

    handlerName(value) {
      this.name = value;
      return this;
    }

    handlerAge(value) {
       this.age = value;
       return this;
    }

    handlerWeight(value) {
      this.weight = value;
      return this;
    }

    handlerHeight(value) {
       this.height = value;
       return this;
     }

    build(){
      return new Patient(this.name, this.age, this.weight, this.height);
    }

}


/*
|--------------------------------------------------------------------------
| Patient - Tests
|--------------------------------------------------------------------------
*/

describe("Patient", function() {
    it("should calculate BMI", function() {
        patient = new PatientBuilder().build();
        let bmi = patient.bmi();
        expect('BMI: ' + 29.1).toEqual(bmi);
    });
});
