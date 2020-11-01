/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-restricted-globals */
import { getContext } from 'svelte';
import { writable, get, derived } from 'svelte/store';
/* End types */
export const groupContextKey = {};
const groupDefaultContext = {
    id: 'root',
    name: 'Components',
    children: [],
    depth: 0
};
export var WalkRequest;
(function (WalkRequest) {
    WalkRequest[WalkRequest["Quit"] = 0] = "Quit";
    WalkRequest[WalkRequest["Descend"] = 1] = "Descend";
    WalkRequest[WalkRequest["Ascend"] = 2] = "Ascend";
})(WalkRequest || (WalkRequest = {}));
// export let genId = uuid4 as ()=>string
export const genId = (() => {
    let id = 0;
    return () => (id++).toString();
})();
let activeWindow;
export const groupFactory = (group) => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { subscribe, update } = writable(group);
    return {
        subscribe,
        update: (() => {
            update((d) => d);
        }),
        addItem: (item) => {
            update((d) => {
                d.children.push(item);
                get(item).node?.remove();
                return d;
            });
        },
        setName: (name) => {
            // eslint-disable-next-line no-param-reassign
            update((d) => (d.name = name, d));
        },
        setNode: (node) => {
            // eslint-disable-next-line no-param-reassign
            update((d) => (d.node = node, d));
        },
        setTargetNode: (node) => {
            // eslint-disable-next-line no-param-reassign
            update((d) => (d.targetNode = node, d));
        },
        mount: (target) => {
            if (group.node !== undefined) {
                target.appendChild(group.node);
                for (const child of group.children ?? []) {
                    child.setDepth(group.depth + 1);
                    child.mount(group.targetNode);
                }
            }
        },
        unmount: () => {
            if (group.node !== undefined) {
                group.node.remove();
                for (const child of group.children ?? []) {
                    child.unmount();
                }
            }
        },
        setActiveWindow(item) {
            activeWindow.set(item ?? group);
        },
        attemptHashActivation() {
            if (`#${group.id}` === location.hash) {
                activeWindow.set(this);
            }
        },
        genId,
        setDepth: (depth) => {
            // eslint-disable-next-line no-param-reassign
            update((g) => (g.depth = depth, g));
        },
        walk(enter, exit) {
            let walkReq = enter?.(this) ?? WalkRequest.Descend;
            if (walkReq === WalkRequest.Quit)
                return walkReq;
            if (walkReq === WalkRequest.Descend) {
                for (const child of group.children ?? []) {
                    walkReq = child.walk(enter, exit) ?? walkReq;
                    if (walkReq === WalkRequest.Quit)
                        return walkReq;
                    if (walkReq === WalkRequest.Ascend)
                        break;
                }
            }
            walkReq = exit?.(this) ?? walkReq;
            if (walkReq === WalkRequest.Quit)
                return walkReq;
            return walkReq ?? WalkRequest.Descend;
        }
    };
};
export const groups = groupFactory(groupDefaultContext);
export const sidebarStore = derived(groups, ($groups) => $groups.children ?? []);
setTimeout(() => groups.update(), 1000);
activeWindow = (() => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { set, subscribe, update } = writable(groups);
    return {
        subscribe,
        set: (item) => {
            for (const oldItem of (get(groups).children ?? [])) {
                oldItem.unmount();
            }
            item.setDepth(0);
            if (item !== groups) {
                item.mount(get(groups).targetNode);
            }
            else {
                for (const child of get(groups).children ?? []) {
                    child.setDepth(get(groups).depth + 1);
                    child.mount(get(groups).targetNode);
                }
            }
            set(item);
        },
        update
    };
})();
const activeWindowConst = activeWindow;
export { activeWindowConst as activeWindow };
export const getGroupContext = () => getContext(groupContextKey) ?? groups;
//# sourceMappingURL=store.js.map