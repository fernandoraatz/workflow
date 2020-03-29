/*
|--------------------------------------------------------------------------
| Class - Exams
|--------------------------------------------------------------------------
*/

class Exams{

  constructor(pacient, exams, isParticular, isReturn){
      this.pacient = pacient;
      this.exams = exams;
      this.isParticular = isParticular;
      this.isReturn = isReturn;
  }

  price(){

    if(this.isReturn) return 0;

    let price = 0;

    this.exams.map(function(exam){
        if (exam == "surgery") price += 100;
        else if (exam == "xray") price += 50;
        else price += 25;
    })

    if(this.isParticular) price *= 2

    return price;

  }

  isReturn(){
    return this.IsReturn;
  }

  exams(){
    return this.exams;
  }


}



/*
|--------------------------------------------------------------------------
| Exams - Tests
|--------------------------------------------------------------------------
*/

xdescribe("Exams", function() {

  // Return

  describe("Return Exams", function() {
      it("should not charge if the exam is a return", function() {
          exam = new Exams('Raatz', ['teste'], true, true);
          expect(0).toEqual(exam.price());
      });
  });

  // Particular

  describe("Particular Exams", function() {
      it("should double the price if is particular", function() {
        exam = new Exams('Raatz', ['exam1', 'exam2'], true, false);
        expect(50 * 2).toEqual(exam.price());
      });
  });

  // With Health Plan

  describe("Health Plan Exams", function() {

    it("should charge 25 bucks for every ordinary exam", function() {
        exam = new Exams('Raatz', ['exam1', 'exam2'], false, false);
        expect(50).toEqual(exam.price());
    });

    it("should charge specific price for specific exam", function() {
        exam = new Exams('Raatz', ['exam1','surgery','xray'], false, false);
        expect(175).toEqual(exam.price());
    });


  });


});
