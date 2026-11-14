/* Coulisses demo: show-day tool for an invented label. Everything runs in the browser. */
(function () {
  'use strict'
  const $ = (s, el = document) => el.querySelector(s)
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  let tt = 0
  const toast = (m) => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2800) }

  /* ================= PLAN DE SALLE ================= */
  const SC = 30, OFF = 30, RW = 32, RH = 20
  const px = (m) => OFF + m * SC
  const RUNWAY = { x: 4, y: 9, w: 23, h: 2 }
  const BACK = { x: 0, y: 5, w: 4, h: 10 }
  const MID = RUNWAY.x + RUNWAY.w / 2
  const EXITS = [
    { id: 'N', name: 'issue Nord', x: 15, y: 0, w: 2, h: 1.6 },
    { id: 'E', name: 'entrée du public', x: 27.5, y: 0, w: 2.5, h: 1.6 },
    { id: 'SO', name: 'issue Sud-Ouest', x: 6, y: 18.4, w: 2, h: 1.6 },
    { id: 'SE', name: 'issue Sud-Est', x: 24, y: 18.4, w: 2, h: 1.6 },
  ]
  const TYPES = {
    chair: { name: 'Chaise', w: 0.5, h: 0.5, seats: 1 },
    bench: { name: 'Banc 4 places', w: 2, h: 0.5, seats: 4 },
    table: { name: 'Mange-debout', w: 0.8, h: 0.8, round: true, stand: 6 },
    plant: { name: 'Plante', w: 0.7, h: 0.7, round: true },
    light: { name: 'Projecteur', w: 0.6, h: 0.6 },
    photo: { name: 'Photocall', w: 3, h: 0.3 },
    screen: { name: 'Écran LED', w: 4, h: 0.3 },
    bar: { name: 'Bar', w: 3, h: 0.8 },
  }
  const ICON = {
    chair: '<rect x="16" y="9" width="12" height="12" rx="2" fill="#fff" stroke="#3B2F32" stroke-width="1.5"/>',
    bench: '<rect x="4" y="11" width="36" height="9" rx="2" fill="#F4ECEE" stroke="#3B2F32" stroke-width="1.5"/>',
    table: '<circle cx="22" cy="15" r="9" fill="#fff" stroke="#3B2F32" stroke-width="1.5"/>',
    plant: '<circle cx="22" cy="15" r="9" fill="#CFE6D6" stroke="#2E7A55" stroke-width="1.5"/>',
    light: '<rect x="15" y="8" width="14" height="14" fill="#FFE9A8" stroke="#B77812" stroke-width="1.5"/>',
    photo: '<rect x="4" y="12" width="36" height="6" fill="#560D15"/>',
    screen: '<rect x="2" y="12" width="40" height="6" fill="#2A2F3A"/>',
    bar: '<rect x="6" y="9" width="32" height="12" rx="2" fill="#E9DDE0" stroke="#3B2F32" stroke-width="1.5"/>',
  }
  let uid = 1
  const P = { items: [], sel: null, rows: 3, seat: 'chair', aisle: true, limit: 320 }

  const dims = (it) => { const t = TYPES[it.type]; return it.rot ? [t.h, t.w] : [t.w, t.h] }
  const rectOf = (it) => { const [w, h] = dims(it); return { x: it.x - w / 2, y: it.y - h / 2, w, h } }
  const hit = (a, b, pad = 0) => a.x < b.x + b.w + pad && a.x + a.w + pad > b.x && a.y < b.y + b.h + pad && a.y + a.h + pad > b.y
  const inRoom = (r) => r.x >= -0.001 && r.y >= -0.001 && r.x + r.w <= RW + 0.001 && r.y + r.h <= RH + 0.001
  const snap = (v) => Math.round(v * 4) / 4

  function add(type, x, y, rot = 0, auto = false, seat = null) {
    const it = { id: uid++, type, x, y, rot, auto, seat }
    P.items.push(it); return it
  }

  function autoFill() {
    P.items = P.items.filter((i) => !i.auto)
    const isBench = P.seat === 'bench'
    const t = TYPES[P.seat]
    const pitch = isBench ? 2.1 : 0.55
    const fixed = P.items.map(rectOf)
    for (const side of ['N', 'S']) {
      for (let r = 0; r < P.rows; r++) {
        const y = side === 'N' ? RUNWAY.y - 0.8 - t.h / 2 - r * 0.95 : RUNWAY.y + RUNWAY.h + 0.8 + t.h / 2 + r * 0.95
        let num = 0
        for (let x = RUNWAY.x + 0.6 + t.w / 2; x + t.w / 2 <= RUNWAY.x + RUNWAY.w - 0.2; x += pitch) {
          if (P.aisle && Math.abs(x - MID) < 0.75 + t.w / 2) continue
          const rc = { x: x - t.w / 2, y: y - t.h / 2, w: t.w, h: t.h }
          if (EXITS.some((e) => hit(rc, e, 0.3)) || fixed.some((f) => hit(rc, f, 0.1)) || hit(rc, BACK, 0.2) || !inRoom(rc)) continue
          num++
          add(P.seat, Math.round(x * 100) / 100, Math.round(y * 100) / 100, 0, true, { side, row: 'ABCD'[r], num })
        }
      }
    }
    G.forEach((g) => { g.seat = null })
  }
  function seed() {
    add('screen', 3.75, 10, 1)
    add('photo', 29, 3.2)
    add('bar', 30.2, 15, 1)
    ;[[27.6, 13.4], [27.6, 16.4], [29, 18.2], [29.4, 6.4]].forEach(([x, y]) => add('table', x, y))
    ;[[27.6, 8.3], [27.6, 11.7], [4.6, 5.6], [4.6, 14.4]].forEach(([x, y]) => add('plant', x, y))
    ;[[10, 4.7], [16, 4.7], [22, 4.7], [10, 15.3], [16, 15.3], [22, 15.3]].forEach(([x, y]) => add('light', x, y))
    autoFill()
  }

  function problems() {
    const bad = new Set(), msgs = []
    const blockedExits = []
    const rw = RUNWAY
    for (const it of P.items) {
      const r = rectOf(it)
      if (!inRoom(r)) { bad.add(it.id); continue }
      if (hit(r, rw) && it.type !== 'light') bad.add(it.id)
    }
    for (const e of EXITS) {
      const n = P.items.filter((it) => hit(rectOf(it), e)).length
      P.items.filter((it) => hit(rectOf(it), e)).forEach((it) => bad.add(it.id))
      if (n) blockedExits.push(`${n} élément${n > 1 ? 's' : ''} devant l'${e.name}`)
    }
    const onRunway = P.items.filter((it) => it.type !== 'light' && hit(rectOf(it), rw)).length
    const outside = P.items.filter((it) => !inRoom(rectOf(it))).length
    msgs.push(blockedExits.length ? { ok: false, t: blockedExits.join(' · ') } : { ok: true, t: 'Issues de secours et entrée dégagées' })
    msgs.push(onRunway ? { ok: false, t: `${onRunway} élément${onRunway > 1 ? 's' : ''} sur le podium` } : { ok: true, t: 'Podium libre sur 23 m' })
    if (outside) msgs.push({ ok: false, t: `${outside} élément${outside > 1 ? 's' : ''} hors de la salle` })
    return { bad, msgs, blockedExits }
  }

  const NS = 'http://www.w3.org/2000/svg'
  const svg = $('#plan')
  function buildStatic() {
    let g = '<defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#E7F3EC"/><line x1="0" y1="0" x2="0" y2="6" stroke="#9CC9AE" stroke-width="2"/></pattern><pattern id="hatchBad" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#F8DCE0"/><line x1="0" y1="0" x2="0" y2="6" stroke="#E58A97" stroke-width="2"/></pattern></defs><g class="grid">'
    for (let x = 0; x <= RW; x++) g += `<line class="${x % 5 ? '' : 'm5'}" x1="${px(x)}" y1="${px(0)}" x2="${px(x)}" y2="${px(RH)}"/>`
    for (let y = 0; y <= RH; y++) g += `<line class="${y % 5 ? '' : 'm5'}" x1="${px(0)}" y1="${px(y)}" x2="${px(RW)}" y2="${px(y)}"/>`
    g += '</g>'
    g += `<rect class="backstage" x="${px(BACK.x)}" y="${px(BACK.y)}" width="${BACK.w * SC}" height="${BACK.h * SC}"/><text class="zlab" x="${px(2)}" y="${px(BACK.y) + 18}" text-anchor="middle">Coulisses</text>`
    g += `<rect class="runway" x="${px(RUNWAY.x)}" y="${px(RUNWAY.y)}" width="${RUNWAY.w * SC}" height="${RUNWAY.h * SC}"/><text class="runway-lab" x="${px(MID)}" y="${px(10) + 5}">PODIUM · 23 M</text>`
    g += '<g id="exits"></g>'
    g += `<rect class="room" x="${px(0)}" y="${px(0)}" width="${RW * SC}" height="${RH * SC}"/>`
    for (const e of EXITS) g += `<line class="door" x1="${px(e.x) + 4}" y1="${px(e.y === 0 ? 0 : RH)}" x2="${px(e.x + e.w) - 4}" y2="${px(e.y === 0 ? 0 : RH)}"/>`
    g += '<g id="rowlabs"></g><g id="items"></g><g id="ghostL"></g>'
    svg.innerHTML = g
  }
  function renderExits(blocked) {
    $('#exits').innerHTML = EXITS.map((e) => {
      const b = P.items.some((it) => hit(rectOf(it), e))
      const ly = e.y === 0 ? px(e.h) + 13 : px(e.y) - 6
      return `<rect class="exit${b ? ' blocked' : ''}" x="${px(e.x)}" y="${px(e.y)}" width="${e.w * SC}" height="${e.h * SC}"/><text class="exit-lab" x="${px(e.x + e.w / 2)}" y="${ly}" text-anchor="middle" style="fill:${b ? '#C0283A' : '#2E7A55'}">${e.id === 'E' ? 'ENTRÉE' : 'SORTIE'}</text>`
    }).join('')
  }
  function renderItems() {
    const { bad, msgs } = problems()
    renderExits()
    const taken = new Set(G.filter((g) => g.seat).map((g) => g.seat))
    $('#items').innerHTML = P.items.map((it) => {
      const t = TYPES[it.type], [w, h] = dims(it)
      const cls = `it ${it.type}${P.sel === it.id ? ' sel' : ''}${bad.has(it.id) ? ' bad' : ''}${taken.has(it.id) ? ' taken' : ''}${hl === it.id ? ' hl' : ''}`
      const shape = t.round
        ? `<circle class="b" cx="${px(it.x)}" cy="${px(it.y)}" r="${(w / 2) * SC}"/>`
        : `<rect class="b" x="${px(it.x - w / 2)}" y="${px(it.y - h / 2)}" width="${w * SC}" height="${h * SC}" rx="${it.type === 'chair' ? 3 : 2}"/>`
      const lab = it.type === 'bar' ? `<text class="lab" x="${px(it.x)}" y="${px(it.y) + 4}" ${it.rot ? `transform="rotate(90 ${px(it.x)} ${px(it.y)})"` : ''}>BAR</text>` : ''
      return `<g class="${cls}" data-id="${it.id}" tabindex="-1">${shape}${lab}</g>`
    }).join('')
    // row labels
    const rl = []
    for (const side of ['N', 'S']) for (const row of 'ABCD') {
      const s = P.items.filter((i) => i.seat && i.seat.side === side && i.seat.row === row)
      if (!s.length) continue
      const minX = Math.min(...s.map((i) => i.x))
      rl.push(`<text class="rowlab" x="${px(minX) - 18}" y="${px(s[0].y) + 4}">${row}</text>`)
    }
    $('#rowlabs').innerHTML = rl.join('')
    // stats
    const seats = P.items.reduce((a, i) => a + (TYPES[i.type].seats || 0), 0)
    const stand = P.items.reduce((a, i) => a + (TYPES[i.type].stand || 0), 0) + 40
    const total = seats + stand + 24
    $('#sSeats').textContent = seats
    $('#sStand').textContent = stand
    $('#sTotal').textContent = total
    const pct = total / P.limit
    const m = document.querySelector('.meter')
    m.classList.toggle('warn', pct > 0.9 && pct <= 1); m.classList.toggle('over', pct > 1)
    $('#meterBar').style.width = Math.min(100, pct * 100) + '%'
    $('#meterTxt').textContent = pct > 1 ? `${total - P.limit} personnes de trop pour la jauge` : `${P.limit - total} places de marge`
    msgs.push(pct > 1 ? { ok: false, t: 'Jauge dépassée : retirez un rang ou des mange-debout' } : { ok: true, t: `Jauge respectée (${Math.round(pct * 100)} %)` })
    $('#checks').innerHTML = msgs.map((c) => `<li class="${c.ok ? 'ok' : 'ko'}"><i>${c.ok ? '✓' : '!'}</i><span>${c.t}</span></li>`).join('')
    // selection tools
    const sel = P.items.find((i) => i.id === P.sel)
    $('#selTools').hidden = !sel
    if (sel) $('#selName').textContent = TYPES[sel.type].name + (sel.seat ? ` · ${sideName(sel.seat.side)} ${sel.seat.row}${sel.seat.num}` : '')
  }
  const sideName = (s) => (s === 'N' ? 'Nord' : 'Sud')

  /* palette */
  $('#pal').innerHTML = Object.entries(TYPES).map(([k, t]) => `<button data-type="${k}" aria-label="Ajouter : ${t.name}"><svg viewBox="0 0 44 30" aria-hidden="true">${ICON[k]}</svg>${t.name}${t.seats ? `<small>${t.seats} pl.</small>` : t.stand ? `<small>${t.stand} debout</small>` : ''}</button>`).join('')

  const toM = (e) => { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(svg.getScreenCTM().inverse()); return [(p.x - OFF) / SC, (p.y - OFF) / SC] }
  const overSvg = (e) => { const r = svg.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom }
  function freeSpot(type) {
    const t = TYPES[type]
    for (let rad = 0; rad < 16; rad += 0.5) for (let a = 0; a < 360; a += 20) {
      const x = snap(29.5 + Math.cos((a * Math.PI) / 180) * rad), y = snap(8 + Math.sin((a * Math.PI) / 180) * rad)
      const rc = { x: x - t.w / 2, y: y - t.h / 2, w: t.w, h: t.h }
      if (!inRoom(rc) || hit(rc, RUNWAY, 0.3) || hit(rc, BACK) || EXITS.some((e) => hit(rc, e, 0.2)) || P.items.some((i) => hit(rc, rectOf(i), 0.15))) continue
      return [x, y]
    }
    return [29.5, 8]
  }

  let drag = null
  $('#pal').addEventListener('pointerdown', (e) => {
    const b = e.target.closest('[data-type]'); if (!b) return
    e.preventDefault()
    drag = { kind: 'new', type: b.dataset.type, sx: e.clientX, sy: e.clientY, moved: false }
    b.setPointerCapture(e.pointerId)
  })
  $('#pal').addEventListener('pointermove', (e) => {
    if (!drag || drag.kind !== 'new') return
    if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 6) drag.moved = true
    const gl = $('#ghostL')
    if (drag.moved && overSvg(e)) {
      const [x, y] = toM(e), t = TYPES[drag.type]
      gl.innerHTML = t.round
        ? `<circle class="ghost" cx="${px(snap(x))}" cy="${px(snap(y))}" r="${(t.w / 2) * SC}" fill="#B3122A"/>`
        : `<rect class="ghost" x="${px(snap(x) - t.w / 2)}" y="${px(snap(y) - t.h / 2)}" width="${t.w * SC}" height="${t.h * SC}" fill="#B3122A"/>`
    } else gl.innerHTML = ''
  })
  $('#pal').addEventListener('pointerup', (e) => {
    if (!drag || drag.kind !== 'new') return
    const d = drag; drag = null; $('#ghostL').innerHTML = ''
    let x, y
    if (d.moved && overSvg(e)) { [x, y] = toM(e); x = snap(x); y = snap(y) } else if (!d.moved) { [x, y] = freeSpot(d.type) } else return
    const it = add(d.type, x, y)
    P.sel = it.id; renderItems()
    toast(`${TYPES[d.type].name} ajouté${d.type === 'chair' || d.type === 'bench' || d.type === 'bar' || d.type === 'projecteur' ? '' : ''}`)
  })

  svg.addEventListener('pointerdown', (e) => {
    const g = e.target.closest('.it')
    if (!g) { P.sel = null; renderItems(); return }
    const it = P.items.find((i) => i.id === +g.dataset.id)
    P.sel = it.id
    const [mx, my] = toM(e)
    drag = { kind: 'move', it, dx: it.x - mx, dy: it.y - my }
    svg.setPointerCapture(e.pointerId)
    renderItems()
  })
  svg.addEventListener('pointermove', (e) => {
    if (!drag || drag.kind !== 'move') return
    const [mx, my] = toM(e)
    const nx = snap(mx + drag.dx), ny = snap(my + drag.dy)
    if (nx !== drag.it.x || ny !== drag.it.y) { drag.it.x = nx; drag.it.y = ny; renderItems() }
  })
  svg.addEventListener('pointerup', () => { if (drag && drag.kind === 'move') drag = null })

  function op(name) {
    const it = P.items.find((i) => i.id === P.sel); if (!it) return
    if (name === 'rot') it.rot = it.rot ? 0 : 1
    if (name === 'dup') { const [w] = dims(it); const c = add(it.type, snap(it.x + w + 0.25), it.y, it.rot); P.sel = c.id }
    if (name === 'del') { P.items = P.items.filter((i) => i !== it); G.forEach((g) => { if (g.seat === it.id) g.seat = null }); P.sel = null }
    renderItems()
  }
  $('#selTools').addEventListener('click', (e) => { const b = e.target.closest('[data-op]'); if (b) op(b.dataset.op) })
  addEventListener('keydown', (e) => {
    if (curTab !== 'salle' || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return
    const it = P.items.find((i) => i.id === P.sel)
    if (!it) return
    const k = e.key, step = e.shiftKey ? 1 : 0.25
    if (k === 'Delete' || k === 'Backspace') { e.preventDefault(); op('del') }
    else if (k === 'r' || k === 'R') op('rot')
    else if (k === 'd' || k === 'D') op('dup')
    else if (k === 'Escape') { P.sel = null; renderItems() }
    else if (k.startsWith('Arrow')) {
      e.preventDefault()
      if (k === 'ArrowLeft') it.x -= step; if (k === 'ArrowRight') it.x += step
      if (k === 'ArrowUp') it.y -= step; if (k === 'ArrowDown') it.y += step
      renderItems()
    }
  })

  $('#rows').addEventListener('input', (e) => { P.rows = +e.target.value; $('#rowsOut').textContent = P.rows })
  document.querySelectorAll('[data-seat]').forEach((b) => b.addEventListener('click', () => {
    P.seat = b.dataset.seat
    document.querySelectorAll('[data-seat]').forEach((x) => x.setAttribute('aria-pressed', x === b))
  }))
  $('#aisle').addEventListener('change', (e) => { P.aisle = e.target.checked })
  $('#fillBtn').addEventListener('click', () => {
    autoFill(); P.sel = null; renderItems()
    const seats = P.items.reduce((a, i) => a + (TYPES[i.type].seats || 0), 0)
    toast(`${seats} places assises · placement des invités à refaire`)
    renderGuests()
  })
  $('#limit').addEventListener('input', (e) => { P.limit = Math.max(50, +e.target.value || 50); renderItems() })

  /* ================= INVITÉS ================= */
  const NAMES = {
    Célébrité: ['Léa Morane', 'Samir Haddad', 'Ines Valcourt', 'Jonas Belle'],
    Presse: ['Claire Dubreuil · Vogue Paris', 'Marc Lenoir · Le Figaro', 'Aïcha Bensaïd · Elle', 'Tom Riva · Numéro', 'Hana Sato · WWD', 'Julie Mercier · Libération', 'Paul Garnier · GQ', 'Nina Kovač · i-D', 'Omar Fall · Madame Figaro', 'Lise Arnaud · Grazia', 'Ben Cole · Dazed', 'Rita Moreau · L’Officiel'],
    Acheteur: ['Sophie Klein · Le Bon Marché', 'Kenji Mori · Isetan', 'Laura Bianchi · Excelsior', 'David Stein · Bergdorf', 'Emma Roy · Printemps', 'Yusuf Kaya · Harvey Nichols', 'Mila Novak · Galeries Lafayette', 'Anna Berg · Nordiska', 'Luc Perrin · Merci', 'Sara Lind · Net-a-Porter'],
    Client: ['Hélène Faure', 'Victor Roux', 'Margot Blanc', 'Adèle Henry', 'Simon Perrot', 'Chloé Lambert', 'Louis Bonnet', 'Agathe Morel'],
    Ami: ['Camille Durand', 'Hugo Martin', 'Rose Petit', 'Théo Garcia', 'Jade Laurent', 'Nils Robin'],
  }
  const ORDER = ['Célébrité', 'Presse', 'Acheteur', 'Client', 'Ami']
  const G = []
  ORDER.forEach((cat) => NAMES[cat].forEach((full) => { const [n, o] = full.split(' · '); G.push({ id: G.length + 1, name: n, org: o || '', cat, seat: null, in: false }) }))
  G.forEach((g, i) => { g.in = i % 3 === 0 || i < 4 })
  let gFilter = 'all'
  function placeGuests() {
    const seatsList = []
    for (const it of P.items) {
      if (!it.seat) continue
      const n = TYPES[it.type].seats
      for (let k = 0; k < n; k++) seatsList.push({ it, k })
    }
    seatsList.sort((a, b) => a.it.seat.row.localeCompare(b.it.seat.row) || Math.abs(a.it.x - MID) - Math.abs(b.it.x - MID))
    G.forEach((g) => { g.seat = null; g.sub = null })
    const sorted = [...G].sort((a, b) => ORDER.indexOf(a.cat) - ORDER.indexOf(b.cat))
    sorted.forEach((g, i) => { if (seatsList[i]) { g.seat = seatsList[i].it.id; g.sub = TYPES[seatsList[i].it.type].seats > 1 ? seatsList[i].k + 1 : null } })
  }
  function seatLabel(g) {
    const it = P.items.find((i) => i.id === g.seat)
    if (!it || !it.seat) return null
    return `${sideName(it.seat.side)} · rang ${it.seat.row}, ${it.type === 'bench' ? 'banc' : 'siège'} ${it.seat.num}${g.sub ? ' (' + g.sub + ')' : ''}`
  }
  function renderGuests() {
    const q = $('#gSearch').value.trim().toLowerCase()
    const list = G.filter((g) => (gFilter === 'all' || (gFilter === 'in') === g.in) && (!q || (g.name + ' ' + g.org + ' ' + g.cat).toLowerCase().includes(q)))
    const arrived = G.filter((g) => g.in).length
    const placed = G.filter((g) => g.seat).length
    $('#gLine').textContent = `${arrived} arrivés sur ${G.length} · ${placed ? placed + ' placés' : 'pas encore placés'}`
    $('#gRows').innerHTML = list.length ? list.map((g) => {
      const sl = seatLabel(g)
      return `<tr><td><div class="gn">${esc(g.name)}</div>${g.org ? `<div class="go">${esc(g.org)}</div>` : ''}</td><td><span class="cat ${g.cat}">${g.cat}</span></td><td>${sl ? `<button class="seatlink" data-g="${g.id}">${sl}</button>` : '<span class="noseat">Non placé</span>'}</td><td class="r"><button class="tog" data-in="${g.id}" aria-pressed="${g.in}">${g.in ? 'Arrivé' : 'Attendu'}</button></td></tr>`
    }).join('') : `<tr><td colspan="4" class="noseat" style="padding:28px;text-align:center">Aucun invité ne correspond.</td></tr>`
  }
  $('#gSearch').addEventListener('input', renderGuests)
  $('#gFilter').addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]'); if (!b) return
    gFilter = b.dataset.f
    document.querySelectorAll('#gFilter button').forEach((x) => x.setAttribute('aria-pressed', x === b))
    renderGuests()
  })
  $('#placeBtn').addEventListener('click', () => {
    placeGuests(); renderGuests(); renderItems()
    const placed = G.filter((g) => g.seat).length
    toast(placed ? `${placed} invités placés : célébrités et presse au premier rang` : 'Aucune place assise : remplissez les rangs dans le plan')
  })
  let hl = null, hlT = 0
  $('#gRows').addEventListener('click', (e) => {
    const t = e.target.closest('[data-in]')
    if (t) { const g = G.find((x) => x.id === +t.dataset.in); g.in = !g.in; renderGuests(); if (g.in) toast(`${g.name} est arrivé`); return }
    const s = e.target.closest('[data-g]')
    if (s) {
      const g = G.find((x) => x.id === +s.dataset.g)
      setTab('salle'); P.sel = g.seat; hl = g.seat; renderItems()
      clearTimeout(hlT); hlT = setTimeout(() => { hl = null; renderItems() }, 4200)
      toast(`Place de ${g.name} : ${seatLabel(g)}`)
    }
  })

  /* ================= ORDRE DE PASSAGE ================= */
  const MODELS = ['Inès', 'Awa', 'Lena', 'Mia', 'Jade', 'Noor', 'Malik', 'Elsa', 'Yara', 'Chloé', 'Sofia', 'Zoé']
  const LOOKN = ['Robe nuage', 'Robe épaule nue', 'Robe tourbillon', 'Manteau grenat', 'Robe corolle', 'Robe pois brûlés', 'Pull côtes bordeaux', 'Manteau camel long', 'Manteau à carreaux', 'Robe dentelle nuit', 'Combinaison lagon', 'Manteau rose poudre']
  const DRESSERS = ['Camille', 'Hugo', 'Rose', 'Théo']
  const ST = { todo: 'À habiller', dress: 'Habillage', ready: 'Prêt', on: 'Sur le podium', done: 'Passé' }
  const LOOKS = LOOKN.map((name, i) => ({ id: i + 1, n: String(i + 1).padStart(2, '0'), name, model: MODELS[i], dresser: DRESSERS[i % 4], img: `../seve/img/look-${String(i + 1).padStart(2, '0')}.jpg`, st: i < 8 ? 'ready' : i < 10 ? 'dress' : 'todo' }))
  const SHOW = { running: false, idx: -1, t0: 0, waiting: false, start: 0, sel: null, lastDress: 0 }
  const lookMs = () => window.__lookMs || 4500
  function renderLooks() {
    const c = (s) => LOOKS.filter((l) => l.st === s).length
    $('#readyLine').textContent = `${c('ready')} prêts · ${c('dress')} en habillage · ${c('todo')} à habiller · ${c('done')} passés`
    $('#looks').innerHTML = LOOKS.map((l) => `<li><button class="lk ${l.st}${SHOW.sel === l.id ? ' sel' : ''}" data-l="${l.id}"><div class="ph"><img src="${l.img}" alt="" loading="lazy"><span class="no">${l.n}</span></div><div class="tx"><div class="md">${l.model}</div><div class="dr">${l.name} · habilleuse ${l.dresser}</div><span class="st ${l.st}">${ST[l.st]}</span></div></button></li>`).join('')
  }
  function renderLive() {
    const el = $('#live')
    const cur = LOOKS[SHOW.idx]
    if (SHOW.running || SHOW.waiting || (cur && cur.st === 'on')) {
      const next = LOOKS[SHOW.idx + 1]
      const p = cur && cur.st === 'on' ? Math.min(1, (performance.now() - SHOW.t0) / lookMs()) : 1
      el.innerHTML = `<h2>${SHOW.waiting ? 'En attente' : 'Sur le podium'}</h2>${cur ? `<div class="now-img"><img src="${cur.img}" alt="Look ${cur.n}"><span class="now-no">${cur.n}</span></div><div class="now-meta"><b>${cur.model}</b><span>${cur.name}</span></div><div class="tbar"><i style="width:${p * 100}%"></i></div>` : ''}
        ${next ? `<div class="next"><img src="${next.img}" alt=""><p>Ensuite : <b>Look ${next.n}</b>, ${next.model}<br>${next.st === 'ready' ? 'Prête en coulisses' : `<span class="w">${ST[next.st]} avec ${next.dresser}</span>`}</p></div>` : '<div class="next"><p>Dernier passage, puis le final.</p></div>'}
        <div class="lk-actions"><button class="btn ghost" id="pauseBtn">${SHOW.running ? 'Mettre en pause' : 'Reprendre'}</button></div>`
      return
    }
    const sel = LOOKS.find((l) => l.id === SHOW.sel)
    if (sel) {
      el.innerHTML = `<h2>Look ${sel.n}</h2><div class="now-img"><img src="${sel.img}" alt="Look ${sel.n}, ${sel.name}"><span class="now-no">${sel.n}</span></div><div class="now-meta"><b>${sel.model}</b><span>${sel.name}</span></div><p style="margin:10px 0 0;color:#B9A9AD">Habilleuse : ${sel.dresser} · ${ST[sel.st]}</p>
      <div class="lk-actions">${sel.st !== 'done' ? ['todo', 'dress', 'ready'].map((s) => `<button class="btn ${sel.st === s ? 'primary' : 'ghost'}" data-set="${s}">${ST[s]}</button>`).join('') : ''}</div>`
      return
    }
    const done = LOOKS.every((l) => l.st === 'done')
    el.innerHTML = done
      ? `<div class="idle"><h2>Final</h2><h1>Défilé terminé</h1><p>12 passages en ${Math.round((SHOW.end - SHOW.start) / 1000)} secondes de démo. Remettez à zéro pour recommencer.</p></div>`
      : `<div class="idle"><h2>Avant le show</h2><h1>20 h 00</h1><p>Cliquez sur un look pour changer son état, puis lancez le défilé : un look qui n'est pas prêt met le podium en attente jusqu'à ce que son habilleuse ait fini.</p></div>`
  }
  $('#looks').addEventListener('click', (e) => { const b = e.target.closest('[data-l]'); if (!b) return; SHOW.sel = +b.dataset.l; renderLooks(); renderLive() })
  $('#live').addEventListener('click', (e) => {
    const s = e.target.closest('[data-set]')
    if (s) { const l = LOOKS.find((x) => x.id === SHOW.sel); l.st = s.dataset.set; renderLooks(); renderLive(); return }
    if (e.target.closest('#pauseBtn')) { SHOW.running = !SHOW.running; if (SHOW.running) loop(); renderLive() }
  })
  function goNext() {
    const next = LOOKS[SHOW.idx + 1]
    if (!next) { SHOW.running = false; SHOW.waiting = false; SHOW.end = performance.now(); SHOW.idx = -1; renderLooks(); renderLive(); $('#showBtn').textContent = 'Lancer le défilé'; toast('Défilé terminé, bravo à toute l’équipe'); return }
    if (next.st !== 'ready') { SHOW.waiting = true; return }
    SHOW.waiting = false; SHOW.idx++; next.st = 'on'; SHOW.t0 = performance.now()
  }
  function loop() {
    if (!SHOW.running) return
    const now = performance.now()
    // dressers keep working during the show
    if (now - SHOW.lastDress > 2600) {
      SHOW.lastDress = now
      const d = LOOKS.find((l) => l.st === 'dress'); if (d) d.st = 'ready'
      const t = LOOKS.find((l) => l.st === 'todo'); if (t) t.st = 'dress'
    }
    const cur = LOOKS[SHOW.idx]
    if (cur && cur.st === 'on' && now - SHOW.t0 >= lookMs()) cur.st = 'done'
    if (!cur || cur.st === 'done' || SHOW.waiting) {
      const was = SHOW.waiting
      goNext()
      if (SHOW.waiting && !was) toast(`Look ${LOOKS[SHOW.idx + 1].n} pas encore prêt : podium en attente`)
    }
    renderLooks(); renderLive()
    if (SHOW.running) requestAnimationFrame(loop)
  }
  $('#showBtn').addEventListener('click', () => {
    if (SHOW.running) return
    if (LOOKS.every((l) => l.st === 'done')) resetShow()
    SHOW.running = true; SHOW.sel = null; SHOW.start = performance.now(); SHOW.lastDress = performance.now()
    $('#showBtn').textContent = 'Défilé en cours'
    if (SHOW.idx === -1 || !LOOKS[SHOW.idx] || LOOKS[SHOW.idx].st !== 'on') goNext()
    loop()
  })
  function resetShow() {
    SHOW.running = false; SHOW.waiting = false; SHOW.idx = -1; SHOW.sel = null
    LOOKS.forEach((l, i) => { l.st = i < 8 ? 'ready' : i < 10 ? 'dress' : 'todo' })
    $('#showBtn').textContent = 'Lancer le défilé'
    renderLooks(); renderLive()
  }
  $('#resetShow').addEventListener('click', resetShow)

  /* ================= TABS ================= */
  let curTab = 'salle'
  function setTab(name) {
    curTab = name
    document.querySelectorAll('.tabs [role=tab]').forEach((b) => b.setAttribute('aria-selected', b.dataset.tab === name))
    for (const v of ['salle', 'defile', 'invites']) $('#v-' + v).hidden = v !== name
    if (name === 'invites') renderGuests()
    if (name === 'salle') renderItems()
  }
  document.querySelectorAll('.tabs [role=tab]').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)))
  window.__coulisses = { setTab, P, G, LOOKS, placeGuests, renderItems, renderGuests }

  buildStatic(); seed(); placeGuests(); renderItems(); renderLooks(); renderLive(); renderGuests()
})()
