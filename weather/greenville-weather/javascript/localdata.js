

console.log("localdata.js is being read");

let pageNav = document.getElementById('navforpage');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');

let weatherURL = "../greenville-weather/weather.json";
function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    let zipCode = g.Zip;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);
    console.log("zipCode: " + zipCode);

    // Get Latitude, Longitude, and Elevation
    let latitude = g.Latitude;
    let longitude = g.Longitude;
    let elevation = g.Elevation;

    // Get the temperature data
    let temp = g.Temp;
    let high = g.High;
    let low = g.Low;
    console.log("Temp: " + temp + " High : " + high + " Low: " + low);
    
    // Get the wind data 
    let windDirection = g.Direction;
    let windSpeed = g.Wind;
    let gusts = g.Gusts;
    console.log("Wind Speed: " + windSpeed + " Direction: " + windDirection + " Gusts: " + gusts);

    // Get the current conditions
    let precip = g.Precip;
    let conditions = g.Summary;
    console.log("Precipitation: " + precip + " Weather Conditions: " + conditions);

    // Get the hourly data 
    let hourlyData = g.Hourly;
    console.log(hourlyData);

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);

    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('page-header');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"
    document.getElementById('nameofcity').innerHTML = fullName;

    // Feet to meters, to display
    let feet = convertMeters(elevation);
    setElevation(feet);

    // Set the temperature information
    document.getElementById('high-temp').innerHTML = high + "&deg;F";
    document.getElementById('low-temp').innerHTML = low + "&deg;F";
    document.getElementById('realtemp').innerHTML = temp;
    buildWC(windSpeed, temp);
    console.log("ws = " + windSpeed + " temp = " + temp);

    // Set the wind information
    document.getElementById('mph').innerHTML = windSpeed + " mph";
    document.getElementById('direction').innerHTML = "<strong>Direction: </strong>" + windDirection + "</p>";
    document.getElementById('gusts').innerHTML = "<strong>Gusts: </strong>" + gusts + "</p>";
    windDial(windDirection);

    // Set the current conditions information
    const sendCondition = getCondition(conditions);
    changeSummaryImage(sendCondition);

        // Set the hourly temperature information //
    // Setting the nextHour to currentHour + 1
    let date = new Date(); 
    let nextHour = date.getHours() + 1;

    document.getElementById('hourly-info').innerHTML = buildHourlyData(nextHour, hourlyData);

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}

fetchData(weatherURL);