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
