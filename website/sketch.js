let dataMessage;
let table = document.querySelector("table");
let shapesArray = [];
let isGrowing = true;
var buttonBoolean = null;
var changeOpacity = 10;
var numberShapes = 0;
var p5Drawing = document.getElementById("drawing");
var cssAnim = document.querySelector(".cssAnimation");
var myDropdown = document.getElementById("myDropdown");
var redColor = 0;
var greenColor = 0;
var blueColor = 0;
var tryVal = "#000000"
var blackArray = ["#B2B3B5", "#959698", "#777A7C", "#5A5D60", "#3C4044", "#303438", "#1F2327", "#191D22", "#01060B"];
var blueArray = ["#33FFF8", "#2DE8F8", "#27D1F8", "#21BAF8", "#1BA4F8", "#148DF7", "#0E76F7", "#085FF7", "#0248F7"];
var yellowArray = ["#FF9100", "#FE9D00", "#FDAA01", "#FCB601", "#FBC201", "#FACE01", "#F9DB02", "#F8E702", "#F7F302"];

document.getElementById("button1").addEventListener("click", function() {
  p5Drawing.style.visibility = "visible";
  cssAnim.style.visibility = "hidden";
});

document.getElementById("button2").addEventListener("click", function() {
  cssAnim.innerHTML = '';
  p5Drawing.style.visibility = "hidden";
  cssAnim.style.visibility = "visible";
  for (i = 0; i < numberShapes; i++) {
    // black no Sleep , blue 7, yellow is 10 (R>G)
    console.log(numberShapes);
    console.log(redColor, greenColor, blueColor);

    if (greenColor == 0) {
      redColor = 10 * i;
      cssAnim.innerHTML += '<section class="block" style="color:' + blackArray[i] + ';"><section class="vis"></section></section>';
    } else if (redColor > greenColor) {
      cssAnim.innerHTML += '<section class="block" style="color:' + yellowArray[i] + ';"><section class="vis"></section></section>';
    } else {
      cssAnim.innerHTML += '<section class="block" style="color:' + blueArray[i] + ';"><section class="vis"></section></section>';
    }
  }
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
  dataMessage = firebase.database().ref('User/');
  canvas = createCanvas(500, 500);
  canvas.parent('drawing')
}

function gotData(position) {
  var firebaseData = firebase.database().ref('Users');
  firebaseData.on('value', (data) => {
    try {
      var dataRetrieved = data.val();
      var keys = Object.keys(dataRetrieved);
      var value = Object.values(dataRetrieved);
      var keyofvalue = Object.values(value[position].Data);
      var lenghtData = Object.keys(keyofvalue).length;
      var theActivity = keyofvalue[lenghtData - 1].funactivity;
      var theHours = keyofvalue[lenghtData - 1].sleep;
      setMoodToNum(theActivity);
      setSleeptoColor(theHours);
      printShape();
    } catch (err) {
      console.log(err.message);
    }
  });
}

function setMoodToNum(currentMood) {
  if (currentMood == "sad") {
    numberShapes = 5;
  } else if (currentMood == "neutral") {
    numberShapes = 7;
  } else {
    numberShapes = 9;
  }
}

function setSleeptoColor(currentSleep) {
  if (currentSleep == 4) {
    redColor = 0;
    greenColor = 0;
    blueColor = 0;
  } else if (currentSleep == 7) {
    redColor = 0;
    greenColor = 71;
    blueColor = 171;
  } else if (currentSleep == 10) {
    redColor = 218;
    greenColor = 165;
    blueColor = 32;
  }
}

function printShape() {
  for (let i = 0; i < numberShapes; i++) {
    shapesArray.push(new Shape(i, changeOpacity));
    changeOpacity += 30;
  }
}

class Shape {
  constructor(vertices, transparencyColor) {
    this.vertices = vertices;
    this.transparencyColor = transparencyColor;
    this.setPosition();
    this.setColor();
  }

  setPosition() {
    this.x = 200;
    this.y = 200;
    this.radius = 200;
  }

  setColor() {
    fill(redColor, greenColor, blueColor, this.transparencyColor);
  }

  display() {
    let segmentRadians = TWO_PI / this.vertices;
    beginShape();
    for (let i = 0; i < this.vertices; i++) {
      let x = sin(i * segmentRadians) * this.radius;
      let y = cos(i * segmentRadians) * this.radius;
      vertex(this.x + x, this.y + y);

      if (this.radius > 200) {
        isGrowing = false;
      } else if (this.radius < -100) {
        isGrowing = true;
      }
      if (isGrowing == true) {
        this.radius += 0.25;
      } else if (isGrowing == false) {
        this.radius -= 0.25;
      }
    }
    endShape(CLOSE);
  }
}

function draw() {
  background(255)
  translate(40, 20);
  ellipseMode(CENTER);
  rectMode(CENTER);
  for (let i = 0; i < shapesArray.length; i++) {
    shapesArray[i].display();
  }
}

function Dropdown() {
  var starCountRef = firebase.database().ref('Users');
  starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
    myDropdown.innerHTML = "";
    var keys = Object.keys(data);
    for (i = 0; i < Object.keys(data).length; i++) {
      myDropdown.innerHTML += '<a onclick="gotData(' + i + ')">' + data[keys[i]].displayName + '</a>'
    }
  });
  document.getElementById("myDropdown").classList.toggle("show");
}
