
import * as React from 'react';
import * as THREE from 'three';

/**
 * Copyright (c) 2013 Ben Lesh
 * Pong ThreeJS demo
 */

console.clear();

const Projection = (props: any) => {
    var mesh: any, renderer: any, scene: any, camera: any;
    var textValue:any = 0;
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

        loader.load('images/field4.png', function (texture: any) {
            scene.background = texture;
        });
        // points
        projection = (x: any, y: any, z: any, type: any) => {
            textValue++;
            var num2 = Math.floor(Math.random() * 20) - 5 ;
           // num2 *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            console.log("num===", num2)
            x = num2;
            nEnd = 0;
            isCall = false;
            endX = x;
            //endY = y;
            endZ = z;

            var randomY = Math.floor(-3 + Math.random()*(6 + 1 + 3))
            y = randomY;
            endY = y;
            console.log("inside projection===", x, y, z)

            console.log("call projection")

            var points = [];
            for (var i = 0; i < 18; i++) {

                points.push(new THREE.Vector3(Math.cos(i * Math.PI / 2), i / 9 - 1, Math.sin(i * Math.PI / 2)).multiplyScalar(3));

            }

            // geometry
            //   var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );
            var numPoints = 100;

            // var start = new THREE.Vector3(20, 28, 0);
            // var middle = new THREE.Vector3(0, 14, 0);
            // var end = new THREE.Vector3(-15, 0, 20);

            // var start = new THREE.Vector3(20, 28, 0);
            // var middle = new THREE.Vector3(0, 15, 0);
            // var end = new THREE.Vector3(-15, 1, 20);

            // var start = new THREE.Vector3(20, 28, 0);
            // var middle = new THREE.Vector3(9, 15, 0);
            // var end = new THREE.Vector3(-2, 1, 20);

            if (type == "left") {
                var start = new THREE.Vector3(20, 50, -50);
            } else {
                var start = new THREE.Vector3(6, 50, -50);
            }

            if (type == "left") {
                var middle = new THREE.Vector3((20 + x) / 2, (50 + y) / 2+5, 0);
            } else {
                var middle = new THREE.Vector3((6 + x) / 2, (50 + y) / 2+5, 0);
            }

            var end = new THREE.Vector3(x, y, 50);
            console.log("call 103")


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
            
           
           // loader.load('fonts/helvetiker_regular.typeface.json', function (font) {

                //  new THREE.TextGeometry('Hello three.js!', {
                //     size: 80,
                //     height: 5,
                //     curveSegments: 12,
                //     bevelEnabled: true,
                //     bevelThickness: 10,
                //     bevelSize: 8,
                //     bevelOffset: 0,
                //     bevelSegments: 5
                // });
                // console.log("txt_mesh==", textGeometry)
                // var txt_mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
                // var txt_mesh = new THREE.Mesh(textGeometry, txt_mat);

                // txt_mesh.position.z = 0.2;
                // txt_mesh.position.y = 5;
                // txt_mesh.rotation.y = -Math.PI / 8;
                // scene.add(txt_mesh);
           // });



            scene.add(mesh);
            animate();
        }
        endX = 15;
        endY = 0;
        endZ = 20;
        projection(-15, 0, 20, "left");

    }


    function animate() {
        if (nEnd > 11800) {
            isCall = false;
            var circleGeometry = new THREE.CircleGeometry(1, 16);
            var circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            var circle = new THREE.Mesh(circleGeometry, circleMaterial);
            console.log("call endX==", endX, endY, endZ)
            circle.position.set(endX, endY, 50);

            scene.add(circle);
            var fontLoader = new THREE.FontLoader();
            fontLoader.load('gentilis_bold.typeface.json', function (font) {
            var textGeometry = new THREE.TextGeometry( JSON.stringify(textValue), {   
                    font: font,             
                    size: 1.2,
                    height: 0.01
            } );

             console.log("txt_mesh==", textGeometry)
                var txt_mat = new THREE.MeshPhongMaterial({ color: "red" });
                var txt_mesh = new THREE.Mesh(textGeometry, txt_mat);

                txt_mesh.position.set(endX- 0.7, endY- 0.5, 50)
            
              scene.add(txt_mesh);
              renderer.render(scene, camera);
        });

            
        } else {
            isCall = true
        }
        if (isCall) {
            console.log("call 123")
            requestAnimationFrame(animate);

            nEnd = (nEnd + nStep) % nMax;

            mesh.geometry.setDrawRange(0, nEnd);

            renderer.render(scene, camera);
        }
    }

    return (
        <div >
            <div>
                <button onClick={() => projection(-2, 1, 20, "left")}>Left Projection</button>
                <button onClick={() => projection(-2, 1, 20, "right")}>Right Projection</button>
            </div>
        </div>
    )
}


export default Projection;