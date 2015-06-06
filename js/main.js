leWorld = new World();

var islandGroup = new THREE.Group();
scene.add( islandGroup );

  //                    leworld, maxIsland, worldSize, threeScene, complex, withflying
var gen = new WorldGenerator( leWorld, 25, worldSize, scene, true, true );
// Generating island.
gen.generate();

var all = leWorld.get();

for (var i = 0; i < all.length; i++) {
  scene.add(all[i]);
}
