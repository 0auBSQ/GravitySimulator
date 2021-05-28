<script>
		import { MaterialApp, Button, Select, Slider, AppBar, Chip, Divider } from 'svelte-materialify';
		import { fly } from 'svelte/transition';

    let svelte='https://blog.engineering.publicissapient.fr/wp-content/uploads/2020/03/svelte-logo_20191220-768x415.png'
    let newton='https://p4.storage.canalblog.com/45/35/1498383/123397598.png'
    let stepByStep='https://i.pinimg.com/originals/14/29/4b/14294b53e990577bc548eba4d1ecb4f5.png'
    let app='../../img/App.PNG'

		const solar_system="img/SolarSystem.jpg";

		const theme = "dark";

		let pageName = "Home";

		particlesJS.load('particles-js', './assets/particles.json', function() {
		  console.log('ok');
		});

</script>

<MaterialApp {theme}>
    <!-- Corps de la page -->
		<nav class="gs_navbar">
			<AppBar class="grey darken-3">
					<span class="link nav_block"><a class="active nav_block white-text" href="#home">🏠</a></span>
					<span class="link nav_block"><a class="active nav_block white-text" href="#desc">Description</a></span>
					<span class="link nav_block"><a class="active nav_block white-text" href="#libs">Libraries</a></span>
					<span class="link nav_block"><a class="active nav_block white-text" href="#step">Steps</a></span>
					<span class="link nav_block"><a class="nav_block white-text" href="simulation">Simulation</a></span>
			</AppBar>
		</nav>

		<div class="block" id="home">
			<div id="particles-js"></div>
			<h1 class="white-text gs_title" transition:fly="{{ x: 20, duration: 2000 }}">
					Gravity simulation university project
			</h1>
			<div class="gs_button" transition:fly="{{ x: 40, duration: 3000 }}">
				<Button
					rounded
					class="primary-color"
					on:click="{() => window.location.href='simulation'}"
					>
					Get started
				</Button>
			</div>
		</div>



    <div class="block gs_ssbg" id="desc">

				<h1 class="gs_subtitle">
		        Project description
		    </h1>

				<Divider />
				<br />

				<p class="gs_paragraph">
					This project represents our submission for the university "Scientific simulation in JavaScript" subject's project.
				</p>

				<p class="gs_paragraph">
					Our project main objective was to conceive a small weight web application that simulate gravity in any interesting way.
				</p>

				<p class="gs_paragraph">
					We first thought about the Newton apple experience and made a first prototype simulating the fall of a primitive object on the ground.
				</p>

				<p class="gs_paragraph">
					We decided then, to make it more interesting, to reproduce the gravity action of every solar system planet on a choosen object, giving it an initial burst.
				</p>

				<p class="gs_paragraph">
					Using the graviry pull and acceleration formulas, this applications allows to reproduce in a 3D environment, in real or accelerated time the movements of an object depending on the choosen planet characteristics.
				</p>

				<p class="gs_paragraph">
					For now the simulation cointains a moderate amont of features, but we plan to add few more later.
				</p>

    </div>

    <div class="block" id="libs">
    <h2>
        Etape
    </h2>
    <ol>
        <li>Trouver les bibliothèque utiles pour réaliser la simmulation et le moteur graphique</li>
        <li>Faire les calculs scientifiques nécessaires</li>
        <li>Rajouter une interface intuitive</li>
    </ol>
    <img src={stepByStep}/>
    </div>

    <div class="block" id="step">
    <h2>Svelte</h2>
    <img src={svelte}/>
    <p>Svelte est un framwork javascript mais aussi un compilateur utilisé dans la création d’interfaces utilisateur réactives.</p>
    <p>Pourquoi svelte ?</p>
    <li>
        Framwork plus léger que React ou vue.
    </li>
    <li>
        Mais aussi plus rapide
    </li>
    <li>
        Un code claire et simple
    </li>
    <p>En résumé: Svelte nous a permis de concevoir une application avec un moteur graphique puissant tout en ayant un code claire et léger</p>
    </div>
    <footer>
        Auteur : Wassim SAIDANE & Raphaël Marraccini
    </footer>

	</MaterialApp>


<style>

div.block {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
	text-align: center;
	overflow: hidden;
}



div#particles-js {
	position: absolute;
  height: 100%;
  width: 100%;
	overflow: hide;
}

div h2{
  text-align: center;
  color : red;
}

div img{
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  margin-top: auto;
}

div p {
  text-align: left;
  text-indent: 30px;
}

div.gs_ssbg {
	background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../img/SolarSystem.jpg) no-repeat center center fixed;
	background-size: cover;
}

p.gs_paragraph {
	margin-right: 4vw;
	font-size: 1.4vw;
}

h1 {
	text-align: center;
}

h1.gs_subtitle {
	margin-top: 10vh;
	font-size: 3vw;
}

h1.gs_title {
	margin-top: 30vh;
	font-size: 3vw;
}

.gs_button {
	margin: 10vh auto;
}

nav.gs_navbar {
	position: fixed;
	width: 100vw;
	z-index: 12000;
}

.link {
  float: left;
}

span.nav_block a.nav_block {
  display: block;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

span.nav_block a.nav_block:hover {
  background-color: #aa00ff;
}

li {
    font: 1rem 'Fira Sans', sans-serif;
    margin-bottom: .5rem;
}

footer{
background-color: blue;
text-align: center;
padding-bottom: 15px;
}


</style>
