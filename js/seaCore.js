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
  function WorldGenerator( leworld, maxIsland, worldSize, threeScene, complex ) {

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
        }

          leworld.push(tmp);
        }
      }
    }


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



    ///////////////////////////////////////////////////////////////
    //                        UTILS
    ///////////////////////////////////////////////////////////////

    // Generate a random integer from min to max
    function getRandom(min, max) {
      return THREE.Math.randInt(min, max) ;
    }

    // Island Geometry builder
    // Build a Box with random x y z size
    function IslandGeometryBuilder( maxX, maxY, maxZ ) {
      return new THREE.BoxGeometry(
        getRandom(1, maxX),
        getRandom(1, maxY),
        getRandom(1, maxY)
        );
    };
