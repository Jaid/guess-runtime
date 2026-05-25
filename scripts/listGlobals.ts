const entriesSorted = Object.entries(globalThis).toSorted(([keyA], [keyB]) => keyA.localeCompare(keyB))
for (const [index, entry] of entriesSorted.entries()) {
  const [key, item] = entry as [string, unknown]
  const columns = [
    String(index).padStart(2),
    (typeof item).padStart(9),
    key,
  ]
  console.log(columns.join(' '))
}
