function cool() {
  var seaLevel = 0 ;
  var leWorld = new World();

  var islandGroup = new THREE.Group();
  scene.add(islandGroup);

    //                    leworld, maxIsland, worldSize, threeScene
  var gen = new WorldGenerator(leWorld, 25, worldSize, scene, true);
  // Generating island.
  gen.generate();

  var all = leWorld.get();
  // console.log( "World : " + leWorld );
  // console.log( all );

  // for(var i=0 ; i < sea_geometry.vertices.length ; i++) {
  //   var v = sea_geometry.vertices[i]
  //   console.log( i + "\t ( " + v.x + ", " + v.y + ", " + v.z +" )" );
  // }


  for (var i = 0; i < all.length; i++) {
    scene.add(all[i]);
  }

  // console.log( small_sea_geometry );




  // console.log( all.length );
  // console.log( islandGroup );
}
