///////////////////////////////////////////////////////////////
//        Constructeur du monde
///////////////////////////////////////////////////////////////
function World() {
  this.env = [];

  // push an object in the list
  this.push = function (obj) {
    this.env.push(obj);
  }

  // return the env list
  this.get = function() {
    return this.env;
  }
}


///////////////////////////////////////////////////////////////
//                  World Generator
//
//    Help to buil the worl. Generate island and add its to
//    the scene.
//
//  leworld     : World where to save the env.
//  maxIsland   : Maximum number of Island to be generate
//  worldSize   : World size - Sea size
//  threeScene  : The scene where objects will be added
//  complex     : Use the simple island builder (false) or
//                the complex one.
///////////////////////////////////////////////////////////////
function WorldGenerator( leworld, maxIsland, worldSize, threeScene, complex, flying ) {

  this.maxIsland = maxIsland;

  var mat = new THREE.MeshNormalMaterial();

  this.generate = function () {
    for(var i = 0 ; i < maxIsland ; i++) {

      if(!complex) {
        // Island is a simple cube
        var tmp =  new Island(
          getRandom(-worldSize/2, worldSize/2),
          0,
          getRandom(-worldSize/2, worldSize/2),
          new IslandGeometryBuilder( 10, 10, 10),
          mat).getMesh();

      } else {
      //x, y, z, maxX, maxY, maxZ, radius, material
      var tmp = new Islands(
        getRandom(-worldSize/2, worldSize/2),
        0,
        getRandom(-worldSize/2, worldSize/2),
        5,
        5,
        5,
        10,
        mat).getMesh();

        leworld.push(tmp);
        /////////////////////
        //      Collision
        /////////////////////
        var collider = THREEx.Collider.createFromObject3d( tmp );
        colliders.push( collider );
        // colliderSystem.add(collider)
        // onRenderFcts.push(function(delta) {
        //     collider.update()
        // });

        collider.addEventListener('contactEnter',function(otherCollider){
        		console.log('contactEnter' )
                });
        collider.addEventListener('contactExit',function(otherCollider){
        		console.log('contactExit' )
                });


        if(flying) {
            //x, y, z, maxX, maxY, maxZ, radius, material
            var tmpf = new Islands(
              getRandom(-worldSize/2, worldSize/2),
              getRandom(15, 250),
              getRandom(-worldSize/2, worldSize/2),
              5,
              5,
              5,
              10,
              mat).getMesh();
            }
              leworld.push(tmpf);
        }
      }
    }
  }
