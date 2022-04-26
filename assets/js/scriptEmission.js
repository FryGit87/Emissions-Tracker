var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');
var resultEl = document.getElementById('result');
var getEmissions = "";
//var trips = [];
var tripText = "";

let transferEmissions = "";
let apiKey = "5b3ce3597851110001cf624887417583949f471aae818ebeb12df5db";
let transportType = "driving-car";
let startPoint = "";
let endPoint = "";


let startInput = "Sydney Opera House";
// let userInputUpdated = text.replace(" ", "%20")
let startInputUpdated = encodeURI(startInput);
let endInput = "Sydney Harbour Bridge";
let endInputUpdated = encodeURI(endInput);

//************End of variables declaration********* */
//************************************************* */

//************BEGININIG OF FUNCTION DECLARATIONS */

function readInput (){
  console.log("enter readInput");
  getApi();
  runGeoApi();
  };
  


// Function "init" retrieve data and render it to the page on load
function init() {

var prevTrips = JSON.parse(localStorage.getItem("trips"));

if (prevTrips !== null) {
  trips = prevTrips;
  console.log(trips);
}
};

function renderTrips(){
return;
};

//GETTING DISTANCE FROM GEOLOCATION API*************************** */
//PRODUCES THE START POINT (LAT/LON)FOR USER

function runGeoApi (){
  console.log("Enter async function");
let apiUrlStart = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${startInputUpdated}`;
console.log(apiUrlStart);

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
  console.log(startPoint);

  return startPoint;
}
};
//console.log(getStartCoords());


//**************************************************************************** */
//This function fetches data from Climatiq. It returns amount of CO2 in Kg released to the environment when using a standar vehicle. 
// Input: Distance (X) in Km ---> output: (Y) CO2 Kg.
function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'https://beta3.api.climatiq.io/estimate';
  var distanceInputEl = document.getElementById('distance-input');
  var NumDistanceInpitEl = +distanceInputEl.value;

  //Declares object containing parameters to fetch API data
  var data = {
    "emission_factor": "passenger_vehicle-vehicle_type_automobile-fuel_source_na-distance_na-engine_size_na",
    "parameters":
    {
      "passengers": 4,
      "distance": NumDistanceInpitEl,
      "distance_unit": "km"
    }
  }

  fetch(requestUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ZDCB62QTYSMJ11MK0J6HPTFJJT44',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

    //The response includes the selected emission factor and the total amount of emissions in kgCO2e.
    .then(function (response) {
      return response.json();
    })
    .then(function emission(data) {
     
     //******Output from fetch is stored in getEmissions variable
      getEmissions = data.co2e;

      //Render result in the form for control purpose
      resultEl.textContent = getEmissions + ' Kg CO2-E';

      //console.log(trips);

     // var trips = [];
      //Feed Trip object "trips" with relevant info to be storage in the local storage
        var trip = {
        vehicle : "Standard Car",
        distance : NumDistanceInpitEl,
        emissions : getEmissions// + ' Kg CO2-E'
        };
      
        console.log(trip);  
       tripText = JSON.stringify(trip);
      //trips.push(tripText);
      console.log(trips);
      console.log(tripText);

      


      //********************************* question, why push is not a fuction? */
     // trips.push(trip);
     // console.log(trips);
      
      //Call helper function to store trip record. 
      
      storeTrip();
// return (tripText);
      
    });
}



//Helper function to trigger storege of the trip record. 
function storeTrip() {
  console.log(tripText + "inside storeTrip Function");
 // trips.push(tripText);
  localStorage.setItem("trips", JSON.stringify(trips));
};


function renderTrips() {
return;
};


fetchButton.addEventListener('click', readInput);


// Calls init to retrieve data and render it to the page on load
init()
