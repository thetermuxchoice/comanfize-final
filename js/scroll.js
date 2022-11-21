// Get window dimension
var ww = window.innerWidth,
    wh = window.innerHeight;
// Save half window dimension
var ww2 = ww * 0.5,
    wh2 = wh * 0.5;

// Constructor function
function Tunnel() {
  // Init the scene and the 
  this.init();
  // Create the shape of the tunnel
  this.createMesh();

  // Mouse events & window resize
  this.handleEvents();

  // Start loop animation
  window.requestAnimationFrame(this.render.bind(this));
}

Tunnel.prototype.init = function() {
  // Store the position of the mouse
  // Default is center of the screen
  this.mouse = {
    position: new THREE.Vector2(0, 0),
    target: new THREE.Vector2(0, 0)
  };

  // Create a WebGL renderer
  this.renderer = new THREE.WebGLRenderer({
    antialias:true,
    canvas: document.querySelector("#scene")
  });
  // Set size of the renderer and its background color
  this.renderer.setSize(ww, wh);
  this.renderer.setClearColor(0xe8e1bc);

  // Create a camera and move it along Z axis
  this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000);
  this.camera.position.z = 0.35;

  // Create an empty scene and define a fog for it
  this.scene = new THREE.Scene();
  this.scene.fog = new THREE.Fog(0xe8e1bc, 0.8, 2.5);
};

Tunnel.prototype.createMesh = function() {
  // Empty array to store the points along the path
  var points = [];
  
  // Define points along Z axis to create a curve
  for (var i = 0; i < 5; i += 1) {
    points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
  }
  // Set custom Y position for the last point
  points[4].y = -0.06;

  // Create a curve based on the points
  this.curve = new THREE.CatmullRomCurve3(points);
  // Define the curve type

  // Empty geometry
  var geometry = new THREE.Geometry();
  // Create vertices based on the curve
  geometry.vertices = this.curve.getPoints(70);
  // Create a line from the points with a basic line material
  this.splineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());

  // Create a material for the tunnel with a custom texture
  // Set side to BackSide since the camera is inside the tunnel
  this.tubeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: tunnelTexture
  });
  // Repeat the pattern
  this.tubeMaterial.map.wrapS = THREE.RepeatWrapping;
  this.tubeMaterial.map.wrapT = THREE.RepeatWrapping;
  this.tubeMaterial.map.repeat.set(1, 1);

  // Create a tube geometry based on the curve
  this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 30, false);
  // Create a mesh based on the tube geometry and its material
  this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);
  // Push the tube into the scene
  this.scene.add(this.tubeMesh);

  // Clone the original tube geometry
  // Because we will modify the visible one but we need to keep track of the original position of the vertices
  this.tubeGeometry_o = this.tubeGeometry.clone();
  this.mouse.target.x = 0.9227340267459139;
  this.mouse.target.y = -0.02600297176820208;
  
};

Tunnel.prototype.handleEvents = function() {
  // When user resize window
  window.addEventListener('resize', this.onResize.bind(this), false);
  // When user move the mouse
  document.body.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  
  // Listen to device orientation events
  this.deviceOrientation = new FULLTILT.DeviceOrientation();
  var self = this;
  this.deviceOrientation.start(function(){
    self.onDeviceOrientationChange();
  });

};

Tunnel.prototype.onResize = function() {
  // On resize, get new width & height of window
  ww = window.innerWidth;
  wh = window.innerHeight;
  ww2 = ww * 0.5;
  wh2 = wh * 0.5;

  // Update camera aspect
  this.camera.aspect = ww / wh;
  // Reset aspect of the camera
  this.camera.updateProjectionMatrix();
  // Update size of the canvas
  this.renderer.setSize(ww, wh);
};

Tunnel.prototype.onDeviceOrientationChange = function() {
  // When the user move his device, change mouse target
  var euler = this.deviceOrientation.getScreenAdjustedEuler();
  if(euler.alpha > 0 && euler.beta < 90){
      this.mouse.target.y = (Math.max(-1, Math.min(1, ((euler.beta - 20) / 30))));
      this.mouse.target.x = -(Math.max(-1, Math.min(1, ((euler.gamma) / 30))));
  }
};

Tunnel.prototype.updateCameraPosition = function() {
  // Update the mouse position with some lerp
  this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 30;
  this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 30;

  // Rotate Z & Y axis
  this.camera.rotation.z = this.mouse.position.x * 0.2;
  this.camera.rotation.y = Math.PI - (this.mouse.position.x * 0.06);
  // Move a bit the camera horizontally & vertically
  this.camera.position.x = this.mouse.position.x * 0.015;
  this.camera.position.y = -this.mouse.position.y * 0.015;
  
};

Tunnel.prototype.onMouseMove = function(e) {

};

const infoC = document.querySelector(".info")
const info = document.querySelector(".info p")
const scroll = document.querySelector(".space-scroll")

Tunnel.prototype.updateMaterialOffset = function() {
  this.speed = 0.000040;
  // Update the offset of the material
  this.tubeMaterial.map.offset.x += this.speed;
  this.tubeMaterial.map.offset.y += 0.001;
  window.addEventListener("wheel", (e)=>{
    if (scroll.classList.contains("opacity")) {
      if (e.deltaY < 0) {
        // this.tubeMaterial.map.offset.x -= this.speed;
        scroll.classList.remove("opacity")
        this.tubeMaterial.map.offset.x = 0
      } else {
        this.tubeMaterial.map.offset.x += this.speed;
      }

      /*
      
      if (this.tubeMaterial.map.offset.x > 0.3895999999999734 && this.tubeMaterial.map.offset.x < 1.7038999999999388) {
        info.textContent = "Lorem ipsum dolor sit amet, text one"
        infoC.classList.add("info-open")
      } else if (this.tubeMaterial.map.offset.x > 1.122800000000158 && this.tubeMaterial.map.offset.x < 2.162800000000158) {
        info.textContent = "Lorem ipsum dolor sit amet, text two"
        infoC.classList.add("info-open")
      } else if (this.tubeMaterial.map.offset.x > 2.562800000000158 && this.tubeMaterial.map.offset.x < 3.262800000000158) {
        info.textContent = "Lorem ipsum dolor sit amet, text tree"
        infoC.classList.add("info-open")
      }
      */

    }
  })

};


Tunnel.prototype.updateCurve = function() {
  var index = 0,
      vertice_o = null,
      vertice = null;
  // For each vertice of the tube, move it a bit based on the spline
  for (var i = 0, j = this.tubeGeometry.vertices.length; i < j; i += 1) {
    // Get the original tube vertice
    vertice_o = this.tubeGeometry_o.vertices[i];
    // Get the visible tube vertice
    vertice = this.tubeGeometry.vertices[i];
    // Calculate index of the vertice based on the Z axis
    // The tube is made of 30 circles of vertices
    index = Math.floor(i / 30);
    // Update tube vertice
    vertice.x += ((vertice_o.x + this.splineMesh.geometry.vertices[index].x) - vertice.x) / 10;
    vertice.y += ((vertice_o.y + this.splineMesh.geometry.vertices[index].y) - vertice.y) / 5;
  }
  // Warn ThreeJs that the points have changed
  this.tubeGeometry.verticesNeedUpdate = true;

  // Update the points along the curve base on mouse position
  this.curve.points[2].x = -this.mouse.position.x * 0.1;
  this.curve.points[4].x = -this.mouse.position.x * 0.1;
  this.curve.points[2].y = this.mouse.position.y * 0.1;
  
  // Warn ThreeJs that the spline has changed
  this.splineMesh.geometry.verticesNeedUpdate = true;
  this.splineMesh.geometry.vertices = this.curve.getPoints(70);
};

Tunnel.prototype.render = function() {

  // Update material offset
  this.updateMaterialOffset();

  // Update camera position & rotation
  this.updateCameraPosition();

  // Update the tunnel 
  this.updateCurve();

  // render the scene
  this.renderer.render(this.scene, this.camera);

  // Animation loop
  window.requestAnimationFrame(this.render.bind(this));
};


// Create a new loader
var loader = new THREE.TextureLoader();
// Prevent crossorigin issue
loader.crossOrigin = "Anonymous";
// Load the texture
loader.load("/InfiniteTubes/img/demo3/galaxyTexture.jpg",
            function(texture){
  // When texture is loaded, init the scene
  document.body.classList.remove("loading");
  window.tunnelTexture = texture;
  window.tunnel = new Tunnel();
  
});
