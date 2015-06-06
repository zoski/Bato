///////////////////////////////////////////////////////////////
//      Initializer
///////////////////////////////////////////////////////////////
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, minView, maxView );
camera.position.z = 5;
camera.position.y = 2;
controls = new THREE.OrbitControls( camera );
renderer = new THREE.WebGLRenderer(  {antialias: true} );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
