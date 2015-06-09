///////////////////////////////////////////////////////////////
//                  Boat Controls
///////////////////////////////////////////////////////////////
/*
var mobileBoat = new THREE.DeviceOrientationControls( boat ); //
mobileBoat.update();*/

//variables for the moves of the boat
var velocity = new THREE.Vector3(1,1,1);  //useless?
var boatSpeed = 0;
var turning = new THREE.Vector2(1,1); //will be changing with the speed

//Variable projection Helper:
var turnCos = Math.cos(THREE.Math.degToRad(turning.x*THREE.Math.radToDeg(boat.rotation.y)));
var turnSin = Math.sin(THREE.Math.degToRad(turning.y*THREE.Math.radToDeg(boat.rotation.y)));

//update the direction in which the boat will move forward
function updateTurn(){
  turnCos = Math.cos(THREE.Math.degToRad(turning.x*THREE.Math.radToDeg(boat.rotation.y)));
  turnSin = Math.sin(THREE.Math.degToRad(turning.y*THREE.Math.radToDeg(boat.rotation.y)));
}

//library for Keyboard event listener
var keyboard	= new THREEx.KeyboardState(renderer.domElement);
renderer.domElement.setAttribute("tabIndex", "0");
renderer.domElement.focus();

//first rotation is update then position
onRenderFcts.push(function(delta, now){
  var keyIsPressed = false;
  if( keyboard.pressed('left') || keyboard.pressed('q')){
    keyIsPressed = true;
    boat.rotation.y += 1 * delta;
    updateTurn();
  }else if( keyboard.pressed('right') || keyboard.pressed('d')){
    keyIsPressed = true;
    boat.rotation.y -= 1 * delta;
    updateTurn();
  }
  if( keyboard.pressed('down') || keyboard.pressed('s')){
    //you just can't with a boat, fool!
    keyIsPressed = true;

  }else if( keyboard.pressed('up') || keyboard.pressed('z')){
    keyIsPressed = true;
    if(boatSpeed <= 0.4){
      boatSpeed += 0.02;
    }

    //keeping the position as a vector
    //var previousBoatPosition = boat.position;
    //update where the boat goes
    boat.position.z -= turnCos*boatSpeed;
    boat.position.x -= turnSin*boatSpeed;

    //if(boat.position.y > previousBoatPosition.y)

	}else if (!keyIsPressed && boatSpeed != 0) {
    //the boat doesn't stop because it has speed
    //so we slow it when you don't press up
    if(boatSpeed > 0){
      boatSpeed -= 0.02;
      if(boatSpeed < 0){
        boatSpeed = 0;
      }
    }
    //keeping the position as a vector
    var previousBoatPosition = boat.position;
    boat.position.z -= turnCos*boatSpeed;
    boat.position.x -= turnSin*boatSpeed;
	}
})
