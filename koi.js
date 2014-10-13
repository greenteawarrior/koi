// materials
// TODO: add some fun materials yo
// TODO: scale textures?


// functions to create meshes of koi body parts
// TODO: fish needs body parts. fins, eyes 
//       nested coordinate frames are your best friend here!
function createBody(){
    var bodyGeometry = new THREE.SphereGeometry( bodyParams.bodyRadius, bodyParams.segments, bodyParams.segments);
    var bodyMaterial = new THREE.MeshBasicMaterial( {color: bodyParams.bodyColor} );
    var body = new THREE.Mesh( bodyGeometry, bodyMaterial );
    body.scale.set(bodyParams.bodyScaleX, bodyParams.bodyScaleY, bodyParams.bodyScaleZ);

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
var bodyParams = {bodyScaleX: 1.0,
                  bodyScaleY: 1.2, 
                  bodyScaleZ: 1.5,
                  bodyColor: 0xffff00,
                  bodyRadius: 5,
                  segments: 32};

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
gui.add(bodyParams, 'bodyScaleX', 0, 2).onChange(redraw);
gui.add(bodyParams, 'bodyScaleY', 0, 2).onChange(redraw);
gui.add(bodyParams, 'bodyScaleZ', 0, 2).onChange(redraw);
gui.addColor(bodyParams, 'bodyColor').onChange(redraw);
gui.add(bodyParams, 'bodyRadius', 0, 10).onChange(redraw);
