let apiKey = "5b3ce3597851110001cf624887417583949f471aae818ebeb12df5db";
let transportType = "driving-car";
let startPoint = "";
let endPoint = "";
// --------------------------------------------------------------------------------------------------
//----------------------------------------------MY CODE----------------------------------------------
// --------------------------------------------------------------------------------------------------

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
  console.log(data.features[0].geometry.coordinates[0]);
  console.log(data.features[0].geometry.coordinates[1]);
  let startLatitude = data.features[0].geometry.coordinates[0];
  let startLongitude = data.features[0].geometry.coordinates[1];
  document.getElementById("start-lat").textContent = startLatitude;
  document.getElementById("start-lon").textContent = startLongitude;
  let startPoint = startLatitude + "," + startLongitude;
  console.log(startPoint);

  return startPoint;
}

//PRODUCE AND END POINT FOR JOURNEY INPUT
let apiUrlEnd = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${endInputUpdated}`;
async function getEndCoords() {
  let response = await fetch(apiUrlEnd);
  let data = await response.json();
  console.log(data.features[0].geometry.coordinates[0]);
  console.log(data.features[0].geometry.coordinates[1]);
  let endLatitude = data.features[0].geometry.coordinates[0];
  let endLongitude = data.features[0].geometry.coordinates[1];
  document.getElementById("end-lat").textContent = endLatitude;
  document.getElementById("end-lon").textContent = endLongitude;

  let endPoint = endLatitude + "," + endLongitude;
  console.log(endPoint);

  return endPoint;
}

(async () => {
  var startCoords = await getStartCoords();
  var endCoords = await getEndCoords();
  var tripDist = await getDirections(startCoords, endCoords);
})();

//PRODUCES A DISTANCE FROM THE COORDS
async function getDirections(start, end) {
  let apiDirections = `https://api.openrouteservice.org/v2/directions/${transportType}?api_key=${apiKey}&start=${start}&end=${end}`;
  let response = await fetch(apiDirections);
  let data = await response.json();
  console.log(data.features[0].properties.segments[0].distance);
  let distance = data.features[0].properties.segments[0].distance;
  document.getElementById("dist").textContent = distance;
  return distance;
}
