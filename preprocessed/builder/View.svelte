<script lang="ts">import { getContext, onMount } from 'svelte';
import { genId, groupContextKey, groupFactory, groups } from '../store';
;
let getGroupContext = () => getContext(groupContextKey) ?? groups;
const group = getGroupContext();
export let name;
let thisItem;
let thisTarget;
let view = groupFactory({
    name,
    id: genId(),
    props: {},
    type: 'view',
    depth: $group.depth + 1
});
groups.update();
onMount(() => {
    thisItem.remove();
    view.setNode(thisItem);
    view.setTargetNode(thisTarget);
    group.addItem(view);
    groups.update();
});
</script><section class="view" bind:this={thisItem}><div class={`em-${Math.min($view.depth,6)}`}><slot name="desc"><h1>{$view.name}</h1></slot></div><div class="contentWrapper" ><div class="content" bind:this={thisTarget}><slot></slot></div></div></section><style lang="postcss">.view {
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

@keyframes panBackground {
  0%{
    background-position-x: -0.5em;
  }

  25%{
    background-position-x: 0.5em
  }

  50%{
    background-position-y: 0.5em
  }

  75%{
    background-position-x: -0.5em
  }

  100%{
    background-position-y: -0.5em
  }
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
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZpZXcuc3ZlbHRlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsK0RBQStEO0VBQy9ELGlEQUFpRDtFQUNqRCxlQUFlO0VBQ2YsZUFBZTtFQUNmLGdCQUFnQjtFQUVoQixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLHNCQUFzQjtFQUN0QixxQkFBcUI7RUFDckIsa0JBQWtCO0VBRWxCLDJEQUEyRDtFQUMzRCxxRUFBcUU7RUFDckUsNEVBQTRFO0VBQzVFLHNEQUFzRDtFQUN0RCxpREFBaUQ7RUFDakQsOERBQThEO0VBQzlEO2tEQUNnRDtBQUVsRDs7QUFFQTtFQUNFLG1EQUFtRDtFQUNuRCx5Q0FBeUM7QUFDM0M7O0FBQ0Esb0JBQW9CLGVBQWU7QUFBRTs7QUFDckMsb0JBQW9CLGlCQUFpQjtBQUFFOztBQUN2QyxvQkFBb0IsaUJBQWlCO0FBQUU7O0FBQ3ZDLG9CQUFvQixpQkFBaUI7QUFBRTs7QUFDdkMsb0JBQW9CLGlCQUFpQjtBQUFFOztBQUN2QyxvQkFBb0IsZUFBZTtBQUFFOztBQUNyQyxvQkFBb0IsZUFBZTtBQUFFOztBQUVyQztFQUNJO0lBQ0UsNkJBQTZCO0VBQy9COztFQUNBO0lBQUk7RUFBNEI7O0VBQ2hDO0lBQUk7RUFBNkI7O0VBQ2pDO0lBQUk7RUFBNkI7O0VBQ2pDO0lBQUs7RUFBNkI7QUFDdEM7O0FBQ0E7RUFDSTtJQUNFLDBCQUEwQjtJQUMxQiwwQkFBMEI7RUFDNUI7O0VBQ0E7SUFDRSw0QkFBNEI7SUFDNUIsNEJBQTRCO0VBQzlCOztFQUNBO0lBQ0UsNkJBQTZCO0lBQzdCLDRCQUE0QjtFQUM5Qjs7RUFDQTtJQUNFLDRCQUE0QjtJQUM1Qiw2QkFBNkI7RUFDL0I7QUFDSiIsImZpbGUiOiJWaWV3LnN2ZWx0ZSIsInNvdXJjZXNDb250ZW50IjpbIlxuLnZpZXcge1xuICBwYWRkaW5nLWJvdHRvbTogMWVtO1xufVxuLmNvbnRlbnRXcmFwcGVyIHtcbiAgYm9yZGVyLXdpZHRoOiAzcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tYXV0b2JlbmNoLWNvbG9ycy12aWV3LXdyYXBwZXItYm9yZGVyLWNvbG9yKTtcbiAgY29sb3I6IHZhcigtLWF1dG9iZW5jaC1jb2xvcnMtdmlldy13cmFwcGVyLWNvbG9yKTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBtYXJnaW46IDFlbSAxZW07XG4gIHBhZGRpbmc6IDFlbSAxZW07XG5cbiAgZGlzcGxheTpmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IGNlbnRlcjtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBvdmVyZmxvdy14OiBzY3JvbGw7XG5cbiAgYmFja2dyb3VuZDogdmFyKC0tYXV0b2JlbmNoLWNvbG9ycy12aWV3LXdyYXBwZXItYmFja2dyb3VuZCk7XG4gIGJhY2tncm91bmQtc2l6ZTogdmFyKC0tYXV0b2JlbmNoLWNvbG9ycy12aWV3LXdyYXBwZXItYmFja2dyb3VuZC1zaXplKTtcbiAgYmFja2dyb3VuZC1ibGVuZC1tb2RlOiB2YXIoLS1hdXRvYmVuY2gtY29sb3JzLXZpZXctd3JhcHBlci1iYWNrZ3JvdW5kLWJsZW5kKTtcbiAgYW5pbWF0aW9uOiBwYW5CYWNrZ3JvdW5kIDVzIDBzIGFsdGVybmF0ZSBpbmZpbml0ZSBlYXNlO1xuICAvKnJhaW5ib3dCYWNrZ3JvdW5kIDEwcyBhbHRlcm5hdGUgaW5maW5pdGUgZWFzZTsqL1xuICBhbmltYXRpb24tcGxheS1zdGF0ZTogdmFyKC0tYXV0b2JlbmNoLWJvb2xlYW5zLWFuaW1hdGUscGF1c2VkKTtcbiAgLypiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoaHNsYSgwLDEwMCUsNTAlLDAuNSksaHNsYSgxMjAsMTAwJSw1MCUsMC41KSxoc2xhKDI0MCwxMDAlLDUwJSwwLjUpLGhzbGEoMCwxMDAlLDUwJSwwLjUpKSwgXG4gIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmVkLGJsdWUsZ3JlZW4scmVkKSA7Ki9cblxufVxuXG4uY29udGVudCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWF1dG9iZW5jaC1jb2xvcnMtdmlldy1iYWNrZ3JvdW5kKTtcbiAgY29sb3I6IHZhcigtLWF1dG9iZW5jaC1jb2xvcnMtdmlldy1jb2xvcik7XG59XG4uZW0tMCA6Z2xvYmFsKGgxKSB7IGZvbnQtc2l6ZTogMnJlbTsgfVxuLmVtLTEgOmdsb2JhbChoMSkgeyBmb250LXNpemU6IDEuOHJlbTsgfVxuLmVtLTIgOmdsb2JhbChoMSkgeyBmb250LXNpemU6IDEuNnJlbTsgfVxuLmVtLTMgOmdsb2JhbChoMSkgeyBmb250LXNpemU6IDEuNHJlbTsgfVxuLmVtLTQgOmdsb2JhbChoMSkgeyBmb250LXNpemU6IDEuMnJlbTsgfVxuLmVtLTUgOmdsb2JhbChoMSkgeyBmb250LXNpemU6IDFyZW07IH1cbi5lbS02IDpnbG9iYWwoaDEpIHsgZm9udC1zaXplOiAxcmVtOyB9XG5cbkBrZXlmcmFtZXMgcGFuQmFja2dyb3VuZCB7XG4gICAgMCV7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IC0wLjVlbTtcbiAgICB9XG4gICAgMjUle2JhY2tncm91bmQtcG9zaXRpb24teDogMC41ZW19XG4gICAgNTAle2JhY2tncm91bmQtcG9zaXRpb24teTogMC41ZW0gfVxuICAgIDc1JXtiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IC0wLjVlbX1cbiAgICAxMDAle2JhY2tncm91bmQtcG9zaXRpb24teTogLTAuNWVtfVxufVxuQGtleWZyYW1lcyByYWluYm93QmFja2dyb3VuZCB7XG4gICAgMCV7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IDBweDtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teDogMHB4O1xuICAgIH1cbiAgICAyNSV7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IDEwMHB4O1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiA1MDBweDtcbiAgICB9XG4gICAgNzUle1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiAtNTAwcHg7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDMwMHB4O1xuICAgIH1cbiAgICAxMDAle1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbi15OiAyMDBweDtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teDogLTQwMHB4O1xuICAgIH1cbn1cbiJdfQ== */</style>