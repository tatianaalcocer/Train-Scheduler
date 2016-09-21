$(document).ready(function(){

//FIREBASE: =====================================================================================
  var config = {
    apiKey: "AIzaSyAd2XQa64c7-kU-97AaLQU_xdsr6N-Lfkk",
    authDomain: "trainscheduler-30125.firebaseapp.com",
    databaseURL: "https://trainscheduler-30125.firebaseio.com",
    storageBucket: "trainscheduler-30125.appspot.com",
    messagingSenderId: "234437676740"
  };
  firebase.initializeApp(config);



//VARIABLES: ====================================================================================

var database = firebase.database();
var trains = [];



//FUNCTIONS: ====================================================================================
 
function calculateNextArrival(startTime, frequency) {

	// Grabbing the value of the text input
	var time = moment(startTime, "HH:mm");
	var freq = parseInt(frequency);

	// Assigning time to new variable for while loop
	var arrivalTime = moment(time);
	var now = moment();

	// While the arrival time is before the current time, continue adding the value of frequency (mins)
	while(arrivalTime.isBefore(now)) {
		arrivalTime.add(freq, 'm');
	}

	return arrivalTime;
}


function calculateMinutes(startTime, frequency) {
	
	// Returning the difference between the current time and the time of the next arrival
	return Math.ceil(calculateNextArrival(startTime, frequency).diff( moment(), 'm', true));

}


function clearFields() {

	// Clears the text input fields
	$(".train-input").val("");
}

function updateTable(trains) {

	document.getElementById('train-table-body').innerHTML = '';

	for(var i in trains) {
		// Assigning the row and cells on the table
		var table = document.getElementById("train-table-body");
		var row = table.insertRow();

		var nameCell    = row.insertCell(0);
		var destCell    = row.insertCell(1);
		var freqCell    = row.insertCell(2);
		var arrivalCell = row.insertCell(3);
		var minutesCell = row.insertCell(4);


		// Displaying the value of the text input onto the table
		nameCell.innerHTML = trains[i].name;
		destCell.innerHTML = trains[i].dest;
		freqCell.innerHTML = trains[i].freq;
		arrivalCell.innerHTML = calculateNextArrival(trains[i].start, trains[i].freq).format('HH:mm');
		minutesCell.innerHTML = calculateMinutes(trains[i].start, trains[i].freq);


	}
}

function addTrain(train) {

	// Grabbing the value of the text input
	name = train.name;
	dest = train.dest;
	freq = train.freq;
	start = train.start;

	// Pusing train information
	trains.push({
        name: name,
        dest: dest,
        freq: freq,
        start: start
    });

	// Setting the value of the database to be equal to the local array
	database.ref('trains').set(trains);
}

function onTrainSubmit() {

	addTrain({
		name: $(".train-name").val().trim(),
		dest: $(".train-dest").val().trim(),
		freq: $(".train-freq").val().trim(),
		start: $(".train-time").val().trim()
	});

	// Clearing the text input boxes
	clearFields();
}


// EVENT LISTENERS: =============================================================================
$(".add-train").on("click", onTrainSubmit);


database.ref('trains').on('value', function(snapshot) {
    var dbTrains = snapshot.val();
    trains = dbTrains;
   
    updateTable(trains);
});






}) // END OF DOCUMENT READY FUNCTION

