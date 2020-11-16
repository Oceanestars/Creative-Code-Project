var theMood = "";
var theSleep = 0;
let dataMessage;
const nextBtn = document.querySelectorAll(".next-btn");
const steps = Array.from(document.querySelectorAll(".step"));
nextBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("next");
  });
});

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

  // Remove data inside database , Keep commented to retrieve data(fast way to delete instead of manually doing it)
  // var adaRef = firebase.database().ref('PersonData');
  // adaRef.remove()
  //   .then(function() {
  //     console.log("Remove succeeded.")
  //   })
  //   .catch(function(error) {
  //     console.log("Remove failed: " + error.message)
  //   });

  dataMessage = firebase.database().ref('PersonData');
}

function writeUserData(activity, hours) {
  let newdataMessage = dataMessage.push();
  newdataMessage.set({
    funactivity: activity,
    sleep: hours
  });
}

function setMood(mood) {
  theMood = mood;
  console.log(theMood);
}

function setSleep(sleep) {
  theSleep = sleep;
  console.log(theSleep);
}

function Submit() {
  console.log("In Submit function");
  formSubmit();
  RetrieveData()
}

function formSubmit() {
  writeUserData(theMood, theSleep);
}

function changeStep(btn) {
  let index = 0;
  const active = document.querySelector(".active");
  index = steps.indexOf(active);
  steps[index].classList.remove("active");
  if (btn === "next") {
    index++;
  }
  steps[index].classList.add("active");
}

function RetrieveData() {
  dataMessage.on('value', gotData, errData);
}

function gotData(data) {

  var dataRetrieved = data.val();
  var keys = Object.keys(dataRetrieved);
  var theActivity = dataRetrieved[keys].funactivity;
  var theHours = dataRetrieved[keys].sleep;
  console.log(dataRetrieved);
  console.log(theActivity, theHours);
}

function errData(err) {
  console.log(err);
}

// const video = document.getElementById('video')
//
// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/models')
// ]).then(startVideo)
//
// function startVideo() {
//   navigator.getUserMedia(
//     { video: {} },
//     stream => video.srcObject = stream,
//     err => console.error(err)
//   )
// }
//
// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//     const resizedDetections = faceapi.resizeResults(detections, displaySize)
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//     faceapi.draw.drawDetections(canvas, resizedDetections)
//     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//     faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//   }, 100)
// })
