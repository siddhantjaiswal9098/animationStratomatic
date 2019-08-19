
import * as React from 'react';
import * as THREE from 'three';

/**
 * Copyright (c) 2013 Ben Lesh
 * Pong ThreeJS demo
 */

console.clear();

const App = (props: any) => {
  // let div = document.createElement('div');
  React.useEffect(() => {


  }, [])
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
        renderer.setSize((window.innerWidth * 60) / 100, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    
        // Set up the main camera
        camera.position.z = 5;
    
        let loader = new THREE.TextureLoader();
    
        loader.load('images/field2.png', function (texture: any) {
          scene.background = texture;
        });
    
        const someFunc = () => {
          // var points2 = (new THREE.BoxGeometry(10, 10, 10, 4, 4, 4)).vertices;
          // console.log('points:: --->>', points2)
    
          var num = Math.floor(Math.random() * 5) + 1;
          num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    
    
          console.log('num', num)
    
          var num2 = Math.floor(Math.random() * 4) + 1;
          num2 *= Math.floor(Math.random() * 2) == 1 ? 1 : 1;
          console.log('num2', num2)
    
          var points = [
            new THREE.Vector3(0, -2.55, 0), 
            // new THREE.Vector3(2.4, 1.9, 0), 
            new THREE.Vector3(num, num2, 0), 
            
            new THREE.Vector3(5, -0.5, 0)]
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
            colors[index] = color.r;
            colors[index + 1] = color.g;
            colors[index + 2] = color.b;
    
            if (i > 0) {
              lineDistances[i] = lineDistances[i - 1] + points[i - 1].distanceTo(points[i]);
            }
          }
    
          lineLength = lineDistances[numPoints - 1];
    
          // material
          var material = new THREE.LineDashedMaterial({
    
            vertexColors: THREE.VertexColors,
            dashSize: 1, // to be updated in the render loop
            gapSize: 1e10, // a big number, so only one dash is rendered
            linewidth: 6
          });
    
          // line
          line = new THREE.Line(geometry, material);
          scene.add(line);
        }
    
        someFunc();
        // var somebool = true;
    
        // Rendering function
        var render = function () {
          //    setTimeout(() => {
          //     somebool = false;
          // }, 4000)
          // if(somebool) {
            requestAnimationFrame(render);
    
          // }
          fraction = (fraction + 0.003) % 1;
          line.material.dashSize = fraction * lineLength;
    
          // setTimeout(() => {
          //   window.cancelAnimationFrame( requestID )
          // }, 400)
    
          // Update the color to set
          if (color < 0xdddddd) color += 0x0000ff;
          renderer.render(scene, camera);
        };
    
    
        render();
  }
  return (
    <div > 
      <div>
        <button onClick={() => animationField()}>NEXT BALL</button>
      </div>
    </div>
  )
}


export default App;