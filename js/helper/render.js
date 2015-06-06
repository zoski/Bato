function render() {

    //////////////////////////////////////////////
    //      Temps
    var lastTimeMsec = null;
    var i = 0;
    onRenderFcts.push(function() {
        renderer.render( scene, camera );
    })

    requestAnimationFrame(function render(nowMsec) {
        stats.begin();
        // keep looping
        requestAnimationFrame( render );
        // measure time
        lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
        var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec = nowMsec
        // call each update function
        onRenderFcts.forEach(function(onRenderFct) {
            onRenderFct(deltaMsec / 1000, nowMsec / 1000)
        })
        boatPosition( nowMsec / 1000, boat.position.x, boat.position.z );
        controls.update();
        stats.end();
    })

}
