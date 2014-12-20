/*
Emily Wang
CS307 - December 2014

Creates a rock with randomly generated points fed into a convex geometry!
Feel free to adjust the randomX equation lines to tweak dimensions of the rock.

Resulting rock is at the origin in the coordinate system (i.e. the programmer should
conduct additional transformations in order to translate, rotate, or scale the rocks).
*/

function makeRock(rockMaterial) {
    // adapted the generatePoints() function from the convex geometry examples

    // add 20 random spheres
    var points = [];
    for (var i = 0; i < 20; i++) {
        var randomX = -15 + Math.round(Math.random() * 30);
        var randomY = -15 + Math.round(Math.random() * 30);
        var randomZ = -15 + Math.round(Math.random() * 30);

        points.push(new THREE.Vector3(randomX, randomY, randomZ));
    }

    // use the same points to create a convexgeometry
    var rockGeometry = new THREE.ConvexGeometry(points);
    rockMesh = new THREE.Mesh (rockGeometry, rockMaterial);
    return rockMesh;
}
