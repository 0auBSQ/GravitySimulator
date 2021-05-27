import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';

// Scene variables and constants
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Default planet mesh variables
let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
let geometry = new THREE.SphereBufferGeometry(1, 64, 64);

const loader = new THREE.TextureLoader();

let planet = new THREE.Mesh(geometry, material);
scene.add(planet);

// Object mesh variables
let tmp_geometry = new THREE.SphereBufferGeometry(0.05, 64, 64);
let attacking_object = new THREE.Mesh(tmp_geometry, material);
attacking_object.position.y = 3;
scene.add(attacking_object);

// Planet data loader
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
      camera.position.z = 5 * ratio;
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


// Scene renderer variables
let renderer;
let composer;
let renderPass;
let outlinePass;

// Camera position initializer
camera.position.z = 2;
camera.position.y = 1;
camera.position.x = 0;


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Planet rotation animation
const animate = () => {
  requestAnimationFrame(animate);
  //planet.rotation.x += 0.01;
  planet.rotation.y += 0.005;
  renderer.render(scene, camera);
  composer.render(scene, camera);
};

// Camera resize parameters
const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  let pixelRatio = window.devicePixelRatio || 0;
  composer.setSize(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// Skybox texture loading
const set_skybox = () => {
  const sloader = new THREE.TextureLoader();
  const tex = sloader.load("https://i.imgur.com/9b413YA.png");
  scene.background = tex;
};

// Attacking object loading
const load_object = (obj, pl) => {
  const oloader = new GLTFLoader();
  oloader.load(obj.model, function (gltf) {
    scene.remove(attacking_object);
    attacking_object = gltf.scene;
    scene.add(attacking_object);
    attacking_object.position.x = 0;
    attacking_object.position.y = pl.radius * 1.5;
    attacking_object.position.z = 0;
    attacking_object.scale.x = obj.radius;
    attacking_object.scale.y = obj.radius;
    attacking_object.scale.z = obj.radius;
    outlinePass.selectedObjects = [attacking_object];
  }, undefined, function (e) {
    console.error(e);
  });
};

// Attacking object outline processing
const load_effects = () => {
  renderPass = new RenderPass(scene, camera);
  outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
  outlinePass.renderToScreen = true;
  outlinePass.edgeStrength = 2;
  outlinePass.edgeGlow = 1;
  outlinePass.visibleEdgeColor.set(0xffffff);
  outlinePass.hiddenEdgeColor.set(0xffffff);
  composer.addPass(renderPass);
  composer.addPass(outlinePass);
};

// Simulation specific variables
let direction_vector;
let current_speed;
let obj_distance;
let tid;
let simulation_speed = 100;
let tmpPos = new THREE.Vector3(0., 0., 0.);

// Simulation main loop
const object_drop = (params) => {
	let repetitions = simulation_speed;

	// Edit a deep copy of the object position and set it back then
	tmpPos.copy(attacking_object.position);
	let {planet, object, interval} = params;

	// Calculate multiple trajectoires at once before rendering if the simulation speed is over 1x
	while (repetitions > 0) {

	  // Planet is always (0, 0, 0)
	  obj_distance = Math.sqrt(Math.pow(tmpPos.x, 2) + Math.pow(tmpPos.y, 2) + Math.pow(tmpPos.z, 2));
	  // Handle collision
	  if (obj_distance <= planet.radius) {
	    clearInterval(tid);
			break ;
	  }

		// Planet gravity pull formula, earth is about 9.8 at its surface, we want N per kg so we don't include the object mass
	  let gravity_params = {
	    m1: planet.mass * 5.972 * Math.pow(10, 24),
	    m2: 1,
	    d: obj_distance * 6371000,
	    G: 6.67408 * Math.pow(10, -11),
	  };
	  let gravity_pull = (gravity_params.G * gravity_params.m1 * gravity_params.m2) / Math.pow(gravity_params.d, 2);
		// Gravity pull force vector for the current frame
	  let gravity_vector = new THREE.Vector3(-tmpPos.x, -tmpPos.y, -tmpPos.z).normalize().multiplyScalar(gravity_pull * (interval / 1000.) / 6371000);
		//let speed_vector = new THREE.Vector3(current_speed.x, current_speed.y, 0.);

		direction_vector.add(gravity_vector);
		//direction_vector.add(speed_vector);
		tmpPos.add(direction_vector);

		repetitions--;
	}


  attacking_object.position.copy(tmpPos);
}

// Interval wrapper to provide arguments using anonymous functions
const createInterval = (f, dynamicParams, interval) => {
  return setInterval(function() { f({...dynamicParams, interval: interval});}, interval);
}

// Play simulation, executed once each time the button is clicked
export const playAnimation = (el, obj, speed, sspeed) => {
	clearInterval(tid);
	// Reset object pos
	attacking_object.position.set(0., el.radius * 1.5,0.);
	// Simulation parameters (simulation speed and millis per frame)
	let interval = 20;
	simulation_speed = sspeed;
	// "Current speed" here is actually just a single burst for one frame when the object is launched
	console.log(speed);
	current_speed = {
		x: (speed.x * (interval / 1000.)) / 6371000,
		y: (speed.y * (interval / 1000.)) / 6371000,
	}
	// Initial direction vector
  direction_vector = new THREE.Vector3(current_speed.x, current_speed.y, 0.);
	// Asynchronous simulation using setInterval
  tid = createInterval(object_drop, {planet: el, object: obj}, interval);
}

// Scene initialisation
export const createScene = (el) => {
  renderer = new THREE.WebGLRenderer({antialias: true, canvas: el});
  composer = new EffectComposer(renderer);
  const controls = new OrbitControls(camera, el);
  controls.target.set(0, 0, 0);
  controls.update();
  load_effects();
  set_skybox();
  resize();
  animate();
}

// Scene reload
export const refreshScene = (el, obj) => {
  console.log(el);
  console.log(obj);
  clearInterval(tid);
  reload_material(el.id, el.radius);
  load_object(obj, el);
}

window.addEventListener('resize', resize);
