var database = firebase.database();

var trainRef = database.ref("/trainData");

// Initial Values
var name = "";
var destination = "";
var time = 0000;
var frequency = 00;


$("#submit-train").on("click", function() {
	event.preventDefault();
  
  var trnName = $("#train-name").val().trim();
  var trnDestination = $("#destination").val().trim();
  var trnTime = moment($("#train-time").val().trim(), "HH:mm").format();
  var trnFrequency = parseInt($("#frequency").val().trim());

  
  var newTrn = {
  	name: trnName,
  	destination: trnDestination,
  	time: trnTime,
  	frequency: trnFrequency
  }


    database.ref("/trainData").push(newTrn);

  
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.time);
  console.log(newTrn.frequency);
  
  
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");

  
  return false;

}); 


database.ref("/trainData").on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	
  var trnName = childSnapshot.val().name;
  var trnDestination = childSnapshot.val().destination;
  var trnTime = childSnapshot.val().time;
  var trnFrequency = childSnapshot.val().frequency;

  console.log(trnName);
  console.log(trnDestination);
  console.log("FIRST TRAIN DEPARTED AT: " + trnTime);
  console.log("THE TRAIN ARRIVES EVERY " + trnFrequency + " MINUTES");


  // First Train Time 
  var trnTimeConverted = moment(trnTime, "HH:mm").subtract(1, "days");
    console.log(trnTimeConverted);

  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trnTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trnRemainder = diffTime % trnFrequency;
    console.log(trnRemainder);

    // Minute Until Train
    var trnMinutesTill = trnFrequency - trnRemainder;
    console.log("MINUTES TILL TRAIN: " + trnMinutesTill);

    // Next Train
    var nextTrain = moment().add(trnMinutesTill, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" +
  trnFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + trnMinutesTill + "</td><td>" + "" + "</td></tr>");
});

  
  //Take first train start time, calculate using frequency train times throughout the day
  //Find current time
  //Find next train time after current time
