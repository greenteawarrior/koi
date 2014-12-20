/*
Emily Wang
CS307 - December 2014

A lilypad made with three.js! Utilizes a lathe geometry and a phong material.
Just specify a position (i.e. an array in the format [x,y,z]) for the center of the lilypad.

The lilypad itself is approximately 10 units in diameter and can be scaled quite nicely for 
usage in creative scenes.
*/

function makeLilypad(startPos) {

  // points for the lilypad lathe geometry 
  var points = [ [0.09854205631164525,0.21314391113458786,0],
                 [5.5581628344168195 ,0.07656743010282874,0],
                 [5.3855802774864205 ,1.7510186911939858 ,0]];

  function getPoints() {
  // helper function for putting points into a lathe-geometry-friendly format
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
      
  var lilypad;
  var geom = new THREE.LatheGeometry( getPoints(), 50, 0, 15*Math.PI/8 );

  // phong material - take advantage of material and lighting
  // currently the lilypad is an energetic green and double sided
  var mat2 = new THREE.MeshPhongMaterial({color: 0x1AB63A,
                                          ambient: 0x1AB63A,
                                          specular: 0x444444,
                                          shininess: 20,
                                          side: THREE.DoubleSide});
  lilypad = new THREE.Mesh (geom, mat2);

  // transformations for placing the lilypad so it's sitting right-side up 
  // and is placed at the specified startPos input location
  lilypad.rotation.set(3*Math.PI/2, 0, 0);
  lilypad.position.set(startPos[0], startPos[1], startPos[2]);

  return lilypad;
}