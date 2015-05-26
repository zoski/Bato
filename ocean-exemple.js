

if ( ! Detector.webgl ) {

	Detector.addGetWebGLMessage();
	document.getElementById( 'container' ).innerHTML = "";

}

var container, stats;

var clock = new THREE.Clock();
var start = Date.now();
var camera, scene, renderer,skyBox,group,material,material1;
var worldCoordinates = new THREE.Vector3();

// paramétres du bruit
var parameters = {
	width: 2000,
	height: 2000,
	widthSegments: 250,
	heightSegments: 250,
	depth: 1500,
	param: 4,
	filterparam: 1
}

var waterNormals;
var helper,newMesh;



init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	//

	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFShadowMap;


	group = new THREE.Object3D();

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.5, 3000000 );

	camera.position.set( 0, Math.max( parameters.width * 1.5, parameters.height ) / 8, parameters.height );
	//lyd
	/*	sound1 = new Sound( [ 'sounds/_aftermath.mp3'], 205, 0.1 );
	sound1.position.copy( camera.position );
	sound1.play();*/

	// controls = new THREE.OrbitControls( camera, renderer.domElement );
	// controls.userPan = false;
	// controls.userPanSpeed = 0.0;
	// controls.maxDistance = 6000.0;
	// controls.maxPolarAngle = Math.PI * 0.495;

	/////////////////// LUMIERES
	directionalLight = new THREE.DirectionalLight( 0xffff55, 1 );
	directionalLight.position.set( - 10000, 4000, - 10000 );
	//	scene.add( directionalLight );

	directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight2.position.set( -1, 0.6, -1 ).normalize();
	scene.add( directionalLight2 );

	/////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////
	//helper
	var geometry = new THREE.CylinderGeometry( 0, 20, 100, 3 );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 50, 0 ) );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );

	helper = new THREE.Mesh( geometry, material);
	helper.position.set(0,4,0);
	helper.scale.set(1,3,1);
	//	scene.add( helper );




	// // load skybox
	// var cubeMap = new THREE.Texture( [] );
	// cubeMap.format = THREE.RGBFormat;
	// cubeMap.flipY = false;
	//
	// var loader = new THREE.ImageLoader();
	// loader.load( 'textures/sunset.png', function ( image ) {
	//
	// 	var getSide = function ( x, y ) {
	// 		var size = 1024;
	// 		var canvas = document.createElement( 'canvas' );
	// 		canvas.width = size;
	// 		canvas.height = size;
	// 		var context = canvas.getContext( '2d' );
	// 		context.drawImage( image, - x * size, - y * size );
	// 		return canvas;
	//
	// 	};
	//
	// 	cubeMap.image[ 0 ] = getSide( 2, 1 ); // px
	// 	cubeMap.image[ 1 ] = getSide( 0, 1 ); // nx
	// 	cubeMap.image[ 2 ] = getSide( 1, 0 ); // py
	// 	cubeMap.image[ 3 ] = getSide( 1, 2 ); // ny
	// 	cubeMap.image[ 4 ] = getSide( 1, 1 ); // pz
	// 	cubeMap.image[ 5 ] = getSide( 3, 1 ); // nz
	// 	cubeMap.needsUpdate = true;
	//
	// } );
	//
	// var cubeShader = THREE.ShaderLib['cube'];
	// cubeShader.uniforms['tCube'].value = cubeMap;
	//
	// var skyBoxMaterial = new THREE.ShaderMaterial( {
	// 	fragmentShader: cubeShader.fragmentShader,
	// 	vertexShader: cubeShader.vertexShader,
	// 	uniforms: cubeShader.uniforms,
	// 	depthWrite: false,
	// 	side: THREE.BackSide
	// });
	//
	//  skyBox = new THREE.Mesh(
	// 	new THREE.BoxGeometry( 1500000, 1500000, 1500000 ),
	// 	skyBoxMaterial
	// );
	//
	// scene.add( skyBox );

	////////////////////////////////////////////////////////////////
	// 							CAISSE
	////////////////////////////////////////////////

	//
	// 				var texture = THREE.ImageUtils.loadTexture( "textures/crate/diffuse.jpg" );
	//
	// // material parameters
	// 				var ambient = 0xffffff, diffuse = 0xffffff, specular = 0xffffff, shininess = 2, scale = 23;
	// 				var shader = THREE.ShaderLib[ "normalmap" ];
	// 				var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
	//
	// 				uniforms[ "enableAO" ].value = true;
	// 				uniforms[ "enableDiffuse" ].value = true;
	// 				uniforms[ "enableSpecular" ].value = true;
	// 				uniforms[ "enableReflection" ].value = true;
	// 				uniforms[ "enableDisplacement" ].value = true;
	//
	// 				uniforms[ "tDiffuse" ].value = texture;
	// 				uniforms[ "tSpecular" ].value = THREE.ImageUtils.loadTexture( "textures/crate/specular.jpg" );
	// 				uniforms[ "tNormal" ].value = THREE.ImageUtils.loadTexture( "textures/crate/normal.jpg" );
	// 				uniforms[ "tAO" ].value = THREE.ImageUtils.loadTexture( "textures/crate/ao.jpg" );
	// 				uniforms[ "tDisplacement" ].value = THREE.ImageUtils.loadTexture( "textures/crate/displacement.jpg" );
	//
	// 				var dscale = 1.2;
	// 				uniforms[ "uDisplacementBias" ].value =  -0.26*dscale;
	// 				uniforms[ "uDisplacementScale" ].value = 0.36*dscale;
	// 				uniforms[ "uNormalScale" ].value.y = -2;
	//
	// 				uniforms[ "diffuse" ].value.setHex( diffuse);
	// 				uniforms[ "specular" ].value.setHex( specular );
	// 				uniforms[ "ambient" ].value.setHex( ambient );
	//
	// 				uniforms[ "shininess" ].value = shininess;
	//
	// 				uniforms[ "tCube" ].value = cubeMap ;
	// 				uniforms[ "reflectivity" ].value = 0.02;
	//
	// 				uniforms[ "diffuse" ].value.convertGammaToLinear();
	// 				uniforms[ "specular" ].value.convertGammaToLinear();
	// 				uniforms[ "ambient" ].value.convertGammaToLinear();

	//
	// var parameters2 = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, fog: false  };
	// geometry2 = new THREE.BoxGeometry(20,20,20,50,50,50);
	// geometry2.computeTangents();
	// material1 = new THREE.ShaderMaterial( parameters2 );
	// var k;
	// for(k=1;k< 5;k++){
	//
	//
	// 	mesh1 = new THREE.Mesh( geometry2, material1 );
	// 	mesh1.scale.set( 6, 6,6);
	// 	mesh1.position.set(200*k+100*k,0,40*k+100*Math.sin(k));
	// 	//	mesh1.castShadow = true;
	// 	//mesh1.receiveShadow = true;
	// 	scene.add( mesh1 );
	// }



	waterNormals = new THREE.ImageUtils.loadTexture( 'textures/waternormals.jpg' );
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

	water = new THREE.Water( renderer, camera, scene, {
		textureWidth: 512,
		textureHeight: 512,
		waterNormals: waterNormals,
		alpha: 	1.0,
		sunDirection: directionalLight.position.normalize(),
		sunColor: 0xffffff,
		waterColor: 0x33332C,
		distortionScale: 50.0,
		depthWrite: false

	} );

	//LOD scales
	var segmentsX = 1;
	var segmentsY = 1;
	var mapscale = 20;

	var geometry2 = [

		[ new THREE.PlaneBufferGeometry(
					 	parameters.width * mapscale,
					 	parameters.height *mapscale,
					 	segmentsX*300,
						segmentsY*320),
			100*mapscale
		],
		[ new THREE.PlaneBufferGeometry(
						parameters.width * mapscale,
						parameters.height * mapscale,
						segmentsX,
						segmentsY),
			1500*mapscale
		]

	];

	var i;
	// Level Of Detail
	// Permet de choisir le niveau de détail en fonction de la distance
	lod = new THREE.LOD();
	lod2 = new THREE.LOD();
	lod3 = new THREE.LOD();
	lod4 = new THREE.LOD();
	lod5 = new THREE.LOD();
	lod6 = new THREE.LOD();
	lod7 = new THREE.LOD();
	lod8 = new THREE.LOD();
	lod9 = new THREE.LOD();

	lod10 = new THREE.LOD();
	lod11 = new THREE.LOD();
	lod12 = new THREE.LOD();
	lod13 = new THREE.LOD();
	lod14 = new THREE.LOD();
	lod15 = new THREE.LOD();
	lod16 = new THREE.LOD();
	lod17 = new THREE.LOD();
	lod18 = new THREE.LOD();

	lod19 = new THREE.LOD();
	lod20 = new THREE.LOD();
	lod21 = new THREE.LOD();
	lod22 = new THREE.LOD();
	lod23 = new THREE.LOD();
	lod24 = new THREE.LOD();
	lod25 = new THREE.LOD();
	lod26 = new THREE.LOD();
	lod27 = new THREE.LOD();

	lod28 = new THREE.LOD();
	lod29 = new THREE.LOD();
	lod30 = new THREE.LOD();
	lod31 = new THREE.LOD();
	lod32 = new THREE.LOD();
	lod33 = new THREE.LOD();
	lod34 = new THREE.LOD();
	lod35 = new THREE.LOD();
	lod36 = new THREE.LOD();


	lod37 = new THREE.LOD();
	lod38 = new THREE.LOD();
	lod39 = new THREE.LOD();
	lod40 = new THREE.LOD();
	lod41 = new THREE.LOD();
	lod42 = new THREE.LOD();
	lod43 = new THREE.LOD();
	lod44 = new THREE.LOD();
	lod45 = new THREE.LOD();


	lod46 = new THREE.LOD();
	lod47 = new THREE.LOD();
	lod48 = new THREE.LOD();
	lod49 = new THREE.LOD();
	lod50 = new THREE.LOD();
	lod51 = new THREE.LOD();
	lod52 = new THREE.LOD();
	lod53 = new THREE.LOD();
	lod54 = new THREE.LOD();


	lod55 = new THREE.LOD();
	lod56 = new THREE.LOD();
	lod57 = new THREE.LOD();
	lod58 = new THREE.LOD();
	lod59 = new THREE.LOD();
	lod60 = new THREE.LOD();
	lod61 = new THREE.LOD();
	lod62 = new THREE.LOD();
	lod63 = new THREE.LOD();


	for ( i = 0; i < geometry2.length; i ++ ) {
		mirrorMesh = new THREE.Mesh( geometry2[ i ][ 0 ], water.material);
		mirrorMesh.add( water );
		mirrorMesh.rotation.x = - Math.PI * 0.5;
		mirrorMesh.updateMatrix();
		mirrorMesh.matrixAutoUpdate = false;

		lod.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod2.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod3.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod4.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod5.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod6.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod7.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod8.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod9.addLevel( mirrorMesh, geometry2[ i ][ 1 ] );

		lod10.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod11.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod12.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod13.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod14.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod15.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod16.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod17.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod18.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );

		lod19.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod20.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod21.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod22.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod23.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod24.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod25.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod26.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod27.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );

		lod28.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod29.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod30.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod31.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod32.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod33.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod34.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod35.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod36.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );

		lod37.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod38.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod39.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod40.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod41.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod42.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod43.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod44.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod45.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );

		lod46.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod47.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod48.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod49.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod50.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod51.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod52.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod53.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod54.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );

		lod55.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod56.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod57.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod58.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod59.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod60.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod61.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod62.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );
		lod63.addLevel( mirrorMesh.clone(), geometry2[ i ][ 1 ] );

	}

	lod.position.set(0,0, 0);
	lod2.position.set( parameters.width * mapscale,0, 0);
	lod3.position.set( -parameters.width * mapscale,0, 0);
	lod4.position.set( 0,0, -parameters.width * mapscale);
	lod5.position.set( 0,0, parameters.width * mapscale);
	lod6.position.set( parameters.width * mapscale,0, parameters.width * mapscale);
	lod7.position.set( -parameters.width * mapscale,0, parameters.width * mapscale);
	lod8.position.set( -parameters.width * mapscale,0, -parameters.width * mapscale);
	lod9.position.set( parameters.width * mapscale,0, -parameters.width * mapscale);
	////

	lod10.position.set( -parameters.width * mapscale*3,0, 0);
	lod11.position.set( -parameters.width * mapscale*3-parameters.width * mapscale,0, 0);
	lod12.position.set( -parameters.width * mapscale*3+parameters.width  * mapscale,0, 0);
	lod13.position.set( -parameters.width * mapscale*3,0,  parameters.width * mapscale*2-parameters.width * mapscale);
	lod14.position.set( -parameters.width * mapscale*3,0, -parameters.width * mapscale);
	lod15.position.set( -parameters.width * mapscale*2,0, parameters.width * mapscale);
	lod16.position.set( -parameters.width * mapscale*2,0, -parameters.width * mapscale);
	lod17.position.set( -parameters.width * mapscale*4,0, parameters.width * mapscale);
	lod18.position.set( -parameters.width * mapscale*4,0, -parameters.width * mapscale);

	lod19.position.set( parameters.width * mapscale*3,0, 0);
	lod20.position.set( parameters.width * mapscale*3-parameters.width * mapscale,0, 0);
	lod21.position.set( parameters.width * mapscale*3+parameters.width  * mapscale,0, 0);
	lod22.position.set( parameters.width * mapscale*3,0,  parameters.width * mapscale*2-parameters.width * mapscale);
	lod23.position.set( parameters.width * mapscale*3,0, -parameters.width * mapscale);
	lod24.position.set( parameters.width * mapscale*2,0, parameters.width * mapscale);
	lod25.position.set( parameters.width * mapscale*2,0, -parameters.width * mapscale);
	lod26.position.set( parameters.width * mapscale*4,0, parameters.width * mapscale);
	lod27.position.set( parameters.width * mapscale*4,0, -parameters.width * mapscale);

	lod28.position.set( parameters.width * mapscale*3                                ,0, parameters.width * mapscale*2);
	lod29.position.set( parameters.width * mapscale*3-parameters.width * mapscale    ,0, parameters.width * mapscale*2);
	lod30.position.set( parameters.width * mapscale*3+parameters.width  * mapscale   ,0, parameters.width * mapscale*2);

	lod31.position.set( parameters.width * mapscale*3                                ,0, -parameters.width * mapscale*2);
	lod32.position.set( parameters.width * mapscale*3-parameters.width * mapscale    ,0, -parameters.width * mapscale*2);
	lod33.position.set( parameters.width * mapscale*3+parameters.width  * mapscale   ,0, -parameters.width * mapscale*2);


	lod34.position.set( -parameters.width * mapscale*3                                ,0, -parameters.width * mapscale*2);
	lod35.position.set( -parameters.width * mapscale*3-parameters.width * mapscale    ,0, -parameters.width * mapscale*2);
	lod36.position.set( -parameters.width * mapscale*3+parameters.width  * mapscale   ,0, -parameters.width * mapscale*2);

	lod37.position.set( -parameters.width * mapscale*3                                ,0, parameters.width * mapscale*2);
	lod38.position.set( -parameters.width * mapscale*3-parameters.width * mapscale    ,0, parameters.width * mapscale*2);
	lod39.position.set( -parameters.width * mapscale*3+parameters.width  * mapscale   ,0, parameters.width * mapscale*2);

	lod40.position.set( 0     ,0, parameters.width * mapscale*2);
	lod41.position.set(parameters.width * mapscale  ,0, parameters.width * mapscale*2);
	lod42.position.set( -parameters.width * mapscale  ,0, parameters.width * mapscale*2);

	lod43.position.set( 0     ,0, -parameters.width * mapscale*2);
	lod44.position.set(parameters.width * mapscale  ,0, -parameters.width * mapscale*2);
	lod45.position.set( -parameters.width * mapscale  ,0, -parameters.width * mapscale*2);

	lod46.position.set( 0     ,0, -parameters.width * mapscale*3);
	lod47.position.set(parameters.width * mapscale  ,0, -parameters.width * mapscale*3);
	lod48.position.set( -parameters.width * mapscale  ,0, -parameters.width * mapscale*3);

	lod49.position.set( 0     ,0, parameters.width * mapscale*3);
	lod50.position.set(parameters.width * mapscale  ,0, parameters.width * mapscale*3);
	lod51.position.set( -parameters.width * mapscale  ,0, parameters.width * mapscale*3);

	lod52.position.set( -parameters.width * mapscale*3                                ,0, parameters.width * mapscale*3);
	lod53.position.set( -parameters.width * mapscale*3-parameters.width * mapscale    ,0, parameters.width * mapscale*3);
	lod54.position.set( -parameters.width * mapscale*3+parameters.width  * mapscale   ,0, parameters.width * mapscale*3);

	lod55.position.set( -parameters.width * mapscale*3                                ,0, -parameters.width * mapscale*3);
	lod56.position.set( -parameters.width * mapscale*3-parameters.width * mapscale    ,0, -parameters.width * mapscale*3);
	lod57.position.set( -parameters.width * mapscale*3+parameters.width  * mapscale   ,0, -parameters.width * mapscale*3);

	lod58.position.set( parameters.width * mapscale*3                                ,0, -parameters.width * mapscale*3);
	lod59.position.set( parameters.width * mapscale*3-parameters.width * mapscale    ,0, -parameters.width * mapscale*3);
	lod60.position.set( parameters.width * mapscale*3+parameters.width  * mapscale   ,0, -parameters.width * mapscale*3);

	lod61.position.set( parameters.width * mapscale*3                                ,0, parameters.width * mapscale*3);
	lod62.position.set( parameters.width * mapscale*3-parameters.width * mapscale    ,0, parameters.width * mapscale*3);
	lod63.position.set( parameters.width * mapscale*3+parameters.width  * mapscale   ,0, parameters.width * mapscale*3);


	group.add(lod);
	group.add(lod2);
	group.add(lod3);
	group.add(lod4);
	group.add(lod5);
	group.add(lod6);
	group.add(lod7);
	group.add(lod8);
	group.add(lod9);

	group.add(lod10);
	group.add(lod11);
	group.add(lod12);
	group.add(lod13);
	group.add(lod14);
	group.add(lod15);
	group.add(lod16);
	group.add(lod17);
	group.add(lod18);

	group.add(lod19);
	group.add(lod20);
	group.add(lod21);
	group.add(lod22);
	group.add(lod23);
	group.add(lod24);
	group.add(lod25);
	group.add(lod26);
	group.add(lod27);


	group.add(lod28);
	group.add(lod29);
	group.add(lod30);
	group.add(lod31);
	group.add(lod32);
	group.add(lod33);
	group.add(lod34);
	group.add(lod35);
	group.add(lod36);

	group.add(lod37);
	group.add(lod38);
	group.add(lod39);
	group.add(lod40);
	group.add(lod41);
	group.add(lod42);
	group.add(lod43);
	group.add(lod44);
	group.add(lod45);

	group.add(lod46);
	group.add(lod47);
	group.add(lod48);
	group.add(lod49);
	group.add(lod50);
	group.add(lod51);
	group.add(lod52);
	group.add(lod53);
	group.add(lod54);

	group.add(lod55);
	group.add(lod56);
	group.add(lod57);
	group.add(lod58);
	group.add(lod59);
	group.add(lod60);
	group.add(lod61);
	group.add(lod62);
	group.add(lod63);

	scene.add(group);
}

//

function animate() {

	scene.traverse( function ( object ) {
		if ( object instanceof THREE.Mesh ) {
			object.position.z += 0.1;
		}

	} );
	//	newMesh.position.z +=0.1;
	requestAnimationFrame( animate );
	render();

}

function render() {

	//	worldCoordinates.setFromMatrixPosition( camera.matrixWorld );
	//	material.uniforms[ 'cam' ].value = worldCoordinates;


	//update watershader uniforms
	water.material.uniforms.time.value = .001 * ( Date.now() - start );
	//		material1.uniforms[ "time" ].value =  .001 * ( Date.now() - start );
	//update custom shadorx uniformzerx

	//		material.uniforms[ 'time' ].value = .001 * ( Date.now() - start );
	//	material.uniforms[ 'cam' ].value = camera.position;

	//update orbit control
	controls.update();
	//update stats
	stats.update();
	//update water
	water.render();
	//update matrix
	scene.updateMatrixWorld();
	//update LOD
	scene.traverse( function ( object ) {
		if ( object instanceof THREE.LOD ) {
			object.update( camera );
		}

	} );

	//update render
	renderer.render( scene, camera );

}
