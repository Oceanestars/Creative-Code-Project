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
  // canvas = createCanvas(500, 500);
  // canvas.parent('drawing')
  // // create a bunch of shapes
  // for (let i = 0; i < 6; i++) {
  //
  //   shapesArray.push(new Shape(i, changeOpacity));
  //   changeOpacity += 30;
  //   console.log(changeOpacity);
  // }
}

function writeUserData(activity, hours) {
  let newdataMessage = dataMessage.push();
  newdataMessage.set({
    funactivity: activity,
    sleep: hours
  });
}

function RetrieveData() {
  dataMessage.on('value', gotData, errData);
}

function gotData(data) {
  var tempDict = {}
  try {
    var dataRetrieved = data.val();
    console.log(dataRetrieved)
    var keys = Object.keys(dataRetrieved);
    var theActivity = dataRetrieved[keys].funactivity;
    var theHours = dataRetrieved[keys].sleep;
    console.log(theActivity, theHours);
    tempDict["activity"] = theActivity;
    tempDict["sleep"] = theHours;
    stats.push(tempDict);
    let headerData = Object.keys(stats[0]);
    console.log(stats[0]);
    var li = createElement('li', theActivity + ' and ' + theHours);
    li.parent('displayList');
  } catch (err) {
    console.log(err.message);
  }
}

function errData(err) {
  console.log(err);
}

// let isGrowing = true;
// var buttonBoolean = null;
// var changeOpacity = 10;
//
// class Shape {
//   constructor(vertices, transparencyColor) {
//     this.vertices = vertices;
//     this.transparencyColor = transparencyColor;
//     this.setPosition();
//     this.setColor();
//
//   }
//
//   setPosition() {
//     this.x = 200;
//     this.y = 200;
//     this.radius = 200;
//   }
//
//   setColor() {
//     console.log(this.transparencyColor);
//     fill(255, 0, 0, this.transparencyColor);
//
//   }
//
//   display() {
//     let segmentRadians = TWO_PI / this.vertices;
//     beginShape();
//     for (let i = 0; i < this.vertices; i++) {
//       let x = sin(i * segmentRadians) * this.radius;
//       let y = cos(i * segmentRadians) * this.radius;
//       vertex(this.x + x, this.y + y);
//
//       if (this.radius > 200) {
//         isGrowing = false;
//       } else if (this.radius < -100) {
//         isGrowing = true;
//       }
//       if (isGrowing == true) {
//         this.radius += 0.25;
//       } else if (isGrowing == false) {
//         this.radius -= 0.25;
//       }
//     }
//     endShape(CLOSE);
//   }
// }
//
// let shapesArray = [];
// let numShapes = 0;
//
//
// function draw() {
//   background(255)
//   translate(100, 20);
//   ellipseMode(CENTER);
//   rectMode(CENTER);
//
//   // iterate over shapes and draw to screen
//   for (let i = 0; i < shapesArray.length; i++) {
//     shapesArray[i].display();
//
//
//   }
// }
