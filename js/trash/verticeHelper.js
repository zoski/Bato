/*
  Some search about the making the boat waving

  Perf was bad and result was not the one expeted

*/

///////////////////////////////////////////////////////////////
//  Return the information about the closest vertices from
//  the object.
//
//  Return a THREE.Vector3();
///////////////////////////////////////////////////////////////
function getClosestVertice( plan_geo, object) {
  var vectObject = object.position;//new THREE.Vector3(object.position.x, object.position.y, object.position.z );
  var planVertices = plan_geo.vertices ;
  var lastIndex = 0, lastDistance = Infinity;

  // Looking fo the index of the closest Vertice
  for(var i=0 ; i < planVertices.length ; i++) {
    // console.log( "computing - lastDistance = " + planVertices[ i ].distanceTo( vectObject ) );

    if( planVertices[ i ].distanceTo( vectObject ) <= lastDistance ) {
      lastIndex = i;
      lastDistance = planVertices[ lastIndex ].distanceTo( vectObject ) ;
      // console.log( "Distance : " + lastDistance + " index : " + lastIndex );
    }
    // console.log( i + "\t ( " + v.x + ", " + v.y + ", " + v.z +" )" );
  }
  console.log( /*"Le closest vertice : " +*/ planVertices[lastIndex] );
  return planVertices[lastIndex].y;

}


///////////////////////////////////////////////////////////////
//  Do the math and return the true altitude of the boat
///////////////////////////////////////////////////////////////
// function yAltitude(x, z, ) {
//
//   var speed	= 0.4 ;
//   var angle	= speed*now*Math.PI*2 ;//+ origin.y*10;
//   position.x	= origin.x + Math.cos(angle)*0.1;
//   position.y	= origin.y + Math.sin(angle*0.1);
//   position.z	= origin.z + Math.cos(angle)*0.4;
//   leY =
//
//   return leY ;
// }
