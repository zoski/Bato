///////////////////////////////////////////////////////////////
//      Initializer
///////////////////////////////////////////////////////////////
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, minView, maxView );
camera.position.z = 5;
camera.position.y = 2;
controls = new THREE.OrbitControls( camera );
//set the min/max distance between the camera and the boat
controls.minDistance = 3;
controls.maxDistance = 10;
//set the min/max angle to unable being under the sea
controls.minPolarAngle = THREE.Math.degToRad(0);
controls.maxPolarAngle = THREE.Math.degToRad(90);
renderer = new THREE.WebGLRenderer(  {antialias: true} );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

////////////    Collision /////////////
colliderSystem	= new THREEx.ColliderSystem();
colliders = [];
onRenderFcts.push( function() {
		colliderSystem.computeAndNotify(colliders);
	});
