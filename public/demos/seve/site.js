/* Maison Sève: an invented label. Bag and invitation stay in the browser. */
(function () {
  'use strict'
  const $ = (s, el = document) => el.querySelector(s)
  const euro = (n) => n.toLocaleString('fr-FR') + ' €'
  const LOOKS = [
    ['Robe nuage', 690, 'Voile de coton froncé, épaules dénudées, manches bouffantes.', ['XL']],
    ['Robe épaule nue', 640, 'Jersey de viscose lourd, encolure bateau, fente côté.', []],
    ['Robe tourbillon', 1150, 'Douze mètres de faille, jupe à godets qui tourne au moindre pas.', ['XS', 'S']],
    ['Manteau grenat', 980, 'Drap de laine double face, col cranté, sans doublure.', []],
    ['Robe corolle', 520, 'Coton imprimé fleurs rouges, taille marquée, jupe ample.', ['M']],
    ['Robe pois brûlés', 460, 'Crêpe fluide imprimé pois, manches volantées.', []],
    ['Pull côtes bordeaux', 310, 'Laine mérinos côtelée, coupe droite, homme.', []],
    ['Manteau camel long', 860, 'Poil de chameau et laine, ceinture à nouer.', ['XS']],
    ['Manteau à carreaux', 790, 'Tweed tissé en Écosse, épaules tombantes.', []],
    ['Robe dentelle nuit', 720, 'Dentelle de Calais bleu nuit, découpes à la taille.', ['L', 'XL']],
    ['Combinaison lagon', 540, 'Satin de soie, décolleté profond, jambes larges.', []],
    ['Manteau rose poudre', 830, 'Laine et cachemire, double boutonnage.', []],
  ].map(([name, price, desc, out], i) => ({ id: i + 1, n: String(i + 1).padStart(2, '0'), name, price, desc, out, img: `img/look-${String(i + 1).padStart(2, '0')}.jpg` }))
  const SIZES = ['XS', 'S', 'M', 'L', 'XL']

  /* track */
  $('#track').innerHTML = LOOKS.map((l) => `<li class="look"><button data-id="${l.id}" aria-label="Look ${l.n}, ${l.name}, ${euro(l.price)}"><div class="ph"><img src="${l.img}" alt="" loading="lazy"><span class="num">${l.n}</span></div><div class="meta"><span class="nm">${l.name}</span><span class="pr">${euro(l.price)}</span></div>${l.out.length ? `<div class="so">Épuisé en ${l.out.join(', ')}</div>` : ''}</button></li>`).join('')
  $('#track').addEventListener('click', (e) => { const b = e.target.closest('[data-id]'); if (b) openProduct(+b.dataset.id, b) })

  const col = $('#collection'), track = $('#track'), pin = $('#pin')
  const wide = () => window.matchMedia('(min-width: 981px)').matches
  function sizeCollection() {
    if (!wide()) { col.style.height = ''; return }
    const extra = track.scrollWidth - innerWidth
    col.style.height = innerHeight + Math.max(0, extra) + 'px'
  }
  function onScroll() {
    $('#hdr').classList.toggle('solid', scrollY > innerHeight * 0.85)
    if (!wide()) return
    const r = col.getBoundingClientRect()
    const extra = track.scrollWidth - innerWidth
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, col.offsetHeight - innerHeight)))
    track.style.transform = `translateX(${-p * Math.max(0, extra)}px)`
    $('#progress').textContent = String(Math.min(12, Math.floor(p * 11.99) + 1)).padStart(2, '0')
  }
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', () => { sizeCollection(); onScroll() })
  addEventListener('load', () => { sizeCollection(); onScroll() })
  sizeCollection(); onScroll()

  /* sheets */
  let lastFocus = null
  function openSheet(el, from) {
    lastFocus = from || document.activeElement
    el.hidden = false
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('open')))
    setTimeout(() => { const f = el.querySelector('.x'); if (f) f.focus() }, 60)
  }
  function closeSheet(el) {
    el.classList.remove('open')
    document.body.style.overflow = ''
    setTimeout(() => { el.hidden = true }, 450)
    if (lastFocus) lastFocus.focus()
  }
  document.querySelectorAll('.sheet').forEach((s) => s.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeSheet(s) }))
  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    document.querySelectorAll('.sheet.open').forEach(closeSheet)
  })

  /* product */
  let cur = null, size = null
  function openProduct(id, from) {
    cur = LOOKS.find((l) => l.id === id); size = null
    $('#pImg').src = cur.img; $('#pImg').alt = `Look ${cur.n}, ${cur.name}`
    $('#pLook').textContent = `Look ${cur.n} · Rouge Sève`
    $('#pName').textContent = cur.name
    $('#pPrice').textContent = euro(cur.price)
    $('#pDesc').textContent = cur.desc + ' Fabriqué à Paris.'
    $('#sizeErr').textContent = ''
    renderSizes()
    openSheet($('#product'), from)
  }
  function renderSizes() {
    $('#pSizes').innerHTML = SIZES.map((s) => {
      const out = cur.out.includes(s)
      return `<button type="button" data-s="${s}" aria-pressed="${size === s}" ${out ? 'disabled aria-label="' + s + ', épuisé"' : ''}>${s}</button>`
    }).join('')
  }
  $('#pSizes').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (b && !b.disabled) { size = b.dataset.s; $('#sizeErr').textContent = ''; renderSizes() } })
  $('#addBtn').addEventListener('click', () => {
    if (!size) { $('#sizeErr').textContent = 'Choisissez une taille.'; return }
    const ex = bag.find((x) => x.id === cur.id && x.size === size)
    if (ex) ex.q++; else bag.push({ id: cur.id, size, q: 1 })
    renderBag()
    closeSheet($('#product'))
    toast(`${cur.name}, taille ${size}, ajouté au panier`)
    const c = $('#bagBtn'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump')
  })

  /* bag */
  const bag = []
  function renderBag() {
    const count = bag.reduce((a, x) => a + x.q, 0)
    $('#bagCount').textContent = count
    if (!bag.length) {
      $('#items').innerHTML = '<li class="empty">Votre panier est vide.</li>'
      $('#bagFoot').innerHTML = ''
      return
    }
    $('#items').innerHTML = bag.map((x, i) => {
      const l = LOOKS.find((k) => k.id === x.id)
      return `<li class="item"><img src="${l.img}" alt=""><div><div class="nm">${l.name}</div><div class="sub">Look ${l.n} · taille ${x.size} · ${euro(l.price)}</div><div class="qty"><button data-i="${i}" data-d="-1" aria-label="Retirer un">−</button><span aria-live="polite">${x.q}</span><button data-i="${i}" data-d="1" aria-label="Ajouter un">+</button><button class="rm" data-i="${i}" data-rm>Retirer</button></div></div></li>`
    }).join('')
    const total = bag.reduce((a, x) => a + x.q * LOOKS.find((k) => k.id === x.id).price, 0)
    $('#bagFoot').innerHTML = `<div class="tot"><span>Total</span><span>${euro(total)}</span></div><p class="fine">Livraison offerte en France. Retouches offertes pendant un an.</p><button class="btn-dark" id="checkout">Passer commande</button>`
  }
  $('#items').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]'); if (!b) return
    const i = +b.dataset.i
    if (b.hasAttribute('data-rm')) bag.splice(i, 1)
    else { bag[i].q += +b.dataset.d; if (bag[i].q <= 0) bag.splice(i, 1) }
    renderBag()
  })
  $('#bagFoot').addEventListener('click', (e) => { if (e.target.id === 'checkout') toast('Démo : aucune commande ni paiement n’est enregistré.') })
  $('#bagBtn').addEventListener('click', (e) => { renderBag(); openSheet($('#bag'), e.currentTarget) })
  renderBag()

  /* invitation */
  $('#invite').addEventListener('submit', (e) => {
    e.preventDefault()
    const f = e.currentTarget, err = $('#ferr')
    const name = f.name.value.trim(), mail = f.email.value.trim()
    f.name.setAttribute('aria-invalid', !name); f.email.setAttribute('aria-invalid', !/^\S+@\S+\.\S+$/.test(mail))
    if (!name) { err.textContent = 'Indiquez votre nom.'; f.name.focus(); return }
    if (!/^\S+@\S+\.\S+$/.test(mail)) { err.textContent = 'Indiquez une adresse e-mail valide.'; f.email.focus(); return }
    const role = f.role.value
    f.classList.add('done')
    f.innerHTML = `<h3>Merci, ${name.split(' ')[0].replace(/[<>&]/g, '')}.</h3><p>Votre demande (${role.toLowerCase()}) est notée. Le bureau de presse répond sous 72 heures.</p><p class="fine">Démo : rien n'a été envoyé.</p>`
  })

  /* countdown to 2 March 2027, 20:00 Paris */
  const target = new Date('2027-03-02T20:00:00+01:00').getTime()
  function tick() {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000))
    const d = Math.floor(s / 86400); s -= d * 86400
    const h = Math.floor(s / 3600); s -= h * 3600
    const m = Math.floor(s / 60); s -= m * 60
    const cell = (v, l) => `<div><dt>${l}</dt><dd>${String(v).padStart(2, '0')}</dd></div>`
    $('#countdown').innerHTML = cell(d, 'jours') + cell(h, 'heures') + cell(m, 'minutes') + cell(s, 'secondes')
  }
  tick(); setInterval(tick, 1000)

  let tt = 0
  function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2800) }
})()
