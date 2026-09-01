// The term registry. One entry per course term the site serves.
//
// Page     = { slug, title, kind: 'week'|'concept'|'repair'|'homework'|'builder'|'projects',
//              data: object,
//              unlocksAt?: string }   // UTC ISO. Absent means the page is never gated.
// NavGroup = { section: string, pages: Page[] }
// Term     = { id, label, title, tagline, active, kickers: { repair, project, homework? }, nav }
//
// `id` is both the hash segment (#/t2/w1) and the localStorage namespace (gd:t2:*),
// so it must stay short, stable and URL-safe.

import t2Nav from './t2/nav.js'
import t3Nav from './t3/nav.js'

export const TERMS = [
  {
    id: 't3',
    label: 'Term 3',
    title: 'Game Dev · Term 3',
    tagline: '12 weeks of pygame. A Collector game, Pong, and a Platformer.',
    active: true,
    kickers: { repair: 'Repair Center', project: 'Final Project', homework: 'Pong Homework' },
    nav: t3Nav,
  },
  {
    id: 't2',
    label: 'Term 2',
    title: 'Game Dev · Term 2',
    tagline: 'The Space Shooter course. 9 weeks, 10 visual concepts, 11 repairs.',
    active: false,
    kickers: { repair: 'Space Shooter Repair Center', project: 'Final Project' },
    nav: t2Nav,
  },
]

export const getTerm = (id) => TERMS.find((t) => t.id === id) || null

export const allPages = (term) => term.nav.flatMap((g) => g.pages)

export const findPage = (term, slug) => allPages(term).find((p) => p.slug === slug) || null
