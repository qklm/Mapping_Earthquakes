console.log("working");

// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Grabbing our GeoJSON data.
L.geoJson(sanFranAirport, {
  // We turn each feature into a marker on the map.
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng)
  .bindPopup("<h2>" + feature.properties.name + " ("+ feature.properties.faa+ ")  in " + feature.properties.city  + "</h2>");

  }

}).addTo(map);
// Create the tile layer that wiill serve as the background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// graymap
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/qklm/Mapping_Earthquakes/main/majorAirports.json";
// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data)
  
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
      console.log(feature);
      return L.marker(latlng)
    .bindPopup("<h2>" + feature.properties.name + " (" + feature.properties.faa + ") " + "</h2>" + "<h2>" + feature.properties.city + "</h2>")
}}).addTo(map)});