
<script lang="ts">
  import Item from './Item.svelte';
  import {groups as rootGroups} from '../../store'
  import { sidebarStore } from '../../store';
  import {slide} from '../transitions'
  $: items = $sidebarStore
  let sidebarNode: HTMLDivElement
  
  export let visible: boolean = true
  let visibleDebounce=(() =>{
    let trans: number|undefined
    return (vis: boolean)=>{
      clearTimeout(trans)
      trans=setTimeout(() => {
        visible=vis
      }, 100);
    }
  })()
  function enterTrans() {
    visibleDebounce(true)
  }
  export let groups: typeof rootGroups = rootGroups

</script>


{#if visible}
<nav class="sidebar" 
bind:this={sidebarNode} 
on:focusin={enterTrans}
on:click={enterTrans}
on:mouseover={enterTrans}
transition:slide={{duration: 500,from: 'left'}}
>

<h3><Item item={groups} descend={false}/></h3>
<div 
class="children"
transition:slide={{duration:500,from:'top'}}
>
{#each items as item }
  <Item {item}/>
{/each}
</div>
</nav>
{/if}


<style lang="postcss">
h3 {
  display: flex;
  align-self: center;
  justify-self: center;
  vertical-align: middle;
  text-align: center;
  width: 100%;
}

.sidebar {
  grid-area: sidebar;
  display: flex;
  overflow: auto;
  position: sticky;
  top:0;
  left:0;
  padding: 0 0;
  flex-direction: column;
  flex-wrap:nowrap;
  background-color: #555;
  z-index: 1;
  height: 100%;
  max-height: 100vh;
  width: fit-content;
  //transition: width ease-in-out 0.5s;
}
.children {
  height: 100%;
}
</style>