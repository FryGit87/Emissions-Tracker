// --------------------------------------------------------------------------------------------------
//----------------------------------------------MY CODE----------------------------------------------
// --------------------------------------------------------------------------------------------------

let resultEl = document.getElementById("carbon");

let apiKey = "5b3ce3597851110001cf624887417583949f471aae818ebeb12df5db";
let transportType = "driving-car";
let startPoint = "";
let endPoint = "";
let tripsHistory = JSON.parse(localStorage.getItem("trips")) || [];

let startInput = document.getElementById("start-input");
// let startInputUpdated = encodeURI(startInput);
let endInput = document.getElementById("end-input");
// let endInputUpdated = encodeURI(endInput);

var tripsList = document.querySelector("#trips-list");
var tripsCountSpan = document.querySelector("#trips-count");

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

var emission_factor = "empty";
var flight =
  "passenger_flight-route_type_domestic-aircraft_type_na-distance_na-class_na-rf_included";
var car =
  "passenger_vehicle-vehicle_type_automobile-fuel_source_na-distance_na-engine_size_na";
var bus =
  "passenger_vehicle-vehicle_type_bus-fuel_source_na-distance_na-engine_size_na";
var bike =
  "passenger_vehicle-vehicle_type_bicycle-fuel_source_na-distance_na-engine_size_na";
var rail = "passenger_train-route_type_national_rail-fuel_source_na";
var EV =
  "commercial_vehicle-vehicle_type_lcv-fuel_source_bev-engine_size_small-vehicle_age_post_2015-vehicle_weight_na";
var ferry = "passenger_ferry-route_type_na-fuel_source_na";

let ferryBtn = document.getElementById("ferry");
ferryBtn.addEventListener("click", ferryfunction);
ferryBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
function ferryfunction() {
  emission_factor = ferry;
}

let EVBtn = document.getElementById("EV");
EVBtn.addEventListener("click", EVfunction);
EVBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
function EVfunction() {
  emission_factor = EV;
}

let bikeBtn = document.getElementById("bike");
bikeBtn.addEventListener("click", bikefunction);
bikeBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
function bikefunction() {
  emission_factor = bike;
}

let carBtn = document.getElementById("car");
carBtn.addEventListener("click", carfunction);
carBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
function carfunction() {
  emission_factor = car;
}

let busBtn = document.getElementById("bus");
busBtn.addEventListener("click", busfunction);
busBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
function busfunction() {
  emission_factor = bus;
}

let flightBtn = document.getElementById("flight");
flightBtn.addEventListener("click", flightfunction);
flightBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
function flightfunction() {
  emission_factor = flight;
}

let railBtn = document.getElementById("rail");
railBtn.addEventListener("click", railfunction);
railBtn.addEventListener("click", (event) => {
  event.preventDefault();
});
function railfunction() {
  emission_factor = rail;
}

async function getEmissions(tripDist) {
  let requestUrl = "https://beta3.api.climatiq.io/estimate";
  let numericTripDist = +tripDist;

  let emissionParameters = {
    emission_factor,
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

  if (emission_factor != "empty") {
    console.log(calculateCarbon);
    document.getElementById("calulationShown").innerHTML =
      Math.round(calculateCarbon) / 1000 + " tons CO2e of GHG emissions";
  } else {
    document.getElementById("calulationShown").innerHTML =
      "Please a transport!";
  }

  //setting local storage
  var tripEmission = {
    vehicle: emission_factor,
    distance: tripDist,
    emissions: calculateCarbon + " KG C02-E",
  };

  tripsHistory.push(tripEmission);
  localStorage.setItem("trips", JSON.stringify(tripsHistory));
  console.log(tripsHistory);
  renderTrips();
}

// The following function renders items in a todo list as <li> elements
function renderTrips() {
  // Clear todoList element and update todoCountSpan
  tripsList.innerHTML = "";
  tripsCountSpan.textContent = tripsHistory.length;

  // Render a new li for each todo
  for (var i = 0; i < tripsHistory.length; i++) {
    var trip = tripsHistory[i];
    console.log(trip);
    console.log(JSON.stringify(trip));

    var li = document.createElement("li");
    li.textContent = `Trip ${i + 1} - vehicle: ${trip.vehicle}, Distance: ${
      trip.distance
    }, Carbon Emissions: ${trip.emissions}`;
    li.setAttribute("trips", i);

    // var button = document.createElement("button");
    // button.textContent = "Complete ✔️";

    //li.appendChild(button);
    tripsList.appendChild(li);
  }
  
  
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
//----------------------------------------- PAST EMISSION API CODE-----------------------------------------
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
