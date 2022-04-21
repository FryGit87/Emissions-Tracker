let apiKey = "5b3ce3597851110001cf624887417583949f471aae818ebeb12df5db";

var request = new XMLHttpRequest();

request.open(
  "GET",
  `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=8.681495,49.41461&end=8.687872,49.420318`
);

request.setRequestHeader(
  "Accept",
  "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8"
);

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log("Status:", this.status);
    console.log("Headers:", this.getAllResponseHeaders());
    console.log("Body:", this.responseText);
  }
};

request.send();
