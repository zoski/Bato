///////////////////////////////////////////////////////////////
//               Island builder
//
//  Create an island at the specified position
//  x, y, z  : position
//  geometry : geometry of the Island
//  material : material of the Island
///////////////////////////////////////////////////////////////
function Island( x, y, z, geometry, material ) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.type = "Island";

  this.geometry = geometry;
  this.material = material;

  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.position.x = x;
  this.mesh.position.y = y;
  this.mesh.position.z = z;

  // Return the current Mesh
  // Used to add the object to the scene
  this.getMesh = function() {
    return this.mesh;
  };
}

///////////////////////////////////////////////////////////////
//               Islands builder
//
//  Create an Island made of many cubes
//  x, y, z  : position
//  radius   : max radius of the Island
//  material : material of the Island
//  maxX, maxY, maxZ : maximum size of one cube.
///////////////////////////////////////////////////////////////
function Islands( x, y, z, maxX, maxY, maxZ, radius, material ) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.maxX = maxX;
  this.maxY = maxY;
  this.maxZ = maxZ;

  this.radius = radius;

  this.type = "Island Cooler";

  this.material = material;

  this.islands = new THREE.Group();
  this.islands.position.x = x;
  this.islands.position.y = y;
  this.islands.position.z = z;

  for ( var i = 0 ; i < 10 ; i++ ) {
    var geo = new IslandGeometryBuilder( maxX, maxY*2, maxZ );
    var cube = new THREE.Mesh( geo, material );

    // Adding the cube to the Group
    cube.position.x = getRandom( -radius/2, radius/2 );
    cube.position.z = getRandom( -radius/2, radius/2 );
    this.islands.add( cube );
  }

  // var children = this.islands.children
  // for( var i = 0 ; i< children.length ; i++ ) {
  //   // Moving the cube
  //   children[i].position = new THREE.Vector3( getRandom( -radius/2, radius/2 ), 0, getRandom( -radius/2, radius/2 ) );
  //
  // }



  // Return the current Mesh
  // Used to add the object to the scene
  this.getMesh = function() {
    return this.islands;
  };
}
