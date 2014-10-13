// materials
// TODO: add some fun materials yo
// TODO: scale textures?


// functions to create meshes of koi body parts
// TODO: fish needs body parts. fins, eyes 
//       nested coordinate frames are your best friend here!
function createBody(){
    var bodyGeometry = new THREE.SphereGeometry( 5, 32, 32 );
    var bodyMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var body = new THREE.Mesh( bodyGeometry, bodyMaterial );
    body.scale.set(bodyParams.scaleX, bodyParams.scaleY, bodyParams.scaleZ);

    return body;
};

function redraw() {
    // called to redraw thing of interest with the dat.GUI
    scene.remove(body);
    body = createBody(bodyParams);
    scene.add(body)
    TW.render();
}

// ============================================================================

// we always need a scene
var scene = new THREE.Scene();

// koiParams 
var bodyParams = {scaleX: 1.0,
                  scaleY: 1.2, 
                  scaleZ: 1.5};

// instantiate the initial body
var body = createBody(bodyParams);
scene.add( body );

var renderer = new THREE.WebGLRenderer();

// TODO: adjust the bounding box as necessary
// assumes baseWidth is greater than topWidth
TW.cameraSetup(renderer,
               scene,
               {minx: -23, maxx: 23,
                miny: 0, maxy: 55,
                minz: -10, maxz: 10});

// a gui for testing and flexibility purposes
var gui = new dat.GUI();
gui.add(bodyParams, 'scaleX', 0, 2).onChange(redraw);
gui.add(bodyParams, 'scaleY', 0, 2).onChange(redraw);
gui.add(bodyParams, 'scaleZ', 0, 2).onChange(redraw);
