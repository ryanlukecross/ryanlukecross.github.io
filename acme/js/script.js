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
         content += "<li><button type='button' id='home-button' onclick='switchHome()'>" + "Home" + "</button></li><li><button type='button' id='anvil-button' onclick='switchAnvils()'>" + tom.first + "</button></li><li><button type='button' id='explosives-button' onclick='switchExplosives()'>" + tom.second + "</button></li><li><button type='button' id='decoys-button' onclick='switchDecoys()'>" + tom.third + "</button></li><li><button type='button' id='traps-button' onclick='switchTraps()'>" + tom.fourth + "</button></li>";
         document.getElementById('nav-ul').innerHTML = content;
         console.log("The navigation bar was created by Javascript here AS: " + content);
      })
      .catch(function (error) {
         console.log('There was a fetch problem: ', error.message);
         alert('Sorry, the data could not be processed.');
      })
   document.getElementById("nav-ul").innerHTML = content;
}

function switchHome()
{
   document.getElementById('anvils-content').setAttribute('class', 'hide');
   document.getElementById('explosives-content').setAttribute('class', 'hide');
   document.getElementById('decoys-content').setAttribute('class', 'hide');
   document.getElementById('traps-content').setAttribute('class', 'hide');
   document.getElementById('home-content').setAttribute('class', '');
   buildNav(jsonURL);
}

function switchAnvils()
{
   document.getElementById('anvils-content').setAttribute('class', '');
   document.getElementById('explosives-content').setAttribute('class', 'hide');
   document.getElementById('decoys-content').setAttribute('class', 'hide');
   document.getElementById('traps-content').setAttribute('class', 'hide');
   document.getElementById('home-content').setAttribute('class', 'hide');
   buildNav(jsonURL);
}

function switchExplosives()
{
   document.getElementById('anvils-content').setAttribute('class', 'hide');
   document.getElementById('explosives-content').setAttribute('class', '');
   document.getElementById('decoys-content').setAttribute('class', 'hide');
   document.getElementById('traps-content').setAttribute('class', 'hide');
   document.getElementById('home-content').setAttribute('class', 'hide');
   buildNav(jsonURL);
}

function switchDecoys()
{
   document.getElementById('anvils-content').setAttribute('class', 'hide');
   document.getElementById('explosives-content').setAttribute('class', 'hide');
   document.getElementById('decoys-content').setAttribute('class', '');
   document.getElementById('traps-content').setAttribute('class', 'hide');
   document.getElementById('home-content').setAttribute('class', 'hide');
   buildNav(jsonURL);
}

function switchTraps()
{
   document.getElementById('anvils-content').setAttribute('class', 'hide');
   document.getElementById('explosives-content').setAttribute('class', 'hide');
   document.getElementById('decoys-content').setAttribute('class', 'hide');
   document.getElementById('traps-content').setAttribute('class', '');
   document.getElementById('home-content').setAttribute('class', 'hide');
   buildNav(jsonURL);
}