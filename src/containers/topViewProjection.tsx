
import * as React from 'react';
import * as THREE from 'three';

/**
 * Copyright (c) 2013 Ben Lesh
 * Pong ThreeJS demo
 */

console.clear();

const Projection = (props: any) => {
    var mesh: any,mesh2: any,  renderer: any, scene: any, camera: any;
    var nEnd = 0, nMax: any, nStep = 90, endX: number, endY: number, endZ: number; // 30 faces * 3 vertices/face
    var isCall = false;
    init();
    animate();
    var projection: any;
    function init() {

        // renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.setSize(779.4, 619);

        // scene
        scene = new THREE.Scene();

        // camera
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(10, 5, 100);

        scene.add(camera); //required, since camera has a child light

        // controls
        // controls = new THREE.OrbitControls( camera, renderer.domElement );
        // controls.minDistance = 5;
        // controls.maxDistance = 20;

        // ambient
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));

        // light
        var light = new THREE.PointLight(0xffffff, 0.5);
        light.position.set(20, 20, 0);
        camera.add(light);

        // axes
        scene.add(new THREE.AxesHelper(20));

        let loader = new THREE.TextureLoader();

        loader.load('images/field2.png', function (texture: any) {
            scene.background = texture;
        });


        // points
        projection = (x: any, y: any, z: any, type: any) => {
            var num2 = Math.floor(Math.random() * 20) - 5 ;
           // num2 *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            console.log("num===", num2)
            x = num2;
            nEnd = 0;
            isCall = false;
            endX = x;
            //endY = y;
            endZ = z;

            var randomY = Math.floor(-3 + Math.random()*(40 + 1 + 3))
            y = randomY;
            endY = y;
            console.log("inside projection===", x, y, z)


            // geometry
            var numPoints = 100;

                var start = new THREE.Vector3(10, -20, 0);
                
          
                var middle = new THREE.Vector3((10 + x) / 2, (-20 + y) / 2+5, 90);
            
                var end = new THREE.Vector3(x, y, 0);

            
                var start2 = new THREE.Vector3(x, y, 0);
                var middle2 = new THREE.Vector3((50 + x) / 2, (-20 + y) / 2+5, 50);
                var end2 = new THREE.Vector3(55, 0, 0);
                
            console.log("call 103")





            var curveQuad2 = new THREE.QuadraticBezierCurve3(start2, middle2, end2);

            var geometry2: any = new THREE.TubeGeometry(curveQuad2, numPoints, 0.5, 20, false);
            // to buffer goemetry
            geometry2 = new THREE.BufferGeometry().fromGeometry(geometry2);
            nMax = geometry2.attributes.position.count;

            // material
            var material2 = new THREE.MeshPhongMaterial({
                color: 0x00ffff,
                side: THREE.DoubleSide
            });

            // mesh
            mesh2 = new THREE.Mesh(geometry2, material2);       
            scene.add(mesh2);







            var curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);

            var geometry: any = new THREE.TubeGeometry(curveQuad, numPoints, 0.5, 20, false);
            // to buffer goemetry
            geometry = new THREE.BufferGeometry().fromGeometry(geometry);
            nMax = geometry.attributes.position.count;

            // material
            var material = new THREE.MeshPhongMaterial({
                color: 0x00ffff,
                side: THREE.DoubleSide
            });

            // mesh
            mesh = new THREE.Mesh(geometry, material);       
            scene.add(mesh);



            
            animate();
        }
        endX = 15;
        endY = 0;
        endZ = 20;
        projection(0, 50, -50, "left");

    }


    function animate() {
        if (nEnd > 11800) {
            isCall = false;
            console.log("call endX==", endX, endY, endZ)
            renderer.render(scene, camera);

            
        } else {
            isCall = true
        }
        if (isCall) {
            console.log("call 123")
            requestAnimationFrame(animate);

            nEnd = (nEnd + nStep) % nMax;

            mesh.geometry.setDrawRange(0, nEnd);
            mesh2.geometry.setDrawRange(0, nEnd);


            renderer.render(scene, camera);
        }
    }

    return (
        <div >
            <div>
                <button onClick={() => projection(0, 50, -50, "left")}>Next Ball</button>
            </div>
        </div>
    )
}


export default Projection;