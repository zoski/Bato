///////////////////////////////////////////////////////////////
//				Calcule de la position du Bateau
//	Utilise le temps et la postion x et z du bateau
///////////////////////////////////////////////////////////////
function boatPosition(now, posX, posZ) {
    var speed	= 0.1 ;
    var angle	= speed*now*Math.PI*2 + oriY*10 + oriX*5 ;

    if(posX%1.25==0 && posZ%1.25==0) {
        // position multiple de 1.25 on calcule directe l'altitude
        boat.position.y = Math.cos( angle  - oriX*5 - oriY*10 + posX*5 - posZ*10 )*2;
    } else {
        // pas multiple de 1.25 -> on récupère 3 points proche puis moyenne

        // Boat position (x, z)
        var px = posX, pz = posZ ;
        // Coordonée dans le plan de la mer
        var x1, x2, x3;
        var y1, y2, y3;
        var z1, z2, z3;

        x1 = Math.round(posX/1.25)*1.25;
        x2 = x1 + 1.25;
        x3 = x1;

        z1 = Math.round(posZ/1.25)*1.25;
        z2 = z1;
        z3 = z1 + 1.25;

        y1 = Math.cos( angle  - oriX*5 - oriY*10 + x1*5 - z1*10 )*2
        y2 = Math.cos( angle  - oriX*5 - oriY*10 + x2*5 - z2*10 )*2
        y3 = Math.cos( angle  - oriX*5 - oriY*10 + x3*5 - z3*10 )*2
        boat.position.y = ( y1 + y2 + y3 )/3;



        // if(posX%1.25!=0) {
        //     // Calcule pour x
        //     px = Math.round(posX/1.25)*1.25;
        // }
        // if(posZ%1.25!=0) {
        //     // calcule pour z
        //     pz = Math.round(posZ/1.25)*1.25;
        // }

        // boat.position.y =  Math.cos( angle  - oriX*5 - oriY*10 + px*5 - pz*10 )*2;
    }
}
