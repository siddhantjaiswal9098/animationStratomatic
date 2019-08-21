import * as React from 'react';
import * as THREE from 'three';

const App = (props: any) => {
  const [shouldShowColors, setShouldShowColors ] = React.useState(true)
  const [speedOfBall, setSpeedOfBall ] = React.useState(0.003)
  
  let requestID: any;
  React.useEffect(() => {
    animationField();
  }, [])

  React.useEffect(() => {
    animationField()
  }, [shouldShowColors, speedOfBall]);

  let tempSomeFunc: any;
  const animationField = () => {
    // "constants"... 
    var color = 0x000000;
    var fraction = 0;
    var lineLength: any;
    var line: any;

    // Create your main scene
    var scene = new THREE.Scene();

    // Create your main camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create lights
    var light = new THREE.PointLight(0xEEEEEE);
    light.position.set(20, 0, 20);
    scene.add(light);
    var lightAmb = new THREE.AmbientLight(0x777777);
    scene.add(lightAmb);

    // Create your renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 60 / 100, window.innerHeight- 50);
    // divID

    let elementOnDom: any = document.getElementById("divID")

    if (elementOnDom.hasChildNodes()) {
      elementOnDom.removeChild(elementOnDom.childNodes[0]);
    }
    elementOnDom.appendChild(renderer.domElement);

    var list = document.getElementById("divID");
    console.log('lisst  sdadasd', list);

    // Set up the main camera
    camera.position.z = 5;
    let loader = new THREE.TextureLoader();
    loader.load('images/field2.png', function (texture: any) {
      scene.background = texture;
    });

    tempSomeFunc = () => {
      var num = Math.floor(Math.random() * 5) + 1;
      num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      var num2 = Math.floor(Math.random() * 3.4) + 1;
      num2 *= Math.floor(Math.random() * 2) == 1 ? 1 : 1;
      var randomCourt = Math.random() >= 0.5 ? -5 : 5;
      var points = [
        new THREE.Vector3(0, -2.55, 0),
        new THREE.Vector3(num, num2, 0),
        new THREE.Vector3(randomCourt, -0.5, 0)]
      console.log('points2:: --->>', points) //x, y, z

      // geometry
      var geometry = new THREE.BufferGeometry();

      // attributes
      let numPoints = points.length;
      var positions = new Float32Array(numPoints * 3);
      var colors = new Float32Array(numPoints * 3);
      var lineDistances = new Float32Array(numPoints * 1);

      geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.addAttribute('lineDistance', new THREE.BufferAttribute(lineDistances, 1));

      // populate
      var color = new THREE.Color();

      for (var i = 0, index = 0, l = numPoints; i < l; i++ , index += 3) {
        positions[index] = points[i].x;
        positions[index + 1] = points[i].y;
        color.setHSL(i / l, 1.0, 0.5);
        if(shouldShowColors) {
          colors[index] = color.r;
          colors[index + 1] = color.g;
          colors[index + 2] = color.b;
        }
        if (i > 0) {
          lineDistances[i] = lineDistances[i - 1] + points[i - 1].distanceTo(points[i]);
        }
      }

      lineLength = lineDistances[numPoints - 1];

      // material
      var material = new THREE.LineDashedMaterial({
        vertexColors: THREE.VertexColors,
        dashSize: 10, // to be updated in the render loop
        gapSize: 1e10, // a big number, so only one dash is rendered
        linewidth: 6
      });

      // line
      line = new THREE.Line(geometry, material);
      scene.add(line);
    }

    tempSomeFunc();

    // Rendering function
    var render = function () {
      requestID = requestAnimationFrame(render);
      fraction = (fraction + speedOfBall) % 1;
      line.material.dashSize = fraction * lineLength;

      if (color < 0xdddddd) color += 0x0000ff;
      renderer.render(scene, camera);
    };
    render();
  }
  const toggleColour = () => {
    setShouldShowColors(!shouldShowColors)
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: 5 }}>
        <button style={{padding: 5 }} onClick={animationField}>NEXT BALL</button>
        <button style={{padding: 5 }} onClick={() => tempSomeFunc()}>ADD NEW BALL</button>
        <button style={{padding: 5 }} onClick={() => window.cancelAnimationFrame(requestID)}>STOP</button>
        <button style={{padding: 5 }} onClick={toggleColour}>SHOW/HIDE COLOURS</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        Adjust Ball Speed
        <button style={{padding: '5px 20px 5px 20px', margin: 5 }} onClick={() => setSpeedOfBall(speedOfBall-.001)}>-</button>
        <button style={{padding: '5px 20px 5px 20px', margin: 5 }} onClick={() => setSpeedOfBall(speedOfBall+.001)}>+</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }} id='divID'></div>
    </div>
  )
}

export default App;