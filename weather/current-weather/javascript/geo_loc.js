// For the sandbox folder
'use strict';

// Set global variable for custom header required by NWS API
var idHeader = {
   headers: {
      "User-Agent": "Student Learning Project - cro16052@byui.edu"
   }
};

// // Setup localStorage
// var storage = window.localStorage;

console.log("geo_loc.js is being read");

// Gets longitude and latitude of current location
function getGeoLocation() {
   const status = document.getElementById('status');
   status.innerHTML = 'Getting Location... If error persists, please refresh your page';

   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;

         // Set lat and long to localStorage
         storage.setItem('geoLat', lat);
         storage.setItem('geoLon', long);

         // Combine the values
         const locale = lat + "," + long;
         console.log(`Lat and Long are: ${locale}.`);

         // Call the getLocation Function
         console.log("Calling getLocation() from getGeoLocation()");
         getLocation(locale);


      })

   } else {
      status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
   } // end else
} // end getGeoLocation

getGeoLocation();