///////////////////////////////////////////////////////////////
//      Initializer
///////////////////////////////////////////////////////////////

var scene, camera, renderer, controls;

var boat ;
var boat_position = new THREE.Vector3();
var bbox;
var sea, small_sea_geometry ;

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

  renderer = new THREE.WebGLRenderer(  {antialias: true} );
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

  sea_geometry = new THREE.PlaneGeometry(worldSize, worldSize, 4, 4);

  sea = new THREE.Mesh(sea_geometry, sea_material);
  sea.rotateX(Math.PI / 2);

  // scene.add(sea);

  ////////////////////////      Smaller sea
  small_sea_geometry = new THREE.PlaneGeometry( 100, 100, 10, 10);
  var small_sea_material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
    wireframe: true
  });
  var small_sea = new THREE.Mesh( small_sea_geometry, small_sea_material );
  small_sea.rotateX(-Math.PI / 2);

  scene.add( small_sea );

  // var edges = new THREE.FaceNormalsHelper( small_sea, 0x00ff00 );
  // scene.add( edges );

  bbox = new THREE.BoundingBoxHelper( small_sea, 0x888888 );
  bbox.update();
  scene.add( bbox );

  console.log("small_sea_geo vertices length " + small_sea_geometry.vertices.length);

  ///////////////////////////////////////////////////////////////
  //      animation
  var animation	= new THREEx.VertexAnimation(
    small_sea_geometry, function(origin, position, delta, now ){
    var speed	= 0.1 ;
    var angle	= speed*now*Math.PI*2 + origin.y*10 + origin.x*5 ; // ; // ;

    position.z	= origin.z + Math.cos(angle)*2 ;

    boat.position.y = Math.cos( angle  - origin.x*5 - origin.y*10 + boat.position.x*now*Math.PI*2 - boat.position.z*now*Math.PI*2 )*2 ;
	})
    
  onRenderFcts.push(function(delta, now){
		animation.update(delta, now)
	})


  //       Boat
  boat = new THREE.Group();
  scene.add(boat);


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

  boat.translateZ( 10 );
  boat.translateX( 10 );
  console.log("boat position");
  console.log( boat.position );

} //</init>
