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

//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(6, 3, 6);
pointLight.intensity = 200;

const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(pointLight, ambientLight); 

const lightHelper = new THREE.PointLightHelper(pointLight); //creates a basic wireframe polygon to show the location of the point light
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const starGeometry = new THREE.SphereGeometry(0.25);
const starMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff} );

function addStar() {
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('galaxy.jpg');
//"it's worth noting that you can also pass a callback function here
// to be notified when the image is done loading. That's useful if you wanna show a loading bar
//if your scene relies on a lot of static assets."
scene.background = spaceTexture; 
//color was distorted (much lighter than original image) so I just set background to a solid color
scene.background = new THREE.Color(0x230055);

const dusknoirTexture = new THREE.TextureLoader().load('dusknoir.jpg');
dusknoirTexture.colorSpace = THREE.SRGBColorSpace; //ok so this is needed for all textures or else the colors will be distorted upon loading
//there might be a way to do this for the renderer instead of each individual texture, I'll have to look into this

const dusknoir = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial( {map: dusknoirTexture} )
);


scene.add(dusknoir);


const earthTexture = new THREE.TextureLoader().load('earth.jpg');
earthTexture.colorSpace = THREE.SRGBColorSpace;
const normalTexture = new THREE.TextureLoader().load('earthNormal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {map: earthTexture, normalMap: normalTexture} )
);

scene.add(earth);
//earth.translateY(10);
//earth.translateX(23);
//earth.translateZ(4);



//some logic for transformations:
//let's say you have an object that is not at the origin and you want to rotate it at its current position. 
//you must first translate it to the origin, perform the rotation, and then translate it back to its original position

dusknoir.translateX(-15);
dusknoir.translateY(8);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  dusknoir.rotation.y += 0.01;

  earth.rotation.y += 0.015;

  controls.update();

  // camera.translateX(0.1);

  //pointLight.translateX(0.1)

  renderer.render(scene, camera);
}

animate();




