<script>
	import { onMount } from 'svelte';
	import { createScene, refreshScene, playAnimation } from "./scene";
	import { MaterialApp, Button, Select, Slider, AppBar, Chip } from 'svelte-materialify';

	let pageName = "Simulation";

	let el;
  onMount(() => {
    createScene(el)
		refresh_model();
  });

	// Svelte materialize theme
	const theme = "dark";

	// Retrieve item in an object array depending of one of its parameters (here the name)
	const retrieveObject = (arr, what) => arr.find(e => e.name === what);

	// Planetes
	let planetes = [
		{ id: `https://solartextures.b-cdn.net/2k_earth_daymap.jpg`, text: `Earth`, radius: 1, mass: 1, name: `Earth`, value: `Earth` },
		{ id: `https://solartextures.b-cdn.net/2k_mercury.jpg`, text: `Mercury`, radius: 0.38, mass: 0.055, name: `Mercury`, value: `Mercury` },
		{ id: `https://solartextures.b-cdn.net/2k_venus_atmosphere.jpg`, text: `Venus`, radius: 0.95, mass: 0.815, name: `Venus`, value: `Venus` },
		{ id: `https://solartextures.b-cdn.net/2k_mars.jpg`, text: `Mars`, radius: 0.53, mass: 0.107, name: `Mars`, value: `Mars` },
		{ id: `https://solartextures.b-cdn.net/2k_jupiter.jpg`, text: `Jupiter`, radius: 11.20, mass: 317.8, name: `Jupiter`, value: `Jupiter` },
		{ id: `https://solartextures.b-cdn.net/2k_saturn.jpg`, text: `Saturn`, radius: 9.45, mass: 95.16, name: `Saturn`, value: `Saturn` },
		{ id: `https://solartextures.b-cdn.net/2k_uranus.jpg`, text: `Uranus`, radius: 4, mass: 14.54, name: `Uranus`, value: `Uranus` },
		{ id: `https://solartextures.b-cdn.net/2k_neptune.jpg`, text: `Neptune`, radius: 3.88, mass: 17.15, name: `Neptune`, value: `Neptune` },
	];

	const items = planetes.map(planete => planete.text);

	// Objects
	let objects = [
		{ model: `models/rock_scan/scene.gltf`, text: `Meteorite`, radius: 0.1, mass : 0.000001, name: `Meteorite`, value: `Meteorite` }
	];

	const items2 = objects.map(obj => obj.text);

	// Simulation variables
	let selected = planetes[0].name;
	let selected_object = objects[0].name;
	let initialSpeed = {
		x: 0,
		y: 0,
	};
	let simulation_speed = 1;

	// Reload the model and re-render the scene
	const refresh_model = () => {
		refreshScene(retrieveObject(planetes, selected), retrieveObject(objects, selected_object));
	}

	// Play the simulation with the selected parameters
	const play_anim = () => {
		playAnimation(retrieveObject(planetes, selected), retrieveObject(objects, selected_object), rescale_initial_speed(), simulation_speed);
	}

	// Scales the initial speed object using the function bellow
	const rescale_initial_speed = () => {
		return {
			x: slide_to_speed(initialSpeed.x),
			y: slide_to_speed(initialSpeed.y),
		};
	}

	// Slider value to burst value conversion (scale isn't linear)
	const slide_to_speed = (slide) => {
		let val = Math.ceil(Math.pow((slide / 2.), 2));
		if (slide < 0)
			val = -val;
		return val;
	}

	// Reset bursts button
	const reset_speeds = () => {
		initialSpeed = {
			x: 0,
			y: 0,
		};
	}


</script>

<MaterialApp {theme}>
<canvas bind:this={el}></canvas>


<aside class="left">

	<Select
		outlined
		dense
		mandatory={true}
		{items}
		class="ma-2 rounded"
		bind:value={selected}
		on:change="{() => refresh_model()}"
		>
		Planet
	</Select>

	<Select
		outlined
		dense
		mandatory={true}
		class="ma-2 rounded"
		{items2}
		bind:value={selected_object}
		on:change="{() => refresh_model()}"
		>
		Object
	</Select>

	<Button
		on:click="{() => play_anim()}"
		class="elevation-4 primary-color"
		>
		Play
	</Button>

</aside>

<aside class="right">

	<div class="slidecontainer">
		<AppBar>
			<span>X initial burst</span>
		</AppBar>
		<Slider bind:value={initialSpeed.x} min={-1000} max={1000}></Slider>
		<Chip>{slide_to_speed(initialSpeed.x)} m.s^-2</Chip>
	</div>

	<div class="slidecontainer">
		<AppBar>
			<span>Y initial burst</span>
		</AppBar>
		<Slider bind:value={initialSpeed.y} min={-1000} max={1000}></Slider>
		<Chip>{slide_to_speed(initialSpeed.y)} m.s^-2</Chip>
	</div>

	<Button on:click="{() => reset_speeds()}">
		Reset
	</Button>

	<div class="slidecontainer">
		<AppBar>
			<span>Simulation speed</span>
		</AppBar>
		<Slider bind:value={simulation_speed} min={1} max={100}></Slider>
		<Chip>{simulation_speed}x</Chip>
	</div>

</aside>

</MaterialApp>

<style>
	span.right_panel_text {
		color: white;
		font-size: 12px;
	}

	label.right_panel_label {
		color: white;
		font-size: 24px;
	}

	div.slidecontainer {
		padding: 0;
		margin: 0;
	}

	input {
		padding: 0;
		margin: 0;
	}

	.left {
		position: absolute;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
		height: 100vh;
		width: 15vmax;
		background-color: rgba(80, 80, 80, 0.5);
	}

	.right {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0;
		margin: 0;
		height: 100vh;
		width: 15vmax;
		background-color: rgba(80, 80, 80, 0.5);
	}

	canvas {
		position: absolute;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
	}
</style>
