/* *************************************
*  Weather Site JavaScript Functions
************************************* */
// Making sure the JS file is working //
console.log('My JS is being Read.');



// busDriver is going to call all of my other functions and run all my test cases.
// Not of crazy significance, but it will help me debug it all out.
function busDriver() {
   // Get the condition and change the image //
   const condition = getCondition("haze");
   changeSummaryImage(condition);

   // testing the buildWC function with temp and speed variables created //
   const temp = 31;
   const speed = 5;
   buildWC(speed, temp);

   // Calling the windDial function to test weather the dial accurately changes.
   windDial('w');

   // Calling to convertMeters function
   let meters = 12;
   console.log("Meters: " + meters);
   let feet = convertMeters(meters);
   console.log("Feet: " + feet);
}

// Calls the busDriver()
busDriver();




// windDial is what will set the addribute of the dial class //
function windDial(direction){
   // get the dial class
   const dial = document.getElementById("dial");
    // make sure the string is in all upper case characters
    direction = direction.toUpperCase();

    // Start the switch (gross)... console.log will help debug if needed
   switch (direction){
      case "North":
      case "N":
      dial.setAttribute("class", "n");
      console.log('Wind Pointer Set to North.');
      break;
      case "NE":
      case "NNE":
      case "ENE":
      dial.setAttribute("class", "ne");
      console.log('Wind Pointer Set to North East.');
      break;
      case "NW":
      case "NNW":
      case "WNW":
      dial.setAttribute("class", "nw");
      console.log('Wind Pointer Set to North West.');
      break;
      case "South":
      case "S":
      dial.setAttribute("class", "s");
      console.log('Wind Pointer Set to South.');
      break;
      case "SE":
      case "SSE":
      case "ESE":
      dial.setAttribute("class", "se");
      console.log('Wind Pointer Set to South East.');
      break;
      case "SW":
      case "SSW":
      case "WSW":
      dial.setAttribute("class", "sw");
      console.log('Wind Pointer Set to South West');
      break;
      case "East":
      case "E":
      dial.setAttribute('class', "e");
      console.log('Wind Pointer Set to East.');
      break;
      case "West":
      case "W":
      console.log("made it")
      dial.setAttribute("class", "w");
      console.log('Wind Pointer Set to West.');
      break;
      default:
      console.log("Nothing Worked... direction: " + direction);
      }
}

// buildWC will just build the wind chill factor and change the innerHTML
// console.log will help debug if needed
function buildWC(speed, temp) {
   // get the id of the element
   const feelTemp = document.getElementById('feels');
   // do fancy maths
   let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
   console.log(wc);
   wc = Math.floor(wc);
   // determine the smallest temperature for the tinal result
   wc = (wc > temp) ? temp : wc;
   console.log(wc);
   // change the HTML of 'feels' (const created earlier as feelTemp)
   feelTemp.innerHTML = wc;
}

// getCondition() will test a series of statements and determine what 
// the weather condition should be defined as so we can change the picture
// console.log will debug throughout
function getCondition(statement) {
   // Make them all lower case //
   statement = statement.toLowerCase();
   console.log("statement passed to getCondition() is: " + statement);
   // create an empty condition (I still don't get why let is preferred over var)
   let condition = "";

   // Start the if statement. Not necessarily neat, but still preferred over
   // switch statements
   if(statement == 'cloudy' || 
      statement == 'overcast' || 
      statement == 'gloomy'){
 // Condition change
      condition = 'clouds';
      console.log("Condition is: " + condition);
      return condition;
   } else if (statement == 'snow' || 
              statement == 'snowing' || 
              statement == 'flurries'){
// Condition change
      condition = 'snow';
      cconsole.log("Condition is: " + condition);
      return condition;
   } else if (statement == 'foggy' || 
              statement == 'low visibility' || 
              statement == 'smoggy' || 
              statement == 'haze' || 
              statement == 'hazey'){
// Condition change
      condition = 'fog';
      console.log("Condition is: " + condition);
      return condition;
   } else if (statement == 'pouring' || 
              statement == 'raining' || 
              statement == 'raining cats and dogs' || 
              statement == 'dumping buckets' || 
              statement == 'rain' || 
              statement == 'precipitation' || 
              statement == 'high precipitation' || 
              statement == 'wet weather'){
 // Condition change
      condition = 'rain';
      console.log("Condition is: " + condition);
      return condition;
   } else {
      condition = 'clear';
      console.log("Condition is: " + condition);
      return condition;
   }
}

   // changeSummaryImage() will simply change the element 'content' to have the
   // class of whatever weather factor we can determine using the getCondition()
   // function.
function changeSummaryImage(condition) {
   document.getElementById('content').setAttribute("class", condition);
   return 0;
}

// convertMeters() will take meters and turn them to feet and return an integer.
function convertMeters(meters) {
   let feet = meters * 3.28084;
   feet = Math.round(feet);
   return feet;
}