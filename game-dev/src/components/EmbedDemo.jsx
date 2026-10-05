import { useEffect, useRef, useState } from 'react'

// A standalone HTML demo from public/, shown in an iframe. Used for the W9
// platformer visualizer, which the class also runs full screen on the
// projector, so porting it to React would mean two copies of the same sim.
//
// config = { page, tab, title, hint? }. `page` is relative to public/, `tab` is
// the hash the page opens on. ?embed hides the page's own header and makes it
// report its height with postMessage({ type: 'embed-height', height }), so the
// iframe never scrolls. ?theme=light matches this site, which has no dark mode.
export default function EmbedDemo({ config }) {
  const frame = useRef(null)
  const [height, setHeight] = useState(900)
  const page = `${import.meta.env.BASE_URL}${config.page}`

  useEffect(() => {
    const onMessage = (e) => {
      if (e.source !== frame.current?.contentWindow) return
      if (e.data?.type === 'embed-height' && e.data.height > 0) setHeight(e.data.height)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className="embed-demo">
      <iframe
        ref={frame}
        src={`${page}?embed&theme=light#${config.tab}`}
        title={config.title}
        style={{ height }}
      />
      <p className="demo-caption">
        {config.hint && <>{config.hint} </>}
        <a href={`${page}#${config.tab}`} target="_blank" rel="noreferrer">
          Open full screen ↗
        </a>
      </p>
    </div>
  )
}
