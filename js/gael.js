function cool() {

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
  ///////////////////////////////////////////////////////////////
  function WorldGenerator( leworld, maxIsland, worldSize, threeScene ) {

    this.maxIsland = maxIsland;

    var mat = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa
    });

    this.generate = function () {
      for(var i = 0 ; i < maxIsland ; i++) {

        // Create an Island and push it to the World
        var tmp =  new Island(
          getRandom(-worldSize/2, worldSize/2),
          seaLevel,
          getRandom(-worldSize/2, worldSize/2),
          new IslandGeometryBuilder( 10, 10, 10),
          mat).getMesh();

          // Adding MESH to the World
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
    //                        UTILS
    ///////////////////////////////////////////////////////////////

    // Generate a random integer from min to max
    function getRandom(min, max) {
      return Math.floor(Math.random()*((max+1)-min)) + min ;
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


    ///////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////

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
