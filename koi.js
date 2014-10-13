// materials
// TODO: add some fun materials yo
// TODO: scale textures?


// functions to create meshes of koi body parts
// TODO: fish needs body parts. fins, eyes 
//       nested coordinate frames are your best friend here!
function createBody(){
    // fish container
    var fish = new THREE.Object3D();

    // let's start with the body
    var bodyGeometry = new THREE.SphereGeometry( bodyParams.bodyRadius, 
                                                 bodyParams.segments, 
                                                 bodyParams.segments);
    var bodyMaterial = new THREE.MeshBasicMaterial( {color: bodyParams.bodyColor} );
    var body = new THREE.Mesh( bodyGeometry, bodyMaterial );
    body.scale.set(bodyParams.bodyScaleX, bodyParams.bodyScaleY, bodyParams.bodyScaleZ);
    fish.add(body);

    // side fins
    fish = addSideFins(fish);

    // tail fin
    // eyes
    // mouth?

    return fish;
};

function createSideFin(){
    var sideFinGeometry = new THREE.SphereGeometry(sideFinParams.sideFinRadius,
                                                   sideFinParams.sphereDetail,
                                                   sideFinParams.sphereDetail);
    
    var sideFinMaterial = new THREE.MeshBasicMaterial( {color: sideFinParams.sideFinColor} );

    var sideFinMesh = new THREE.Mesh(sideFinGeometry, sideFinMaterial);

    return sideFinMesh;

};

function addSideFins(fish){
    var leftSideFinFrame = new THREE.Object3D();
    var rightSideFinFrame = new THREE.Object3D();

    var leftSideFin = createSideFin();
    var rightSideFin = createSideFin();

    leftSideFinFrame.add(leftSideFin);
    rightSideFinFrame.add(rightSideFin);

    leftSideFin.position.z = bodyParams.bodyRadius * bodyParams.bodyScaleZ;
    rightSideFin.position.z = bodyParams.bodyRadius * bodyParams.bodyScaleZ;

    fish.add(leftSideFinFrame);
    fish.add(rightSideFinFrame);

    leftSideFinFrame.rotation.x = sideFinParams.sideFinRotationX;
    leftSideFinFrame.rotation.y = sideFinParams.sideFinRotationY;

    rightSideFinFrame.rotation.x = - leftSideFinFrame.rotation.x;
    rightSideFinFrame.rotation.y = - leftSideFinFrame.rotation.y;

    return fish;

};

// function createTailFin(){

// };

// function addTailFin(){

// };

// function createEyes(){

// };

// function addEyes(){

// };

// function createMouth(){

// };

// function addMouth(){

// };

function redraw() {
    // called to redraw thing of interest with the dat.GUI
    scene.remove(fish);
    fish = createBody(bodyParams);
    scene.add(fish)
    TW.render();
}

// ============================================================================

// we always need a scene
var scene = new THREE.Scene();

// objects with parameter values for various fish parts
var bodyParams = {bodyScaleX: 1.0,
                  bodyScaleY: 1.2, 
                  bodyScaleZ: 1.5,
                  bodyColor: 0xff8700,
                  bodyRadius: 15,
                  segments: 32
                 };

var sideFinParams = {sideFinRadius: 5,
                     sideFinColor: 0xffffff,
                     sideFinRotationX: 0,
                     sideFinRotationY: 0,
                     sphereDetail: 30
                    };

// instantiate the fish
var fish = createBody(bodyParams);
scene.add(fish);

var renderer = new THREE.WebGLRenderer();

// TODO: adjust the bounding box as necessary
// assumes baseWidth is greater than topWidth
TW.cameraSetup(renderer,
               scene,
               {minx: -20, maxx: 20,
                miny: -20, maxy: 20,
                minz: -20, maxz: 20});

// a gui for testing and flexibility purposes
var gui = new dat.GUI();
gui.add(bodyParams, 'bodyScaleX', 0, 2).onChange(redraw);
gui.add(bodyParams, 'bodyScaleY', 0, 2).onChange(redraw);
gui.add(bodyParams, 'bodyScaleZ', 0, 2).onChange(redraw);
gui.addColor(bodyParams, 'bodyColor').onChange(redraw);
gui.add(bodyParams, 'bodyRadius', 0, 10).onChange(redraw);

gui.add(sideFinParams, 'sideFinRadius', 0, 10).onChange(redraw);
gui.add(sideFinParams, 'sideFinRotationX', -Math.PI, Math.PI).onChange(redraw);
gui.add(sideFinParams, 'sideFinRotationY', -Math.PI, Math.PI).onChange(redraw);
gui.addColor(sideFinParams, 'sideFinColor').onChange(redraw);


