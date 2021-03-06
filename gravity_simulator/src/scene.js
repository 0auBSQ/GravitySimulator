import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
let geometry = new THREE.SphereBufferGeometry(1, 64, 64);

//const cube = new THREE.Mesh(geometry, material);

const loader = new THREE.TextureLoader();

let planet = new THREE.Mesh(geometry, material);
scene.add(planet);

const reload_material = (link, ratio) => {
  loader.load(
  	// resource URL
  	link,
  	// onLoad callback
  	function (texture) {
  		// in this example we create the material when the texture is loaded
  		material = new THREE.MeshBasicMaterial({map: texture});
      geometry = new THREE.SphereBufferGeometry(ratio, 64, 64);
      planet.material = material;
      planet.geometry = geometry;
      camera.position.z = 2 * ratio;
      camera.position.y = ratio;
      camera.position.x = 0;
      camera.rotation.x = 0;
      camera.rotation.y = 0;
      camera.rotation.z = 0;
      console.log("loaded");
  	},
  	// onProgress callback currently not supported
  	undefined,
  	// onError callback
  	function ( err ) {
  		console.error( 'An error happened.' );
  	}
  );
};


let renderer;
//scene.add(cube);

camera.position.z = 2;
camera.position.y = 1;
camera.position.x = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const animate = () => {
  requestAnimationFrame(animate);
  //planet.rotation.x += 0.01;
  planet.rotation.y += 0.005;
  renderer.render(scene, camera);
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

const set_skybox = () => {
  const sloader = new THREE.TextureLoader();
  const tex = sloader.load("https://i.imgur.com/9b413YA.png");
  scene.background = tex;
};

export const createScene = (el) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  const controls = new OrbitControls(camera, el);
  controls.target.set(0, 0, 0);
  controls.update();
  set_skybox();
  resize();
  animate();
}

export const refreshScene = (el) => {
  console.log(el);
  reload_material(el.id, el.radius);
}

window.addEventListener('resize', resize);
