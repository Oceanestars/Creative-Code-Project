let dataMessage;
let stats = [];
let table = document.querySelector("table");
var numberShapes = 0;
var p5Drawing = document.getElementById("drawing");
var cssAnim = document.querySelector(".cssAnimation");
var redColor = 0;
var greenColor = 0;
var blueColor = 0;
//tried visibility instead of display because of here:https://stackoverflow.com/questions/64461290/cannot-read-property-addeventlistener-of-null-when-i-move-to-other-page-in-the
document.getElementById("button1").addEventListener("click", function() {
  p5Drawing.style.visibility = "visible";
  cssAnim.style.visibility = "hidden";
});

document.getElementById("button2").addEventListener("click", function() {
cssAnim.innerHTML = '';
  p5Drawing.style.visibility = "hidden";
  cssAnim.style.visibility = "visible";
  for(i = 0; i < numberShapes; i++) {
    cssAnim.innerHTML += '<section class="block"><section class="vis"></section></section>';
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
  dataMessage = firebase.database().ref('PersonData');
  RetrieveData()

  canvas = createCanvas(500, 500);
  canvas.parent('drawing')
}

function RetrieveData() {
  dataMessage.on('value', gotData, errData);
}

function gotData(data) {
  var tempDict = {}
  try {
    var dataRetrieved = data.val();
    var keys = Object.keys(dataRetrieved);
    var theActivity = dataRetrieved[keys[keys.length - 1]].funactivity; //with multiple entry keys has all the keys so the length-1 grabs me the latest entry
    var theHours = dataRetrieved[keys[keys.length - 1]].sleep;;
    tempDict["activity"] = theActivity;
    tempDict["sleep"] = theHours;
    stats.push(tempDict);
    setMoodToNum(stats[0].activity);
    setSleeptoColor(stats[0].sleep);
    printShape();
    // Print out the latets entry in the database
    var li = createElement('li', theActivity + ' and ' + theHours);
    li.parent('displayList');
  } catch (err) {
    console.log(err.message);
  }
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
function setSleeptoColor(currentSleep){
  if (currentSleep == 4){
    redColor = 0;
    greenColor = 0;
    blueColor = 0;
  }
  else if (currentSleep == 7){
    redColor = 0;
    greenColor = 71;
    blueColor = 171;
  }
  else if (currentSleep == 10){
    redColor = 218;
    greenColor = 165;
    blueColor = 32;
  }
}

function printShape() {

  for (let i = 0; i < numberShapes; i++) {

    shapesArray.push(new Shape(i, changeOpacity));
    changeOpacity += 30;
    //console.log(changeOpacity);
  }
}

function errData(err) {
  console.log(err);
}

let isGrowing = true;
var buttonBoolean = null;
var changeOpacity = 10;

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
    //console.log(this.transparencyColor);
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

let shapesArray = [];
let numShapes = 0;


function draw() {
  background(255)
  translate(40, 20);
  ellipseMode(CENTER);
  rectMode(CENTER);

  // iterate over shapes and draw to screen
  for (let i = 0; i < shapesArray.length; i++) {
    shapesArray[i].display();

  }
}
