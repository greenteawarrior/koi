/*
CS307 Project - Koi Pond!
Emily Wang
December 2014

Code for a koi pond (see koiAnimationControls.js for the animation business).

Includes materials, instances of the koi and pond, lights, and the camera 
parameters to make the scene.

Open hwk6-creative-scene.html in the browser to view the scene.
See eqwangKoi.js for details on how the koi was made via THREE.js.

Note! Make sure that eqwangKoi.js is also loaded. It contains eqwangKoi() and 
isPowerOf2() and textureMaterial(), which are all necessary for this code to work. :)
*/

/// Materials! =================================================================
// textureMaterial is a helper function in eqwangKoi.js
// these images should be in the same directory
var bgMaterial = textureMaterial('grass.jpg', 1, 1);
var purpleScaleMaterial = textureMaterial('koiPurpleSeamlessTexture.jpg',3, 4);
var sparkleMaterial = textureMaterial('silverSparkleTexture.jpg',1, 1);
var waterMaterial = textureMaterial('riverBottomTexture.jpg', 1, 1);
var rockMaterial = textureMaterial('rock.jpg', 1, 1);
var skyMaterial = textureMaterial('sky.jpg', 1, 1);

waterMaterial.side = THREE.BackSide;
bgMaterial.side = THREE.BackSide;
skyMaterial.side = THREE.BackSide;

/// Scene! =====================================================================
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
TW.mainInit(renderer,scene);

var koi;
var lilypad1;
var lilypad2;

function makeScene() {
    scene.remove(koi);
    scene.remove(lilypad1);
    scene.remove(lilypad2);

    koi = eqwangKoi(purpleScaleMaterial, sparkleMaterial);
    koi.name = "koi";
    koi.position.set(0, -10, 0);
    koi.scale.set(.5, .5, .5);
    scene.add(koi);

    lilypad1 = makeLilypad([10, -5, 0]);
    lilypad1.name = "lilypad1";
    scene.add(lilypad1);

    lilypad2 = makeLilypad([-25, -5, -5]);
    lilypad2.name = "lilypad2";
    scene.add(lilypad2);

}
makeScene();

/// Pond textures inside of a cube for a scene background ======================
var pondCubeGeom = new THREE.BoxGeometry(100, 100, 100);
var pondCubeMaterial = new THREE.MeshFaceMaterial([ bgMaterial,
                                                    bgMaterial,
                                                    skyMaterial,
                                                    waterMaterial,
                                                    bgMaterial,
                                                    bgMaterial,
                                                    ] );
var pondCubeMesh = new THREE.Mesh (pondCubeGeom, pondCubeMaterial)
pondCubeMesh.name = "pondCube";
scene.add(pondCubeMesh);

// Rocks! ======================================================================

function makeRock() {
    // adapted the generatePoints() function from the convex geometry examples

    // add 10 random spheres
    var points = [];
    for (var i = 0; i < 20; i++) {
        var randomX = -15 + Math.round(Math.random() * 30);
        var randomY = -15 + Math.round(Math.random() * 30);
        var randomZ = -15 + Math.round(Math.random() * 30);

        points.push(new THREE.Vector3(randomX, randomY, randomZ));
    }

    // use the same points to create a convexgeometry
    var hullGeometry = new THREE.ConvexGeometry(points);
    hullMesh = new THREE.Mesh (hullGeometry, rockMaterial);
    return hullMesh;
}

for (var i=-4; i<4; i++){
    rock = makeRock();
    rock.scale.set(.45, .45, .45);
    rock.position.set(i*10, -5, 29);
    scene.add(rock);
}

for (var i=-4; i<4; i++){
    rock = makeRock();
    rock.scale.set(.45, .45, .45);
    rock.position.set(i*10, -5, -29);
    scene.add(rock);
}

for (var i=-4; i<4; i++){
    rock = makeRock();
    rock.scale.set(.45, .45, .45);
    rock.position.set(29, -5, i*10);
    scene.add(rock);
}

for (var i=-4; i<4; i++){
    rock = makeRock();
    rock.scale.set(.45, .45, .45);
    rock.position.set(-29, -5, i*10);
    scene.add(rock);
}

// ambient light, directional light, and camera! ===============================

var ambLight = new THREE.AmbientLight( 0xFFFFFF ); // soft white light 
ambLight.name = "ambient";
scene.add(ambLight);

var directionalLight = new THREE.DirectionalLight( 0xffffff, .1 );
directionalLight.position.set( 0, 1, 0); 
directionalLight.name = "directional";
scene.add(directionalLight);

var state = TW.cameraSetup(renderer,
                           scene,
                           {minx: -3.5, maxx: 3.5,
                            miny: -8, maxy: 3,
                            minz: -30, maxz: 30});

TW.viewFromAbove();