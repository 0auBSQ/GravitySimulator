import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
let geometry = new THREE.SphereBufferGeometry(1, 64, 64);

//const cube = new THREE.Mesh(geometry, material);

const loader = new THREE.TextureLoader();

let planet = new THREE.Mesh(geometry, material);
scene.add(planet);

let tmp_geometry = new THREE.SphereBufferGeometry(0.05, 64, 64);
let attacking_object = new THREE.Mesh(tmp_geometry, material);
attacking_object.position.y = 3;
scene.add(attacking_object);

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
let composer;
let renderPass;
let outlinePass;
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
  composer.render(scene, camera);
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  let pixelRatio = window.devicePixelRatio || 0;
  composer.setSize(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

const set_skybox = () => {
  const sloader = new THREE.TextureLoader();
  const tex = sloader.load("https://i.imgur.com/9b413YA.png");
  scene.background = tex;
};

const load_object = (obj, pl) => {
  const oloader = new GLTFLoader();
  oloader.load(obj.model, function (gltf) {
    scene.remove(attacking_object);
    attacking_object = gltf.scene;
    scene.add(attacking_object);
    attacking_object.position.x = 0;
    attacking_object.position.y = pl.radius * 3;
    attacking_object.position.z = 0;
    attacking_object.scale.x = obj.radius;
    attacking_object.scale.y = obj.radius;
    attacking_object.scale.z = obj.radius;
    outlinePass.selectedObjects = [attacking_object];
  }, undefined, function (e) {
    console.error(e);
  });
};

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

export const refreshScene = (el, obj) => {
  console.log(el);
  console.log(obj);
  reload_material(el.id, el.radius);
  load_object(obj, el);
}

window.addEventListener('resize', resize);
