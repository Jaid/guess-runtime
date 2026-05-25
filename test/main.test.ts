import {expect, test} from 'bun:test'

const {default: guessRuntime} = await import('#src/main.ts')
test('should guess desktop runtime', () => {
  const result = guessRuntime()
  expect(result).toMatch(/^(bun|deno|node)$/)
})
