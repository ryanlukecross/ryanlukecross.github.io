/* Javascript file for the ACME Final Project CIT230 */

console.log("script.js is being read");
// Set the path to the JSON file and call the build nav file
const jsonURL = '/acme/js/acme.json';
BuildNav(jsonURL);

function BuildNav(URL) {
   let content = "";
   fetch(URL)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
         throw new ERROR('Network response was not OK.');
      }).then(function (data) {
         let tom = data.Titles;
         content += "<li><a href='#'>Home</a></li><li><a href='#'>" + tom.first + "</a></li><li><a href='#'>" + tom.second + "</a></li><li><a href='#'>" + tom.third + "</a></li><li><a href='#'>" + tom.fourth + "</a></li>";
         document.getElementById('nav-ul').innerHTML = content;
         console.log("The navigation bar was created by Javascript here AS: " + content);
      })
      .catch(function (error) {
         console.log('There was a fetch problem: ', error.message);
         alert('Sorry, the data could not be processed.');
      })
   document.getElementById("nav-ul").innerHTML = content;
}