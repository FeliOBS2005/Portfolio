import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Stars Canvas ──
;(function () {
  const canvas = document.getElementById('stars-canvas')
  const ctx = canvas.getContext('2d')
  let stars = []

  function resize() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }

  function createStars() {
    stars = Array.from({ length: 120 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.2 + 0.2,
      a:     Math.random(),
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }))
  }

  function drawStars(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stars.forEach(s => {
      const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase))
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(191,166,255,${alpha})`
      ctx.fill()
    })
    requestAnimationFrame(drawStars)
  }

  resize()
  createStars()
  requestAnimationFrame(drawStars)
  window.addEventListener('resize', () => { resize(); createStars() })
})()

// ── Custom Cursor ──
;(function () {
  const cursor = document.getElementById('cursor')
  const ring   = document.getElementById('cursor-ring')
  let mx = 0, my = 0, rx = 0, ry = 0

  document.addEventListener('mousemove', e => {
    mx = e.clientX
    my = e.clientY
  })

  function animate() {
    cursor.style.left = mx + 'px'
    cursor.style.top  = my + 'px'
    rx += (mx - rx) * 0.14
    ry += (my - ry) * 0.14
    ring.style.left = rx + 'px'
    ring.style.top  = ry + 'px'
    requestAnimationFrame(animate)
  }
  animate()
})()

// ── GSAP : Scroll Reveal ──
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  )
})

// ── GSAP : Skill Bars ──
gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
  ScrollTrigger.create({
    trigger: bar,
    start: 'top 90%',
    onEnter: () => { bar.style.width = bar.dataset.w + '%' },
  })
})

// ── GSAP : Hero entrance ──
gsap.timeline({ delay: 0.2 })
  .from('#hero-tag',    { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' })
  .from('#hero-sub',    { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=.4')
  .from('#hero-name',   { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out' }, '-=.5')
  .from('#hero-desc',   { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=.4')
  .from('#hero-cta',    { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=.4')
  .from('#hero-social', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, '-=.3')

// ── GSAP : Parallax orbs ──
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30
  const y = (e.clientY / window.innerHeight - 0.5) * 30
  gsap.to('.orb-1', { x: x * 0.8,  y: y * 0.8,  duration: 1.8, ease: 'power2.out' })
  gsap.to('.orb-2', { x: -x * 0.5, y: -y * 0.5, duration: 2.2, ease: 'power2.out' })
  gsap.to('.orb-3', { x: x * 0.3,  y: y * 0.3,  duration: 1.5, ease: 'power2.out' })
})
