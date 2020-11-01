<script lang="ts">import { getContext, onMount, setContext } from "svelte";
import { groups, groupContextKey, groupFactory } from "../store";
;
let getGroupContext = () => getContext(groupContextKey) ?? groups;
export let name;
let thisItem;
let thisTarget;
const groupContext = getGroupContext();
let group = groupFactory({
    id: groups.genId(),
    name,
    children: [],
    type: 'group',
    depth: $groupContext.depth + 1
});
setContext(groupContextKey, group);
onMount(() => {
    thisItem.remove();
    group.setNode(thisItem);
    group.setTargetNode(thisTarget);
    groupContext.addItem(group);
    groups.update();
});
</script><section class="group" bind:this={thisItem}><div class={`em-${Math.min($group.depth,6)}`}><slot name="desc"><h1>{$group.name}</h1></slot></div><div class="contentWrapper"><div class="content" bind:this={thisTarget}><slot></slot></div></div></section><style lang="postcss">.group {
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

.em-0 :global(h1) { font-size: 2rem;
}

.em-1 :global(h1) { font-size: 1.8rem;
}

.em-2 :global(h1) { font-size: 1.6rem;
}

.em-3 :global(h1) { font-size: 1.4rem;
}

.em-4 :global(h1) { font-size: 1.2rem;
}

.em-5 :global(h1) { font-size: 1rem;
}

.em-6 :global(h1) { font-size: 1rem;
}
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyb3VwLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtBQUNBOztBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7O0FBQ0Esb0JBQW9CLGVBQWU7QUFBRTs7QUFDckMsb0JBQW9CLGlCQUFpQjtBQUFFOztBQUN2QyxvQkFBb0IsaUJBQWlCO0FBQUU7O0FBQ3ZDLG9CQUFvQixpQkFBaUI7QUFBRTs7QUFDdkMsb0JBQW9CLGlCQUFpQjtBQUFFOztBQUN2QyxvQkFBb0IsZUFBZTtBQUFFOztBQUNyQyxvQkFBb0IsZUFBZTtBQUFFIiwiZmlsZSI6Ikdyb3VwLnN2ZWx0ZSIsInNvdXJjZXNDb250ZW50IjpbIlxuLmdyb3VwIHtcbn1cbi5jb250ZW50V3JhcHBlciB7XG4gIHBhZGRpbmc6IDFlbSAwZW07XG59XG4uY29udGVudCB7XG4gIGJvcmRlci13aWR0aDogM3B4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBib3JkZXItc3R5bGU6IGRvdHRlZDtcbiAgcGFkZGluZzogMWVtIDFlbTtcbiAgbWFyZ2luOiAxZW0gMWVtO1xufVxuLmVtLTAgOmdsb2JhbChoMSkgeyBmb250LXNpemU6IDJyZW07IH1cbi5lbS0xIDpnbG9iYWwoaDEpIHsgZm9udC1zaXplOiAxLjhyZW07IH1cbi5lbS0yIDpnbG9iYWwoaDEpIHsgZm9udC1zaXplOiAxLjZyZW07IH1cbi5lbS0zIDpnbG9iYWwoaDEpIHsgZm9udC1zaXplOiAxLjRyZW07IH1cbi5lbS00IDpnbG9iYWwoaDEpIHsgZm9udC1zaXplOiAxLjJyZW07IH1cbi5lbS01IDpnbG9iYWwoaDEpIHsgZm9udC1zaXplOiAxcmVtOyB9XG4uZW0tNiA6Z2xvYmFsKGgxKSB7IGZvbnQtc2l6ZTogMXJlbTsgfVxuIl19 */</style>