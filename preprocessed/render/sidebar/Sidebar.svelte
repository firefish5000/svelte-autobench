
<script lang="ts">import Item from './Item.svelte';
import { groups as rootGroups } from '../../store';
import { sidebarStore } from '../../store';
import { slide } from '../transitions';
$: items = $sidebarStore;
let sidebarNode;
export let visible = true;
let visibleDebounce = (() => {
    let trans;
    return (vis) => {
        clearTimeout(trans);
        trans = setTimeout(() => {
            visible = vis;
        }, 100);
    };
})();
function enterTrans() {
    visibleDebounce(true);
}
export let groups = rootGroups;
</script>{#if visible}<nav class="sidebar" 
bind:this={sidebarNode} 
on:focusin={enterTrans}
on:click={enterTrans}
on:mouseover={enterTrans}
transition:slide={{duration: 500,from: 'left'}}
><h3><Item item={groups} descend={false}/></h3><div 
class="children"
transition:slide={{duration:500,from:'top'}}
>{#each items as item }<Item {item}/>{/each}</div></nav>{/if}<style lang="postcss">h3 {
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
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGViYXIuc3ZlbHRlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFDcEIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsS0FBSztFQUNMLE1BQU07RUFDTixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQixzQkFBc0I7RUFDdEIsVUFBVTtFQUNWLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG9DQUFvQztBQUN0Qzs7QUFDQTtFQUNFLFlBQVk7QUFDZCIsImZpbGUiOiJTaWRlYmFyLnN2ZWx0ZSIsInNvdXJjZXNDb250ZW50IjpbIlxuaDMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uc2lkZWJhciB7XG4gIGdyaWQtYXJlYTogc2lkZWJhcjtcbiAgZGlzcGxheTogZmxleDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDowO1xuICBsZWZ0OjA7XG4gIHBhZGRpbmc6IDAgMDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleC13cmFwOm5vd3JhcDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcbiAgei1pbmRleDogMTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAvL3RyYW5zaXRpb246IHdpZHRoIGVhc2UtaW4tb3V0IDAuNXM7XG59XG4uY2hpbGRyZW4ge1xuICBoZWlnaHQ6IDEwMCU7XG59XG4iXX0= */</style>