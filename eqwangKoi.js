/*
A fish made with THREE.js with a given scale material and fin material. 
Copyright (C) 2014, Emily Wang
This program is released under the GNU General Public License (GPL).

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Contact me at emily.wang@students.olin.edu for questions/comments/concerns!
I'm also on github @greenteawarrior. Fork and submit a pull request if you're 
interested in building upon this work!

*/

// Koi =========================================================================
/*  Frame: 
    The koi fish has its own container (koiFrame in the following code).
    The origin for this koi fish container is at the head of the fish. 
    The fish "extends out" in the z direction.

    Size: 
    Currently the koi is at a fixed size, with a bounding box as follows:
       {minx: -3.5, maxx: 3.5,
        miny: -8,   maxy: 7,
        minz:  0,   maxz: 44}
    This means that the fish is approximately 7 units big in the x direction,
    15 units big in the y direction, and 44 units big in the z direction.
    
    Colors/Aesthetics:
    The user should pass in a scaleMaterial and finMaterial when calling this
    function. I suggest obtaining a variety of fun images for the scales and fins. 
    Use a Phong material and insert lighting into the scene for best results. 
    The fish does not come with lighting. 
    
*/
function eqwangKoi(scaleMaterial, finMaterial, finRotations) {
    // koi container
    var koiFrame = new THREE.Object3D();

    // Lathe geometry helper functions =========================================
    function testBezierCurve(cp,numSegs) {
        // takes in control points for a Bezier curve and returns points
        // that can be interpolated through to get a lathe geometry silhouette 
        // following the specified Bezier curve

        // credits to Scott Anderson, Fall 2014 for this helper! function

        // unpacking control point values
        var a = new THREE.Vector3(cp[0][0],cp[0][1],cp[0][2]);
        var b = new THREE.Vector3(cp[1][0],cp[1][1],cp[1][2]);
        var c = new THREE.Vector3(cp[2][0],cp[2][1],cp[2][2]);
        var d = new THREE.Vector3(cp[3][0],cp[3][1],cp[3][2]);
        
        var curve = new THREE.CubicBezierCurve3();
        curve.v0 = a;
        curve.v1 = b;
        curve.v2 = c;
        curve.v3 = d;
        
        return curve.getPoints(numSegs);
    }

    function gettingPoints(points) {
        /* gettingPoints(points) takes in an array of arrays. each of these array elements contains 
           points for a certain Bezier curve. Returns an array in which each element is a [x,y,z] 
           control point.

           Design note: There might be some redundancy between the gettingPoints 
           and getPoints function. This is a code improvement that should be acted
           upon in the near future (but didn't have time to work on during the hwk6
           timeframe.) */

        var i;
        var j;
        var currentcurve;
        var formattedPts = [];
        for( i=0; i < points.length; i++) {
            var currentcurve = points[i];
            for ( j=0; j < currentcurve.length; j++) {
              formattedPts.push([currentcurve[j].x,currentcurve[j].y,currentcurve[j].z]);
            }
        }
        return formattedPts;
    }

    function getPoints(points) {
        /* Takes an array of control points in [x,y,z] form and turns them into Vector3's.
 
           Design note: There might be some redundancy between the gettingPoints 
           and getPoints function. This is a code improvement that should be acted
           upon in the near future (but didn't have time to work on during the hwk6
           timeframe.) */

        var i;
        var pts = [];
        for( i=0; i<points.length; i++) {
            var p = new THREE.Vector3();
            p.x = points[i][0];
            p.y = points[i][2];
            p.z = points[i][1];
            pts.push( p );
        }
        return pts;
    }

    function makeKoiBodyPoints() {
        /* Returns an array of points that can be used to create a lathe 
           geometry for the koi fish body!

           The lathe geometry points for the koi body are generated from a 
           series of Bezier curves. The current koi body is made from four
           connected Bezier curves. Feel free to tweak the control point values 
           or add more curves as desired to edit the shape of the fish! 

           Note: The code for this function is structured in chunks for each
           Bezier curve. It may be a bit wordy but it's straightforward. This code
           could be edited for compactness in the future if desired.*/

        var points = [];

        // 0th bezier curve
        var P3 = [1, 6.5, 0];
        var P2 = [1, 6.5, 0];
        var P1 = [3, 3, 0];
        var P0 = [3, 0, 0];
        var CPS = [P0,P1,P2,P3];
        points.push(testBezierCurve(CPS, 30));

        // 1st bezier curve
        var P3 = [3, 0, 0];
        var P2 = [3.5, -6, 0];
        var P1 = [4, -10, 0];
        var P0 = [4.5, -14, 0];
        var CPS = [P0,P1,P2,P3];
        points.push(testBezierCurve(CPS, 30));

        // 2nd bezier curve
        var P3 = [4.5, -14, 0];
        var P2 = [6,-20, 0];
        var P1 = [2.5, -23, 0];
        var P0 = [1.5, -32, 0];
        var CPS = [P0,P1,P2,P3];
        points.push(testBezierCurve(CPS, 30));

        // 3rd bezier curve
        var P0 = [1.5, -32, 0];
        var P1 = [3, -34, 0];
        var P2 = [3, -35, 0];
        var P3 = [4.1,-36, 0];
        var CPS = [P0,P1,P2,P3];
        points.push(testBezierCurve(CPS, 30));

        // processing the array so it can be fed into THREE.LatheGeometry()
        points = gettingPoints(points);

        return points;
    }

    function makeKoiTopFinPoints() {
        /* Returns an array of points that can be used to create a lathe 
           geometry for the koi fish top fin! 
            
           The current koi top fin is made from one Bezier curve. Feel free 
           to tweak the control point values or add more curves as desired 
           to edit the shape of the top fin! 

           Design note: It may seem silly to have a function just to return an
           arbitrary array, but the framework is set up such that editing this 
           function will edit the points for the lathe geometry for the fish (as
           opposed to some other variable outside of this function). This is
           consistent with the usage of makeKoiBodyPoints().*/

        var points = [ [6, 0, 0],
                       [5, 2 ,0],
                       [3, 4 ,0],
                       [1, 6 ,0],
                       [0, 6.5,0] ];
        return points;
    }

    function makeKoiSideFinPoints() {
        /* Returns an array of points that can be used to create a lathe 
           geometry for the three koi fish side fins! 
            
           The current koi side fin is made from one Bezier curve. Feel free 
           to tweak the control point values or add more curves as desired 
           to edit the shape of the side fin! 

           Design note: It may seem silly to have a function just to return an
           arbitrary array, but the framework is set up such that editing this 
           function will edit the points for the lathe geometry for the fish (as
           opposed to some other variable outside of this function). This is
           consistent with the usage of makeKoiBodyPoints().*/

        var points = [ [6, 0, 0],
                       [5, 2 ,0],
                       [3, 4 ,0],
                       [1, 6 ,0],
                       [0, 6.5,0] ];
        return points;
    }

    // Helper functions for koi body parts (side fins and eyes) that 
    // occur more than once in a fish ==========================================

    function makeKoiSideFin(){
        // Returns a mesh for a side fin of the koi fish
        var koiSideFinPoints = makeKoiSideFinPoints();
        var koiSideFinGeom = new THREE.LatheGeometry( getPoints(koiSideFinPoints) );

        // clone the global material in case we want to modify only this instance
        // of the side fin
        var finMaterialClone = finMaterial.clone(); 
        var koiSideFin = new THREE.Mesh (koiSideFinGeom, finMaterialClone);

        return koiSideFin;    
    }

    function makeEye(){
        // Returns a mesh for the eye of the koi fish 
        // (currently these an eye is simply made out of a sphere)
        var eyeGeometry = new THREE.SphereGeometry(.25,30,30);
        var eyeMaterial = new THREE.MeshBasicMaterial({color: THREE.ColorKeywords.white});
        var eyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
        return eyeMesh;    
    }

    /// Body! ==================================================================

    var koiBodyPoints = makeKoiBodyPoints();
    koiBodyPoints = getPoints(koiBodyPoints);
    var koiBodyGeom = new THREE.LatheGeometry( koiBodyPoints );
    var scaleMaterialClone = scaleMaterial.clone();
    var koiBody = new THREE.Mesh (koiBodyGeom, scaleMaterialClone);
    
    // use coordinate transforms to alter the shape and position of the 
    // fish as desired
    koiBody.scale.set(.55, 1, 1);
    koiBody.rotation.set(Math.PI, 0, 0);
    koiBody.position.set(0,0,6.5); // so the x,y,z axes of the canvas are at the head of the fish

    koiBody.name = "koiBody";
    koiFrame.add(koiBody);

    /// Eyes! ==================================================================

    var leftEye = makeEye();
    var rightEye = makeEye();

    // use coordinate transformsions to place the eyes in a reasonable place
    leftEye.position.set(1, .25, 2);
    rightEye.position.set(-1, .25, 2);

    leftEye.name = "koiLeftEye"
    koiFrame.add(leftEye);
    rightEye.name = "koiRightEye"
    koiFrame.add(rightEye);

    /// Top fin! ===============================================================

    var koiTopFinPoints = makeKoiTopFinPoints();
    var koiTopFinPoints = getPoints(koiTopFinPoints);
    var koiTopFinGeom = new THREE.LatheGeometry( koiTopFinPoints );
    var finMaterialClone = finMaterial.clone();
    var koiTopFin = new THREE.Mesh (koiTopFinGeom, finMaterialClone);

    // use coordinate transformations to alter the top fin into 
    // the desired shape and position for the top fin on our koi fish
    koiTopFin.scale.set(.1, 1.7, .8);
    koiTopFin.position.set(0,1.5,24);
    koiTopFin.rotation.set(finRotations.topX, finRotations.topY, finRotations.topZ);

    koiTopFin.name = "koiTopFin";
    koiFrame.add(koiTopFin);

    // Side fins! ==============================================================
    // Utilizes the makeKoiSideFin() helper function to get the mesh for the fin,
    // and then coordinate transforms are used to get the desired shape and 
    // position for each side fin.

    // front right-hand side fin
    koiSideFin0 = makeKoiSideFin();
    koiSideFin0.scale.set(.2, .5, 1);
    koiSideFin0.position.set(1.75,-8,24);
    koiSideFin0.rotation.set(finRotations.side0X, finRotations.side0Y, finRotations.side0Z);
    koiSideFin0.name = "koiSideFin0";
    koiFrame.add(koiSideFin0);

    // front left-hand-side fin
    koiSideFin1 = makeKoiSideFin();
    koiSideFin1.scale.set(.2, .5, 1);
    koiSideFin1.position.set(-1.75,-8,24);
    koiSideFin1.rotation.set(finRotations.side1X, finRotations.side1Y, finRotations.side1Z);
    koiSideFin1.name = "koiSideFin1";
    koiFrame.add(koiSideFin1);

    // side fin under the fish; close to the tail
    koiSideFin2 = makeKoiSideFin();
    koiSideFin2.scale.set(.2, .5, 1);
    koiSideFin2.position.set(0,-5.5,36);
    koiSideFin2.rotation.set(finRotations.side2X, finRotations.side2Y, finRotations.side2Z);
    koiSideFin2.name = "koiSideFin2";
    koiFrame.add(koiSideFin2);

    return koiFrame;
}

// Texture helper functions from hwk5 ==========================================
// (credits to Scott Anderson, CS307 Fall 2014) ================================

function isPowerOf2(x) {
    // Credits to Scott Anderson, Fall 2014 for this function

    // Clever way to check if an integer is a power of two. If it's not a
    // positive integer; you're out of luck, so check for that before
    // using this. For our application (image dimensions), it works fine.
    // when we subtract 1 from an power of two, we get something that
    // shares no bits with it, so the bitwise and is false.  If it's not a
    // power of two, the borrow doesn't affect the larger power of two, so
    // the bitwise and is true.  See
    // http://www.exploringbinary.com/ten-ways-to-check-if-an-integer-is-a-power-of-two-in-c/
    return ((x != 0) && !(x & (x-1)));
}

var numTexturesToLoad = 0;
function textureMaterial(url, sRepeat, tRepeat) {
    // Credits to Scott Anderson, Fall 2014 for this function

    // Function to load an image from a URL, check its dimensions (must be
    // a power of two in order for "repeat" to work), create a texture and
    // return it.
    // Add-on modification by Emily Wang: The function also takes in two values, 
    // sRepeat and tRepeat, which will be used for repeating the texture as 
    // desired on the fish parts.

    numTexturesToLoad ++;
    var texture = new THREE.ImageUtils.loadTexture(
        url,
        new THREE.UVMapping(),
        function (text) {
            console.log("loaded: "+url);
            if(!isPowerOf2(text.image.width) ||
               !isPowerOf2(text.image.height)) {
                throw "Image dimensions are not powers of two: "+url
                    +": "+text.image.width+"x"+text.image.height;
            }
            numTexturesToLoad --;
            if( numTexturesToLoad == 0 )
                TW.render();
        });

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( sRepeat, tRepeat );

    texture.needsUpdate = true;
    var mat = new THREE.MeshPhongMaterial({side: THREE.DoubleSide});
    mat.map = texture;          // I always get "mat" and "map" mixed up! 
    mat.name = "texture from: "+url;
    return mat;
}
