import { useState } from 'react'

function ImagePlaceholder({ small }) {
  if (small) {
    return (
      <div className="flex-shrink-0 flex items-center justify-center rounded-lg" style={{ width: '80px', height: '80px', backgroundColor: '#2f3336' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: '#71767b' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>
    )
  }
  return (
    <div className="w-full flex items-center justify-center rounded-t-xl overflow-hidden" style={{ aspectRatio: '2/1', backgroundColor: '#2f3336' }}>
      <div className="flex flex-col items-center gap-2" style={{ color: '#71767b' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <span className="text-xs">No image (800×418 recommended for summary_large_image)</span>
      </div>
    </div>
  )
}

export default function TwitterPreview({ tags }) {
  const [imgError, setImgError] = useState(false)

  const cardType = tags.twitterCard || 'summary_large_image'
  const isLarge = cardType === 'summary_large_image'

  const title = tags.twitterTitle || tags.title || tags.pageTitle || 'Page Title'
  const description = tags.twitterDescription || tags.description || tags.metaDescription || ''
  const imageUrl = tags.twitterImage || tags.image

  const domain = (() => {
    const url = tags.url || ''
    try { return new URL(url).hostname } catch { return '' }
  })()

  const handle = tags.twitterSite || ''

  const displayTitle = title.length > 70 ? title.slice(0, 70) + '…' : title
  const displayDesc = description.length > 125 ? description.slice(0, 125) + '…' : description

  if (isLarge) {
    return (
      <div className="rounded-2xl overflow-hidden border" style={{ backgroundColor: '#15202b', borderColor: '#38444d', maxWidth: '500px', fontFamily: 'TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {/* Large image */}
        {imageUrl && !imgError ? (
          <div className="w-full overflow-hidden" style={{ aspectRatio: '2/1' }}>
            <img
              src={imageUrl}
              alt={tags.twitterImageAlt || tags.imageAlt || displayTitle}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <ImagePlaceholder small={false} />
        )}

        {/* Text */}
        <div className="px-4 py-3">
          {domain && (
            <p className="text-xs mb-1" style={{ color: '#8899a6' }}>{domain}</p>
          )}
          <p className="text-sm font-bold leading-snug" style={{ color: '#ffffff' }}>
            {displayTitle}
          </p>
          {displayDesc && (
            <p className="text-sm mt-1 leading-snug" style={{ color: '#8899a6' }}>
              {displayDesc}
            </p>
          )}
          {handle && (
            <p className="text-xs mt-2" style={{ color: '#8899a6' }}>{handle}</p>
          )}
        </div>
      </div>
    )
  }

  // Summary card (small image)
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ backgroundColor: '#15202b', borderColor: '#38444d', maxWidth: '500px', fontFamily: 'TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="flex gap-3 p-3">
        {/* Small image */}
        {imageUrl && !imgError ? (
          <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: '80px', height: '80px' }}>
            <img
              src={imageUrl}
              alt={tags.twitterImageAlt || tags.imageAlt || displayTitle}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <ImagePlaceholder small={true} />
        )}

        {/* Text */}
        <div className="flex-1 min-w-0">
          {domain && (
            <p className="text-xs mb-1" style={{ color: '#8899a6' }}>{domain}</p>
          )}
          <p className="text-sm font-bold leading-snug" style={{ color: '#ffffff' }}>
            {displayTitle}
          </p>
          {displayDesc && (
            <p className="text-xs mt-1 leading-snug" style={{ color: '#8899a6' }}>
              {displayDesc.length > 80 ? displayDesc.slice(0, 80) + '…' : displayDesc}
            </p>
          )}
          {handle && (
            <p className="text-xs mt-1" style={{ color: '#8899a6' }}>{handle}</p>
          )}
        </div>
      </div>
    </div>
  )
}
