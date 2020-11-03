<script lang="ts">
// code here

import Sidebar from "./sidebar/Sidebar.svelte";
import SvWindow from "./Window.svelte";
let navVis: boolean = true
</script>

<div class="wrapper">
<Sidebar bind:visible={navVis}/>
<SvWindow bind:navVis={navVis}>
  <slot></slot>
</SvWindow >
</div>


<style lang="postcss">
.wrapper {
  display: grid;
  flex-direction: row;
  width: 100vw;
  min-height: 100vh;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 4em 1fr;
  grid-template-areas: 
  "sidebar header"
  "sidebar main"
  "sidebar knobs";
}
</style>