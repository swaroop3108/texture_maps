import * as THREE from 'https://threejs.org/build/three.module.js';
import { PointerLockControls } from 'https://threejs.org//examples/jsm/controls/PointerLockControls.js'

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new PointerLockControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.update();

export function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

camera.position.z = -75;
camera.position.x = -50;
camera.position.y = 25;
camera.lookAt(0, 0, -20)

scene.add(new THREE.AmbientLight(0xffffff, 2));

scene.background = new THREE.Color(0xffffff);
const textureLoader = new THREE.TextureLoader();

const main = textureLoader.load("./textures/main.png");
const normalmap = textureLoader.load("./textures/normalmap.png");
const heightmap = textureLoader.load("./textures/heightmap.png");
const roughnessmap = textureLoader.load("./textures/roughnessmap.png");
const aomap = textureLoader.load("./textures/aomap.png");

const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1500, 1500), new THREE.MeshStandardMaterial({
  map: main,
  normalMap: normalmap,
  displacementMap: heightmap,
  displacementScale: 13,
  roughnessMap: roughnessmap,
  roughness: 0.55,
  aoMap: aomap
}))
plane.rotation.x = - Math.PI / 2;
plane.geometry.attributes.uv2 = plane.geometry.attributes.uv;
plane.position.y = 0
plane.position.x = 0
scene.add(plane)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.x += 20
directionalLight.position.y += 20
directionalLight.position.z += 20
scene.add(directionalLight);

function animate () {
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

document.body.appendChild(renderer.domElement);
animate();