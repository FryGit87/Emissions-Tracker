// --------------------------------------------------------------------------------------------------
//----------------------------------------------MY CODE----------------------------------------------
// --------------------------------------------------------------------------------------------------

let resultEl = document.getElementById("carbon");

let apiKey = "5b3ce3597851110001cf624887417583949f471aae818ebeb12df5db";
let transportType = "driving-car";
let startPoint = "";
let endPoint = "";

let startInput = document.getElementById("start-input");
// let startInputUpdated = encodeURI(startInput);
let endInput = document.getElementById("end-input");
// let endInputUpdated = encodeURI(endInput);

//PRODUCES THE START POINT (LAT/LON)FOR USER
async function getStartCoords() {
  let startInputUpdated = encodeURI(startInput.value);
  let apiUrlStart = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${startInputUpdated}`;
  let response = await fetch(apiUrlStart);
  let data = await response.json();
  // console.log(data.features[0].geometry.coordinates[0]);
  // console.log(data.features[0].geometry.coordinates[1]);
  let startLatitude = data.features[0].geometry.coordinates[0];
  let startLongitude = data.features[0].geometry.coordinates[1];
  let startPoint = startLatitude + "," + startLongitude;
  // console.log(startPoint);
  return startPoint;
}

//PRODUCE AND END POINT FOR JOURNEY INPUT
async function getEndCoords() {
  let endInputUpdated = encodeURI(endInput.value);
  console.log(endInputUpdated);
  let apiUrlEnd = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${endInputUpdated}`;
  let response = await fetch(apiUrlEnd);
  let data = await response.json();
  // console.log(data.features[0].geometry.coordinates[0]);
  // console.log(data.features[0].geometry.coordinates[1]);
  let endLatitude = data.features[0].geometry.coordinates[0];
  let endLongitude = data.features[0].geometry.coordinates[1];
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
    // document.getElementById("dist").textContent = distance;
    return distance;
  }
}
async function getEmissions(tripDist) {
  let requestUrl = "https://beta3.api.climatiq.io/estimate";
  let numericTripDist = +tripDist;

  let emissionParameters = {
    emission_factor:
      "passenger_vehicle-vehicle_type_automobile-fuel_source_na-distance_na-engine_size_na",
    parameters: {
      passengers: 4,
      distance: numericTripDist,
      distance_unit: "km",
    },
  };
  let emissionResponse = await fetch(requestUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer ZDCB62QTYSMJ11MK0J6HPTFJJT44",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(emissionParameters),
  });
  let data = await emissionResponse.json();
  let carbonValue = data.co2e;
  return carbonValue;
}

// function getApi() {
//   // fetch request gets a list of all the repos for the node.js organization
//   let requestUrl = "https://beta3.api.climatiq.io/estimate";
//   let distanceInputEl = tripDist;
//   let NumDistanceInpitEl = +tripDist;

async function buttonClick() {
  let startCoords = await getStartCoords();
  let endCoords = await getEndCoords();
  let tripDist = await getDirections(startCoords, endCoords);
  let calculateCarbon = await getEmissions(tripDist);
  console.log(calculateCarbon);
  document.getElementById("calulationShown").innerHTML = calculateCarbon;
}

//PRODUCES A DISTANCE FROM THE COORDS
let resultsBtn = document.getElementById("btn1");
resultsBtn.addEventListener("click", buttonClick);

resultsBtn.addEventListener("click", (event) => {
  event.preventDefault();
});

// (async () => {
//   let startCoords = await getStartCoords();
//   let endCoords = await getEndCoords();
//   let tripDist = await getDirections(startCoords, endCoords);
// })();
// --------------------------------------------------------------------------------------------------
//-----------------------------------------EMISSION API CODE-----------------------------------------
// --------------------------------------------------------------------------------------------------

//   let data = {
//     emission_factor:
//       "passenger_vehicle-vehicle_type_automobile-fuel_source_na-distance_na-engine_size_na",
//     parameters: {
//       passengers: 4,
//       distance: NumDistanceInpitEl,
//       distance_unit: "km",
//     },
//   };

//   let getEmissions = await fetch(requestUrl, {
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
//       // console.log(data);
//       // console.log(data.co2e);
//       // let getEmissions = data.co2e;
//       // resultEl.textContent = getEmissions + " Kg CO2-E";
//       // console.log(distanceInputEl.value);
//       return data.co2e;
//     });
//   //   let getEmissions = emission(); //-----------------------------------THIS????  not defined
//   //resultEl.textContent = getEmissions + ' Kg CO2-E';

//   //local storage settings
//   let tripSummary = JSON.parse(localStorage.getItem("trips"));
//   // console.log(tripSummary);

//   let trips = {
//     vehicle: "Standard Car",
//     distance: NumDistanceInpitEl,
//     emissions: getEmissions + " Kg CO2-E",
//   };

//   // console.log(trips);

//   localStorage.setItem("trips", JSON.stringify(trips));
//   return getEmissions;
// }
// function getApi(distance) {
//   // fetch request gets a list of all the repos for the node.js organization
//   let requestUrl = "https://beta3.api.climatiq.io/estimate";
//   let distanceInputEl = document.getElementById("distance-input");
//   let NumDistanceInpitEl = +distanceInputEl.value;

//   let data = {
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
//       let getEmissions = data.co2e;
//       resultEl.textContent = getEmissions + " Kg CO2-E";
//       console.log(distanceInputEl.value);
//       return getEmissions;
//     });

//   let getEmissions = emission();
//   //resultEl.textContent = getEmissions + ' Kg CO2-E';

//   //local storage settings
//   let tripSummary = JSON.parse(localStorage.getItem("trips"));
//   console.log(tripSummary);

//   let trips = {
//     vehicle: "Standard Car",
//     distance: distanceInputEl.value.trim(),
//     emissions: getEmissions + " Kg CO2-E",
//   };

//   console.log(trips);

//   localStorage.setItem("trips", JSON.stringify(trips));
// }
