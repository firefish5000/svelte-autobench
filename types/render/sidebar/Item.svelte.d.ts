/// <reference types="svelte2tsx/svelte-shims" />
import type { GroupStore, SidebarItem } from '../../store';
export default class Item__SvelteComponent_ extends Svelte2TsxComponent<Partial<{
    item: GroupStore<SidebarItem>;
    descend?: boolean;
}>, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
