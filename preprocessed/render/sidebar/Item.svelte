<script lang="ts">import { activeWindow } from '../../store';
;
import { default as I } from 'svelte-awesome';
import * as fas from '@fortawesome/free-solid-svg-icons';
export let item;
export let descend = true;
$: children = $item.children ?? [];
$: isActive = $activeWindow === item;
const activateWindow = () => {
    //activeWindow.set(item)
};
const checkHash = () => {
    if (`#${$item.id}` === location.hash) {
        $activeWindow = item;
    }
};
addEventListener('hashchange', checkHash);
checkHash();
</script><div class="flex flex-col flex-grow"><a 
class="item"
class:active={isActive}
href={`#${$item.id}`} 
on:click={activateWindow}
tabindex={-0}
>{$item.name}{#if children.length>0}<I data={fas.faChevronRight}/>{/if}</a>{#if descend}<div class="children flex-grow">{#each children as subItem }<div class="child flex-grow"><svelte:self item={subItem}/></div>{/each}</div>{/if}</div><style lang="postcss">.item {
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
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkl0ZW0uc3ZlbHRlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsVUFBVTtFQUNWLFlBQVk7RUFDWiw0QkFBNEI7QUFDOUI7O0FBQ0E7RUFDRSxzQkFBc0I7QUFDeEI7O0FBQ0E7RUFDRSxzQkFBc0I7QUFDeEI7O0FBQ0E7RUFDRSxzQkFBc0I7QUFDeEI7O0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLDRCQUE0QjtFQUM1QixzQkFBc0I7RUFDdEIsNkJBQTZCO0VBQzdCLGlCQUFpQjtBQUNuQjs7QUFDQTtFQUNFLGFBQWE7RUFDYiw0QkFBNEI7RUFDNUIsc0JBQXNCO0VBQ3RCLCtCQUErQjtFQUMvQixtQkFBbUI7QUFDckIiLCJmaWxlIjoiSXRlbS5zdmVsdGUiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5pdGVtIHtcbiAgd2lkdGg6MTAwJTtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xufVxuLml0ZW0uYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc3Nztcbn1cbi5pdGVtOmFjdGl2ZSwuaXRlbTpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XG59XG4uaXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5OTk7XG59XG4uY2hpbGRyZW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXItbGVmdDogMnB4IGRvdHRlZCBibGFjaztcbiAgcGFkZGluZy1sZWZ0OiA0cHg7XG59XG4uY2hpbGQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAvL2JvcmRlci1sZWZ0OiAycHggZG90dGVkIGJsYWNrO1xuICAvL3BhZGRpbmctbGVmdDogNHB4O1xufVxuIl19 */</style>