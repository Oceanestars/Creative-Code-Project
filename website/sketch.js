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


$(".close").click(function(){
	$("#modal").css("display","none");
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
  // var adaRef = firebase.database().ref('Users');
  // adaRef.remove()
  //   .then(function() {
  //     console.log("Remove succeeded.")
  //   })
  //   .catch(function(error) {
  //     console.log("Remove failed: " + error.message)
  //   });

}

function Try() {
  var notyf = new Notyf();
  var emailAddress = document.getElementById("emailVal").value;
  var auth = firebase.auth();
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    notyf.success('An email was sent to your email.');
  }).catch(function(error) {
    // An error happened.
    console.log("Wrong email or email dis not in database");
  });
}

function writeUserData(activity, hours) {
  var userId = firebase.auth().currentUser.uid;
  dataMessage = firebase.database().ref('Users/' + userId + '/Data');
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
  $("#modal").css("display","block");
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
  const promise = firebase.auth().signInWithEmailAndPassword(email, password);
  promise.then(function(data) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user && user.emailVerified == true) { // User is signed in.
        notyf.success('Logged in successfully');
        print("User ", user)
        questionPage()
      } else {
        notyf.error('you need to verify your email');
      }
    });
  }, function(error) {
    promise.catch(e => alert(e.message));
  });
}

function signingUp() {
  var notyf = new Notyf();
  console.log("Signing Up");
  var email = document.getElementById("emailVal").value;
  var password = document.getElementById("passVal").value;
  var name = document.getElementById("nameVal").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result) {
      notyf.success('You successfully created an account!');
      // print("User ", user)
      return result.user.updateProfile({
        displayName: name
      })

    }).catch(function(error) {
      console.log(error);
    });
  //var user = firebase.auth().currentUser;
  // console.log("Email: ", email, " Password: ", password);
  // const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
  // promise.then(function(data) {
  // notyf.success('You successfully created an account!');
  // }, function(error) {
  //   alert(error.message);
  // });
  setTimeout(function() {
    var freakinListener = false;
    firebase.auth().onAuthStateChanged(function(user) {
      print("User ", user)
      print("Get displayName", user['displayName']);
      if (user) {
        //freakinListener = true;
        firebase.database().ref('Users/' + user.uid).set({
          email: user.email,
          uid: user.uid,
          displayName: user['displayName']
        });

        user.sendEmailVerification().then(function() {
          // Email sent.
          console.log("Verify yyour email");
        }).catch(function(error) {
          // An error happened.
          console.log("this did not work");
        });
      }
    });
    // else {
    //    alert("Wrong format for your email");
    // }
  }, 5000);
  // var user = firebase.auth().currentUser;
}

function questionPage() {
  setTimeout(function() {
    window.location.href = 'http://localhost:3000/form.html';
    //window.location.href = 'https://solace-project.herokuapp.com/form.html';
  }, 2000);
}
