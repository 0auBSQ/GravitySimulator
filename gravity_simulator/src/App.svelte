<script>
	import { onMount } from 'svelte';
	import { createScene, refreshScene } from "./scene";

	let el;
  onMount(() => {
    createScene(el)
		refresh_model();
  });

	let planetes = [
		{ id: `https://solartextures.b-cdn.net/2k_earth_daymap.jpg`, text: `Earth`, radius: 1 },
		{ id: `https://solartextures.b-cdn.net/2k_mercury.jpg`, text: `Mercury`, radius: 0.38 },
		{ id: `https://solartextures.b-cdn.net/2k_venus_atmosphere.jpg`, text: `Venus`, radius: 0.95 },
		{ id: `https://solartextures.b-cdn.net/2k_mars.jpg`, text: `Mars`, radius: 0.53 },
		{ id: `https://solartextures.b-cdn.net/2k_jupiter.jpg`, text: `Jupiter`, radius: 11.20 },
		{ id: `https://solartextures.b-cdn.net/2k_saturn.jpg`, text: `Saturn`, radius: 9.45 },
		{ id: `https://solartextures.b-cdn.net/2k_uranus.jpg`, text: `Uranus`, radius: 4 },
		{ id: `https://solartextures.b-cdn.net/2k_neptune.jpg`, text: `Neptune`, radius: 3.88 },
	];

	let selected;
	let answer = '';

	const refresh_model = () => {
		refreshScene(selected);
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
