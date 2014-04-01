
// Global arrays
ExemplarData = new Array();
ExemplarTimers = new Array();

// onLoad function
$(function() {

  // Connect to Firebase
  var firebaseRef = new Firebase("https://blazing-fire-4598.firebaseio.com/gds-frequency");
  
  // Initial page setup and page change event capture
  firebaseRef.on('value', function(snapshot) {
  
    var returnedObject = snapshot.val();
    var contentString= "";

    // Create string of DIVs and the global array
    for (var key in returnedObject) {
      var frequency = 31536000 / returnedObject[key];
      contentString += "<div class='exemplar text-center' id='" + key + "'>" + key.replace("-", " ") + " (" + (Math.round(frequency * 10) / 10) + "s)</div>";
      ExemplarData[key] = Math.round(frequency * 1000);
    }

    // Update the HTML to add all the DIVs
    $('#exemplarList').html(contentString);
 
    // Kick off the pulsing
    for (var key in ExemplarData) {
    
console.log(ExemplarData[key] - 400);
    
      ExemplarTimers[key] = setInterval(function() {
        $('#' + key).animate({ color: "#000000" }, 200);
        $('#' + key).animate({ color: "#909090" }, 200);
      }, ExemplarData[key] - 400);
      
console.log(key);
      
    }
  });

});
