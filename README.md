Svench wasn't playing harmoniously with svelte-preprocess,
and it seems you cannot use svench as a component on its own.
So, here is a simple workbench that ditches all the magic,
both good and the broken, and becomes essentially just a portal.

You use this the same way as svench, but you must
import all the .svench files in the js entry point
along with the Layout component.

We will build the sidebar and create portals for the components.
No frills and no questions asked.

Knobes may be added in the future. Source map will not be supported. This is very klinky design as all I need is a simple previewer. Refinment may be done on a latter date if svench or similar project do not take off.