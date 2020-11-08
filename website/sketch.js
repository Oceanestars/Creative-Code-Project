//https://dev.to/desoga/connect-registration-form-to-firebase-part-2-53cb
//https://codepen.io/CTNieves/pen/pbLGZW
var theMood ="";
let dataMessage;
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
}
  function writeUserData(activity, water, feelings, hours) {
    let newdataMessage = dataMessage.push();
    newdataMessage.set({
    funactivity: activity,
    hydration: water,
    mood : feelings,
    sleep: hours
    });
  }

function setMood(mood){
  theMood = mood;
  console.log(theMood);
}

function hydration(){
  console.log("In hydration");
  formSubmit();
}

function formSubmit() {
  writeUserData("read","low",theMood,"8");
}

function draw() {
}
