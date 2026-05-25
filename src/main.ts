const hasGlobal = (key: PropertyKey) => {
  return Object.hasOwn(globalThis, key)
}
const hasAllGlobals = (...keys: Array<PropertyKey>) => {
  return keys.every(hasGlobal)
}
const hasAnyGlobal = (...keys: Array<PropertyKey>) => {
  return keys.some(hasGlobal)
}
const guessRuntime = () => {
  if (hasGlobal('process')) {
    if (hasGlobal('Bun')) {
      return 'bun'
    }
    if (hasGlobal('Deno')) {
      return 'deno'
    }
    return 'node'
  }
  if (hasGlobal('window')) {
    return 'browser'
  }
}
export const guessRuntimeCarefully = () => {
  const draftedRuntime = guessRuntime()
  if (!draftedRuntime) {
    return
  }
  if (draftedRuntime === 'node') {
    if (hasAnyGlobal('Deno', 'Bun')) {
      return
    }
  }
  if (draftedRuntime === 'deno') {
    if (hasGlobal('Bun')) {
      return
    }
    if (!hasAllGlobals('createImageBitmap', 'Buffer')) {
      return
    }
  }
  if (draftedRuntime === 'bun') {
    if (hasGlobal('Deno')) {
      return
    }
    if (!hasAllGlobals('AbortController', 'Buffer', 'HTMLRewriter')) {
      return
    }
  }
  if (draftedRuntime === 'browser') {
    if (!hasAllGlobals('window', 'document', 'location', 'navigator', 'alert')) {
      return
    }
  }
  return draftedRuntime
}
export default guessRuntime
