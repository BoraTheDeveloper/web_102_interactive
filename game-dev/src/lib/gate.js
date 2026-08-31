// The week unlock gate. Every function here is pure and takes `now` as an
// argument. Nothing in this file calls Date.now(). That argument is the seam:
// it lets you check the gate against any date by passing one in, instead of
// changing your system clock to test Week 9.

export function isUnlocked(page, now) {
  if (!page || !page.unlocksAt) return true // concepts, repairs, projects: never gated
  return Date.parse(page.unlocksAt) <= now.getTime()
}

export function msUntil(page, now) {
  if (!page || !page.unlocksAt) return 0
  return Math.max(0, Date.parse(page.unlocksAt) - now.getTime())
}

// short: one unit, for the 264px sidebar where .week-name is already ellipsized.
// long: two units, for the locked page body.
export function formatCountdown(ms, { short = false } = {}) {
  if (ms <= 0) return 'now'
  const mins = Math.floor(ms / 60000)
  const d = Math.floor(mins / 1440)
  const h = Math.floor((mins % 1440) / 60)
  const m = mins % 60
  if (d > 0) return short ? `${d}d` : `${d}d ${h}h`
  if (h > 0) return short ? `${h}h` : `${h}h ${m}m`
  return mins > 0 ? `${mins}m` : '<1m'
}

// "Sunday 6 Sep, 6:00 PM" in the student's own timezone, which is what they
// actually plan around.
export function formatUnlockLocal(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}
