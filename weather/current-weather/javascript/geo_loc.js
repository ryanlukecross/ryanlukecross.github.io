// For the sandbox folder
'use strict';

// // Set global variable for custom header required by NWS API
// var idHeader = {
//    headers: {
//       "User-Agent": "Student Learning Project - cro16052@byui.edu"
//    }
// };

// // Setup localStorage
// var storage = window.localStorage;

console.log("Sandbox loctest.js is being read");

// Gets longitude and latitude of current location
function getGeoLocation() {
   const status = document.getElementById('status');
   status.innerHTML = 'Getting Location...';

   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;

         // Combine the values
         const locale = lat + "," + long;
         console.log(`Lat and Long are: ${locale}.`);

         console.log("Calling getLocation() from getGeoLocation()");
         getLocation(locale);

         storage.setItem('geoLat', lat);
         storage.setItem('geoLon', long);


      })

   } else {
      status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
   } // end else
} // end getGeoLocation
