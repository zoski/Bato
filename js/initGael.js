///////////////////////////////////////////////////////////////
//      Initializer
///////////////////////////////////////////////////////////////

var scene, camera, renderer, controls;

var worldSize = 10000;
var minView = 0.1;
var maxView = 500;

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

  //      Sea
  var sea_material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
  });

  var sea_geometry = new THREE.PlaneBufferGeometry(worldSize, worldSize);

  var sea = new THREE.Mesh(sea_geometry, sea_material);
  sea.rotateX(Math.PI / 2);

  scene.add(sea);

  //       Boat
  var boat = new THREE.Group();
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


  // Box to test island
  // var island_geo = new THREE.BoxGeometry(5, 1, 5);
  // var island_mat = new THREE.MeshBasicMaterial({
  //   color: 0xaaaaaa
  // });
  // var island = new THREE.Mesh(island_geo, island_mat);
  // island.position.z = -200;
  //
  // scene.add(island);

} //</init>
