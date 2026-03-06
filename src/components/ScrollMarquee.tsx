const marqueeContent = [
  'ROBERT GLASPER', 'BLUE NOTE', 'GRAMMY AWARD', 'SEUN KUTI',
  'JILL SCOTT', 'ATLANTIC', 'CHRIS DAVE', 'KEYON HARROLD',
  'SONY', 'R+R=NOW', 'DERRICK HODGE', 'BEENIE MAN',
  'WAYNE WONDER', 'KURUPT', 'JILLIAN SPEER', 'TWEET',
]

const Separator = () => (
  <span className="inline-block mx-6 text-amber/30 text-xs">&#x2726;</span>
)

const ScrollMarquee = () => {
  const items = marqueeContent.map((text, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="font-display text-2xl md:text-3xl tracking-wider text-amber whitespace-nowrap">
        {text}
      </span>
      <Separator />
    </span>
  ))

  return (
    <section className="py-8 border-y border-amber/10 overflow-hidden bg-green">
      <div className="flex whitespace-nowrap">
        <div className="marquee-track flex">
          {items}
          {items}
        </div>
      </div>
    </section>
  )
}

export default ScrollMarquee
