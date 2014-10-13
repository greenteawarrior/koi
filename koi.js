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

    // tail fin
    fish = addTailFin(fish);

    // eyes
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

// function createSideFin(){

// };

// function addSideFins(){

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

var tailFinParams = {tailFinRadius: 5,
                     tailFinColor: 0xffffff,
                     tailFinRotationX: Math.PI/16,
                     tailFinRotationY: 0,
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

gui.add(tailFinParams, 'tailFinRadius', 0, 10).onChange(redraw);
gui.add(tailFinParams, 'tailFinRotationX', -Math.PI, Math.PI).onChange(redraw);
gui.add(tailFinParams, 'tailFinRotationY', -Math.PI, Math.PI).onChange(redraw);
gui.addColor(tailFinParams, 'tailFinColor').onChange(redraw);


