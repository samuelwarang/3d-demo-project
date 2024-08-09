import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
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
    model.scale.set(0.5, 0.5, 0.5); // Scale the model to make it visible
    model.position.set(0, 0, 0);    // Ensure the model is centered
    scene.add(model);
}, undefined, function (error) {
    console.error('An error happened while loading the model:', error);
});

camera.position.z = 10; // Move the camera back to see the model better

// Function to handle model movement on vertical scroll
function onScroll() {
    if (model) {
        const scrollY = window.scrollY; // Use scrollY to get the vertical scroll position
        model.position.x = scrollY * 0.01; // Adjust this factor to control the horizontal movement speed
    }
}

window.addEventListener('scroll', onScroll);

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        // Slow rotation animation
        model.rotation.y += 0.01; // Rotate around the Y-axis at a slow speed
        model.rotation.x += 0.005; // Rotate around the X-axis at a slower speed
    }

    renderer.render(scene, camera);
}

animate();
