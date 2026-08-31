// One localStorage prefix per term. Without this, T2 clicks inflate the T3
// progress counter and every repair checklist is shared across both terms.

export const nsKey = (termId, name) => `gd:${termId}:${name}`

export function readSet(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || '[]'))
  } catch {
    return new Set()
  }
}

export function writeSet(key, set) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]))
  } catch {
    // Private mode or quota exceeded. The app still works, progress just
    // doesn't survive a reload.
  }
}
