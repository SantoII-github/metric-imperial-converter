const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("Function convertHandler.getNum(input)", function () {

        test("Whole number input", (done) => {
            let input = "32L";
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });
        
        test("Decimal number input", (done) => {
            let input = "1.2L"
            assert.equal(convertHandler.getNum(input), 1.2);
            done();
        });
        
        test("Fractional input", (done) => {
            let input = "1/2L"
            assert.equal(convertHandler.getNum(input), 0.5);
            done();
        });

        test("Fractional input with a decimal", (done) => {
            let input = "10/2.5L"
            assert.equal(convertHandler.getNum(input), 4);
            done();
        });

        test("Invalid Input, double fraction", (done) => {
            let input = "3/2/3L"
            assert.isUndefined(convertHandler.getNum(input))
            done();
        });

        test("Default to 1 if no numerical input", (done) => {
            let input = "L"
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    })

    suite("Function convertHandler.getUnit(input)", function() {
        test("Valid unit input", (done) => {
            let input = ["gal", "L", "mi", "km", "lbs", "kg", "GAL", "MI", "KM", "LBS", "KG"]
            let output = ["gal", "L", "mi", "km", "lbs", "kg",  "gal", "mi", "km", "lbs", "kg"]
            input.forEach((element, i) => {
                assert.equal(convertHandler.getUnit(element), output[i]);
            });
            done();
        });
        
        test("Invalid unit input", (done) => {
            let input = "15bajillion"
            assert.isUndefined(convertHandler.getUnit(input))
            done();
        });
    })

    suite("Function convertHandler.getReturnUnit(input)", function() {
        test("Valid unit conversion", (done) => {
            let input = ["gal", "L", "mi", "km", "lbs", "kg"]
            let output = ["L", "gal", "km", "mi", "kg", "lbs"]
            input.forEach((element, i) => {
                assert.equal(convertHandler.getReturnUnit(element), output[i]);
            });
            done();
        });
    });

    suite("Function convertHandler.spellOutUnit(input)", function() {
        test("Valid unit spelling out", (done) => {
            let input = ["gal", "L", "mi", "km", "lbs", "kg"]
            let output = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"]
            input.forEach((element, i) => {
                assert.equal(convertHandler.spellOutUnit(element), output[i]);
            });
            done();
        });
    });

    suite("Function convertHandler.convert(initNum, initUnit)", function() {
        test("L to gal", (done) => {
            let input = [5, "l"]
            let output = 1.32086
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test("gal to L", (done) => {
            let input = [1.32086, "gal"]
            let output = 5
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test("mi to km", (done) => {
            let input = [5, "mi"]
            let output = 8.04672
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test("km to mi", (done) => {
            let input = [8.04672, "km"]
            let output = 5
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test("lbs to kg", (done) => {
            let input = [5, "lbs"]
            let output = 2.26796
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test("kg to lbs", (done) => {
            let input = [2.26796, "kg"]
            let output = 5
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
    });
});