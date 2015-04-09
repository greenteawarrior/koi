/*
CS307 Project - Koi Pond!
Emily Wang
December 19th, 2014
February 3, 2015 - Updating texture image filepaths

TODO: Update comments and clean up code structure
TODO: Skeletal animation *_*

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
// these images should be in the textures subdirectory
var bgMaterial = textureMaterial('textures/skyGrassPond.jpg', 1, 1);

var purpleScaleMaterial = textureMaterial('textures/koiPurpleSeamlessTexture.jpg',3, 4);
var sparkleMaterial = textureMaterial('textures/silverSparkleTexture.jpg',1, 1);
var waterMaterial = textureMaterial('textures/riverBottomTexture.jpg', 1, 1);
var rockMaterial = textureMaterial('textures/rock.jpg', 1, 1);
var skyMaterial = textureMaterial('textures/sky.jpg', 1, 1);

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

// fin rotations for the koi body parts
var finRotations = {finRotationsOn: false,

                    topX: 3*Math.PI/2, 
                    topY: 0,
                    topZ: Math.PI,

                    side0X: 5*Math.PI/4, 
                    side0Y: 0,
                    side0Z: Math.PI/2,

                    side1X: 5*Math.PI/4, 
                    side1Y: 0,
                    side1Z: Math.PI/2,

                    side2X: 5*Math.PI/4, 
                    side2Y: 0,
                    side2Z: Math.PI/2
                    }

function makeScene() {
    scene.remove(koi);
    scene.remove(lilypad1);
    scene.remove(lilypad2);

    koi = eqwangKoi(purpleScaleMaterial, sparkleMaterial, finRotations);
    koi.name = "koi";
    // koi.position.set(0, -25, 0);
    koi.position.set(-3.5, 0, 0);
    koi.scale.set(.5, .5, .5);
    scene.add(koi);

    lilypad1 = makeLilypad([7, -20, 0]);
    lilypad1.name = "lilypad1";
    // scene.add(lilypad1);

    lilypad2 = makeLilypad([-15, -20, -5]);
    lilypad2.name = "lilypad2";
    // scene.add(lilypad2);

}
makeScene();

// /// Pond textures inside of a cube for a scene background ======================
// var pondCubeGeom = new THREE.BoxGeometry(100, 100, 100);
// var pondCubeMaterial = new THREE.MeshFaceMaterial([ bgMaterial,
//                                                     bgMaterial,
//                                                     skyMaterial,
//                                                     waterMaterial,
//                                                     bgMaterial,
//                                                     bgMaterial,
//                                                     ] );
// var pondCubeMesh = new THREE.Mesh (pondCubeGeom, pondCubeMaterial)
// pondCubeMesh.name = "pondCube";
// scene.add(pondCubeMesh);

// // Rocks! ======================================================================

// for (var i=-5; i<5; i++){
//     rock = makeRock(rockMaterial);
//     rock.scale.set(.45, .45, .45);
//     rock.position.set(i*10, -14, 42);
//     scene.add(rock);
// }

// for (var i=-5; i<5; i++){
//     rock = makeRock(rockMaterial);
//     rock.scale.set(.45, .45, .45);
//     rock.position.set(i*10, -14, -42);
//     scene.add(rock);
// }

// for (var i=-5; i<5; i++){
//     rock = makeRock(rockMaterial);
//     rock.scale.set(.45, .45, .45);
//     rock.position.set(42, -14, i*10);
//     scene.add(rock);
// }

// for (var i=-5; i<5; i++){
//     rock = makeRock(rockMaterial);
//     rock.scale.set(.45, .45, .45);
//     rock.position.set(-42, -14, i*10);
//     scene.add(rock);
// }

// ambient light, directional light, and camera! ===============================

var ambLight = new THREE.AmbientLight( 0xFFFFFF ); // soft white light 
ambLight.name = "ambient";
scene.add(ambLight);

var directionalLight = new THREE.DirectionalLight( 0xffffff, .1 );
directionalLight.position.set( 0, 1, 0); 
directionalLight.name = "directional";
scene.add(directionalLight);

var cameraFOVY = 75;
var state = TW.cameraSetup(renderer,
                         scene,
                         {minx: -22, maxx: 22,
                          miny: -7, maxy: 7,
                          minz: -7, maxz: 7},
                         cameraFOVY);

TW.viewFromSide();