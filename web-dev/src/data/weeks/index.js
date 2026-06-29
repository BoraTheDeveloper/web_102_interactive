// The course menu. Every week the app knows about is registered here.
// Weeks 1, 2, and 4–10 are generated from docs/slides.

import week01 from './week01.js'
import week02 from './week02.js'
import week03 from './week03.js'
import week04 from './week04.js'
import week05 from './week05.js'
import week06 from './week06.js'
import week07 from './week07.js'
import week08 from './week08.js'
import week09 from './week09.js'
import week10 from './week10.js'

const allWeeks = [
  week01,
  week02,
  week03,
  week04,
  week05,
  week06,
  week07,
  week08,
  week09,
  week10,
]

export default allWeeks

export function getWeek(slug) {
  return allWeeks.find((w) => w.slug === slug)
}
