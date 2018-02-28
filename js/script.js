// Almondsbury Interchange Live Traffic Map webapp functionality
// M Allen: Freelance Web Developer - 2018

// Enable functionality when document has loaded
$(document).ready(function() {
  // Global variables
  var currentTime;

  function enableTrafficInfo(map) {
    // Center map on New York
    map.setCenter({lat: 51.551507, lng: -2.552466});
    map.setZoom(13);
    // Show traffic tiles
    map.setBaseLayer(defaultLayers.normal.traffic);
    // Enable traffic incidents layer
    map.addLayer(defaultLayers.incidents);
  }

  // Initialize communication with Here.com back-end services
  var platform = new H.service.Platform({
    'app_id': 'irRpZ4plH3JQEutKP93s',
    'app_code': 'HskZVKgio2645S6if5FTpQ',
    useCIT: true,
    useHTTPS: true
  });
  var defaultLayers = platform.createDefaultLayers();

  // Initialize a map - not specificing a location will give a whole world view
  var map = new H.Map(document.getElementById('mapContainer'), defaultLayers.normal.map);

  // Make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  // Now enable traffic tiles and traffic incidents
  enableTrafficInfo(map);

  // Get current time in hours and minutes and update page
  function getCurrentTime() {
    // Get current date/time
    var date = new Date();
    // Get hours and minutes
    var hours = date.getHours();
    var mins = date.getMinutes();
    // If minutes < 10, add a preceding "0"
    if (mins < 10) {
      mins = "0" + mins;
    }
    // Update time displayed
    currentTime = hours + ":" + mins;
    document.getElementById("liveTime").innerHTML = "<h3>Time: " + "<strong>" + currentTime+ "</strong></h3>";
  }

  // Display current time
  // Initialise time
  getCurrentTime();
  // Time loop 
  setInterval(function() {
    // Update time
    getCurrentTime();
  }, 60000);
});
