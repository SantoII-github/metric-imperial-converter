// If no number is given it will be assumed to be one unit
function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || "1"
  let string = input.match(/[a-zA-Z]+/g)[0]

  return [ number[0], string ]
}

// If there's more than one / in the input this will return false
function checkDiv(possibleFraction) {
  let nums = possibleFraction.split('/');
  if (nums.length > 2) {
    return false;
  }
  return nums;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums) {
      return undefined;
    }
    
    let num1 = nums[0];
    let num2 = nums[1] || "1"
    if (isNaN(num1) || isNaN(num2)) {
      return undefined
    }

    result = parseFloat(num1) / parseFloat(num2);
    return result;
  };
  
  this.getUnit = function(input) {
    let unit = numberStringSplitter(input)[1].toLowerCase();
    switch (unit) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case "km":
        return "mi";
      case "mi":
        return "km";
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    let unitToSpell = unit.toLowerCase();
    
    switch(unitToSpell) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return undefined;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;
    
    switch(unit) {
      case "km":
        result = initNum / miToKm;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      default:
        result = undefined;
    }

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;
