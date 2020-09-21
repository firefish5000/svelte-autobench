<script lang="ts">
  import { onMount, setContext } from "svelte";
  
  import { activeWindow, groupContextKey, groups } from "../store";
  import type {GroupStore } from "../store";
  import {checkTheme, generateWindowStyle, isColor,makeColors,returnIfColor,themeFromUri,themeSerialize,tryColorProp,updateColorsFromUrl} from './window'
  export let navVis: boolean
  let name: string = 'Components'
  groups.setName(name)
  setContext<GroupStore>(groupContextKey,groups)
  let thisItem: HTMLDivElement
  let thisTarget: HTMLDivElement
  onMount(()=>{
    groups.setNode(thisItem)
    groups.setTargetNode(thisTarget)
  })
  
  function openMenu() {
    navVis=true
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
  }
  function updateThemeFromUri() {
    const uriTheme=themeFromUri()
    Object.assign(theme.booleans,uriTheme.booleans ?? {})
    Object.assign(theme.colors,uriTheme.colors ?? {})
    Object.assign(theme.numbers,uriTheme.numbers ?? {})
    theme=theme
  }
  updateThemeFromUri()
  $: {
    $activeWindow 
    updateThemeFromUri()
  }
 
  
  //$: ($activeWindow,Object.assign(theme,updateColorsFromUrl()))
  
  $: themeChecked = checkTheme(theme)

  $: {
    const url = new URL(location.href)
    Object.entries(
      Object.fromEntries(themeSerialize(themeChecked).entries())
    )
    .forEach(([k,v])=>{
      url.searchParams.set(k,v)
    })
    history.replaceState(undefined,document.title,url.toString())
  }
  
  $: windowStyle = generateWindowStyle(theme)
  
  
   </script>
  
  <div class="window" 
  bind:this={thisItem}
  style={windowStyle}
  >
    <section class="header">
      {#if !navVis}
        <h3 
        on:click={openMenu} 
        on:mouseover={openMenu}>Menu</h3>
      {/if}
      <h3>Workbench</h3>
      <label>Window BG
        <input type="text" bind:value={theme.colors.window.background} >
      </label>
      <label>Text Color
        <input type="text" bind:value={theme.colors.window.color}>
      </label>
      <label>View Wrapper BG
        <input type="text" bind:value={theme.colors['view-wrapper'].background}>
      </label>
      <label>View Wrapper Color
        <input type="text" bind:value={theme.colors['view-wrapper'].color}>
      </label>
      <label>Transparency Tint
        <input type="range" min={0} max={100} bind:value={theme.numbers['transparency-tint']}>
      </label>
      <label>View BG
        <input type="text" bind:value={theme.colors.view.background}>
      </label>
      <label>View Color
        <input type="text" bind:value={theme.colors.view.color}>
      </label>
      <label>Keep State
        <input type="checkbox" bind:checked={theme.booleans['keep-state']}>
      </label>
      <label>Pan Background
        <input type="checkbox" bind:checked={theme.booleans.animate}>
      </label>
    </section>
    <main class="content" bind:this={thisTarget}>
      <slot></slot>
    </main>
  </div>
  
  
  <style lang="postcss">
  :root {
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


  
  </style>