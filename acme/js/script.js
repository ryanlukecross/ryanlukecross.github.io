/* Javascript file for the ACME Final Project CIT230 */
console.log("script.js is being read");

switchHome();
// Set the path to the JSON file and call the build nav file
const jsonURL = '/acme/js/acme.json';
buildNav(jsonURL);
function buildNav(URL) {
   let content = "";
   fetch(URL)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Network response was not OK.');
      }).then(function (data) {
         let tom = data.Titles;
         console.log("The JSON Object: ", data);
         content += "<li><button type='button' id='home-button' onclick='switch" + "Home" + "()'>" + "Home" + "</button></li> " +
            "<li><button type='button' id='anvil-button' onclick='switch" + tom.first + "()'>" + tom.first + "</button></li>" +
            "<li><button type='button' id='explosives-button' onclick='switch" + tom.second + "()'>" + tom.second + "</button></li>" +
            "<li><button type='button' id='decoys-button' onclick='switch" + tom.third + "()'>" + tom.third + "</button></li>" +
            "<li><button type='button' id='traps-button' onclick='switch" + tom.fourth + "()'>" + tom.fourth + "</button></li>";
         document.getElementById('nav-ul').innerHTML = content;
         console.log("The navigation bar was created by Javascript here AS: " + content);
      })
      .catch(function (error) {
         console.log('There was a fetch problem: ', error.message);
         alert('Sorry, the data could not be processed.');
      })
   document.getElementById("nav-ul").innerHTML = content;
}
function switchHome() {
   document.getElementById('title').innerHTML = "Acme Industries | Home"
   document.getElementById('home-content').setAttribute('class', '');
   document.getElementById('more-basic-than-basic').setAttribute('class', 'hide');
}
function switchAnvils() {
   buildPage(jsonURL, "Anvils");
   document.getElementById('home-content').setAttribute('class', 'hide');
   document.getElementById('more-basic-than-basic').setAttribute('class', '');
}
function switchExplosives() {
   buildPage(jsonURL, "Explosives");
   document.getElementById('home-content').setAttribute('class', 'hide');
   document.getElementById('more-basic-than-basic').setAttribute('class', '');
}
function switchDecoys() {
   buildPage(jsonURL, 'Decoys');
   document.getElementById('home-content').setAttribute('class', 'hide');
   document.getElementById('more-basic-than-basic').setAttribute('class', '');
}
function switchTraps() {
   buildPage(jsonURL, "Traps");
   document.getElementById('home-content').setAttribute('class', 'hide');
   document.getElementById('more-basic-than-basic').setAttribute('class', '');
}
function buildPage(URL, type) {
   fetch(URL)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Network response was not OK.');
      }).then(function (data) {
         // Do stuff in here!!!
         let d = data[type];
         console.log("Type: ", type);
         document.getElementById("basic-image").setAttribute('src', d['path']);
         document.getElementById("basic-header").innerHTML = d['name'];
         document.getElementById("basic-paragraph").innerHTML = d['description'];
         document.getElementById("basic-info-1").innerHTML = "<strong>Made by: </strong>" + d['manufacturer'];
         document.getElementById("basic-info-2").innerHTML = "<strong>Reviews: </strong>" + d['reviews'] + " stars";
         document.getElementById("basic-price").innerHTML = "Price: $" + d['price'];
         document.getElementById('title').innerHTML = "Acme Industries | " + type;
      })
      .catch(function (error) {
         console.log('There was a fetch problem: ', error.message);
         alert('Sorry, the data could not be processed.');
      })
}