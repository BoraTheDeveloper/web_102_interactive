// When each T3 week opens to students.
//
// Class runs Sunday 4:30 PM to 6:00 PM Phnom Penh time (GMT+7). Content opens at
// 6:00 PM, so nobody reads the recap on a phone mid-lesson. GMT+7 has no
// daylight saving, so 6:00 PM local is always 11:00 UTC. Keep these as UTC and
// never compute an offset from the student's timezone at runtime.
//
// If a class shifts or gets cancelled, edit the one line and push.

export const UNLOCKS_AT = {
  w1: '2026-08-09T11:00:00Z',
  w2: '2026-08-16T11:00:00Z',
  w3: '2026-08-23T11:00:00Z',
  w4: '2026-08-30T11:00:00Z',
  w5: '2026-09-06T11:00:00Z',
  w6: '2026-09-13T11:00:00Z',
  w7: '2026-09-20T11:00:00Z',
  w8: '2026-09-27T11:00:00Z',
  w9: '2026-10-04T11:00:00Z',
  w10: '2026-10-11T11:00:00Z',
  w11: '2026-10-18T11:00:00Z',
  w12: '2026-10-25T11:00:00Z',
}
