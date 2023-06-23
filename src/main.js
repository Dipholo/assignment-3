import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
// import MY_MODEL from "./maersk_container_ship.glb"

const scene = new THREE.Scene();
// creating and positioning the camera
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set( 0, 10, 50 );

 // adding light to the scene
 const light = new THREE.DirectionalLight({color: 0xFFFFFF, intensity: 100});
 light.position.set(1, 0, 0); // position the light
 scene.add(light);
 // adding light to the scene
 const ambientLight = new THREE.AmbientLight(0xffffff, 1);
 ambientLight.position.set(1, 0, 0); // position the light
 scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader(); // to load material on mesh objects

const ground = textureLoader.load('./ocean.jpg')
var PlaneGeometry = new THREE.PlaneGeometry(1600, 1600);
var planeMaterial = new THREE.MeshStandardMaterial({map: ground});
var planeMesh = new THREE.Mesh(PlaneGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.set = (0, 0, 0);
scene.add(planeMesh); 

const sky = textureLoader.load('./skyyy.jpg')
var PlaneGeometry = new THREE.PlaneGeometry(500, 500);
var planeMaterial = new THREE.MeshStandardMaterial({map: sky});
var planeMesh = new THREE.Mesh(PlaneGeometry, planeMaterial);
planeMesh.position.z = -280;
planeMesh.position.y = 150;
scene.add(planeMesh);


// Creating a loader for the glTF/GLB file
const loader = new GLTFLoader();

// Loading the glTF/GLB file
   loader.load("maersk_container_ship.glb",  (gltf)=> {
    // The model has been loaded successfully
      console.log('Model has been loaded successfully and added to the scene!')
    // Adding the model to the scene
    scene.add(gltf.scene);
     // Positioning and scaling the model as desired
    gltf.scene.position.set(0, -1.7, 0);
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.rotation.y = 2 * Math.PI * (-90 / 360) ;
  },
  function (xhr) {
    // Called while loading is in progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function ( err ) {
    // Called if there's an error loading the glTF/GLB file
    console.log('Error loading glTF/GLB file:', err);
   
  }
);



// creating the controls
const controls = new OrbitControls(camera, renderer.domElement);

const controls2 = new PointerLockControls(camera, renderer.domElement);
let clock = new THREE.Clock();
scene.add(controls2.getObject());

document.addEventListener('click', () => {
  controls2.lock();
});

let keyboard = [];
addEventListener('keydown', (e)=>{
   keyboard[e.key] = true;
});
addEventListener('keyup', (e)=>{
   keyboard[e.key] = false;
});

function processKeyboard(delta){
   let speed = 5;
   let actualSpeed = speed * delta;
   if(keyboard["w"]){
      controls2.moveForward(actualSpeed);
   }
   if(keyboard["s"]){
      controls2.moveForward(-actualSpeed);
   }
   if(keyboard["a"]){
      controls2.moveRight(actualSpeed);
   }
   if(keyboard["d"]){
      controls2.moveRight(-actualSpeed);
   }
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    let delta = clock.getDelta();
    processKeyboard(delta);
}
animate();