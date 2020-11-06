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
  // console.log(firebase);

  // I get an error that firebase.database() is not a function
  
  // var database = firebase.database();
  // // reference to a node
  // var ref = database.ref('scores');
  // var data = {
  //   mood: "happy",
  //   hydration: "low",
  //   sleep: 7,
  //   funactivity: "watching tv"
  // }
  // ref.push(data);
}

function draw() {

}
