function animate() {

	///////////////////////////////////////////////////////////////
  //      Temps
  var lastTimeMsec = null;
  var i = 0;
  onRenderFcts.push(function() {
      renderer.render(scene, camera);
  })

  requestAnimationFrame(function animate(nowMsec) {
      stats.begin();
      // keep looping
      requestAnimationFrame(animate);
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
      var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec = nowMsec
          // call each update function
      onRenderFcts.forEach(function(onRenderFct) {
          onRenderFct(deltaMsec / 1000, nowMsec / 1000)
      })

      // var delta = getClosestVertice( small_sea_geometry, boat );
      // console.log( "delta = " + delta );

      // boat.position.Y = delta ;
      // console.log("boat position");
      // console.log( boat.position );

      controls.update();
      stats.end();
  })

}


// function animate() {
//   // truc pour bouger
// 	requestAnimationFrame( animate );
//
//
//
// 	render();
// }
//
// function render() {
// 	// stats.begin();
//
// 	controls.update();
//
// 	stats.update();
//
//
//
// 	renderer.render( scene, camera );
//
//
// 	// stats.end();
// }
