/* Javascript file for the ACME Final Project CIT230 */

console.log("script.js is being read");
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
         console.log("This is tom: " + data);
         content += "<li><button type='button' id='home-button' onclick='switchTo('" + "Home" + "')'>" + "Home" + "</button></li> " +
            "<li><button type='button' id='anvil-button' onclick='switchTo('" + tom.first + "')'>" + tom.first + "</button></li>" +
            "<li><button type='button' id='explosives-button' onclick='switchTo('" + tom.second + "')'>" + tom.second + "</button></li>" +
            "<li><button type='button' id='decoys-button' onclick='switchTo('" + tom.third + "')'>" + tom.third + "</button></li>" +
            "<li><button type='button' id='traps-button' onclick='switchTo('" + tom.fourth + "')'>" + tom.fourth + "</button></li>";
         document.getElementById('nav-ul').innerHTML = content;
         console.log("The navigation bar was created by Javascript here AS: " + content);
      })
      .catch(function (error) {
         console.log('There was a fetch problem: ', error.message);
         alert('Sorry, the data could not be processed.');
      })
   document.getElementById("nav-ul").innerHTML = content;
}


function switchTo(type) {
   alert(type);
   if (type == 'home') {
      document.getElementById('home-content').setAttribute('class', '');
      document.getElementById('more-basic-than-basic').setAttribute('class', 'hide');
   } else {
      buildPage(type);
      document.getElementById('home-content').setAttribute('class', 'hide');
      document.getElementById('more-basic-than-basic').setAttribute('class', '');
   }
   buildNav(jsonURL);
}

function buildPage(type) {
   let content = "";
   fetch(URL)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Network response was not OK.');
      }).then(function (data) {
         let tom = data.Titles;
         let Home = "home";
         let Anvils = "anvils";
         let Explosives = "explosives";
         let Decoys = "decoys";
         let Traps = "traps";
         content += "<li><button type='button' id='home-button' onclick='switchTo(" + "Home" + ")'>" + "Home" + "</button></li> " +
            "<li><button type='button' id='anvil-button' onclick='switchTo(" + tom.first + ")'>" + tom.first + "</button></li>" +
            "<li><button type='button' id='explosives-button' onclick='switchTo(" + tom.second + ")'>" + tom.second + "</button></li>" +
            "<li><button type='button' id='decoys-button' onclick='switchTo(" + tom.third + ")'>" + tom.third + "</button></li>" +
            "<li><button type='button' id='traps-button' onclick='switchTo(" + tom.fourth + ")'>" + tom.fourth + "</button></li>";
         document.getElementById('nav-ul').innerHTML = content;
         console.log("The navigation bar was created by Javascript here AS: " + content);
      })
      .catch(function (error) {
         console.log('There was a fetch problem: ', error.message);
         alert('Sorry, the data could not be processed.');
      })
   document.getElementById("nav-ul").innerHTML = content;
}
/*
function switchHome()
{
   document.getElementById('home-content').setAttribute('class', '');
   document.getElementById('more-basic-than-basic').setAttribute('class', );
   buildNav(jsonURL);
}


function switchExplosives()
{
   document.getElementById('home-content').setAttribute('class', '');
   document.getElementById('more-basic-than-basic').setAttribute('class', );
   buildNav(jsonURL);
}

function switchDecoys()
{
   document.getElementById('home-content').setAttribute('class', '');
   document.getElementById('more-basic-than-basic').setAttribute('class', );
   buildNav(jsonURL);
}

function switchTraps()
{
   document.getElementById('home-content').setAttribute('class', '');
   document.getElementById('more-basic-than-basic').setAttribute('class', );
   buildNav(jsonURL);
}
*/