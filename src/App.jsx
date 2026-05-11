import { useEffect, useRef, useState } from 'react'
import './App.css'

const GALLERY = [
  { id: 1, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', title: '山间的光', cat: '风光' },
  { id: 2, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', title: '寂静之森', cat: '风光' },
  { id: 3, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', title: '远方的湖', cat: '风光' },
  { id: 4, src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80', title: '海浪', cat: '风光' },
  { id: 5, src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80', title: '胶片肖像', cat: '人像' },
  { id: 6, src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80', title: '光影之间', cat: '人像' },
  { id: 7, src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80', title: '都市剪影', cat: '街拍' },
  { id: 8, src: 'https://images.unsplash.com/photo-1446034295857-c39f8844fad4?w=800&q=80', title: '夜灯', cat: '街拍' },
  { id: 9, src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80', title: '星空', cat: '风光' },
]

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [])

  return [ref, visible]
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#" className="nav__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        LIU STUDIO
      </a>
      <button
        className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="菜单"
      >
        <span /><span />
      </button>
      <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
        <li><button onClick={() => scrollTo('hero')}>首页</button></li>
        <li><button onClick={() => scrollTo('gallery')}>作品</button></li>
        <li><button onClick={() => scrollTo('about')}>关于</button></li>
        <li><button onClick={() => scrollTo('contact')}>联系</button></li>
      </ul>
    </nav>
  )
}

function Hero() {
  const [heroRef, heroVisible] = useReveal()

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__bg" />
      <div className={`hero__content ${heroVisible ? 'reveal' : ''}`}>
        <p className="hero__subtitle">用镜头捕捉时光</p>
        <h1 className="hero__title">
          让每一帧<br />都成为永恒
        </h1>
        <p className="hero__desc">
          风光 · 人像 · 街拍 — 探索光影交织的世界
        </p>
        <button className="hero__cta" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
          浏览作品
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </button>
      </div>
      <div className="hero__scroll">
        <span />
      </div>
    </section>
  )
}

function Gallery() {
  const [galleryRef, galleryVisible] = useReveal()

  return (
    <section id="gallery" className="gallery" ref={galleryRef}>
      <div className={`section-head ${galleryVisible ? 'reveal' : ''}`}>
        <span className="section-head__tag">Portfolio</span>
        <h2>精选作品</h2>
        <p>每一张照片，都是一个故事</p>
      </div>
      <div className="gallery__grid">
        {GALLERY.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

function GalleryCard({ item, index }) {
  const [loaded, setLoaded] = useState(false)
  const delay = `${index * 0.1}s`

  return (
    <div className="gallery-card" style={{ transitionDelay: delay }}>
      <div className="gallery-card__inner">
        <img
          src={item.src}
          alt={item.title}
          className={`gallery-card__img ${loaded ? 'gallery-card__img--loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        <div className="gallery-card__overlay">
          <span className="gallery-card__cat">{item.cat}</span>
          <h3 className="gallery-card__title">{item.title}</h3>
        </div>
      </div>
    </div>
  )
}

function About() {
  const [aboutRef, aboutVisible] = useReveal()

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className={`about__grid ${aboutVisible ? 'reveal' : ''}`}>
        <div className="about__image">
          <div className="about__image-frame">
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80"
              alt="摄影师"
              loading="lazy"
            />
          </div>
        </div>
        <div className="about__text">
          <span className="section-head__tag">About</span>
          <h2>刘摄影师</h2>
          <p className="about__role">自由摄影师 / 视觉艺术家</p>
          <p className="about__bio">
            从事摄影十年，游历过三十个国家。相信每一束光都有它的故事，每一位被摄者都有独特的美。
            擅长在自然光下捕捉真实瞬间，作品曾发表于《国家地理》《VOGUE》等杂志。
          </p>
          <div className="about__stats">
            <div className="about__stat">
              <strong>10+</strong>
              <span>年经验</span>
            </div>
            <div className="about__stat">
              <strong>500+</strong>
              <span>项目完成</span>
            </div>
            <div className="about__stat">
              <strong>30+</strong>
              <span>合作品牌</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [contactRef, contactVisible] = useReveal()

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className={`contact__inner ${contactVisible ? 'reveal' : ''}`}>
        <span className="section-head__tag">Contact</span>
        <h2>合作联系</h2>
        <p className="contact__desc">
          无论是商业拍摄、个人写真，还是艺术合作，都欢迎联系我
        </p>
        <a href="mailto:hello@liustudio.com" className="contact__email">
          hello@liustudio.com
        </a>
        <div className="contact__social">
          <a href="#" aria-label="Instagram">Instagram</a>
          <span>/</span>
          <a href="#" aria-label="小红书">小红书</a>
          <span>/</span>
          <a href="#" aria-label="微博">微博</a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} LIU STUDIO. All rights reserved.</p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
