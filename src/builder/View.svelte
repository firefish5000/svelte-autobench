<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import {genId, groupContextKey, groupFactory, groups} from '../store'
  import type { ViewItem, GroupStore} from '../store'
  let getGroupContext: ()=>GroupStore = () => getContext<GroupStore>(groupContextKey) ?? groups
  const group = getGroupContext()

 export let name: string

 let thisItem: HTMLDivElement
 let thisTarget: HTMLDivElement

let view = groupFactory<ViewItem>( {
    name,
    id: genId(),
    props: {},
    type: 'view',
    depth: $group.depth + 1
  })

  groups.update()
  onMount(()=>{
    thisItem.remove()
    view.setNode(thisItem)
    view.setTargetNode(thisTarget)
    group.addItem(view)
    groups.update()
  })
</script>

<section class="view" bind:this={thisItem}>
  <div class={`em-${Math.min($view.depth,6)}`}>
  <slot name="desc">
      <h1>{$view.name}</h1>
  </slot>
  </div>
  <div class="contentWrapper" >
  <div class="content" bind:this={thisTarget}>
    <slot></slot>
  </div>
  </div>
</section>

<style lang="postcss">
.view {
  padding-bottom: 1em;
}
.contentWrapper {
  border-width: 3px;
  border-radius: 10px;
  border-style: solid;
  border-color: var(--autobench-colors-view-wrapper-border-color);
  color: var(--autobench-colors-view-wrapper-color);
  font-size: 1rem;
  margin: 1em 1em;
  padding: 1em 1em;

  display:flex;
  justify-content: center;
  vertical-align: center;
  align-content: center;
  overflow-x: scroll;

  background: var(--autobench-colors-view-wrapper-background);
  background-size: var(--autobench-colors-view-wrapper-background-size);
  background-blend-mode: var(--autobench-colors-view-wrapper-background-blend);
  animation: panBackground 5s 0s alternate infinite ease;
  /*rainbowBackground 10s alternate infinite ease;*/
  animation-play-state: var(--autobench-booleans-animate,paused);
  /*background: linear-gradient(hsla(0,100%,50%,0.5),hsla(120,100%,50%,0.5),hsla(240,100%,50%,0.5),hsla(0,100%,50%,0.5)), 
  linear-gradient(to right, red,blue,green,red) ;*/

}

.content {
  background: var(--autobench-colors-view-background);
  color: var(--autobench-colors-view-color);
}
.em-0 :global(h1) { font-size: 2rem; }
.em-1 :global(h1) { font-size: 1.8rem; }
.em-2 :global(h1) { font-size: 1.6rem; }
.em-3 :global(h1) { font-size: 1.4rem; }
.em-4 :global(h1) { font-size: 1.2rem; }
.em-5 :global(h1) { font-size: 1rem; }
.em-6 :global(h1) { font-size: 1rem; }

@keyframes panBackground {
    0%{
      background-position-x: -0.5em;
    }
    25%{background-position-x: 0.5em}
    50%{background-position-y: 0.5em }
    75%{background-position-x: -0.5em}
    100%{background-position-y: -0.5em}
}
@keyframes rainbowBackground {
    0%{
      background-position-y: 0px;
      background-position-x: 0px;
    }
    25%{
      background-position-y: 100px;
      background-position-x: 500px;
    }
    75%{
      background-position-y: -500px;
      background-position-x: 300px;
    }
    100%{
      background-position-y: 200px;
      background-position-x: -400px;
    }
}
</style>