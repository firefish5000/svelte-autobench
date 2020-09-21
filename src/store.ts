import { getContext } from "svelte";
import { children } from "svelte/internal";
import { writable, get, Writable, Readable, derived, readable } from "svelte/store";
//import {v4 as uuid4} from 'uuid'

export interface SidebarItem {
  name: string
  id: string
  children?: (GroupStore)[]
  depth: number
}

export interface DomItem extends SidebarItem {
  name: string
  id: string
  node?: Node
  targetNode?: Node
}
export interface NestableItem extends SidebarItem {
  children: GroupStore[]
}

export interface ViewItem extends DomItem {
  name: string
  id: string
  props: any
  type:'view'
  node?: Node
}

export interface GroupItem extends DomItem,NestableItem {
  name: string
  id: string
  type: 'group'
  children: GroupStore[]
  node?: Node
}


export interface WindowRenderer {
  window: GroupItem
}


/* End types */


export const groupContextKey = {}

const groupDefaultContext: NestableItem = {
  id: 'root',
  name: 'Components',
  children: [],
  depth: 0
}
export interface GroupStore<T extends SidebarItem = SidebarItem> extends Readable<T>{
  addItem: <T extends GroupStore> (item:T)=>void
  setActiveWindow: <T extends GroupStore> (item:T)=>void
  attemptHashActivation: ()=>void
  genId: ()=>string
  update: ()=>void
  setNode: (node:Node)=>void
  setName: (name: string)=>void
  setTargetNode: (node:Node)=>void
  mount: (target: Node)=>void
  unmount: ()=>void
  setDepth: (depth: number) => void
  walk(enter?: (item:GroupStore)=>(WalkRequest|void),exit?: (item:GroupStore)=>(WalkRequest|void)): (WalkRequest|void)
}
let activeWindow : Writable<GroupStore> 

export let groupFactory: <T extends SidebarItem>(group: T)=>GroupStore<T> =(group) => {
  let {set,subscribe,update} = writable(group)
  let id = 0
  let unsub
  return {
    subscribe,
    update: (()=>{
      update(d=>d)
    }),
    addItem: (item) =>{
      update(d=>{
        d.children.push(item)
        get(item).node?.remove()
        return d
      })
    },
    setName:(name)=>{
      update(d=>(d.name=name,d))
    },
    setNode: (node) => {
      // @ts-ignore
      update(d=>(d.node=node,d))
    },
    setTargetNode: (node) => {
      // @ts-ignore
      update(d=>(d.targetNode=node,d))
    },
    mount: (target: Node) =>{
      if ('node' in group) {
        // @ts-ignore
        target.appendChild(group.node)
        for (const child of group.children ?? []) {
          child.setDepth(group.depth+1)
          // @ts-ignore
          child.mount(group.targetNode)
        }
      }
    },
    unmount: () =>{
      if ('node' in group) {
        // @ts-ignore
        group.node.remove()
        for (const child of group.children ?? []) {
          child.unmount()
        }
      }
    },
    setActiveWindow: (item) => {
      // @ts-ignore
      activeWindow.set(item ?? group)
    },
    attemptHashActivation: () =>{
      if (`#${group.id}` === location.hash) {
        // @ts-ignore
        activeWindow.set(group)
      }
    },
    genId,
    setDepth: (depth: number) => {
      update(g=>(g.depth=depth,g))
    },
    walk(enter,exit) {
      let walkReq = enter?.(this) ?? WalkRequest.Descend
      if (walkReq === WalkRequest.Quit) return walkReq
      if (walkReq === WalkRequest.Descend) {
        for (const child of group.children ?? []) {
          walkReq = child.walk(enter,exit) ?? walkReq
          if (walkReq === WalkRequest.Quit) return walkReq
          if (walkReq === WalkRequest.Ascend) break
        }
      }
      walkReq = exit?.(this) ?? walkReq
      if (walkReq === WalkRequest.Quit) return walkReq
      return walkReq ?? WalkRequest.Descend
    }
  }
}

export const enum WalkRequest {
  Quit = 0,
  Descend = 1,
  Ascend = 2,
}






//export let genId = uuid4 as ()=>string
export let genId = (()=>{
  let id = 0
  return ()=>(id++).toString()
})()

export let groups: GroupStore = groupFactory(groupDefaultContext)
export let sidebarStore: Readable<GroupStore[]> = derived(groups,($groups)=>{
  return $groups.children ?? []
})
setTimeout(()=>groups.update(),1000)

activeWindow = (()=>{
  let {set,subscribe,update} = writable<GroupStore>(groups)
  return {
    subscribe,
    set: (item: GroupStore)=>{
      for (const oldItem of (get(groups).children ?? []) as GroupStore[] ) {
        oldItem.unmount()
      }
      item.setDepth(0)
      if (item !== groups) {
        item.mount(get(groups).targetNode)
      }
      else {
        for (const child of get(groups).children ?? []) {
          child.setDepth(get(groups).depth+1)

          child.mount(get(groups).targetNode)
        }
      }
      set(item)
    },
    update
  }
})()

export {activeWindow}

export let getGroupContext: ()=>GroupStore = () => getContext<GroupStore>(groupContextKey) ?? groups

