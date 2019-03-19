/* *************************************
*  Weather Site JavaScript Functions
************************************* */
// Making sure the JS file is working //
console.log('My JS is being Read.');

console.log('Header and Storage starting from functions.js');

// Set global variable for custom header required by NWS API
var idHeader = {
   headers: {
      "User-Agent": "Student Learning Project - cro16052@byui.edu"
   }
};

// Setup localStorage
var storage = window.localStorage;



// busDriver is going to call all of my other functions and run all my test cases.
// Not of crazy significance, but it will help me debug it all out.
function busDriver() {
   // Get the condition and change the image //
   const condition = getCondition("snowy");
   changeSummaryImage(condition);

   // testing the buildWC function with temp and speed variables created //
   const temp = 31;
   const speed = 5;
   buildWC(speed, temp);

   // Calling the windDial function to test weather the dial accurately changes.
   windDial('e');

   // Calling to convertMeters function
   let meters = 1514.246;

   console.log("Meters: " + meters);
   let feet = convertMeters(meters);
   console.log("Feet: " + feet);

   // Changing the innerHTML of the elevation ID for its paragraph tag
   setElevation(feet);

   // Setting the nextHour to currentHour + 1
   let date = new Date(); 
   let nextHour = date.getHours() + 1;
}

// Calls the busDriver()
busDriver();


// // FETCH API
// fetch(URL)
//    .then(function(response) {
//       if(response.ok){
//       return response.json();
//       }
//       throw new ERROR('Network response was not OK.');
//    })
//    .then(function(data){
//       ... do something with the JavaScript object ...
//    })
//    .catch(function(error){
//    console.log('There was a fetch problem: ', error.message);
//  })



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
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
     hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
   }

/*                                                                 Locations Functions Below!!                                                               */

// Gets location information from the NWS API
function getLocation(locale) {
   const URL = "https://api.weather.gov/points/" + locale;
   // NWS User-Agent header (built above) will be the second parameter 
   fetch(URL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('Json object from getLocation function:');
         console.log(data);
         // Store data to localstorage 
         storage.setItem("locName", data.properties.relativeLocation.properties.city);
         storage.setItem("locState", data.properties.relativeLocation.properties.state);

         // Next, get the weather station ID before requesting current conditions 
         // URL for station list is in the data object 
         let stationsURL = data.properties.observationStations;
         // Call the function to get the list of weather stations
         getStationId(stationsURL);
      })
      .catch(error => console.log('There was a getLocation error: ', error))
} // end getLocation function

// the getStationId() function

// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
   // NWS User-Agent header (built above) will be the second parameter 
   fetch(stationsURL, idHeader) 
   .then(function(response){
     if(response.ok){ 
      return response.json(); 
     } 
     throw new ERROR('Response not OK.');
   })
   .then(function (data) { 
     // Let's see what we got back
     console.log('From getStationId function:'); 
     console.log(data);
   
     // Store station ID and elevation (in meters - will need to be converted to feet) 
     let stationId = data.features[0].properties.stationIdentifier; 
     let stationElevation = data.features[0].properties.elevation.value; 
     console.log('Station and Elevation are: ' + stationId, stationElevation); 
  
     // Store data to localstorage 
     storage.setItem("stationId", stationId); 
     storage.setItem("stationElevation", stationElevation); 
  
     // Request the Current Weather for this station 
       getWeather(stationId);
    }) 
   .catch(error => console.log('There was a getStationId error: ', error)) 
  } // end getStationId function

// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
   // This is the URL for current observation data 
   const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
   // NWS User-Agent header (built above) will be the second parameter 
   fetch(URL, idHeader) 
   .then(function(response){
     if(response.ok){ 
      return response.json(); 
     } 
     throw new ERROR('Response not OK.');
   })
   .then(function (data) { 
     // Let's see what we got back
     console.log('From getWeather function:'); 
     console.log(data);
   
     // Store weather information to localStorage 
  
  
     // Build the page for viewing 
     
    }) 
   .catch(error => console.log('There was a getWeather error: ', error)) 
  } // end getWeather function


  