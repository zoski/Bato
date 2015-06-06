
var clock, scene, camera, renderer, controls ;

var worldSize = 10000;
var minView = 0.1;
var maxView = 500;

function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, minView, maxView);
  camera.position.z = 5;
  camera.position.y = 2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  controls = new THREE.OrbitControls(camera);

  scene.add( new THREE.AxisHelper() );

  var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);


}
