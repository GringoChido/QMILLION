import { useState } from 'react'

const coverArtUrls: Record<string, string> = {
  'Black Radio': 'https://coverartarchive.org/release-group/dc7a73e4-b92a-4000-8ae5-d87492dfcbb1/front',
  'Black Radio 2': 'https://coverartarchive.org/release-group/99d9e4d2-d07b-4cd1-b94c-dcad78a7d609/front',
  'Covered': 'https://coverartarchive.org/release-group/7f9777e8-20a8-4662-a642-c2d0e6820b2c/front',
  'ArtScience': 'https://coverartarchive.org/release-group/c54e8679-8732-40bc-a84e-7c664122a58e/front',
  'Collagically Speaking': 'https://coverartarchive.org/release-group/bfe6a431-eab0-41f3-8390-c7566980687d/front',
  'Live Today': 'https://coverartarchive.org/release-group/24b772ff-4f0e-4f00-b3b0-a94390cc20d5/front',
  'The Second': 'https://coverartarchive.org/release-group/7740b24c-c489-4bb8-9703-ca3bdc375076/front',
  'The Mugician': 'https://coverartarchive.org/release-group/89278b43-5e0b-4685-8869-e5fd71e27000/front',
  'Chris Dave and the Drumhedz': 'https://coverartarchive.org/release-group/79503be3-f865-4561-a030-fee7a06d7b88/front',
  'Where It All Begins': 'https://coverartarchive.org/release-group/97522425-5b38-495e-ac9f-4a84defb75be/front',
  "Emily's D+Evolution": 'https://coverartarchive.org/release-group/68b352ae-a374-4535-834a-96e920782e8f/front',
  'Woman': 'https://coverartarchive.org/release-group/e3bd7a34-f342-41bd-91d9-b3d2c74fa2a0/front',
  "Nobody's Smiling": 'https://coverartarchive.org/release-group/40e632ae-aa55-458e-8e64-752fdc3d1efc/front',
  'A Love Surreal': 'https://coverartarchive.org/release-group/b6a0c387-bd62-447a-b896-51a03a2b9cdf/front',
  'Charlene': 'https://coverartarchive.org/release-group/c4008e22-601b-48fb-81c6-5906a00ca21f/front',
  'Space Boogie': 'https://coverartarchive.org/release-group/3ba4dc85-d917-328c-b412-c17460f0ce79/front',
  'Wet With Fire': 'https://coverartarchive.org/release-group/6d153a28-a58c-4dba-baf7-dbe6181958e4/front',
  'Fuck Yo Feelings': 'https://coverartarchive.org/release-group/af3b387e-4dc4-49d1-aee8-f8c467958f10/front',
  'Black Times': 'https://coverartarchive.org/release-group/06f50e88-278e-4f1c-a312-7b5bf74d7c28/front',
  'Undisputed': 'https://coverartarchive.org/release-group/e59c4c29-dfe0-3dbe-b35e-539dda7ca837/front',
  'Foreva': 'https://coverartarchive.org/release-group/ad5fb6e0-b33c-489a-8c9b-a5b9c929d68b/front',
}

// Alias for alternate title used in Discography data
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
        loading="lazy"
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
    />
  )
}

export default AlbumCover
