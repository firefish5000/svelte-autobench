export function isColor(strColor: string){
  let s = new Option().style;
  s.color = strColor;
  if (s.color === '') return false
  return true
}
export function returnIfColor(strColor: string): string | undefined
{
  if (isColor(strColor))
    return strColor
}
export function tryColorProp(prop:string,strColor: string,fallback=undefined){
  let s = new Option().style;
  s.color = strColor;
  if (s.color === '') return fallback
  return `${prop}: ${strColor};`
}
export function updateColorsFromUrl() {
  const url = new URL(location.href)
  return JSON.parse(
    Object.fromEntries(url.searchParams.entries())?.theme ?? '')
}
export function themeSerialize(theme) {
  const search = new URLSearchParams()
  theme.colors !== undefined && search.set('colors',JSON.stringify(theme.colors))
  theme.numbers !== undefined && search.set('numbers',JSON.stringify(theme.numbers))
  theme.booleans !== undefined && search.set('booleans',JSON.stringify(theme.booleans))
  return search
}
export function themeFromUri() {
  const search = new URLSearchParams('' + location.search)
  return {
    colors: JSON.parse(search.get('colors')) ?? {},
    booleans: JSON.parse(search.get('booleans')) ?? {},
    numbers: JSON.parse(search.get('numbers')) ?? {},
  }
}
 
export function makeColors() {return {color: '', background: ''}}

export function checkTheme(theme) {
  const params: Partial<Record<keyof typeof theme,{}>> ={}
  Object.entries(theme.colors)
  .forEach(([k,v])=>{
    params.colors = params.colors ?? {}
    Object.entries(v).forEach(([ktype,c])=>{
      if(isColor(c)) {
        params.colors[ktype] = params.colors[ktype] ?? {}
        params.colors[ktype][k]=c
      }
    })    
  })
  Object.entries(theme.numbers)
  .forEach(([k,v])=>{
    params.numbers = params.numbers ?? {}
    if(typeof v === "number") {
      params.numbers[k]=v
    }
  })

  Object.entries(theme.booleans)
  .forEach(([k,v])=>{
    params.booleans = params.booleans ?? {}
    if(typeof v === "boolean") {
      params.booleans[k]=v
    }
  })
  return params
}

export function generateWindowStyle(themeChecked) {
  let style = `--autobench-trans-bg: /* image */
      /* tint image */
      linear-gradient(to right, hsla(0, 0%,${themeChecked.numbers?.['transparency-tint']??50}%,0.5),hsla(0, 0%,${themeChecked.numbers?.['transparency-tint']??50}%,0.5)),
      /* checkered effect */
      linear-gradient(to right, black 50%, white 50%),
      linear-gradient(to bottom, black 50%, white 50%);
      --autobench-colors-view-wrapper-background: var(--autobench-trans-bg);`
  Object.entries(themeChecked.colors ?? {})
  .forEach(([k,v])=>{
    Object.entries(v)
    .forEach(([ktype,c])=>{
      style += tryColorProp(`--autobench-colors-${k}-${ktype}`,c,'')
    })
  })
  if (themeChecked?.booleans?.animate === true)
    style += '--autobench-booleans-animate: running;'
  return style
}
