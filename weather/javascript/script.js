/* *************************************
*  Weather Site JavaScript Functions
************************************* */
console.log('My JS is being Read.');

function windDial(direction){
    const dial = document.getElementById("dial");

    // Determine the dial class
 switch (direction){
    case "North":
    case "N":
     dial.setAttribute("class", "n"); //"n" is the CSS rule selector
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
// Calling the windDial function to test weather the dial accurately changes.
windDial('w'.toUpperCase());

function buildWC(speed, temp) {
   const feelTemp = document.getElementById('feels');
   let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
   console.log(wc);
   wc = Math.floor(wc);
   wc = (wc > temp) ? temp : wc;
   console.log(wc);
   feelTemp.innerHTML = wc;
}
const temp = 31;
const speed = 5;
buildWC(speed, temp);