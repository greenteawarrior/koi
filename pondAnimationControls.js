/*
CS307 Project - Koi Pond!
Emily Wang
December 2014

Code for animating the koi pond.
This script builds upon code from the animation code in CS307, utilizing both
positional and derivative techniques.

Lilypad animations:
* sine wave y translation
* sine wave x rotation

Koi animations:
* swimming forward (translation)
* optional: top and side fins moving from side to side as the fish swims (rotations)
* (future implementations) koi skeletal animation! may require a revamp of the koi geometry design

*/

// Animation and scene parameters

var aniParams = {
    deltaT: 0.03,

    koiVelocityX:1,
    koiVelocityY:0,
    koiVelocityZ:1,
    koiInitialX:0,
    koiInitialY:-25,
    koiInitialZ:0,

    koiInitialSideRotation0Z: Math.PI/2,
    koiInitialSideRotation1Z: Math.PI/2,
    koiInitialSideRotation2Z: Math.PI/2,

    lilypad1InitialY:-20, 
    lilypad1InitialYRot: 0,

    lilypad2InitialY:-20, 
    lilypad2InitialYRot: 0
};

// State variables of the animation
var animationState;

function resetAnimationState(){
    animationState = {
        time: 0,
        sideRotationCounter: 0,

        koiPositionX: aniParams.koiInitialX,
        koiPositionY: aniParams.koiInitialY,
        koiPositionZ: aniParams.koiInitialZ,
        lilypad1PositionX: getRandomInt(-7, 7),
        
        lilypad1PositionY: -20,
        lilypad1PositionZ: getRandomInt(-7, 7),
        lilypad1RotationY: Math.PI,

        lilypad2PositionX: getRandomInt(-7, 7),
        lilypad2PositionY: -20,
        lilypad2PositionZ: getRandomInt(-7, 7),
        lilypad2RotationY: Math.PI
    };
}

resetAnimationState();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function for enabling the koi to swim forward
function setKoiPosition(time) {
    koiPositionZ = aniParams.koiInitialZ - aniParams.koiVelocityZ * time
    koi.position.z = koiPositionZ;
    animationState.koiPositionZ = koiPositionZ;
}


/* 
This function enables the koi's side fins to move side to side as it swims forward.
Design note and area of future improvement: However, re-rendering the koi so often causes
the scene to be laggy... however in order to keep the koi as one function the rotations for
the side fins need to be passed in. One way to make this faster would be to create the side fins
as their own global variables in the scene so they're updated with a transformation rather than 
re-rendered at every timestep.
*/
function setKoiPositionWithSideRotations(time) {

    // things that get updated in this timestep
    koiPositionZ = aniParams.koiInitialZ - aniParams.koiVelocityZ * time
    animationState.koiPositionZ = koiPositionZ;

    // top and side fin movement with rotations
    finRotations.topY = Math.PI/16 * Math.sin(animationState.time)
    finRotations.side0Z = aniParams.koiInitialSideRotation0Z + Math.PI/8 * Math.sin(animationState.time)
    finRotations.side1Z = aniParams.koiInitialSideRotation1Z + Math.PI/8 * Math.sin(animationState.time)
    finRotations.side2Z = aniParams.koiInitialSideRotation2Z + Math.PI/8 * Math.sin(animationState.time)

    // doing a remove and remake in here to allow for side fin animation
    scene.remove(koi);
    koi = eqwangKoi(purpleScaleMaterial, sparkleMaterial, finRotations);
    koi.name = "koi";
    koi.position.set(animationState.koiPositionX, animationState.koiPositionY, animationState.koiPositionZ);
    koi.scale.set(.5, .5, .5);
    scene.add(koi);
}

/*
The lilypads will bob up/down and also tilt, as if a gentle wave through the pond is
moving them over time.
*/
function setLilypadPosition(time) {
    // lilypads bounce up and down according to a sinusoid (y translations)
    lilypad1.position.y = aniParams.lilypad1InitialY + .5*Math.sin(time); 
    animationState.lilypad1PositionY = lilypad1.position.y;
    lilypad2.position.y = aniParams.lilypad2InitialY + .5*Math.sin(time + 2); 
    animationState.lilypad2PositionY = lilypad2.position.y;

    // lilypads tilt as they float in the water (x axis rotations)
    lilypad1.rotation.y = .1*Math.sin(time) + .1*Math.cos(time);
    animationState.lilypad1RotationY = lilypad1.rotation.Y;

    lilypad2.rotation.y = .1*Math.sin(time + 2) + .1*Math.cos(time + 2);
    animationState.lilypad2RotationY = lilypad2.rotation.Y;
}

function firstState(){
    resetAnimationState();
    animationState.koiPosition = setKoiPosition(animationState.time);
    TW.render();
}

function updateState(){
    // changes the time and recalculates as needed for the timestep
    animationState.time += aniParams.deltaT;

    // right now the animation only runs for 28 timesteps (approximately how long it takes for the koi to swim through the pond)
    if (animationState.time >= 28) {return;} 

    if (finRotations.finRotationsOn) {
        animationState.sideRotationCounter += 1;
        if (animationState.sideRotationCounter%10 == 0){
            setKoiPositionWithSideRotations(animationState.time);
        }
    }
    else {
        setKoiPosition(animationState.time);
    };

    setLilypadPosition(animationState.time);
    console.log("Time: "+animationState.time+" and koiPositionX: "+animationState.koiPositionX);
}

function oneStep(){
    updateState();
    TW.render();
}

var animationId = null; // so we can cancel the animation if we want

function animate(timestamp) {
    oneStep();
    animationId = requestAnimationFrame(animate);
}

function stopAnimation() {
    if( animationId != null ) {
        cancelAnimationFrame(animationId);
    }
}

TW.setKeyboardCallback("0",firstState,"reset animation");
TW.setKeyboardCallback("1",oneStep,"advance by one step");
TW.setKeyboardCallback("g",animate,"go:  start animation");
TW.setKeyboardCallback(" ",stopAnimation,"stop animation");

// GUI for selecting whether fin rotations are desired or not
var gui = new dat.GUI();
gui.add(finRotations,"finRotationsOn").onChange(resetAnimationState);