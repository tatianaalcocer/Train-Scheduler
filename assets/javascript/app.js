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




//FUNCTIONS: ====================================================================================
 
function calculateNextArrival() {
	console.log("running calculateNextArrival")
	//takes the input from the first train time and frequency to find 
	//when the next train is compared to now and prints the time of day 
	//the train will arrive

	// Assigning the row and cells on the table
	var table = document.getElementById("train-table");
	var row = table.insertRow(1);

	// Grabbing the value of the text input
	var time = moment($(".train-time").val().trim(), "HH:mm");
	var freq = parseInt($(".train-freq").val().trim());

	var arrivalTime = moment(time);
	var now = moment();


	while(arrivalTime.isBefore(now)) {
		arrivalTime.add(freq, 'm');
	}

	return arrivalTime;
}


function calculateMinutes() {
	console.log("running calculateMinutes")
	//takes the input from first train time and frequency to find when the next train is,
	//compared to now, and returns remaining mins rounded up, using floating point number

	// Grabbing the value of the text input
	var time = moment($(".train-time").val().trim(), "HH:mm");
	var freq = $(".train-freq").val().trim();

	return Math.ceil(calculateNextArrival().diff( moment(), 'm', true));

}


function clearFields() {
	console.log("running clearFields");
	$(".train-input").val("");
}


function addTrain() {
	console.log("running add train");

	// Assigning the row and cells on the table
	var table = document.getElementById("train-table");
	var row = table.insertRow(1);

	var nameCell    = row.insertCell(0);
	var destCell    = row.insertCell(1);
	var freqCell    = row.insertCell(2);
	var arrivalCell = row.insertCell(3);
	var minutesCell = row.insertCell(4);

	// Grabbing the value of the text input
	name = $(".train-name").val().trim();
	dest = $(".train-dest").val().trim();
	freq = $(".train-freq").val().trim();

	// Displaying the value of the text input onto the table
	nameCell.innerHTML = name;
	destCell.innerHTML = dest;
	freqCell.innerHTML = freq;
	arrivalCell.innerHTML = calculateNextArrival().format('HH:mm');
	minutesCell.innerHTML = calculateMinutes();

	// Clearing the text input boxes
	clearFields();
}


// EVENT LISTENERS: =============================================================================
$(".add-train").on("click", addTrain);








}) // END OF DOCUMENT READY FUNCTION

