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
		{ model: `models/rock_scan/scene.gltf`, text: `Meteorite`, radius: 0.1, mass : 0.01 }
	];

	let selected;
	let selected_object;

	const refresh_model = () => {
		refreshScene(selected, selected_object);
	}

	const play_anim = () => {
		console.log("Cliqued !");
		playAnimation(selected, selected_object);
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

<style>
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

	canvas {
		position: absolute;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
	}
</style>
