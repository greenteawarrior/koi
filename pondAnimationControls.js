/*
CS307 Project - Koi Pond!
Emily Wang
December 2014

Code for animating the koi pond.

lilypads
1. sine wave y translation
2. sine wave x rotation

koi skeletal animation
1. sine wave 

*/

// Animation and scene parameters

var aniParams = {
    deltaT: 0.03,
    koiVelocityX:1,
    koiVelocityY:0,
    koiVelocityZ:1,
    koiInitialX:0,
    koiInitialY:0,
    koiInitialZ:0,
    lilypad1InitialY:-20, 
    lilypad1InitialYRot: 0,
    lilypad2InitialY:-20, 
    lilypad2InitialYRot: 0,
    lastparam: null // because javascript syntax. delete this later
};

// State variables of the animation
var animationState;

function resetAnimationState(){
    animationState = {
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
        lilypad2RotationY: Math.PI,
        time: 0,
        lastParam: null
    };
}

resetAnimationState();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function setKoiPosition(time) {
    koiPositionZ = aniParams.koiInitialZ - aniParams.koiVelocityZ * time
    koi.position.z = koiPositionZ;
    animationState.koiPositionZ = koiPositionZ;
}

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

    setKoiPosition(animationState.time);
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
