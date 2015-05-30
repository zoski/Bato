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
  console.log( "World : " + leWorld );
  console.log( all );
  console.log( "Get random " + getRandom(1, 10) );

  for (var i = 0; i < all.length; i++) {
    scene.add(all[i]);
  }

  console.log( all.length );
  console.log( islandGroup );
}
