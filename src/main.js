import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';
import TweenMax from 'gsap';
import Stats from 'stats.js';
import './main.css';

// shaders
import vertex from './shaders/displacement-vertex.glsl';
import fragment from './shaders/noop-fragment.glsl';

// stats
const stats = new Stats();
document.body.appendChild(stats.domElement);

// scene, renderer, camera, mesh (geometry + material)
const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// enbale the drawing of shadows
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xf8ebb8);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 40, 100);
// controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// axis helper
const axisHelper = new THREE.AxisHelper(100);
scene.add(axisHelper);

// lights
const light = new THREE.AmbientLight(0x888888);
scene.add(light);

// geomertry
const g = new THREE.BoxGeometry(1, 1, 300, 1, 1, 60);
const m = new THREE.ShaderMaterial({
	uniforms: {
		count: { value: 0.0 },
	},
	vertexShader: vertex,
	fragmentShader: fragment,
});
// const mesh = new THREE.Mesh(g, m);
// scene.add(mesh);
// mesh.position.z = 15;

let y = 0;
for (let i = 0; i < 100; i++) {
	const mesh = new THREE.Mesh(g, m);
	let x = 0;
	if (i % 2 === 0) x = 15;
	mesh.position.set(x, i * 10, 0);
	mesh.rotation.y = Math.PI / 2;
	scene.add(mesh);
}

const handleResize = () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
addEventListener('resize', handleResize);

let count = 0;
const animate = timestamp => {
	requestAnimationFrame(animate);
	stats.begin();
	m.uniforms.count.value = ++count;
	renderer.render(scene, camera);
	stats.end();
};
animate();
