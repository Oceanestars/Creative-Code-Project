let dataMessage;
let stats = [];
let table = document.querySelector("table");

function setup() {
  var firebaseConfig = {
    apiKey: "AIzaSyCQwH6uhCGCSIz_JpL8Twwt3ueBrm5IVng",
    authDomain: "creative-code-project.firebaseapp.com",
    databaseURL: "https://creative-code-project.firebaseio.com",
    projectId: "creative-code-project",
    storageBucket: "creative-code-project.appspot.com",
    messagingSenderId: "892559519084",
    appId: "1:892559519084:web:59aa8f2b7f8f69470b5749",
    measurementId: "G-M2L8YLJ0DN"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  dataMessage = firebase.database().ref('PersonData');
  RetrieveData()
}

function writeUserData(activity, hours) {
  let newdataMessage = dataMessage.push();
  newdataMessage.set({
    funactivity: activity,
    sleep: hours
  });
}

function draw() {}

function RetrieveData() {
  dataMessage.on('value', gotData, errData);
}

function gotData(data) {
  var tempDict = {}
  var dataRetrieved = data.val();
  var keys = Object.keys(dataRetrieved);
  var theActivity = dataRetrieved[keys].funactivity;
  var theHours = dataRetrieved[keys].sleep;
  console.log(theActivity, theHours);
  tempDict["activity"] = theActivity;
  tempDict["sleep"] = theHours;
  stats.push(tempDict);

  let headerData = Object.keys(stats[0]);
  console.log(stats[0]);
  generateTableHead(table, headerData);
  generateTable(table, stats);
}

function errData(err) {
  console.log(err);
}


function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}
