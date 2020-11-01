<script lang="ts">
  import {activeWindow} from '../../store'
  import type {GroupStore, SidebarItem} from '../../store'
  import {default as I} from 'svelte-awesome'
  import * as fas from '@fortawesome/free-solid-svg-icons'
  export let item: GroupStore<SidebarItem>
  export let descend: boolean = true
  $: children = $item.children ?? []
  $: isActive = $activeWindow === item
  const activateWindow = () =>{
    //activeWindow.set(item)
  }
  const checkHash = () => {
    if (`#${$item.id}` === location.hash ) {
      $activeWindow = item
    }
  }
  addEventListener('hashchange',checkHash)
  checkHash()
</script>
<div class="flex flex-col flex-grow">
<a 
class="item"
class:active={isActive}
href={`#${$item.id}`} 
on:click={activateWindow}
tabindex={-0}
>
  {$item.name}
  {#if children.length>0}
    <I data={fas.faChevronRight}/>
  {/if}
</a>
{#if descend}
<div class="children flex-grow">
{#each children as subItem }
<div class="child flex-grow">
  <svelte:self item={subItem}/>
</div>
{/each}  
</div>
{/if}
</div>

<style lang="postcss">
.item {
  width:100%;
  color: white;
  background-clip: padding-box;
}
.item.active {
  background-color: #777;
}
.item:active,.item:focus {
  background-color: #333;
}
.item:hover {
  background-color: #999;
}
.children {
  display: flex;
  flex-direction: column;
  background-clip: padding-box;
  box-sizing: border-box;
  border-left: 2px dotted black;
  padding-left: 4px;
}
.child {
  display: flex;
  background-clip: padding-box;
  box-sizing: border-box;
  //border-left: 2px dotted black;
  //padding-left: 4px;
}
</style>