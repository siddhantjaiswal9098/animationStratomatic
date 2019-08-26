import * as React from 'react';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import { OrbitControls } from 'three-orbitcontrols-ts';

const App = (props: any) => {
    const [shouldShowColors] = React.useState(true)
    const [speedOfBall] = React.useState(0.003)

    React.useEffect(() => {
        animationField();
    }, [])

    React.useEffect(() => {
        animationField()
    }, [shouldShowColors, speedOfBall]);

    let tempSomeFunc: any;
    const animationField = () => {
        // "constants"... 

        // Create your main scene
        var scene = new THREE.Scene();

        // Create your main camera
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Create lights
        var light = new THREE.PointLight(0xEEEEEE);

        let loader = new THREE.TextureLoader();

        loader.load('images/pitchImage.jpg', function (texture: any) {
          scene.background = texture;
        });

        light.position.set(20, 0, 20);
        scene.add(light);
        var lightAmb = new THREE.AmbientLight(0x777777);
        scene.add(lightAmb);

        // Create your renderer
        var myCanvasElement: any = document.createElement("CANVAS");
        var renderer = new THREE.WebGLRenderer({ canvas: myCanvasElement });
        renderer.setSize(window.innerWidth, window.innerHeight);
        // divID

        var controls = new OrbitControls( camera, renderer.domElement );

        //controls.update() must be called after any manual changes to the camera's transform
        camera.position.set( 0, 0, 0 );
        controls.update();


        let elementOnDom: any = document.getElementById("divID")

        if (elementOnDom.hasChildNodes()) {
            elementOnDom.removeChild(elementOnDom.childNodes[0]);
        }
        elementOnDom.appendChild(renderer.domElement);

        var list = document.getElementById("divID");
        console.log('lisst  sdadasd', list);

        // Set up the main camera
        camera.position.z = 5;

        tempSomeFunc = () => {

            scene.add(new THREE.AxesHelper(20));
            const loader2 = new GLTFLoader();
            // Load a glTF resource
            loader2.load(
                // resource URL
                'images/Baseball_Pitching.glb',
                // called when the resource is loaded
                function (gltf: any) {
                    scene.add(gltf.scene);
                    gltf.animations; // Array<THREE.AnimationClip>
                    gltf.scene; // THREE.Scene
                    gltf.scenes; // Array<THREE.Scene>
                    gltf.cameras; // Array<THREE.Camera>
                    gltf.asset; // Object

                },
                // called while loading is progressing
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                function (error) {
                    console.log('An error happened');
                }
            );
        }

        tempSomeFunc();

        // Rendering function
        var render = function () {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        };
        render();
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }} id='divID'></div>
        </div>
    )
}

export default App;