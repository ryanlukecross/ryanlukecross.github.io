/* *************************************
*  Weather Site JavaScript Functions
************************************* */
// Making sure the JS file is working //
console.log('My JS is being Read.');

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
              statement == 'snowy' ||
              statement == 'snowing' || 
              statement == 'flurries'){
// Condition change
      condition = 'snow';
      console.log("Condition is: " + condition);
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
   document.getElementById('weather-picture').setAttribute("src", "images/" + condition + "-small.jpg");
   document.getElementById('weather-picture').setAttribute("alt", condition + " weather condition image");
   return 0;
}

// convertMeters() will take meters and turn them to feet and return an integer.
function convertMeters(meters) {
   let feet = meters * 3.28084;
   feet = Math.round(feet);
   return feet;
}

// setElevation is going to change the elevation to feet from meters
function setElevation(feet) {
   document.getElementById('elevation').innerHTML = feet;
}

// Convert, Format time to 12 hour format
function format_time(hour) {
   if(hour > 23){ 
    hour -= 24; 
   } 
   let amPM = (hour > 11) ? "pm" : "am"; 
   if(hour > 12) { 
    hour -= 12; 
   } 
   if(hour == 0) { 
    hour = "12"; 
   } 
   return hour + amPM;
  }

  // Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
   // Data comes from a JavaScript object of hourly temp name - value pairs
   // Next hour should have a value between 0-23
   // The hourlyTemps variable holds an array of temperatures
   // Line 8 builds a list item showing the time for the next hour 
   // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
    let i = 1;
    // Build the remaining list items using a for loop
    for (i = 1, x = hourlyTemps.length - 1; i < x; i++) {
     hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
    }
    hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
   }

   function getSign(isLat, num){
      if (num > 0){
         if(isLat == true){
            return 'N';
         } else {
            return 'E';
         }
      } else {
         if(isLat == true) { 
            return 'S';
         } else {
            return 'W';
         }
      }
   }
