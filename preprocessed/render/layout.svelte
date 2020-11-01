<script lang="ts">// code here
import Sidebar from "./sidebar/Sidebar.svelte";
import SvWindow from "./Window.svelte";
let navVis = true;
</script><div class="wrapper"><Sidebar bind:visible={navVis}/><SvWindow bind:navVis={navVis}><slot></slot></SvWindow ></div><style lang="postcss">.wrapper {
  display: grid;
  flex-direction: row;
  width: 100vw;
  min-height: 100vh;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 4em 1fr;
  grid-template-areas: 
  "sidebar header"
  "sidebar main"
  "sidebar knobs";
}
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheW91dC5zdmVsdGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsZ0NBQWdDO0VBQ2hDLDJCQUEyQjtFQUMzQjs7O2lCQUdlO0FBQ2pCIiwiZmlsZSI6ImxheW91dC5zdmVsdGUiLCJzb3VyY2VzQ29udGVudCI6WyJcbi53cmFwcGVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgd2lkdGg6IDEwMHZ3O1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAyMDBweCAxZnI7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogNGVtIDFmcjtcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXG4gIFwic2lkZWJhciBoZWFkZXJcIlxuICBcInNpZGViYXIgbWFpblwiXG4gIFwic2lkZWJhciBrbm9ic1wiO1xufVxuIl19 */</style>