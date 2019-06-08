console.log("Logic.js loaded");
  
  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyCu5Zhnmkz1m_wkG4Ogp9GRGLUiLyC9rng",
    authDomain: "fir-project-fb374.firebaseapp.com",
    databaseURL: "https://fir-project-fb374.firebaseio.com",
    projectId: "fir-project-fb374",
    storageBucket: "fir-project-fb374.appspot.com",
    messagingSenderId: "420545845738",
    appId: "1:420545845738:web:7bb241f6d707dd3b"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  // 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      rate: trainRate
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });


  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainRate);

    

// ======================= Calculations Start Here ==================

    // Frequency
    var tFrequency = trainRate;
    // Start Time ex. 3:30 AM
    var firstTime = trainStart;
    var firstTimePretty = moment.unix(trainStart).format("HH:mm");
    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
    // Current Time
    var currentTime = moment();
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "day");
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;

    // Next Train
    var nextTrain = currentTime.add(tMinutesTillTrain, 'minutes'); 
    var nextArrival = moment(nextTrain).format("HH:mm");
    

    console.log("================ var Values ================== ");
    console.log("trainStart: " + trainStart);
    console.log("trainStartPretty: " + trainStartPretty);
    console.log("tRemainder: " + tRemainder);
    console.log("firstTimeConverted: " + moment(firstTimeConverted).format("HH:mm"));
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    console.log("DIFFERENCE IN TIME: " + diffTime);
    console.log("-------------------");
    console.log("momentnow: " + currentTime);
    console.log("moment: " + moment());
    console.log("minutes to add: " + tMinutesTillTrain);
    console.log("Type of tMinutesTillTrain: " + typeof tMinutesTillTrain);
    console.log("nextTrain: " + nextTrain);
    console.log("FREQUENCY: " + tFrequency);
    console.log("ARRIVAL TIME: " + nextArrival);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });