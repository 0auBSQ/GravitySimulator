<script>
    let svelte='https://blog.engineering.publicissapient.fr/wp-content/uploads/2020/03/svelte-logo_20191220-768x415.png'
    let newton='https://p4.storage.canalblog.com/45/35/1498383/123397598.png'
    let stepByStep='https://i.pinimg.com/originals/14/29/4b/14294b53e990577bc548eba4d1ecb4f5.png'
    let app='../img/App.PNG'
</script>

<html lang="html">
<head>
    <!-- En-tête de la page -->
    <meta charset="utf-8" />
    <title>Simulation de gravité</title>
</head>

<body>
    <!-- Corps de la page -->
    <ul>
        <li class="link"><a class="active" href="#home">Home</a></li>
        <li class="link"><a href="App.svelte">Gravité</a></li>
    </ul>
    <h1>
        Projet de simulation en Javascript : Simulation de la gravité
    </h1>
    <div class=block>
    <h2>
        Description
    </h2>
    <p>Notre projet conssiste à réaliser une application web qui simule la gravité.</p> 
    <p> Au départ nous avons décidé de reproduire l'expérience de la pomme de Newton puis nous avons élargie notre projet à toutes les planètes du système solaire</p>
    <p>Ainsi nous avons simulé la chute d'objets sur une planète.</p> <p>Grâce aux calculs que nous avons retranscrit en javascript nous avons crées une aplication simple, intuitive et interactive. </p>
    <img src={newton}/>
    </div>
    <div class=block2>
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
    <div class=block>
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
    <div class=block2>
    <h2>Interface</h2>
    <p>Cette application permet aux utilisateurs de faire chuter une météorite sur les différentes planètes du système solaire et observer les différences.</p>
    <p>A gauche nous pouvons charger les planètes ainsi que les différents objets alors qu'à droite on peut modifier différentes caractéristique physique tel que la vitesse de la simulation ou la trajectoire de la météorite</p>
    <img src={app}/>
    </div>
    <footer>
        Auteur : Wassim SAIDANE & Raphaël Marraccini
    </footer>

</body>
</html>

<style>
html{
    margin : 0;
    padding: 0;
    background-color: black;
}
body {
    position: absolute;
    top: 0;
    left:0;
    margin: 0;
    padding: 0;
    background-color: black;
    color : white;
}

div.block {
  width: 100vw;
  height: 100vh;
  background-color:black;

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

div.block2 {
     width: 100vw;
    height: 100vh;
    background-color:#3a3a3a;

}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.link {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}

h1
{
  font-size: 32px;
  text-shadow: -1px -1px #0c0, 1px 1px #060, -3px 0 4px #000;
  font-family:Arial, Helvetica, sans-serif;
  color: #090;
  padding:16px;
  font-weight:lighter;
  -moz-box-shadow: 2px 2px 6px #888;  
  -webkit-box-shadow: 2px 2px 6px #888;  
  box-shadow:2px 2px 6px #888;  
  text-align:center;
  display:block;
  margin:16px;  
}

th {
  height: 70px;
  border: 1px solid white;
}

td {
  border: 1px solid white;
  border-collapse: collapse;
  text-align: center;
}

table {
  border-collapse: collapse;  
  width: 50%;
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