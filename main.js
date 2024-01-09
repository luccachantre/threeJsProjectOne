import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); //camera initializes in the middle of the scene(0,0,0)
//so we want to back it up a bit so the camera can actually see items placed near and around the origin

//remove this later maybe
//camera.position.setY(15);


renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( {color: 0x3663D9} );
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 5, 0);
pointLight.intensity = 200;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight); 

const lightHelper = new THREE.PointLightHelper(pointLight); //creates a basic wireframe polygon to show the location of the point light
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  controls.update();

  renderer.render(scene, camera);
}

animate();




