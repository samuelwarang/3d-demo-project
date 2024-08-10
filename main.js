import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Set up the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background color to white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Add an ambient light for softer shadows
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

let model;
const loader = new GLTFLoader();
loader.load('./assets/scene.gltf', function (gltf) {
    model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3); // Scale the model to be a bit smaller
    model.position.set(0, 0, 0);    // Center the model
    scene.add(model);
}, undefined, function (error) {
    console.error('An error happened while loading the model:', error);
});

camera.position.z = 10; // Position the camera further back

// Handle scroll event for model movement
window.addEventListener('scroll', () => {
    if (model) {
        const scrollY = window.scrollY;
        model.position.x = -scrollY * 0.01; // Move left on scroll down
        model.rotation.y = scrollY * 0.05;  // Rotate counter-clockwise on scroll down
    }
});

let floatingSpeed = 0.02; // Adjusted speed of the floating motion
let floatingAmplitude = 0.2; // Reduced amplitude for subtle movement
let floatingOffset = 0; // Initial offset for smooth animation

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        // Apply a small floating effect
        model.position.y = Math.sin(floatingOffset) * floatingAmplitude;
        floatingOffset += floatingSpeed; // Increment the offset for smooth movement
    }

    renderer.render(scene, camera);
}


animate()


// Add hero text
// const heroText = document.createElement('div');
// heroText.style.position = 'absolute';
// heroText.style.top = '50%';
// heroText.style.left = '50%';
// heroText.style.transform = 'translate(-50%, -50%)';
// heroText.style.fontSize = '4rem';
// heroText.style.fontFamily = 'Arial, sans-serif';
// heroText.style.color = '#000'; // Black text color
// heroText.textContent = '3D Demo';
// document.body.appendChild(heroText);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
