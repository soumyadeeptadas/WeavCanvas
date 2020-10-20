// variable definition (socket connection and data placeholders)
var socket = io();
let x, y, px, py;

function setup() {
  // socket is listening for two events: new drawing and clear canvas
  socket.on("mouse", newDrawing);
  socket.on("refresh", wipeCanvas);

  // create a refresh button
  var button1 = createButton('refresh');
  //button1.position(0,0);
  button1.mousePressed(refreshSession); 
  
  var button2 = createButton('save');
  //button2.position(0,0);
  button2.mousePressed(saveImage);
  
   var button3 = createButton('Open Weavy Cloud File Picker');
  button3.mousePressed(weavyFileBrowser);
  
  // set up canvas: ASK JOSE ABOUT THIS
  createCanvas(windowWidth, windowHeight-140, noRedraw = "TRUE");
  //createCanvas(1000,500);
  background(0);
  colorMode(HSB);
  
  //refreshSession if new session started/refresh page pressed
  refreshSession();
}

function saveImage() {

  saveCanvas('myImage', 'png');
}


function weavyFileBrowser(){
  
  window.open("https://filebrowser.weavycloud.com/", '_blank');
}



function refreshSession() {
  // refresh function emits data to server to reset canvas
  var refreshdata = {
    bgd: 0
  };
  //
  socket.emit("refresh", refreshdata);
}

function wipeCanvas(refreshdata) {
  // wipe canvas function actually resets the canvas
  background(refreshdata.bgd);
}

function newDrawing(data) {
  // newDrawing outputs the lines drawn by others in real time, via data emmitted
  // replace with frameCount to return to solid color
  stroke(random(255) % 360, 75, 100);
  strokeWeight(10);
  
  // lines to be emmitted based on data shared
  line(data.x, data.y, data.px, data.py);
  line(width - data.x, data.y, width - data.px, data.py);
  line(data.x, height - data.y, data.px, height - data.py);
  line(width - data.x, height - data.y, width - data.px, height - data.py);
}

function mouseDragged() {

  x = mouseX;
  y = mouseY;
  px = pmouseX;
  py = pmouseY;
  
  var data = {
    x: x,
    y: y,
    px: px,
    py: py,
  };
  
  line(x, y, px, py);
  line(width - x, y, width - px, py);
  line(x, height - y, px, height - py);
  line(width - x, height - y, width - px, height - py);
  
  socket.emit("mouse", data);
}

function draw() {
  // framecount is only a property of draw
  stroke(frameCount % 360, 75, 100);
  strokeWeight(10);
}

/* DROPDOWN, used website as reference: https://www.w3schools.com/howto/howto_js_dropdown.asp */

/*toggle dropdown*/
function dropdownToggle() {
  document.getElementById("ProjectDropdown").classList.toggle("show");
}

/* close dropdown if user clicks outside*/
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
