function cool() {
  var seaLevel = 0 ;
  var leWorld = new World();

  var islandGroup = new THREE.Group();
  scene.add(islandGroup);

  var geometry = new IslandGeometryBuilder( 5, 5, 5) ;
  //                    leworld, maxIsland, worldSize, threeScene
  var gen = new WorldGenerator(leWorld, 1000, worldSize, scene);
  // Generating island.
  gen.generate();

  var all = leWorld.get();
  console.log( "World : " + leWorld );
  console.log( all );
  console.log( "Get random " + getRandom() );

  for (var i = 0; i < all.length; i++) {
    scene.add(all[i]);
  }

  console.log( all.length );
  console.log( islandGroup );
}
