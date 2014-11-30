/*
CS307 - hwk6 - Creative Scene
Emily Wang
November 24, 2014

Code for setting up the creative scene of a purple koi fish in a pond.
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
var purpleScaleMaterial = textureMaterial('koiPurpleSeamlessTexture.jpg',3, 4);
var sparkleMaterial = textureMaterial('silverSparkleTexture.jpg',1, 1);
var waterMaterial = textureMaterial('riverBottomTexture.jpg', 1, 1);
waterMaterial.side = THREE.BackSide;

/// scene! =====================================================================
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
TW.mainInit(renderer,scene);

/// koi! =======================================================================
var koiFrame = eqwangKoi(purpleScaleMaterial, sparkleMaterial);
koiFrame.name = "koi";
scene.add(koiFrame);

/// Pond textures inside of a cube for a scene background ======================
var pondCubeGeom = new THREE.BoxGeometry(100, 100, 100);
var pondCubeMaterial = new THREE.MeshFaceMaterial([ waterMaterial,
                                                    waterMaterial,
                                                    waterMaterial,
                                                    waterMaterial,
                                                    waterMaterial,
                                                    waterMaterial,
                                                    ] );
var pondCubeMesh = new THREE.Mesh (pondCubeGeom, pondCubeMaterial)
pondCubeMesh.position.set(-20,0,20);
pondCubeMesh.name = "pondCube";
scene.add(pondCubeMesh);

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
                            miny: -8, maxy: 7,
                            minz: -0, maxz: 44});

TW.viewFromSide();
// rendering happens in the texture material callback in eqwangKoi.js!