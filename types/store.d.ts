import { Writable, Readable } from 'svelte/store';
declare type Node = Element;
export interface SidebarItem {
    name: string;
    id: string;
    children?: (GroupStore)[];
    depth: number;
    node?: Node;
    targetNode?: Node;
}
export interface DomItem extends SidebarItem {
    name: string;
    id: string;
    node?: Node;
    targetNode?: Node;
}
export interface NestableItem extends SidebarItem {
    children: GroupStore[];
}
export interface ViewItem extends DomItem {
    name: string;
    id: string;
    props: any;
    type: 'view';
    node?: Node;
}
export interface GroupItem extends DomItem, NestableItem {
    name: string;
    id: string;
    type: 'group';
    children: GroupStore[];
    node?: Node;
}
export interface WindowRenderer {
    window: GroupItem;
}
export declare const groupContextKey: {};
export declare const enum WalkRequest {
    Quit = 0,
    Descend = 1,
    Ascend = 2
}
export declare const genId: () => string;
export interface GroupStore<T extends SidebarItem = SidebarItem> extends Readable<T> {
    addItem: <C extends GroupStore>(item: C) => void;
    setActiveWindow: <C extends GroupStore>(item: C) => void;
    attemptHashActivation: () => void;
    genId: () => string;
    update: () => void;
    setNode: (node: Node) => void;
    setName: (name: string) => void;
    setTargetNode: (node: Node) => void;
    mount: (target: Node) => void;
    unmount: () => void;
    setDepth: (depth: number) => void;
    walk(enter?: (item: GroupStore) => (WalkRequest | void), exit?: (item: GroupStore) => (WalkRequest | void)): (WalkRequest | void);
}
export declare const groupFactory: <T extends SidebarItem>(group: T) => GroupStore<T>;
export declare const groups: GroupStore;
export declare const sidebarStore: Readable<GroupStore[]>;
declare const activeWindowConst: Writable<GroupStore<SidebarItem>>;
export { activeWindowConst as activeWindow };
export declare const getGroupContext: () => GroupStore;
