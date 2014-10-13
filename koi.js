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

    // tail fin
    fish = addTailFin(fish);

    // side fins
    fish = addSideFins(fish);

    // eyes
    fish = addEyes(fish);

    // mouth?

    return fish;
};

function createTailFin(){
    var tailFinGeometry = new THREE.SphereGeometry(tailFinParams.tailFinRadius,
                                                   tailFinParams.sphereDetail,
                                                   tailFinParams.sphereDetail,
                                                   0, 2*Math.PI, //horizontal sweep 
                                                   0, 2*Math.PI); //vertical sweep 
    
    var tailFinMaterial = new THREE.MeshBasicMaterial( {color: tailFinParams.tailFinColor} );

    var tailFinMesh = new THREE.Mesh(tailFinGeometry, tailFinMaterial);

    return tailFinMesh;

};

function addTailFin(fish){
    var topTailFinFrame = new THREE.Object3D();
    var bottomTailFinFrame = new THREE.Object3D();

    var topTailFin = createTailFin();
    var bottomTailFin = createTailFin();

    topTailFinFrame.add(topTailFin);
    bottomTailFinFrame.add(bottomTailFin);

    topTailFin.position.z = bodyParams.bodyRadius; 
    bottomTailFin.position.z = bodyParams.bodyRadius;

    fish.add(topTailFinFrame);
    fish.add(bottomTailFinFrame);

    topTailFinFrame.scale.set(bodyParams.bodyScaleX, bodyParams.bodyScaleY, bodyParams.bodyScaleZ);
    bottomTailFinFrame.scale.set(bodyParams.bodyScaleX, bodyParams.bodyScaleY, bodyParams.bodyScaleZ);

    topTailFinFrame.rotation.x = tailFinParams.tailFinRotationX;
    topTailFinFrame.rotation.y = tailFinParams.tailFinRotationY;

    bottomTailFinFrame.rotation.x = - topTailFinFrame.rotation.x;
    bottomTailFinFrame.rotation.y = - topTailFinFrame.rotation.y;

    return fish;

};

function createSideFin(){
    var sideFinGeometry = new THREE.SphereGeometry(sideFinParams.sideFinRadius,
                                                   sideFinParams.sphereDetail,
                                                   sideFinParams.sphereDetail,
                                                   0, 2*Math.PI, //horizontal sweep 
                                                   0, Math.PI/2); //vertical sweep 
    
    var sideFinMaterial = new THREE.MeshBasicMaterial( {color: sideFinParams.sideFinColor} );

    var sideFinMesh = new THREE.Mesh(sideFinGeometry, sideFinMaterial);

    return sideFinMesh;

};

function addSideFins(fish){

    var leftSideFinFrame = new THREE.Object3D();
    var leftSideFin = createSideFin();
    leftSideFinFrame.add(leftSideFin);
    leftSideFin.position.z = bodyParams.bodyRadius;
    fish.add(leftSideFinFrame);
    leftSideFinFrame.scale.set(bodyParams.bodyScaleX, bodyParams.bodyScaleY, bodyParams.bodyScaleZ);
    leftSideFinFrame.rotation.x = sideFinParams.sideFinRotationX;
    leftSideFinFrame.rotation.y = sideFinParams.sideFinRotationY;

    var rightSideFinFrame = new THREE.Object3D();
    var rightSideFin = createSideFin();
    rightSideFinFrame.add(rightSideFin);
    rightSideFin.position.z = bodyParams.bodyRadius;
    fish.add(rightSideFinFrame);
    rightSideFinFrame.scale.set(bodyParams.bodyScaleX, bodyParams.bodyScaleY, bodyParams.bodyScaleZ);
    rightSideFinFrame.rotation.x = -leftSideFinFrame.rotation.x;
    rightSideFinFrame.rotation.y = -leftSideFinFrame.rotation.y;

    return fish;
};

function createEye(){
    var eyeGeometry = new THREE.SphereGeometry( eyeParams.eyeRadius, 
                                                eyeParams.segments, 
                                                eyeParams.segments);

    var eyeMaterial = new THREE.MeshBasicMaterial( {color: eyeParams.eyeColor} );

    var eyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);

    return eyeMesh;
};

function addEyes(fish){
    var leftEyeFrame = new THREE.Object3D();
    var leftEye = createEye();
    leftEyeFrame.add(leftEye);
    leftEye.position.z = -bodyParams.bodyRadius - eyeParams.eyeRadius/2;// + (eyeParams.eyeRadius * bodyParams.bodyScaleZ);
    fish.add(leftEyeFrame);
    leftEyeFrame.scale.set(bodyParams.bodyScaleX, bodyParams.bodyScaleY, bodyParams.bodyScaleZ);
    leftEyeFrame.rotation.x = eyeParams.eyeRotationX;
    leftEyeFrame.rotation.y = eyeParams.eyeRotationY;
    leftEyeFrame.rotation.z = eyeParams.eyeRotationZ;


    var rightEyeFrame = new THREE.Object3D();
    var rightEye = createEye();
    rightEyeFrame.add(rightEye);
    rightEye.position.z = -bodyParams.bodyRadius - eyeParams.eyeRadius/2;// + (eyeParams.eyeRadius * bodyParams.bodyScaleZ);
    fish.add(rightEyeFrame);
    rightEyeFrame.scale.set(bodyParams.bodyScaleX, bodyParams.bodyScaleY, bodyParams.bodyScaleZ);
    rightEyeFrame.rotation.x = -leftEyeFrame.rotation.x;
    rightEyeFrame.rotation.y = -leftEyeFrame.rotation.y;
    rightEyeFrame.rotation.z = -leftEyeFrame.rotation.z;

    return fish;
};

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

var tailFinParams = {tailFinRadius: 5,
                     tailFinColor: 0xffffff,
                     tailFinRotationX: Math.PI/16,
                     tailFinRotationY: 0,
                     sphereDetail: 30
                    };

var sideFinParams = {sideFinRadius: 5,
                     sideFinColor: 0xffffff,
                     sideFinRotationX: -.2,
                     sideFinRotationY: -1,
                     sphereDetail: 30
                    };


var eyeParams = {eyeRadius: 1.5,
                 eyeColor: 0xffffff,
                 eyeRotationX: 0,
                 eyeRotationY: 0,
                 eyeRotationZ: 0,
                 segments: 30};

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

gui.add(tailFinParams, 'tailFinRadius', 0, 10).onChange(redraw);
gui.add(tailFinParams, 'tailFinRotationX', -Math.PI, Math.PI).onChange(redraw);
gui.add(tailFinParams, 'tailFinRotationY', -Math.PI, Math.PI).onChange(redraw);
gui.addColor(tailFinParams, 'tailFinColor').onChange(redraw);

gui.add(sideFinParams, 'sideFinRadius', 0, 10).onChange(redraw);
gui.add(sideFinParams, 'sideFinRotationX', -Math.PI, Math.PI).onChange(redraw);
gui.add(sideFinParams, 'sideFinRotationY', -Math.PI, Math.PI).onChange(redraw);
gui.addColor(sideFinParams, 'sideFinColor').onChange(redraw);

gui.add(eyeParams, 'eyeRadius', 0, 10).onChange(redraw);
gui.add(eyeParams, 'eyeRotationX', -Math.PI, Math.PI).onChange(redraw);
gui.add(eyeParams, 'eyeRotationY', -Math.PI, Math.PI).onChange(redraw);
gui.add(eyeParams, 'eyeRotationZ', -Math.PI, Math.PI).onChange(redraw);
gui.addColor(eyeParams, 'eyeColor').onChange(redraw);
