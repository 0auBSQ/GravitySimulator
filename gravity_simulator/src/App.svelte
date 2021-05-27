<script>
  import { Router, Route, Link } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Simulation from "./routes/Simulation.svelte";
  export let url = ""; //This property is necessary declare to avoid ignore the Router
</script>

<Router url="{url}">
	<div>
    <Route path="simulation" component="{Simulation}" />
    <Route path="/"><Home /></Route>
  </div>
</Router>
