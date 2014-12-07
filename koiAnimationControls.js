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
    koiVelocityX:,
    koiInitialX:,
    lastparam: null // because javascript syntax. delete this later
};

// State variables of the animation
var animationState;

function resetAnimationState(){
    animationState = {
        koiPositionX: aniParams.koiInitialX,
        time: 0,
        lastParam: null
    };
}

resetAnimationState();



function setKoiPosition(time) {
    // 
}


function firstState(){
    resetAnimationState();
    // do stuff
    TW.render();
}

function updateState(){
    // changes the time and recalculates as needed for the timestep

    // update the koi state

    // update the lilypad state
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
