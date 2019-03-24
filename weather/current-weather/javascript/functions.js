/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */
// Making sure the JS file is working //
console.log('My JS is being Read.');

// console.log('Header and Storage starting from functions.js');

// Set global variable for custom header required by NWS API
var idHeader = {
   headers: {
      "User-Agent": "Student Learning Project - cro16052@byui.edu"
   }
};

// Setup localStorage
var storage = window.localStorage;


// buildWC will just build the wind chill factor and change the innerHTML
// console.log will help debug if needed
function buildWC(speed, temp) {
   console.log("Speed: " + speed + " Temp: " + temp);
   // get the id of the element
   const feelTemp = document.getElementById('feels');
   // do fancy maths
   let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
   // console.log(wc);
   console.log("Wind Chill 1: " + wc);
   wc = Math.floor(wc);
   // determine the smallest temperature for the tinal result
   wc = (wc > temp) ? temp : wc;
   console.log("WIND CHILL: " + wc);
   // change the HTML of 'feels' (const created earlier as feelTemp)
   if (wc != null) {
      feelTemp.innerHTML = wc;
   }
}

// getCondition() will test a series of statements and determine what 
// the weather condition should be defined as so we can change the picture
// console.log will debug throughout
function getCondition(statement) {
   // Make them all lower case //
   statement = statement.toLowerCase();
   // console.log("statement passed to getCondition() is: " + statement);
   // create an empty condition (I still don't get why let is preferred over var)
   let condition = "";

   // Start the if statement. Not necessarily neat, but still preferred over
   // switch statements
   if (statement == 'cloudy' ||
      statement == 'overcast' ||
      statement == 'mostly cloudy' ||
      statement == 'gloomy') {
      // Condition change
      condition = 'clouds';
      // console.log("Condition is: " + condition);
      return condition;
   } else if (statement == 'snow' ||
      statement == 'snowy' ||
      statement == 'snowing' ||
      statement == 'flurries') {
      // Condition change
      condition = 'snow';
      // console.log("Condition is: " + condition);
      return condition;
   } else if (statement == 'foggy' ||
      statement == 'low visibility' ||
      statement == 'smoggy' ||
      statement == 'haze' ||
      statement == 'hazey') {
      // Condition change
      condition = 'fog';
      // console.log("Condition is: " + condition);
      return condition;
   } else if (statement == 'pouring' ||
      statement == 'raining' ||
      statement == 'raining cats and dogs' ||
      statement == 'dumping buckets' ||
      statement == 'rain' ||
      statement == 'precipitation' ||
      statement == 'high precipitation' ||
      statement == 'wet weather') {
      // Condition change
      condition = 'rain';
      // console.log("Condition is: " + condition);
      return condition;
   } else {
      condition = 'clear';
      // console.log("Condition is: " + condition);
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
   if (hour > 23) {
      hour -= 24;
   }
   let amPM = (hour > 11) ? "pm" : "am";
   if (hour > 12) {
      hour -= 12;
   }
   if (hour == 0) {
      hour = "12";
   }
   return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
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
   // console.log('HourlyList is: ' + hourlyListItems);
   return hourlyListItems;
}

/* ---------------------------------------------------------------- Locations Functions Below!! ------------------------------------------------------------ */

let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');


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
         console.log('getLocation object:');
         console.log(data);
         // Store data to localstorage
         storage.setItem("locName", data.properties.relativeLocation.properties.city);
         storage.setItem("locState", data.properties.relativeLocation.properties.state);

         // This is my API Key for the zipCodeAPI if I have time to do it: Yn3ypsoRugytpYooDNI7fUIXnsZB1ciuxPmmmssPnxLRFRFIIlQqBVE9erEaQ6Y1

         let fullName = storage.getItem('locName') + ', ' + storage.getItem('locState');
         storage.setItem("locFullName", fullName);

         // Next, get the weather station ID before requesting current conditions 
         // URL for station list is in the data object 
         let stationsURL = data.properties.observationStations;
         // Call the function to get the list of weather stations
         getStationId(stationsURL);

         let hourlyURL = data.properties.forecastHourly;
         getHourly(hourlyURL);
         let forecastURL = data.properties.forecast;
         getForecast(forecastURL);

         // Call the buildPage function
         setTimeout(buildPage(), 5000);

         // storage.setItem("reloadThing", 'Page has not been reloaded yet');

         // while(storage.getItem('reloadThing') != 'Reloaded Page')
         // {
         //    storage.setItem('reloadThing', 'Reloaded Page');
         //    setTimeout(location.reload(), 600);
         //    console.log("---------------------- RELOAD ------------------");
         // }

      })
      .catch(error => console.log('There was a getLocation error: ', error))
} // end getLocation function

// the getStationId() function gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) {
   // NWS User-Agent header (built above) will be the second parameter 
   fetch(stationsURL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('getStationId object:');
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
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Are we done yet? No
         let finished = false;

         // Let's see what we got back
         console.log('getWeather object:');
         console.log(data);

         let todd = data.properties.temperature.value;
         storage.setItem("test", todd);


         // ************ Get the content ******************************

         // storage - text description
         storage.setItem('textDescription', data.properties.textDescription);

      })
      .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function


// Gets location information from the NWS API
function getHourly(hourlyURL) {
   // NWS User-Agent header (built above) will be the second parameter 
   fetch(hourlyURL, idHeader)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Response not OK.');
      })
      .then(function (data) {
         // Let's see what we got back
         console.log('getHourly object:');
         console.log(data);
         // Get the hourly location

         let hourly = [];
         for (let i = 0; i < 13; i++) {
            hourly[i] = data.properties.periods[i].temperature;
         }

         // wind direction, wind speed, current temperature, hourly - set to storage

         storage.setItem('windDirection', data.properties.periods[0].windDirection);
         storage.setItem('windSpeed', parseFloat(data.properties.periods[0].windSpeed));
         storage.setItem('tempCurrent', data.properties.periods[0].temperature);
         storage.setItem('tempHourly', hourly);


      })
      .catch(error => console.log('There was a getHourly error: ', error))
} // end getHourly function

// Gets location information from the NWS API
function getForecast(URL) {
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
         console.log('getForecast object:');
         console.log(data);

         // high, low, icon, detailedForecast
         storage.setItem('tempHigh', data.properties.periods[0].temperature);
         storage.setItem('tempLow', data.properties.periods[1].temperature);

      })
      .catch(error => console.log('There was a getForecast error: ', error))
} // end getForecast function


function buildPage() {

   // ************ Display the content ******************************

   // // Set the page title to your current location's city and state
   let pageTitle = document.getElementById('page-title');
   let fullName = storage.getItem('locFullName');

   // // Create a text node containing the full name 
   let fullNameNode = document.createTextNode(fullName);
   // // inserts the fullName value before any other content that might exist
   pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);


   // Set the Location information
   // Get the h1 to display the city location
   // The h1 in main h1 should now say "Greenville, SC"
   document.getElementById('nameofcity').innerHTML = storage.getItem('locFullName');

   // Feet to meters, to display
   let feet = convertMeters(storage.getItem('stationElevation'));
   setElevation(feet);
   console.log("buildPage - Elevation in feet: " + feet);

   // Lat and Lon (calculate sign and display properly)
   let latitude = storage.getItem('geoLat');
   let longitude = storage.getItem('geoLon');
   signLat = getSign(true, latitude);
   signLon = getSign(false, longitude);
   if (latitude < 0) {
      latitude *= -1;
   }
   if (longitude < 0) {
      longitude *= -1;
   }
   document.getElementById('cord').innerHTML = Math.floor(latitude * 100) / 100 + "&#176; " + signLat + " " + Math.floor(longitude * 100) / 100 + "&#176; " + signLon;

   // Set the temperature information
   document.getElementById('high-temp').innerHTML = storage.getItem('tempHigh') + "&deg;F";
   document.getElementById('low-temp').innerHTML = storage.getItem('tempLow') + "&deg;F";
   document.getElementById('realtemp').innerHTML = storage.getItem('tempCurrent');
   buildWC(storage.getItem('windSpeed'), storage.getItem('tempCurrent'));
   console.log("buildPage - Windspeed and Temperature set (also called the buildWindChill() function)");

   // Set the wind information
   document.getElementById('mph').innerHTML = storage.getItem('windSpeed') + " mph";
   document.getElementById('direction').innerHTML = "<strong>Direction: </strong>" + storage.getItem('windDirection') + "</p>";
   document.getElementById('gusts').innerHTML =
      "<strong>Gusts: </strong>" + (parseFloat(storage.getItem("windGusts")) > storage.getItem('windSpeed') ? parseFloat(storage.getItem("windGusts")) : storage.getItem('windSpeed')) + " mph</p>";
   console.log("WIND DIRECTION FROM functions[369] " + storage.getItem("windDirection"));
   windDial(storage.getItem('windDirection'));
   console.log("Wind Direction: " + storage.getItem('windDirection'));

   // Set the current conditions information
   const sendCondition = getCondition(storage.getItem('textDescription'));
   changeSummaryImage(sendCondition);
   console.log("Weather Condition :" + sendCondition);
   document.getElementById('loll').innerHTML = storage.getItem('textDescription');

   // Set the hourly temperature information //
   // Setting the nextHour to currentHour + 1
   let date = new Date();
   let nextHour = date.getHours() + 1;

   document.getElementById('hourly-info').innerHTML = buildHourlyData(nextHour, storage.getItem('tempHourly').split(','));

   // Clear everything and make it so that it all appears on the screen
   document.getElementById('main-content').setAttribute('class', '');
   document.getElementById('status').setAttribute('class', 'hide');
   console.log("This should be the last thing I see");
}





/*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/


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
   if (hour > 23) {
      hour -= 24;
   }
   let amPM = (hour > 11) ? "pm" : "am";
   if (hour > 12) {
      hour -= 12;
   }
   if (hour == 0) {
      hour = "12";
   }
   return hour + amPM;
}

function getSign(isLat, num) {
   if (num > 0) {
      if (isLat == true) {
         return 'N';
      } else {
         return 'E';
      }
   } else {
      if (isLat == true) {
         return 'S';
      } else {
         return 'W';
      }
   }
}




// windDial is what will set the addribute of the dial class //
function windDial(direction) {
   // get the dial class
   const dial = document.getElementById("dial");
   // make sure the string is in all upper case characters
   direction = direction.toUpperCase();

   // Start the switch (gross)... console.log will help debug if needed
   switch (direction) {
      case "North":
      case "N":
         dial.setAttribute("class", "n");
         // console.log('Wind Pointer Set to North.');
         break;
      case "NE":
      case "NNE":
      case "ENE":
         dial.setAttribute("class", "ne");
         // console.log('Wind Pointer Set to North East.');
         break;
      case "NW":
      case "NNW":
      case "WNW":
         dial.setAttribute("class", "nw");
         // console.log('Wind Pointer Set to North West.');
         break;
      case "South":
      case "S":
         dial.setAttribute("class", "s");
         // console.log('Wind Pointer Set to South.');
         break;
      case "SE":
      case "SSE":
      case "ESE":
         dial.setAttribute("class", "se");
         // console.log('Wind Pointer Set to South East.');
         break;
      case "SW":
      case "SSW":
      case "WSW":
         dial.setAttribute("class", "sw");
         // console.log('Wind Pointer Set to South West');
         break;
      case "East":
      case "E":
         dial.setAttribute('class', "e");
         // console.log('Wind Pointer Set to East.');
         break;
      case "West":
      case "W":
         // console.log("made it")
         dial.setAttribute("class", "w");
         // console.log('Wind Pointer Set to West.');
         break;
      default:
         // console.log("Nothing Worked... direction: " + direction);
   }
}