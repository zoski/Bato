///////////////////////////////////////////////////////////////
//      Initializer
///////////////////////////////////////////////////////////////

var scene, camera, renderer, controls;

var boat_position = new THREE.Vector3();

var worldSize = 1000;
var minView = 0.1;
var maxView = 1000;
var wordVertice = 500;

var onRenderFcts = []; // stock les fonctions qui doivent être exécuté à chaque rendu

function init() {

  ///////////////////////////////////////////////////////////////
  //        Scene

  scene = new THREE.Scene();
  // FOV, Ratio Largeur/ Hauteur , Distance de vue proche , Distance max de vue
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, minView, maxView);
  camera.position.z = 5;
  camera.position.y = 2;

  ///////////////////////////////////////////////////////////////
  //      renderer

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  ///////////////////////////////////////////////////////////////
  //      Camera

  controls = new THREE.OrbitControls(camera);

  ///////////////////////////////////////////////////////////////
  //      Objects

  scene.add( new THREE.AxisHelper() );

  ////////////////////////      Sea
  var sea_material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
    wireframe: false
  });

  var sea_geometry = new THREE.PlaneGeometry(worldSize, worldSize, 4, 4);

  var sea = new THREE.Mesh(sea_geometry, sea_material);
  sea.rotateX(Math.PI / 2);

  // scene.add(sea);

  ////////////////////////      Smaller sea
  var small_sea_geometry = new THREE.PlaneGeometry( 100, 100, 10, 10);
  var small_sea_material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
    wireframe: true
  });
  var small_sea = new THREE.Mesh( small_sea_geometry, small_sea_material );
  small_sea.rotateX(-Math.PI / 2);

  scene.add( small_sea );

  // var edges = new THREE.FaceNormalsHelper( small_sea, 0x00ff00 );
  // scene.add( edges );

  ///////////////////////////////////////////////////////////////
  //      RayCasting

  var raycaster = new THREE.Raycaster();

  // http://davidscottlyons.com/threejs/presentations/frontporch14/#slide-113




  ///////////////////////////////////////////////////////////////
  //      animation

  // var angle	= now*2 + position.y	 * 10;
  // position.x	= origin.x + Math.cos(angle)*0.1;

  var animation	= new THREEx.VertexAnimation(small_sea_geometry, function(origin, position, delta, now){
		// here you put your formula, something clever which fit your needs
    var speed	= 0.4 ;
    var angle	= speed*now*Math.PI*2 + origin.y*10;
		position.x	= origin.x + Math.cos(angle)*0.1;
    position.y	= origin.y + Math.sin(angle*0.1);
    position.z	= origin.z + Math.cos(angle)*0.5;

	})
	// update the animation at every frame
  onRenderFcts.push(function(delta, now){
		animation.update(delta, now)
	})


  //       Boat
  var boat = new THREE.Group();
  scene.add(boat);
  console.log("Position du bateau : " + boat.position.x );

  var boat_material = new THREE.MeshNormalMaterial({
    //color: 0x00ff00
    //shading: THREE.SmoothShading,
    //color: 0x0092ff //brown
  });

  var boat_base_geometry = new THREE.BoxGeometry(1, 0.5, 2);
  var boat_base = new THREE.Mesh( boat_base_geometry, boat_material );
  boat_base.position.y = 0.25;
  boat.add( boat_base );

  var boat_mast_geometry = new THREE.BoxGeometry(0.1, 2, 0.1);
  var boat_mast = new THREE.Mesh(boat_mast_geometry, boat_material);
  boat_mast.position.y = 1;
  boat.add( boat_mast );



} //</init>
