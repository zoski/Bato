///////////////////////////////////////////////////////////////
//				Calcule de la position du Bateau
//	Utilise le temps et la postion x et z du bateau
///////////////////////////////////////////////////////////////
function boatPosition(now, posX, posZ) {
    var speed	= 0.1 ;
    var angle	= speed*now*Math.PI*2 + oriY*10 + oriX*5 ;

    if(posX%1.25==0 && posZ%1.25==0) {
        boat.position.y = Math.cos( angle  - oriX*5 - oriY*10 + posX*5 - posZ*10 )*2;
    } else {
        // pas multiple de 1.25 -> on récupère 3 points puis moyenne
        // Not yet implemented
        var somme ;
        var px = posX, pz = posZ ;

        if(posX%1.25!=0) {
            // Calcule pour x
            px = Math.round(posX/1.25)*1.25;
        }
        if(posZ%1.25!=0) {
            // calcule pour z
            pz = Math.round(posZ/1.25)*1.25;
        }
        boat.position.y =  Math.cos( angle  - oriX*5 - oriY*10 + px*5 - pz*10 )*2;
    }
}
