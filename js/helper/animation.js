//      animation

animation = new THREEx.VertexAnimation(
    sea_geometry, function( origin, position, delta, now ) {
        oriX = origin.x ; oriY = origin.y;
        var speed	= 0.1 ;
        var angle	= speed*now*Math.PI*2 + origin.y*10 + origin.x*5 ;
        position.z	= origin.z + Math.cos(angle)*2 ;
    }
);

onRenderFcts.push( function( delta, now ) {
    animation.update( delta, now );
    }
);
