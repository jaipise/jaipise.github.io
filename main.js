import './style.css'

import * as THREE from 'three';

// orbit controls let us move around the screen with our mouse


// always need three objects:
// 1. scene - like a container, that holds all your cameras, objects, and light
// 2. camera - needed to look at things within the scene
// 3. renderer - actually renders the graphics to the scene; render == DRAW

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// arguments:
//  field of view (number of deg visible out of 360°)
//  aspect ratio - based on the user's browser window
//  view frustrum (last 2 args) - to control which objects are visible relative to the camera itself

// renderer needs to know which DOM element to use
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
// make it a full screen canvas:
renderer.setSize(window.innerWidth, window.innerHeight);

// currently our camera is positioned in the middle of the screen, so we can move it along the z-axis
camera.position.setZ(30);

// render == DRAW
renderer.render(scene, camera);

// create an object, 3 basic steps:
// 1. Geometry: set of vectors that define the object itself
// 2. Material - give texture to the obejct (the wrapping paper for an object)
// 3. Mesh - geometry + material - actual thing that we want to add to the scene

// creating a torus object

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// this basic material requires no light source (generally, materials require a light source so that they can bounce of light)
// MeshStandardMaterial reacts to light ouncing off of it (as opposed to MeshBasicMaterial)
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 }); // Hexadecimal literal: 0x at the start tell us we're working ith a hexadecimal value

const torus = new THREE.Mesh(geometry, material)
scene.add(torus);

// many differnet types of lighting in 3js, but easy one is pointLight - points light in all directions
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff); // more like a floodlight in the room
scene.add(pointLight, ambientLight);

// 3js helpers help us find where the light sources are:
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)







// to call the render method automatically, set up a recursive function:
function animate() {
  requestAnimationFrame(animate); // tells the browser you want to do an animation

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;
  // torus.rotation.z += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera); // Game loop to update the UI
}

animate();