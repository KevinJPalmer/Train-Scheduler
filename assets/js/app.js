// Initialize Firebase
var config = {
  apiKey: "AIzaSyBlYPXjXoDaru-GfY_mY10967RIcMooo6s",
  authDomain: "intro-15cf6.firebaseapp.com",
  databaseURL: "https://intro-15cf6.firebaseio.com",
  projectId: "intro-15cf6",
  storageBucket: "intro-15cf6.appspot.com",
  messagingSenderId: "619245397189"
};
firebase.initializeApp(config);

$("#submit").on("click", function(event){
  event.preventDefault()
  // Grabs user input and assign to variables
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
  var frequencyInput = $("#frequencyInput").val().trim();
  // Will push this to firebase
  firebase.database().ref().push({
    name:  trainName,
    destination: destination,
    trainTime: trainTimeInput,
    frequency: frequencyInput,
  })

    // clear text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#trainTimeInput").val("");
  $("#frequencyInput").val("");

  // Prevents page from refreshing
  return false;
});

firebase.database().ref().on("child_added", function(snapshot){
  // assign firebase variables to snapshots.
  var firebaseName = snapshot.val().name;
  var firebaseDestination = snapshot.val().destination;
  var firebaseTrainTimeInput = snapshot.val().trainTime;
  var firebaseFrequency = snapshot.val().frequency;

  var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
  var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
  var minutes = firebaseFrequency - timeRemainder;
  var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

  // Append train info to table on page
  $("#trainDisplay").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

});
