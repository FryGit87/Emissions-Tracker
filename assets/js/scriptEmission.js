var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');
var resultEl = document.getElementById('result');
var getEmissions = "";
//var trips = [];
var tripText = "";


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


fetchButton.addEventListener('click', getApi);


// Calls init to retrieve data and render it to the page on load
init()
