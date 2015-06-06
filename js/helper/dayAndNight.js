var sunSphere, sunLight, starField, sunAngle, skydom, dayDuration, delta;

function daynight() { //    DayNight via THREEX.daynight
        sunAngle = -3 / 6 * Math.PI * 2;
        onRenderFcts.push(function(delta, now) {
            dayDuration = 60 // nb seconds for a full day cycle
            sunAngle += delta / dayDuration * Math.PI * 2
        })

        starField = new THREEx.DayNight.StarField()
        scene.add(starField.object3d)
        onRenderFcts.push(function(delta, now) {
            starField.update(sunAngle)
        })

        sunSphere = new THREEx.DayNight.SunSphere()
        scene.add(sunSphere.object3d)
        onRenderFcts.push(function(delta, now) {
            sunSphere.update(sunAngle)
        })

        sunLight = new THREEx.DayNight.SunLight()
        scene.add(sunLight.object3d)
        onRenderFcts.push(function(delta, now) {
            sunLight.update(sunAngle)
        })

        skydom = new THREEx.DayNight.Skydom()
        scene.add(skydom.object3d)
        onRenderFcts.push(function(delta, now) {
            skydom.update(sunAngle)
        })
    } //</daynight>