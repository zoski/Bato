 function devLight() {
        // var light = new THREE.AmbientLight(0x444444);
        var light = new THREE.PointLight( 0xdddddd, 0.2 );
        light.position.set(250, 250, -250);

        scene.add(light);
    }