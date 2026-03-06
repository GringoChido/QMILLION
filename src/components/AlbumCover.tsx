import { useState } from 'react'

const coverArtUrls: Record<string, string> = {
  'Black Radio': '/covers/black-radio.jpg',
  'Black Radio 2': '/covers/black-radio-2.jpg',
  'Covered': '/covers/covered.jpg',
  'ArtScience': '/covers/artscience.jpg',
  'Collagically Speaking': '/covers/collagically-speaking.jpg',
  'Live Today': '/covers/live-today.jpg',
  'The Second': '/covers/the-second.jpg',
  'The Mugician': '/covers/the-mugician.jpg',
  'Chris Dave and the Drumhedz': '/covers/chris-dave.jpg',
  'Where It All Begins': '/covers/where-it-all-begins.jpg',
  "Emily's D+Evolution": '/covers/emilys-devolution.jpg',
  'Woman': '/covers/woman.jpg',
  "Nobody's Smiling": '/covers/nobodys-smiling.jpg',
  'A Love Surreal': '/covers/a-love-surreal.jpg',
  'Charlene': '/covers/charlene.jpg',
  'Space Boogie': '/covers/space-boogie.jpg',
  'Fuck Yo Feelings': '/covers/fuck-yo-feelings.jpg',
  'Black Times': '/covers/black-times.jpg',
  'Undisputed': '/covers/undisputed.jpg',
  'Foreva': '/covers/foreva.jpg',
}

coverArtUrls['Where Beautiful Things Grow'] = coverArtUrls['Where It All Begins']

type Tint = 'amber' | 'green' | 'red' | 'none'

const tintGradients: Record<Tint, string> = {
  amber: 'from-amber/20 via-transparent to-base/60',
  green: 'from-green/30 via-transparent to-base/60',
  red: 'from-red/20 via-transparent to-base/60',
  none: 'from-transparent to-base/40',
}

const AlbumCover = ({
  album,
  className = '',
  tint = 'none',
  showTitle = false,
}: {
  album: string
  className?: string
  tint?: Tint
  showTitle?: boolean
}) => {
  const [failed, setFailed] = useState(false)
  const url = coverArtUrls[album]

  if (!url || failed) {
    return (
      <div className={`relative overflow-hidden bg-base-alt ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${tintGradients[tint || 'amber']}`} />
        {showTitle && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-2xl md:text-3xl tracking-widest text-cream/8 select-none">
              {album}
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-base-alt ${className}`}>
      <img
        src={url}
        alt={`${album} cover art`}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
        decoding="async"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${tintGradients[tint]}`} />
    </div>
  )
}

export const AlbumThumb = ({
  album,
  size = 40,
}: {
  album: string
  size?: number
}) => {
  const [failed, setFailed] = useState(false)
  const url = coverArtUrls[album]

  if (!url || failed) {
    return (
      <div
        className="rounded-sm bg-gradient-to-br from-amber/30 to-base-alt flex-shrink-0"
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <img
      src={url}
      alt={album}
      className="rounded-sm object-cover flex-shrink-0"
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
      loading="lazy"
      decoding="async"
    />
  )
}

export default AlbumCover
