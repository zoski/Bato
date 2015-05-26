
var clock, scene, camera, renderer, controls ;

var worldSize = 10000;


function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 65, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z =  - 50;
  camera.position.y = 20;
  camera.position.x = 20;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  controls = new THREE.OrbitControls(camera);

  scene.add( new THREE.AxisHelper() );


}
