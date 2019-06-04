
var interestingPlaces = [
		{content: 'Blue Lagoon, Iceland', coordinates:{lat:63.8804,lng:-22.4495}, iconImagePath:""},
		{content: 'Rome, Italy', coordinates:{lat:41.9028,lng:12.4964}, iconImagePath:""},
		{content: 'Black Forest, Germany', coordinates:{lat:48.2775,lng:8.1860}, iconImagePath:""},
		{content: 'Santorini, Greece', coordinates:{lat:36.3932,lng:25.4615}, iconImagePath:""},
		{content: 'Ticino, Switzerland', coordinates:{lat:46.3317,lng:8.8005}, iconImagePath:""},
		{content: 'Antelope Canyon, Arizona, US', coordinates:{lat:36.8619,lng:-111.3743}, iconImagePath:""},
		{content: 'Salar de Uyuni, Bolivia', coordinates:{lat:-20.1338,lng:-67.4891}, iconImagePath:""},
		{content: 'Bora Bora, French Polynesia', coordinates:{lat:-16.5004,lng:-151.7415}, iconImagePath:""},
		];
var gMap;
var currentPlaceIndex = 0;
var currentPlace = interestingPlaces[currentPlaceIndex];
var score = 0;
var won = false;
// initMap is a callback function that is initiated as part of the Google Maps API call at the bottom.
function initMap() {
    // Create a new map and assign it to gMap
    gMap = new google.maps.Map(document.getElementById('myMapID'), {
        center: {lat: 0.0, lng: 0.0}, 
		zoom: 2
	});
	google.maps.event.addListener(gMap, 'idle', function() {
		UpdateGame();
	});
}

function instruct() {
	var ins = document.getElementById('instruct-id');
	ins.value="Welcome to my google maps game! Navigate to the hidden areas and zoom in to score!";
}

function hint(int) {
	var ht = document.getElementById('hint-id');
	if (int == 1) {
		ht.value="The location is there! Zoom in by double-clicking!"
	}
	if (int == 2) {
		ht.value="The location is not here, try looking elsewhere!"
	}
	if (int == 3) {
		ht.value="Congrats! Click on the marker to continue!"
	}
	if (int == 4) {
		ht.value="Congratulations! You win! Refresh the page to play again!"
	}
}

function scoreUpdate(score) {
	var sc = document.getElementById('score-id');
	sc.value=score;
}

function UpdateGame() {
	if (score < 8) {
		currentPlace = interestingPlaces[currentPlaceIndex];
		var zoomLevel = gMap.getZoom()
		var inBounds = false;
		hint(2);
		if (gMap.getBounds().contains(currentPlace.coordinates)) {
			inBounds = true;
			hint(1);
		}
		console.log("inBounds:"+inBounds+" zoomLevel:"+zoomLevel);
		if (zoomLevel >= 8 && inBounds) {
			placeMarker(currentPlace.coordinates);
			numberToDisplay = currentPlaceIndex+1;
			hint(3);
			alert('Good job! My bucket list location #'+numberToDisplay+' is '+currentPlace.content+'. Add 1 to the scoreboard!');
		}
	}
	else {
		hint(4);
		console.log("Congrats! You won! Refreshpage to play again!");
	}
}

function placeMarker(LatLng) {
	var infoWindow = new google.maps.InfoWindow({content:currentPlace.content});
	var marker = new google.maps.Marker({
		position: LatLng,
		map: gMap
	});
	marker.addListener('click', function() {
        infoWindow.open(gMap, marker);
		if (currentPlaceIndex < 8) {			
			currentPlaceIndex++;
		}
		score++;
		scoreUpdate(score);
		gMap.setZoom(2);
		gMap.setCenter({lat: 0.0, lng: 0.0});
    });
}


