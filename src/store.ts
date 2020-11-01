/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-restricted-globals */
import { getContext } from 'svelte'
import { writable ,get ,Writable ,Readable ,derived } from 'svelte/store'
// import {v4 as uuid4} from 'uuid'
type Node = Element

export interface SidebarItem {
  name: string
  id: string
  children?: (GroupStore)[]
  depth: number
  node?: Node
  targetNode?: Node
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

export interface GroupItem extends DomItem ,NestableItem {
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
  id: 'root'
  ,name: 'Components'
  ,children: []
  ,depth: 0
}

export const enum WalkRequest {
  Quit = 0 ,
  Descend = 1 ,
  Ascend = 2
}

// export let genId = uuid4 as ()=>string
export const genId = (() => {
  let id = 0
  return () => (id++).toString()
})()

export interface GroupStore<T extends SidebarItem = SidebarItem> extends Readable<T>{
  addItem: <C extends GroupStore> (item:C)=>void
  setActiveWindow: <C extends GroupStore> (item:C)=>void
  attemptHashActivation: ()=>void
  genId: ()=>string
  update: ()=>void
  setNode: (node:Node)=>void
  setName: (name: string)=>void
  setTargetNode: (node:Node)=>void
  mount: (target: Node)=>void
  unmount: ()=>void
  setDepth: (depth: number) => void
  walk(enter?: (item:GroupStore)=>(WalkRequest|void) ,exit?: (item:GroupStore)=>(WalkRequest|void)): (WalkRequest|void)
}
let activeWindow : Writable<GroupStore>

export const groupFactory: <T extends SidebarItem>(group: T)=>GroupStore<T> = (group) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { subscribe ,update } = writable(group)
  return {
    subscribe
    ,update: (() => {
      update((d) => d)
    })
    ,addItem: (item) => {
      update((d) => {
        d.children!.push(item)
        get(item).node?.remove()
        return d
      })
    }
    ,setName: (name) => {
      // eslint-disable-next-line no-param-reassign
      update((d) => (d.name = name ,d))
    }
    ,setNode: (node) => {
      // eslint-disable-next-line no-param-reassign
      update((d) => (d.node = node ,d))
    }
    ,setTargetNode: (node) => {
      // eslint-disable-next-line no-param-reassign
      update((d) => (d.targetNode = node ,d))
    }
    ,mount: (target: Node) => {
      if (group.node !== undefined) {
        target.appendChild(group.node)
        for (const child of group.children ?? []) {
          child.setDepth(group.depth + 1)
          child.mount(group.targetNode!)
        }
      }
    }
    ,unmount: () => {
      if (group.node !== undefined) {
        group.node.remove()
        for (const child of group.children ?? []) {
          child.unmount()
        }
      }
    }
    ,setActiveWindow(item) {
      activeWindow.set(item ?? group)
    }
    ,attemptHashActivation() {
      if (`#${group.id}` === location.hash) {
        activeWindow.set(this)
      }
    }
    ,genId
    ,setDepth: (depth: number) => {
      // eslint-disable-next-line no-param-reassign
      update((g) => (g.depth = depth ,g))
    }
    ,walk(enter ,exit) {
      let walkReq = enter?.(this) ?? WalkRequest.Descend
      if (walkReq === WalkRequest.Quit) return walkReq
      if (walkReq === WalkRequest.Descend) {
        for (const child of group.children ?? []) {
          walkReq = child.walk(enter ,exit) ?? walkReq
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

export const groups: GroupStore = groupFactory(groupDefaultContext)
export const sidebarStore: Readable<GroupStore[]> = derived(groups ,($groups) => $groups.children ?? [])
setTimeout(() => groups.update() ,1000)

activeWindow = (() => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { set ,subscribe ,update } = writable<GroupStore>(groups)
  return {
    subscribe
    ,set: (item: GroupStore) => {
      for (const oldItem of (get(groups).children ?? [])) {
        oldItem.unmount()
      }
      item.setDepth(0)
      if (item !== groups) {
        item.mount(get(groups).targetNode!)
      }
      else {
        for (const child of get(groups).children ?? []) {
          child.setDepth(get(groups).depth + 1)

          child.mount(get(groups).targetNode!)
        }
      }
      set(item)
    }
    ,update
  }
})()

const activeWindowConst = activeWindow
export { activeWindowConst as activeWindow }

export const getGroupContext: ()=>GroupStore = () => getContext<GroupStore>(groupContextKey) ?? groups
