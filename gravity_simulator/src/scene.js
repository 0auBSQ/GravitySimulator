import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);

const loader = new THREE.TextureLoader();

let planet = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), material);
scene.add(planet);

loader.load(
	// resource URL
	'https://solartextures.b-cdn.net/2k_earth_daymap.jpg',
	// onLoad callback
	function (texture) {
		// in this example we create the material when the texture is loaded
		material = new THREE.MeshBasicMaterial({map: texture});
    planet.material = material;
    console.log("loaded");
	},
	// onProgress callback currently not supported
	undefined,
	// onError callback
	function ( err ) {
		console.error( 'An error happened.' );
	}
);


let renderer;
//scene.add(cube);

camera.position.z = 5;


const animate = () => {
  requestAnimationFrame(animate);
  planet.rotation.x += 0.01;
  planet.rotation.y += 0.01;
  renderer.render(scene, camera);
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

export const createScene = (el) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  resize();
  animate();
}

window.addEventListener('resize', resize);
