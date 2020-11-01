<script lang="ts">import { onMount, setContext } from "svelte";
import { activeWindow, groupContextKey, groups } from "../store";
;
import { checkTheme, generateWindowStyle, makeColors, themeFromUri, themeSerialize } from './window';
export let navVis;
let name = 'Components';
groups.setName(name);
setContext(groupContextKey, groups);
let thisItem;
let thisTarget;
onMount(() => {
    groups.setNode(thisItem);
    groups.setTargetNode(thisTarget);
});
function openMenu() {
    navVis = true;
}
let theme = {
    colors: {
        window: makeColors(),
        'view-wrapper': makeColors(),
        view: makeColors(),
    },
    numbers: {
        'transparency-tint': 50
    },
    booleans: {
        'keep-state': true,
        animate: false
    }
};
function updateThemeFromUri() {
    const uriTheme = themeFromUri();
    Object.assign(theme.booleans, uriTheme.booleans ?? {});
    Object.assign(theme.colors, uriTheme.colors ?? {});
    Object.assign(theme.numbers, uriTheme.numbers ?? {});
    theme = theme;
}
updateThemeFromUri();
$: {
    $activeWindow;
    updateThemeFromUri();
}
//$: ($activeWindow,Object.assign(theme,updateColorsFromUrl()))
$: themeChecked = checkTheme(theme);
$: {
    const url = new URL(location.href);
    Object.entries(Object.fromEntries(themeSerialize(themeChecked).entries()))
        .forEach(([k, v]) => {
        url.searchParams.set(k, v);
    });
    history.replaceState(undefined, document.title, url.toString());
}
$: windowStyle = generateWindowStyle(theme);
</script><div class="window" 
  bind:this={thisItem}
  style={windowStyle}
  ><section class="header">{#if !navVis}<h3 
        on:click={openMenu} 
        on:mouseover={openMenu}>Menu</h3>{/if}<h3>Workbench</h3><label>Window BG<input type="text" bind:value={theme.colors.window.background} ></label><label>Text Color<input type="text" bind:value={theme.colors.window.color}></label><label>View Wrapper BG<input type="text" bind:value={theme.colors['view-wrapper'].background}></label><label>View Wrapper Color<input type="text" bind:value={theme.colors['view-wrapper'].color}></label><label>Transparency Tint<input type="range" min={0} max={100} bind:value={theme.numbers['transparency-tint']}></label><label>View BG<input type="text" bind:value={theme.colors.view.background}></label><label>View Color<input type="text" bind:value={theme.colors.view.color}></label><label>Keep State<input type="checkbox" bind:checked={theme.booleans['keep-state']}></label><label>Pan Background<input type="checkbox" bind:checked={theme.booleans.animate}></label></section><main class="content" bind:this={thisTarget}><slot></slot></main></div><style lang="postcss">:root {
  --autobench-colors-window-background: #333;
  --autobench-colors-window-color: #fff;
  --autobench-colors-border-color: var(--autobench-colors-window-color);
  --autobench-transparency-tint: 50%;
  --autobench-trans-bg: /* image */
      /* tint image */
      linear-gradient(to right, hsla(0, 0%, var(--autobench-transparency-tint),0.5), hsla(0,0%,var(--autobench-transparency-tint),0.5)),
      /* checkered effect */
      linear-gradient(to right, black 50%, white 50%),
      linear-gradient(to bottom, black 50%, white 50%);
  --autobench-colors-view-wrapper-background: var(--autobench-trans-bg);
  --autobench-colors-view-wrapper-color: var(--autobench-colors-window-color);
  --autobench-colors-view-wrapper-border-color: var(-autobench-colors-view-wrapper-color);
  /* size */
  --autobench-colors-view-wrapper-background-size: 1rem 1rem;
  --autobench-colors-view-wrapper-background-blend: normal, difference, normal;
}

.header,.header>label {
  grid-area: header;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 1em;
}

.header input {
  width: 4em;
}

.window {
  display: grid;
  grid-column: header / main;
  grid-row: header / main;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  color: var(--autobench-colors-window-color);
  background-color: var(--autobench-colors-window-background);
  overflow: scroll;
  padding: 0em 1em;
}

main {
  grid-area: main;
}

input {
  color: black;
}
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldpbmRvdy5zdmVsdGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSwwQ0FBMEM7RUFDMUMscUNBQXFDO0VBQ3JDLHFFQUFxRTtFQUNyRSxrQ0FBa0M7RUFDbEM7Ozs7O3NEQUtrRDtFQUNsRCxxRUFBcUU7RUFDckUsMkVBQTJFO0VBQzNFLHVGQUF1RjtFQUNyRixTQUFTO0VBQ1gsMERBQTBEO0VBQzFELDRFQUE0RTtBQUM5RTs7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsVUFBVTtBQUNaOztBQUNBO0VBQ0UsYUFBYTtFQUNiLDBCQUEwQjtFQUMxQix1QkFBdUI7RUFDdkIsOEJBQThCO0VBQzlCLDJCQUEyQjtFQUMzQiwyQ0FBMkM7RUFDM0MsMkRBQTJEO0VBQzNELGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBQ0E7RUFDRSxlQUFlO0FBQ2pCOztBQUNBO0VBQ0UsWUFBWTtBQUNkIiwiZmlsZSI6IldpbmRvdy5zdmVsdGUiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgOnJvb3Qge1xuICAgIC0tYXV0b2JlbmNoLWNvbG9ycy13aW5kb3ctYmFja2dyb3VuZDogIzMzMztcbiAgICAtLWF1dG9iZW5jaC1jb2xvcnMtd2luZG93LWNvbG9yOiAjZmZmO1xuICAgIC0tYXV0b2JlbmNoLWNvbG9ycy1ib3JkZXItY29sb3I6IHZhcigtLWF1dG9iZW5jaC1jb2xvcnMtd2luZG93LWNvbG9yKTtcbiAgICAtLWF1dG9iZW5jaC10cmFuc3BhcmVuY3ktdGludDogNTAlO1xuICAgIC0tYXV0b2JlbmNoLXRyYW5zLWJnOiAvKiBpbWFnZSAqL1xuICAgICAgLyogdGludCBpbWFnZSAqL1xuICAgICAgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCBoc2xhKDAsIDAlLCB2YXIoLS1hdXRvYmVuY2gtdHJhbnNwYXJlbmN5LXRpbnQpLDAuNSksIGhzbGEoMCwwJSx2YXIoLS1hdXRvYmVuY2gtdHJhbnNwYXJlbmN5LXRpbnQpLDAuNSkpLFxuICAgICAgLyogY2hlY2tlcmVkIGVmZmVjdCAqL1xuICAgICAgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCBibGFjayA1MCUsIHdoaXRlIDUwJSksXG4gICAgICBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCBibGFjayA1MCUsIHdoaXRlIDUwJSk7XG4gICAgLS1hdXRvYmVuY2gtY29sb3JzLXZpZXctd3JhcHBlci1iYWNrZ3JvdW5kOiB2YXIoLS1hdXRvYmVuY2gtdHJhbnMtYmcpO1xuICAgIC0tYXV0b2JlbmNoLWNvbG9ycy12aWV3LXdyYXBwZXItY29sb3I6IHZhcigtLWF1dG9iZW5jaC1jb2xvcnMtd2luZG93LWNvbG9yKTtcbiAgICAtLWF1dG9iZW5jaC1jb2xvcnMtdmlldy13cmFwcGVyLWJvcmRlci1jb2xvcjogdmFyKC1hdXRvYmVuY2gtY29sb3JzLXZpZXctd3JhcHBlci1jb2xvcik7XG4gICAgICAvKiBzaXplICovXG4gICAgLS1hdXRvYmVuY2gtY29sb3JzLXZpZXctd3JhcHBlci1iYWNrZ3JvdW5kLXNpemU6IDFyZW0gMXJlbTtcbiAgICAtLWF1dG9iZW5jaC1jb2xvcnMtdmlldy13cmFwcGVyLWJhY2tncm91bmQtYmxlbmQ6IG5vcm1hbCwgZGlmZmVyZW5jZSwgbm9ybWFsO1xuICB9XG4gIC5oZWFkZXIsLmhlYWRlcj5sYWJlbCB7XG4gICAgZ3JpZC1hcmVhOiBoZWFkZXI7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1sZWZ0OiAxZW07XG4gIH1cbiAgLmhlYWRlciBpbnB1dCB7XG4gICAgd2lkdGg6IDRlbTtcbiAgfVxuICAud2luZG93IHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtY29sdW1uOiBoZWFkZXIgLyBtYWluO1xuICAgIGdyaWQtcm93OiBoZWFkZXIgLyBtYWluO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogc3ViZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHN1YmdyaWQ7XG4gICAgY29sb3I6IHZhcigtLWF1dG9iZW5jaC1jb2xvcnMtd2luZG93LWNvbG9yKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hdXRvYmVuY2gtY29sb3JzLXdpbmRvdy1iYWNrZ3JvdW5kKTtcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xuICAgIHBhZGRpbmc6IDBlbSAxZW07XG4gIH1cbiAgbWFpbiB7XG4gICAgZ3JpZC1hcmVhOiBtYWluO1xuICB9XG4gIGlucHV0IHtcbiAgICBjb2xvcjogYmxhY2s7XG4gIH1cblxuXG4gIFxuICAiXX0= */</style>