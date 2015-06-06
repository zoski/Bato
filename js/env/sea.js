///////////////////////////////////////////////////////////////
            Sea
///////////////////////////////////////////////////////////////
function sea( geometry, material ) {
    this.type = "sea";

    this.geometry = geometry;
    this.material = material;

    this.mesh = new THREE.Mesh(geometry, material);

    this.getMesh = function() {
      return this.mesh;
    };
}
