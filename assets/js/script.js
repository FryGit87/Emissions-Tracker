var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');
//var distanceInputEl = document.getElementById('distance-input');
//var NumDistanceInpitEl = +distanceInputEl.value;
var resultEl = document.getElementById('result');

console.log (resultEl);
console.log(tableBody);
console.log(fetchButton);
//console.log(distanceInputEl);
//console.log(distanceInputEl.value);
//console.log(NumDistanceInpitEl);



// curl --request POST \
// --url https://beta3.api.climatiq.io/estimate \
// --header 'Authorization: Bearer YOUR_API_KEY' \



function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'https://beta3.api.climatiq.io/estimate';
  var distanceInputEl = document.getElementById('distance-input');
  var NumDistanceInpitEl = +distanceInputEl.value;



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
    .then(function (data) {
      console.log(data);
      console.log(data.co2e);
      resultEl.textContent = data.co2e + 'kg';
      console.log(distanceInputEl.value);

      //renderResponse()
    });
}

// function renderResponse () {
//  resultEl.textContent = data.co2e;
// }



fetchButton.addEventListener('click', getApi);
