// init.js
var scene, camera, renderer, control;
var minView = 0.1, maxView = 1000 ;
var onRenderFcts = [];

// createMeshes.js
var seaSize = 1000 ;
var seaSegments = 100 ;
var sea, sea_material, sea_geometry ;

var boat;

//
var worldSize = 1000 ;


// animation.js
var animation ;
var oriX ; var oriY ;	// copie de la position d'origin.

// main.js
var leWorld ;

//collision
// var colliderSystem ;
// var colliders ;
