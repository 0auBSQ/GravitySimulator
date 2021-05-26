<script>
	import { onMount } from 'svelte';
	import { createScene, refreshScene, playAnimation } from "./scene";

	let el;
  onMount(() => {
    createScene(el)
		refresh_model();
  });

	let planetes = [
		{ id: `https://solartextures.b-cdn.net/2k_earth_daymap.jpg`, text: `Earth`, radius: 1, mass: 1 },
		{ id: `https://solartextures.b-cdn.net/2k_mercury.jpg`, text: `Mercury`, radius: 0.38, mass: 0.055 },
		{ id: `https://solartextures.b-cdn.net/2k_venus_atmosphere.jpg`, text: `Venus`, radius: 0.95, mass: 0.815 },
		{ id: `https://solartextures.b-cdn.net/2k_mars.jpg`, text: `Mars`, radius: 0.53, mass: 0.107 },
		{ id: `https://solartextures.b-cdn.net/2k_jupiter.jpg`, text: `Jupiter`, radius: 11.20, mass: 317.8 },
		{ id: `https://solartextures.b-cdn.net/2k_saturn.jpg`, text: `Saturn`, radius: 9.45, mass: 95.16 },
		{ id: `https://solartextures.b-cdn.net/2k_uranus.jpg`, text: `Uranus`, radius: 4, mass: 14.54 },
		{ id: `https://solartextures.b-cdn.net/2k_neptune.jpg`, text: `Neptune`, radius: 3.88, mass: 17.15 },
	];

	let objects = [
		{ model: `models/rock_scan/scene.gltf`, text: `Meteorite`, radius: 0.1, mass : 0.000001 }
	];

	let selected;
	let selected_object;
	let initialSpeed = {
		x: 0,
		y: 0,
	};

	let simulation_speed = 1;

	const refresh_model = () => {
		refreshScene(selected, selected_object);
	}

	const play_anim = () => {
		console.log("Cliqued !");
		playAnimation(selected, selected_object, rescale_initial_speed());
	}

	const rescale_initial_speed = () => {
		return {
			x: slide_to_speed(initialSpeed.x),
			y: slide_to_speed(initialSpeed.y),
		};
	}

	const slide_to_speed = (slide) => {
		let val = Math.ceil(Math.pow((slide / 3.), 2));
		if (slide < 0)
			val = -val;
		return val;
	}

	const reset_speeds = () => {
		initialSpeed = {
			x: 0,
			y: 0,
		};
	}


</script>

<canvas bind:this={el}></canvas>


<aside class="left">

	<select bind:value={selected} on:change="{() => refresh_model()}">
		{#each planetes as planete}
			<option value={planete}>
				{planete.text}
			</option>
		{/each}
	</select>

	<select bind:value={selected_object} on:change="{() => refresh_model()}">
		{#each objects as object}
			<option value={object}>
				{object.text}
			</option>
		{/each}
	</select>

	<button on:click="{() => play_anim()}">
		Play
	</button>

</aside>

<aside class="right">

	<div class="slidecontainer">
		<label class="right_panel_label" for="xspeed">X Initial burst</label>
		<input type="range" min="-1000" max="1000" bind:value={initialSpeed.x} class="slider" id="xspeed">
		<span class="right_panel_text">{slide_to_speed(initialSpeed.x)} m.s^-2</span>
	</div>

	<div class="slidecontainer">
		<label class="right_panel_label" for="yspeed">Y Initial burst</label>
		<input type="range" min="-1000" max="1000" bind:value={initialSpeed.y} class="slider" id="yspeed">
		<span class="right_panel_text">{slide_to_speed(initialSpeed.y)} m.s^-2</span>
	</div>

	<button on:click="{() => reset_speeds()}">
		Reset
	</button>

	<div class="slidecontainer">
		<label class="right_panel_label" for="sspeed">Simulation speed</label>
		<input type="range" min="1" max="100" bind:value={simulation_speed} class="slider" id="sspeed">
		<span class="right_panel_text">{simulation_speed}x</span>
	</div>

</aside>

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
		width: 15vw;
		background-color: rgba(80, 80, 80, 0.5);
	}

	.right {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0;
		margin: 0;
		height: 100vh;
		width: 15vw;
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
