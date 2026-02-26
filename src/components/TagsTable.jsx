export default function TagsTable({ tags, audit }) {
  // Build a flat list of audit results keyed by tag name
  const auditMap = {}
  if (audit) {
    audit.issues.forEach(item => { auditMap[item.tag] = 'issue' })
    audit.warnings.forEach(item => { auditMap[item.tag] = 'warning' })
    audit.passes.forEach(item => { auditMap[item.tag] = 'pass' })
  }

  const rows = [
    // Open Graph
    { label: 'og:title', value: tags.title, group: 'Open Graph' },
    { label: 'og:description', value: tags.description, group: 'Open Graph' },
    { label: 'og:image', value: tags.image, group: 'Open Graph' },
    { label: 'og:url', value: tags.url, group: 'Open Graph' },
    { label: 'og:type', value: tags.type, group: 'Open Graph' },
    { label: 'og:site_name', value: tags.siteName, group: 'Open Graph' },
    { label: 'og:image:width', value: tags.imageWidth, group: 'Open Graph' },
    { label: 'og:image:height', value: tags.imageHeight, group: 'Open Graph' },
    { label: 'og:image:alt', value: tags.imageAlt, group: 'Open Graph' },
    // Twitter Card
    { label: 'twitter:card', value: tags.twitterCard, group: 'Twitter Card' },
    { label: 'twitter:title', value: tags.twitterTitle, group: 'Twitter Card' },
    { label: 'twitter:description', value: tags.twitterDescription, group: 'Twitter Card' },
    { label: 'twitter:image', value: tags.twitterImage, group: 'Twitter Card' },
    { label: 'twitter:image:alt', value: tags.twitterImageAlt, group: 'Twitter Card' },
    { label: 'twitter:site', value: tags.twitterSite, group: 'Twitter Card' },
    { label: 'twitter:creator', value: tags.twitterCreator, group: 'Twitter Card' },
    // Page meta
    { label: '<title>', value: tags.pageTitle, group: 'Page Meta' },
    { label: 'meta description', value: tags.metaDescription, group: 'Page Meta' },
  ].filter(row => row.value !== null && row.value !== undefined && row.value !== '')

  if (rows.length === 0) return null

  const StatusIcon = ({ tag }) => {
    const status = auditMap[tag]
    if (status === 'issue') return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-coral flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    )
    if (status === 'warning') return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-tangerine flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    )
    if (status === 'pass') return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-turtle flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    )
    return (
      <div className="w-4 h-4 rounded-full border border-galactic/40 flex-shrink-0" />
    )
  }

  // Group rows
  const groups = ['Open Graph', 'Twitter Card', 'Page Meta']

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-metal/20">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-azure">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          Extracted Tags
          <span className="text-xs text-galactic font-normal">({rows.length} found)</span>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-metal/20">
              <th className="px-6 py-3 text-left text-xs font-semibold text-galactic uppercase tracking-wider w-5/12">Tag</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-galactic uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-galactic uppercase tracking-wider w-16">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-metal/10">
            {groups.map(group => {
              const groupRows = rows.filter(r => r.group === group)
              if (groupRows.length === 0) return null
              return [
                <tr key={`group-${group}`}>
                  <td colSpan={3} className="px-6 py-2 bg-metal/5">
                    <span className="text-xs font-semibold text-galactic uppercase tracking-wider">{group}</span>
                  </td>
                </tr>,
                ...groupRows.map((row, i) => (
                  <tr key={`${group}-${i}`} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-3">
                      <code className="text-xs font-mono text-prince">{row.label}</code>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-xs text-cloudy break-all" style={{ wordBreak: 'break-word' }}>
                        {row.value.length > 200 ? row.value.slice(0, 200) + '…' : row.value}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center">
                        <StatusIcon tag={row.label} />
                      </div>
                    </td>
                  </tr>
                ))
              ]
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
