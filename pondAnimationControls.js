/*
CS307 Project - Koi Pond!
Emily Wang
December 2014

Code for animating the koi pond.

Possible animations:
* Koi swimming in a line/circle/sinusoid path
* Lilypads randomly floating in the water
* Fins moving back and forth (i.e. swimming motions)

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
    lilypadInitialX:0,
    lilypadInitialY:0,
    lilypadInitialZ:0,
    lastparam: null // because javascript syntax. delete this later
};

// State variables of the animation
var animationState;

function resetAnimationState(){
    animationState = {
        koiPositionX: aniParams.koiInitialX,
        koiPositionY: aniParams.koiInitialY,
        koiPositionZ: aniParams.koiInitialZ,
        lilypadPositionX: getRandomInt(-15, 15),
        lilypadPositionY: getRandomInt(-15, 15),
        lilypadPositionZ: 0,
        time: 0,
        lastParam: null
    };
}

resetAnimationState();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function setKoiPosition(time) {
    koiPositionX = aniParams.koiInitialX + aniParams.koiVelocityX * time
    koi.position.x = koiPositionX;
    animationState.koiPositionX = koiPositionX;
}

function setLilypadPosition(time) {

    lilypad.position.x += getRandomInt(-10, 10)/100
    animationState.lilypadPositionX = lilypad.position.x

    lilypad.position.z += getRandomInt(-10, 10)/100
    animationState.lilypadPositionZ = lilypad.position.z

}

function firstState(){
    resetAnimationState();
    animationState.koiPosition = setKoiPosition(animationState.time);
    // animationState.lilypadPosition = setLilypadPosition(animationState.time);
    TW.render();
}

function updateState(){
    // changes the time and recalculates as needed for the timestep
    animationState.time += aniParams.deltaT;
    setKoiPosition(animationState.time);
    setLilypadPosition();
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
