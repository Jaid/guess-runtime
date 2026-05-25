import {expect, test} from 'bun:test'

const {default: guessRuntime} = await import('#src/main.ts')

test('should run', () => {
  const result = guessRuntime()
  expect(result).toBe('guess-runtime') // TODO Test actual functionality
})
