var theMood = "";
var theSleep = 0;
let dataMessage;
const nextBtn = document.querySelectorAll(".next-btn");
const steps = Array.from(document.querySelectorAll(".step"));
nextBtn.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Clicked next button");
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

function errData(err) {
  console.log(err);
}

function loggingIn() {
  var notyf = new Notyf();
  console.log("Logging In");
  var email = document.getElementById("emailVal").value;
  var password = document.getElementById("passVal").value;
  console.log("Email: ", email, " Password: ", password);
  const promise = firebase.auth().signInWithEmailAndPassword(email, password);


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) { // User is signed in.
      notyf.success('Logged in successfully');
      questionPage()
    } else {
      promise.catch(e => alert(e.message));
    }
  });
}

function signingUp() {
  var notyf = new Notyf();
  console.log("Signing Up");
  var email = document.getElementById("emailVal").value;
  var password = document.getElementById("passVal").value;
  console.log("Email: ", email, " Password: ", password);
  const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
  promise.then(function(data) {
    notyf.success('You successfully created an account!');
  }, function(error) {
    alert(error.message);
  });
}

function questionPage() {
  setTimeout(function() {
    window.location.href = 'http://localhost:3000/form.html';
  }, 2000);
}
