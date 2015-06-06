///////////////////////////////////////////////////////////////
//                  Sea
///////////////////////////////////////////////////////////////
sea_geometry = new THREE.PlaneGeometry( seaSize, seaSize, seaSegments, seaSegments);
sea_material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
    //color: 0x33FFFF,
    wireframe: true
});
sea = new THREE.Mesh( sea_geometry, sea_material );
sea.rotateX(-Math.PI / 2);

scene.add( sea );

///////////////////////////////////////////////////////////////
//                  Boat
///////////////////////////////////////////////////////////////
boat = new THREE.Group();
scene.add( boat );
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
var boat_mast = new THREE.Mesh( boat_mast_geometry, boat_material );
boat_mast.position.y = 1;
boat.add( boat_mast );

// boat.translateZ( 10 );
// boat.translateX( 10 );
