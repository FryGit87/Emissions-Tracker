// --------------------------------------------------------------------------------------------------
//----------------------------------------------MY CODE----------------------------------------------
// --------------------------------------------------------------------------------------------------
let resultEl = document.getElementById("carbonEmission");
//let fetchButton = document.getElementById("btn1");
let fetchButton = document.querySelector('.results', '#btn1');
let locationInputEl = document.getElementById('location');
let destinationInputEl = document.getElementById('destination');

console.log(fetchButton);
console.log(resultEl);
console.log(locationInputEl);
console.log(destinationInputEl);



//document.querySelector("#btn1").innerHTML = fetchButton;
//console.log(fetchButton);
let transferEmissions = "";
let apiKey = "5b3ce3597851110001cf624887417583949f471aae818ebeb12df5db";
let transportType = "driving-car";
let startPoint = "";
let endPoint = "";

function readInput (){
console.log("enter readInput");


};




let startInput = "Sydney Opera House";
// let userInputUpdated = text.replace(" ", "%20")
let startInputUpdated = encodeURI(startInput);
let endInput = "Sydney Harbour Bridge";
let endInputUpdated = encodeURI(endInput);

//PRODUCES THE START POINT (LAT/LON)FOR USER

let apiUrlStart = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${startInputUpdated}`;
async function getStartCoords() {
  let response = await fetch(apiUrlStart);
  let data = await response.json();
  // console.log(data.features[0].geometry.coordinates[0]);
  // console.log(data.features[0].geometry.coordinates[1]);
  let startLatitude = data.features[0].geometry.coordinates[0];
  let startLongitude = data.features[0].geometry.coordinates[1];
  document.getElementById("start-lat").textContent = startLatitude;
  document.getElementById("start-lon").textContent = startLongitude;
  let startPoint = startLatitude + "," + startLongitude;
  // console.log(startPoint);

  return startPoint;
}

//PRODUCE AND END POINT FOR JOURNEY INPUT
let apiUrlEnd = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${endInputUpdated}`;
async function getEndCoords() {
  let response = await fetch(apiUrlEnd);
  let data = await response.json();
  // console.log(data.features[0].geometry.coordinates[0]);
  // console.log(data.features[0].geometry.coordinates[1]);
  let endLatitude = data.features[0].geometry.coordinates[0];
  let endLongitude = data.features[0].geometry.coordinates[1];
  document.getElementById("end-lat").textContent = endLatitude;
  document.getElementById("end-lon").textContent = endLongitude;

  let endPoint = endLatitude + "," + endLongitude;
  // console.log(endPoint);

  return endPoint;
}

async function getDirections(start, end) {
  if (start !== undefined || end !== undefined) {
    let apiDirections = `https://api.openrouteservice.org/v2/directions/${transportType}?api_key=${apiKey}&start=${start}&end=${end}`;
    let response = await fetch(apiDirections);
    let data = await response.json();
    console.log(data.features[0].properties.segments[0].distance);
    let distance = data.features[0].properties.segments[0].distance;
    document.getElementById("dist").textContent = distance;
    return distance;
  }
}

// (async () => {
//   var startCoords = await getStartCoords();
//   var endCoords = await getEndCoords();
//   var tripDist = await getDirections(startCoords, endCoords);
// })();

async function buttonClick() {
  var startCoords = await getStartCoords();
  var endCoords = await getEndCoords();
  var tripDist = await getDirections(startCoords, endCoords);
  var calculateCarbon = getApi(tripDist);
  console.log(calculateCarbon);
 
 
  function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = "https://beta3.api.climatiq.io/estimate";
    //var distanceInputEl = tripDist;
    var NumDistanceInpitEl = +tripDist;

    var data = {
      emission_factor:
        "passenger_vehicle-vehicle_type_automobile-fuel_source_na-distance_na-engine_size_na",
      parameters: {
        passengers: 4,
        distance: NumDistanceInpitEl,
        distance_unit: "km",
      },
    };

    fetch(requestUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer ZDCB62QTYSMJ11MK0J6HPTFJJT44",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      //The response includes the selected emission factor and the total amount of emissions in kgCO2e.
      .then(function (response) {
        return response.json();
      })
      .then(function emission(data) {
        console.log(data);
        console.log(data.co2e);
        var getEmissions = data.co2e;
        console.log(getEmissions);
        resultEl.textContent = getEmissions + " Kg CO2-E";
        transferEmissions = getEmissions + " Kg CO2-E";
        ////Why global variables cannot be used inside of a then function? 

       // console.log(distanceInputEl.value);
       // return getEmissions;
      });

   // var getEmissions = emission(); //-----------------------------------THIS????  not defined
    //resultEl.textContent = getEmissions + ' Kg CO2-E';

    //local storage settings
    var tripSummary = JSON.parse(localStorage.getItem("trips"));
    console.log(tripSummary);




    var trips = {
      vehicle: "Standard Car",
      distance: NumDistanceInpitEl,
      emissions: transferEmissions + " Kg CO2-E"
    };

    console.log(trips);

    localStorage.setItem("trips", JSON.stringify(trips));
  }
}

//PRODUCES A DISTANCE FROM THE COORDS

//'tripDist' and 'distance' same value but unable to console.log it??????
// need this value to combine with the emission api zzzz
//buttonClick();

fetchButton.addEventListener ('Click', readInput);
//document.getElementById("btn1").innerHTML.addEventListener("click", buttonClick);

// --------------------------------------------------------------------------------------------------
//-----------------------------------------EMISSION API CODE-----------------------------------------
// --------------------------------------------------------------------------------------------------

// function getApi(distance) {
//   // fetch request gets a list of all the repos for the node.js organization
//   var requestUrl = "https://beta3.api.climatiq.io/estimate";
//   var distanceInputEl = document.getElementById("distance-input");
//   var NumDistanceInpitEl = +distanceInputEl.value;

//   var data = {
//     emission_factor:
//       "passenger_vehicle-vehicle_type_automobile-fuel_source_na-distance_na-engine_size_na",
//     parameters: {
//       passengers: 4,
//       distance: NumDistanceInpitEl,
//       distance_unit: "km",
//     },
//   };

//   fetch(requestUrl, {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer ZDCB62QTYSMJ11MK0J6HPTFJJT44",
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify(data),
//   })
//     //The response includes the selected emission factor and the total amount of emissions in kgCO2e.
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function emission(data) {
//       console.log(data);
//       console.log(data.co2e);
//       var getEmissions = data.co2e;
//       resultEl.textContent = getEmissions + " Kg CO2-E";
//       console.log(distanceInputEl.value);
//       return getEmissions;
//     });

//   var getEmissions = emission();
//   //resultEl.textContent = getEmissions + ' Kg CO2-E';

//   //local storage settings
//   var tripSummary = JSON.parse(localStorage.getItem("trips"));
//   console.log(tripSummary);

//   var trips = {
//     vehicle: "Standard Car",
//     distance: distanceInputEl.value.trim(),
//     emissions: getEmissions + " Kg CO2-E",
//   };

//   console.log(trips);

//   localStorage.setItem("trips", JSON.stringify(trips));
// }
