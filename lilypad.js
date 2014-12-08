function makeLilypad(){
  var points = [ [0.09854205631164525,0.21314391113458786,0],
                 [5.5581628344168195 ,0.07656743010282874,0],
                 [5.3855802774864205 ,1.7510186911939858 ,0]];

  function getPoints() {
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
      
  var latheObj;

  var geom = new THREE.LatheGeometry( getPoints(), 50, 0, 15*Math.PI/8 );
  var mat2 = new THREE.MeshPhongMaterial({color: 0x1AB63A,
                                          ambient: 0x1AB63A,
                                          specular: 0x444444,
                                          shininess: 20,
                                          side: THREE.DoubleSide});
  latheObj = new THREE.Mesh (geom, mat2);
  latheObj.rotation.set(3*Math.PI/2, 0, 0);
  return latheObj;
}