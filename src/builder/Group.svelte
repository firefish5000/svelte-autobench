<script lang="ts">
import { getContext, onMount, setContext } from "svelte";

import { groups, groupContextKey, groupFactory } from "../store";
import type { GroupItem, GroupStore } from "../store";
let getGroupContext: ()=>GroupStore = () => getContext<GroupStore>(groupContextKey) ?? groups

export let name: string
let thisItem: HTMLDivElement
let thisTarget: HTMLDivElement
const groupContext = getGroupContext()

let group = groupFactory<GroupItem>({
  id: groups.genId(),
  name,
  children: [],
  type: 'group',
  depth: $groupContext.depth+1
})


setContext(groupContextKey,group)
onMount(()=>{
  thisItem.remove()
  group.setNode(thisItem)
  group.setTargetNode(thisTarget)
  groupContext.addItem(group)
  groups.update()
})
</script>

<section class="group" bind:this={thisItem}>
  <div class={`em-${Math.min($group.depth,6)}`}>
    <slot name="desc">
      <h1>{$group.name}</h1>
    </slot>
  </div>
  <div class="contentWrapper">
  <div class="content" bind:this={thisTarget}>
    <slot></slot>
  </div>
  </div>
</section>


<style lang="postcss">
.group {
}
.contentWrapper {
  padding: 1em 0em;
}
.content {
  border-width: 3px;
  border-radius: 10px;
  border-style: dotted;
  padding: 1em 1em;
  margin: 1em 1em;
}
.em-0 :global(h1) { font-size: 2rem; }
.em-1 :global(h1) { font-size: 1.8rem; }
.em-2 :global(h1) { font-size: 1.6rem; }
.em-3 :global(h1) { font-size: 1.4rem; }
.em-4 :global(h1) { font-size: 1.2rem; }
.em-5 :global(h1) { font-size: 1rem; }
.em-6 :global(h1) { font-size: 1rem; }
</style>