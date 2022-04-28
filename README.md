# Carbon Emission Tracker


### Website live URL : https://frygit87.github.io/Project-1/
### Website Screenshots: [Opening page Screenshot](./assets/image/screenshot-3.png) [Login In Screenshot](./assets/image/screenshot-4.png) [Dashboard Screenshot](./assets/image/screenshot-1.png) [Dashboard Screenshot](./assets/image/screenshot-2.png)



## User Story:

- AS A climate conscious USER 

- I WANT to be able to calculate how much carbon emmissions I am using each time I travel, and be able to compare it to other forms of transport

- SO THAT I can choose the most environmentally-friendly option


## Description: 
The Carbon Emission Tracker is a tool that calculates the users carbon emission output when travelling between two distances.

Carbon Emission Tracker takes the user's input location and determines a latitude & longitude location using Geocode's API, and displays it in a map.
The distance between these two locations is then input into the Climatiq API, which fomulates the total carbon emmissions output per trip. 

When the user adds two locations into the search field, the distance in kilometers is output on the map. Once this distance is created, the carbon emmissions is then calculated.



## Usage:
Carbon Emission Tracker allows users to input their start and finish locations into the search areas, and choose a transport option from the following: Car, plane, boat, bus, bike, or train. Once the user clicks the 'Submit' button, this input is then used to calculate the distance between the two locations.

Once this distance has been calculated, a numerical value is shown in the emmissions box. This value is the total amount of carbon emmissions created on the user's journey. 

When the user has their carbon emmissions use per trip calculated, this value is then saved into the users Local Storage for future reference. 

The user can utlise this Carbon Emmissions Tracker to ensure they are always taking the most environmentally-friendly option. 

## Applications used:
- HTML
- CSS
- Javascript
- Font Awesome


## Credits:
- Damien Jinks
- Kym Reilly
- Sergio Casas
- Elsa Li
- Nan Wang