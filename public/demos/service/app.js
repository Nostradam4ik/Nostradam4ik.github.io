/* Couvert demo: host-stand app for an invented restaurant. Everything runs in the browser. */
(function () {
  'use strict'
  const D = window.DATA
  const $ = (s, el = document) => el.querySelector(s)
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const SPAN = 330 // 18:00 → 23:30
  const SEATS = D.tables.reduce((a, t) => a + t.seats, 0)
  const TAG_LABEL = { allergy: 'Allergie', vip: 'Habitué', birthday: 'Anniversaire' }
  const STATE_LABEL = { later: 'À venir', reserved: 'Attendu', seated: 'À table', bill: 'Addition', late: 'Retard', done: 'Parti', noshow: 'Absent', expected: 'Prévu' }

  const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return (h - 18) * 60 + m }
  const fmt = (m) => { const a = 18 * 60 + Math.round(m); return String(Math.floor(a / 60)).padStart(2, '0') + ':' + String(a % 60).padStart(2, '0') }
  const durFor = (c) => (c <= 2 ? 90 : c <= 4 ? 105 : 120)
  const tableById = (id) => D.tables.find((t) => t.id === id)

  let nextId = 1
  const S = {
    now: D.now, t: D.now, sel: null, filter: 'all', assign: null, playing: false, tab: 'service',
    res: D.reservations.map(([name, covers, time, table, tags, flag]) => {
      const start = toMin(time)
      const r = { id: nextId++, name, covers, start, dur: durFor(covers), table, tags, note: D.notes[name] || '', phone: fakePhone(name), arrivedAt: null, ended: null, noshow: flag === 'noshow' }
      if (!r.noshow && flag !== 'late' && flag !== 'wait' && start < D.now) r.arrivedAt = start + (name.length % 4)
      return r
    }),
    reviews: D.reviews.map((r) => ({ ...r })),
    revSel: null, openClient: null,
  }

  function fakePhone(name) {
    let h = 0
    for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0
    const d = String(h).padStart(8, '0').slice(-8)
    return '06 ' + d.slice(0, 2) + ' ' + d.slice(2, 4) + ' ' + d.slice(4, 6) + ' ' + d.slice(6, 8)
  }

  /* ---------- state machine ---------- */
  const endOf = (r) => (r.ended != null ? r.ended : r.start + r.dur)
  function stateAt(r, t) {
    if (r.noshow) return 'noshow'
    const s = r.start, e = endOf(r)
    if (t >= e) return 'done'
    if (t < s - 30) return 'later'
    if (t < s) return 'reserved'
    if (r.arrivedAt != null && t >= r.arrivedAt) return t >= e - 20 ? 'bill' : 'seated'
    if (t <= S.now) return t - s > 10 ? 'late' : 'reserved'
    return t >= e - 20 ? 'bill' : 'expected'
  }
  const RANK = { late: 5, seated: 4, bill: 4, expected: 3, reserved: 2 }
  function tableAt(id, t) {
    let best = null
    for (const r of S.res) {
      if (r.table !== id) continue
      const st = stateAt(r, t)
      if (!(st in RANK)) continue
      if (!best || RANK[st] > RANK[best.st]) best = { st, r }
    }
    return best || { st: 'free', r: null }
  }
  function isFree(tid, from, to, ignoreId) {
    return S.res.every((r) => r.id === ignoreId || r.table !== tid || r.noshow || endOf(r) <= from || r.start >= to || (r.ended != null && r.ended <= from))
  }
  function bestTable(covers, start, ignoreId) {
    const dur = durFor(covers)
    const fits = D.tables.filter((t) => t.seats >= covers && isFree(t.id, start, start + dur, ignoreId))
    fits.sort((a, b) => (a.seats - covers) - (b.seats - covers) || (a.zone === 'Salle' ? -1 : 1) - (b.zone === 'Salle' ? -1 : 1) || a.id - b.id)
    return fits[0] || null
  }

  /* ---------- plan ---------- */
  const NS = 'http://www.w3.org/2000/svg'
  function chairs(t) {
    const out = []
    const c = (x, y, w, h) => out.push(`<rect class="chair" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>`)
    if (t.shape === 'round') {
      c(t.cx - t.r - 16, t.cy - 11, 12, 22); c(t.cx + t.r + 4, t.cy - 11, 12, 22)
    } else {
      const per = t.seats <= 4 ? 1 : (t.seats - 2) / 2
      for (let i = 0; i < per; i++) {
        const cx = t.x + (t.w * (i + 1)) / (per + 1) - 11
        c(cx, t.y - 15, 22, 11); c(cx, t.y + t.h + 4, 22, 11)
      }
      c(t.x - 15, t.y + t.h / 2 - 11, 11, 22); c(t.x + t.w + 4, t.y + t.h / 2 - 11, 11, 22)
    }
    return out.join('')
  }
  function buildPlan() {
    const svg = $('#plan')
    let html = `
      <rect class="zone" x="24" y="24" width="540" height="512" rx="10"/>
      <rect class="zone terrace" x="584" y="70" width="212" height="466" rx="10"/>
      <rect class="counter" x="40" y="40" width="300" height="44" rx="8"/>
      <text class="zone-label" x="190" y="67" text-anchor="middle">Cuisine · passe</text>
      <rect class="counter" x="372" y="40" width="176" height="44" rx="8"/>
      <text class="zone-label" x="460" y="67" text-anchor="middle">Bar</text>
      <path class="wall" d="M24 24H564V536H330M250 536H24V24"/>
      <text class="zone-label" x="290" y="531" text-anchor="middle">Entrée</text>
      <text class="zone-label" x="690" y="98" text-anchor="middle">Terrasse chauffée</text>`
    for (const t of D.tables) {
      const cx = t.shape === 'round' ? t.cx : t.x + t.w / 2
      const cy = t.shape === 'round' ? t.cy : t.y + t.h / 2
      const shape = t.shape === 'round'
        ? `<circle class="shape" cx="${t.cx}" cy="${t.cy}" r="${t.r}"/><circle class="ring" cx="${t.cx}" cy="${t.cy}" r="${t.r + 22}"/>`
        : `<rect class="shape" x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="9"/><rect class="ring" x="${t.x - 22}" y="${t.y - 22}" width="${t.w + 44}" height="${t.h + 44}" rx="16"/>`
      html += `<g class="tbl" id="tbl-${t.id}" data-id="${t.id}" tabindex="0" role="button">${chairs(t)}${shape}<text class="lab" x="${cx}" y="${cy + 3}">${t.id}</text><text class="cap" x="${cx}" y="${cy + 18}"></text></g>`
    }
    svg.innerHTML = html
    svg.addEventListener('click', (e) => { const g = e.target.closest('.tbl'); if (g) onTable(+g.dataset.id) })
    svg.addEventListener('keydown', (e) => {
      const g = e.target.closest('.tbl')
      if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onTable(+g.dataset.id) }
    })
  }
  function renderPlan() {
    const assignR = S.assign && S.res.find((r) => r.id === S.assign)
    for (const t of D.tables) {
      const g = $('#tbl-' + t.id)
      const { st, r } = tableAt(t.id, S.t)
      g.setAttribute('class', 'tbl ' + (st === 'expected' ? 'seated expected' : st))
      let cap = t.seats + ' pl.'
      if (r && (st === 'seated' || st === 'bill' || st === 'late' || st === 'expected')) cap = r.covers + '/' + t.seats
      if (r && st === 'reserved') cap = fmt(r.start)
      g.querySelector('.cap').textContent = cap
      if (S.sel && S.sel.type === 'table' && S.sel.id === t.id) g.classList.add('sel')
      if (S.sel && S.sel.type === 'res') { const sr = S.res.find((x) => x.id === S.sel.id); if (sr && sr.table === t.id) g.classList.add('sel') }
      if (assignR) {
        const ok = t.seats >= assignR.covers && isFree(t.id, Math.max(assignR.start, S.now), endOf(assignR), assignR.id)
        g.classList.add(ok ? 'target' : 'blocked')
      }
      const label = `Table ${t.id}, ${t.zone}, ${t.seats} places, ${st === 'free' ? 'libre' : STATE_LABEL[st]}${r ? ', ' + r.name : ''}`
      g.setAttribute('aria-label', label)
    }
  }

  /* ---------- clock & timeline ---------- */
  function renderClock() {
    $('#clockTime').textContent = fmt(S.t)
    const lab = $('#clockLabel'), d = S.t - S.now
    lab.classList.toggle('future', d > 0)
    lab.textContent = d === 0 ? 'maintenant' : d > 0 ? `aperçu · dans ${human(d)}` : `il y a ${human(-d)}`
    $('#nowBtn').disabled = d === 0
    $('#scrub').value = S.t
    $('#scrub').setAttribute('aria-valuetext', fmt(S.t))
    renderOcc()
  }
  const human = (m) => (m < 60 ? m + ' min' : Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + String(m % 60).padStart(2, '0') : ''))
  function renderOcc() {
    const n = 33, w = 660 / n
    let h = ''
    for (let i = 0; i < n; i++) {
      const t = i * 10 + 5
      let cov = 0
      for (const r of S.res) { const st = stateAt(r, t); if (st === 'seated' || st === 'bill' || st === 'expected' || st === 'late') cov += r.covers }
      const hh = Math.max(3, (cov / SEATS) * 44)
      const cls = Math.floor(S.t / 10) === i ? 'cur' : t <= S.now ? 'past' : ''
      h += `<rect class="${cls}" x="${i * w + 1}" y="${44 - hh}" width="${w - 2}" height="${hh}" rx="2"/>`
    }
    $('#occ').innerHTML = h
  }
  function buildTicks() {
    $('.ticks').innerHTML = [0, 60, 120, 180, 240, 300].map((m) => `<span style="left:${(m / SPAN) * 100}%">${18 + m / 60}h</span>`).join('')
  }

  /* ---------- list ---------- */
  function renderKpis() {
    const live = S.res.filter((r) => !r.noshow)
    const covers = live.reduce((a, r) => a + r.covers, 0)
    const inRoom = live.filter((r) => ['seated', 'bill'].includes(stateAt(r, S.now))).reduce((a, r) => a + r.covers, 0)
    const coming = live.filter((r) => ['later', 'reserved', 'late'].includes(stateAt(r, S.now))).length
    $('#kpis').innerHTML = `<div class="kpi"><b>${covers}</b><span>couverts</span></div><div class="kpi"><b>${inRoom}</b><span>en salle</span></div><div class="kpi"><b>${coming}</b><span>à venir</span></div>`
  }
  function renderList() {
    const el = $('#resList')
    const sorted = [...S.res].sort((a, b) => a.start - b.start || a.name.localeCompare(b.name))
    const pass = (st) => S.filter === 'all' || (S.filter === 'soon' && (st === 'later' || st === 'reserved')) || (S.filter === 'seated' && (st === 'seated' || st === 'bill')) || (S.filter === 'late' && st === 'late')
    let html = '', hour = null, count = 0
    for (const r of sorted) {
      const st = stateAt(r, S.now)
      if (!pass(st)) continue
      count++
      const h = Math.floor(r.start / 60) + 18
      if (h !== hour) { hour = h; html += `<li class="res-group" aria-hidden="true">${h} h</li>` }
      const tags = r.tags.map((x) => `<span class="tag ${x}">${TAG_LABEL[x]}</span>`).join('')
      const lateBy = st === 'late' ? ' ' + (S.now - r.start) + ' min' : ''
      const sel = S.sel && S.sel.type === 'res' && S.sel.id === r.id ? ' sel' : ''
      const dim = st === 'done' || st === 'noshow' ? ' dim' : ''
      html += `<li><button class="res${sel}${dim}" data-id="${r.id}"><span class="t">${fmt(r.start)}</span><span><span class="n"><span>${esc(r.name)}</span></span><span class="m">${r.covers} pers. · Table ${r.table}${r.walkin ? ' · sans réservation' : ''} ${tags}</span></span><span class="state ${st}">${STATE_LABEL[st]}${lateBy}</span></button></li>`
    }
    el.innerHTML = count ? html : `<li class="list-empty">Aucune réservation dans ce filtre.</li>`
  }
  $('#resList').addEventListener('click', (e) => { const b = e.target.closest('.res'); if (b) selectRes(+b.dataset.id) })
  document.querySelectorAll('.filters .chip').forEach((c) => c.addEventListener('click', () => {
    document.querySelectorAll('.filters .chip').forEach((x) => x.classList.toggle('on', x === c))
    S.filter = c.dataset.f; renderList()
  }))

  /* ---------- inspector ---------- */
  function renderInspector() {
    const el = $('#inspector')
    let banner = ''
    if (S.assign) {
      const r = S.res.find((x) => x.id === S.assign)
      banner = `<div class="assign-banner"><b>Choisissez une table</b>Les tables entourées en vert sont libres pour ${esc(r.name)} (${r.covers} pers.) à ${fmt(Math.max(r.start, S.now))}.<br><button class="btn small" data-act="cancel-assign">Annuler</button></div>`
    }
    if (!S.sel) {
      el.classList.add('empty')
      el.innerHTML = banner + `<div class="insp-empty"><h2>Bonsoir 👋</h2><p>Cliquez sur une réservation ou sur une table du plan.</p><ul><li>Faites glisser la barre du temps pour voir la salle à 21 h.</li><li>Une table blanche est libre : cliquez dessus pour installer des clients sans réservation.</li><li>« Réservation » choisit la table toute seule.</li></ul></div>`
      if (S.assign) el.classList.remove('empty')
      return
    }
    el.classList.remove('empty')
    if (S.sel.type === 'res') el.innerHTML = banner + resPanel(S.res.find((r) => r.id === S.sel.id))
    else el.innerHTML = banner + tablePanel(tableById(S.sel.id))
  }
  function resPanel(r) {
    if (!r) return ''
    const st = stateAt(r, S.now), t = tableById(r.table)
    const tags = r.tags.length ? `<div class="tags">${r.tags.map((x) => `<span class="tag ${x}">${TAG_LABEL[x]}</span>`).join('')}</div>` : ''
    let live = ''
    if (st === 'seated' || st === 'bill') {
      const since = S.now - r.arrivedAt, pct = Math.min(100, (since / r.dur) * 100)
      live = `<div class="timer">${human(since)}<small>à table · encore ${human(Math.max(0, endOf(r) - S.now))} environ</small></div><div class="bar ${st === 'bill' ? 'amber' : ''}"><i style="width:${pct}%"></i></div>`
    }
    if (st === 'late') live = `<div class="timer" style="color:var(--red)">${S.now - r.start} min<small>de retard · table gardée</small></div>`
    const acts = []
    if (['later', 'reserved', 'late'].includes(st)) {
      acts.push(`<button class="btn primary" data-act="arrive">Marquer arrivé</button>`)
      acts.push(`<button class="btn ghost" data-act="move">Changer de table</button>`)
      if (st === 'late') acts.push(`<button class="btn danger" data-act="noshow">Noter absent et libérer la table</button>`)
      else acts.push(`<button class="btn danger" data-act="cancel">Annuler la réservation</button>`)
    } else if (st === 'seated' || st === 'bill') {
      acts.push(`<button class="btn primary" data-act="free">Libérer la table</button>`)
      acts.push(`<button class="btn ghost" data-act="move">Changer de table</button>`)
    } else if (st === 'noshow') {
      acts.push(`<button class="btn ghost" data-act="undo-noshow">Ce n'était pas une absence</button>`)
    }
    const c = D.clients[r.name]
    const hist = c ? `<div class="hist"><h3>${c.visits} visites · panier moyen ${c.spend} €</h3><ul>${c.history.map((h) => `<li><span>${h}</span></li>`).join('')}</ul></div>` : `<div class="hist"><h3>Première visite</h3></div>`
    return `<div class="insp">
      <p class="insp-kicker"><span>Réservation · ${fmt(r.start)}</span><button class="close-x" data-act="close" aria-label="Fermer">×</button></p>
      <h2>${esc(r.name)}</h2>${tags}
      ${live}
      <dl class="meta"><dt>Couverts</dt><dd>${r.covers} personnes</dd><dt>Table</dt><dd>${r.table} · ${t.zone}</dd><dt>Téléphone</dt><dd>${r.phone}</dd><dt>Statut</dt><dd>${STATE_LABEL[st]}</dd><dt>Durée prévue</dt><dd>${human(r.dur)}</dd></dl>
      ${r.note ? `<p class="note">${esc(r.note)}</p>` : ''}
      <div class="actions">${acts.join('')}</div>${hist}</div>`
  }
  function tablePanel(t) {
    const { st, r } = tableAt(t.id, S.t)
    const viewingNow = S.t === S.now
    let body = ''
    if (r) {
      body += `<p class="note"><b>${esc(r.name)}</b> · ${r.covers} pers. · ${STATE_LABEL[st]}${st === 'reserved' ? ' à ' + fmt(r.start) : ''}</p><div class="actions"><button class="btn ghost" data-act="open-res" data-id="${r.id}">Voir la réservation</button></div>`
    } else if (viewingNow) {
      const next = S.res.filter((x) => x.table === t.id && !x.noshow && x.start > S.now).sort((a, b) => a.start - b.start)[0]
      const until = next ? next.start - S.now : 999
      if (until >= 60) {
        body += `<p class="walk-label">Installer des clients sans réservation${next ? ' (libre jusqu’à ' + fmt(next.start) + ')' : ''}</p><div class="walk">${Array.from({ length: t.seats }, (_, i) => `<button data-act="walkin" data-n="${i + 1}" aria-label="${i + 1} personnes">${i + 1}</button>`).join('')}</div>`
      } else body += `<p class="note">Table libre, mais réservée à ${fmt(next.start)} : pas assez de temps pour un nouveau service.</p>`
    } else {
      body += `<p class="note">Libre à ${fmt(S.t)}.</p><div class="actions"><button class="btn ghost" data-act="now">Revenir à maintenant</button></div>`
    }
    const day = S.res.filter((x) => x.table === t.id).sort((a, b) => a.start - b.start)
    const list = day.map((x) => `<li><span>${fmt(x.start)} · ${esc(x.name)} (${x.covers})</span><span>${STATE_LABEL[stateAt(x, S.now)]}</span></li>`).join('')
    return `<div class="insp">
      <p class="insp-kicker"><span>${t.zone} · ${t.seats} places</span><button class="close-x" data-act="close" aria-label="Fermer">×</button></p>
      <h2>Table ${t.id}</h2>
      <dl class="meta"><dt>À ${fmt(S.t)}</dt><dd>${st === 'free' ? 'Libre' : STATE_LABEL[st]}</dd></dl>
      ${body}
      <div class="hist"><h3>Ce soir sur cette table</h3><ul>${list || '<li><span>Aucune réservation</span></li>'}</ul></div></div>`
  }
  $('#inspector').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]')
    if (!b) return
    const act = b.dataset.act
    const r = S.sel && S.sel.type === 'res' ? S.res.find((x) => x.id === S.sel.id) : null
    if (act === 'close') { S.sel = null; S.assign = null }
    else if (act === 'cancel-assign') S.assign = null
    else if (act === 'now') S.t = S.now
    else if (act === 'open-res') { selectRes(+b.dataset.id); return }
    else if (act === 'arrive' && r) { if (r.start > S.now) { r.start = S.now } r.arrivedAt = S.now; S.t = S.now; toast(`${r.name} est installé, table ${r.table}`) }
    else if (act === 'free' && r) { r.ended = S.now; toast(`Table ${r.table} libérée`) }
    else if (act === 'noshow' && r) { r.noshow = true; toast(`${r.name} noté absent · table ${r.table} libre`) }
    else if (act === 'undo-noshow' && r) { r.noshow = false; toast('Absence annulée') }
    else if (act === 'cancel' && r) { S.res = S.res.filter((x) => x !== r); S.sel = null; toast(`Réservation ${r.name} annulée`) }
    else if (act === 'move' && r) { S.assign = r.id; toast('Cliquez sur une table entourée en vert') }
    else if (act === 'walkin') {
      const t = S.sel.id, n = +b.dataset.n
      const w = { id: nextId++, name: 'Sans réservation', covers: n, start: S.now, dur: durFor(n), table: t, tags: [], note: '', phone: '—', arrivedAt: S.now, ended: null, noshow: false, walkin: true }
      S.res.push(w); S.sel = { type: 'res', id: w.id }; toast(`${n} pers. installées table ${t}`)
    }
    renderAll()
  })

  function selectRes(id) {
    S.sel = { type: 'res', id }; S.assign = null
    renderAll()
  }
  function onTable(id) {
    if (S.assign) {
      const r = S.res.find((x) => x.id === S.assign), t = tableById(id)
      if (t.seats < r.covers) return toast(`Table ${id} trop petite pour ${r.covers} personnes`)
      if (!isFree(id, Math.max(r.start, S.now), endOf(r), r.id)) return toast(`Table ${id} déjà prise à cette heure`)
      r.table = id; S.assign = null; S.sel = { type: 'res', id: r.id }
      toast(`${r.name} passe à la table ${id}`)
      return renderAll()
    }
    S.sel = { type: 'table', id }
    renderAll()
  }

  /* ---------- scrub & play ---------- */
  const scrub = $('#scrub')
  scrub.step = 1
  scrub.addEventListener('input', () => { stopPlay(); S.t = +scrub.value; renderPlan(); renderClock(); if (S.sel && S.sel.type === 'table') renderInspector() })
  $('#nowBtn').addEventListener('click', () => { stopPlay(); S.t = S.now; renderAll() })
  let raf = 0, last = 0
  function stopPlay() { if (!S.playing) return; S.playing = false; cancelAnimationFrame(raf); $('#playIcon').setAttribute('d', 'M6 4l10 6-10 6z'); $('#playBtn').setAttribute('aria-label', 'Rejouer le service') }
  $('#playBtn').addEventListener('click', () => {
    if (S.playing) return stopPlay()
    S.playing = true; $('#playIcon').setAttribute('d', 'M5 4h4v12H5zM11 4h4v12h-4z'); $('#playBtn').setAttribute('aria-label', 'Mettre en pause')
    if (S.t >= SPAN) S.t = 0
    last = performance.now()
    const step = (ts) => {
      if (!S.playing) return
      S.t = Math.min(SPAN, S.t + (ts - last) / 36); last = ts
      const shown = Math.round(S.t)
      const keep = S.t
      S.t = shown; renderPlan(); renderClock(); S.t = keep
      if (S.t >= SPAN) { S.t = SPAN; stopPlay(); return }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
  })

  /* ---------- new reservation dialog ---------- */
  const dlg = $('#resDialog'), form = $('#resForm')
  const F = { covers: 2, slot: null }
  function slotsList() { const out = []; for (let m = 30; m <= 270; m += 15) if (m >= S.now) out.push(m); return out }
  function renderDialog() {
    $('#coverPick').innerHTML = Array.from({ length: 8 }, (_, i) => `<button type="button" class="pick" data-c="${i + 1}" aria-pressed="${F.covers === i + 1}">${i + 1}</button>`).join('')
    $('#slotPick').innerHTML = slotsList().map((m) => {
      const ok = !!bestTable(F.covers, m)
      return `<button type="button" class="pick${ok ? '' : ' full'}" data-s="${m}" aria-pressed="${F.slot === m}" ${ok ? '' : 'aria-label="' + fmt(m) + ' complet"'}>${fmt(m)}</button>`
    }).join('')
    const sg = $('#suggest')
    if (F.slot == null) { sg.className = 'suggest idle'; sg.textContent = 'Choisissez une heure : la table sera proposée automatiquement.'; return }
    const t = bestTable(F.covers, F.slot)
    if (!t) { sg.className = 'suggest none'; sg.textContent = `Complet à ${fmt(F.slot)} pour ${F.covers} personnes. Essayez un autre horaire.`; return }
    sg.className = 'suggest'
    sg.innerHTML = `<b>Table ${t.id}</b> ${t.zone} · ${t.seats} places, libre de ${fmt(F.slot)} à ${fmt(F.slot + durFor(F.covers))}`
  }
  $('#coverPick').addEventListener('click', (e) => { const b = e.target.closest('[data-c]'); if (b) { F.covers = +b.dataset.c; renderDialog() } })
  $('#slotPick').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (b) { F.slot = +b.dataset.s; renderDialog() } })
  $('#newResBtn').addEventListener('click', () => {
    form.reset(); F.covers = 2; F.slot = null; $('#formErr').textContent = ''
    form.name.removeAttribute('aria-invalid')
    renderDialog(); dlg.showModal(); form.name.focus()
  })
  $('#cancelRes').addEventListener('click', () => dlg.close())
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = form.name.value.trim()
    const err = $('#formErr')
    if (!name) { err.textContent = 'Indiquez le nom de la réservation.'; form.name.setAttribute('aria-invalid', 'true'); form.name.focus(); return }
    if (F.slot == null) { err.textContent = 'Choisissez une heure.'; return }
    const t = bestTable(F.covers, F.slot)
    if (!t) { err.textContent = 'Aucune table libre à cette heure. Choisissez un autre horaire.'; return }
    const cap = name.charAt(0).toUpperCase() + name.slice(1)
    const r = { id: nextId++, name: cap, covers: F.covers, start: F.slot, dur: durFor(F.covers), table: t.id, tags: [], note: form.note.value.trim(), phone: form.phone.value.trim() || '—', arrivedAt: null, ended: null, noshow: false }
    if (/allerg|gluten|arachide/i.test(r.note)) r.tags.push('allergy')
    if (/anniv/i.test(r.note)) r.tags.push('birthday')
    S.res.push(r); S.sel = { type: 'res', id: r.id }; S.filter = 'all'
    document.querySelectorAll('.filters .chip').forEach((x) => x.classList.toggle('on', x.dataset.f === 'all'))
    dlg.close(); renderAll()
    toast(`Réservation confirmée · ${cap}, ${r.covers} pers. à ${fmt(r.start)}, table ${t.id}`)
    const li = document.querySelector(`.res[data-id="${r.id}"]`); if (li) li.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  })

  /* ---------- reviews ---------- */
  const starsHtml = (n) => `<span class="stars" aria-label="${n} étoiles sur 5">${'★'.repeat(n)}<span class="off">${'★'.repeat(5 - n)}</span></span>`
  function renderReviews() {
    const avg = S.reviews.reduce((a, r) => a + r.stars, 0) / S.reviews.length
    $('#avgStars').textContent = avg.toFixed(1).replace('.', ',') + ' / 5'
    const pending = S.reviews.filter((r) => !r.reply).length
    $('#reviewBadge').textContent = pending || ''
    $('#reviewBadge').setAttribute('aria-label', pending + ' avis sans réponse')
    $('#revList').innerHTML = S.reviews.map((r) => `<li><button class="rev${S.revSel === r.id ? ' sel' : ''}" data-id="${r.id}"><span class="row"><span class="who">${esc(r.who)}</span>${starsHtml(r.stars)}</span><span class="ex">${esc(r.text)}</span><span class="foot"><span>${r.when}</span>${r.reply ? '<span class="replied">Répondu</span>' : '<span class="pending">Sans réponse</span>'}</span></button></li>`).join('')
    renderReviewDetail()
  }
  let tone = 'chaleureux', typing = 0
  function renderReviewDetail() {
    const el = $('#revDetail'), r = S.reviews.find((x) => x.id === S.revSel)
    if (!r) { el.innerHTML = `<div class="rev-card insp-empty"><h2>Répondre aux avis</h2><p>Choisissez un avis à gauche. Couvert propose une réponse que vous relisez et modifiez avant de la publier.</p></div>`; return }
    const head = `<div class="rev-card">${starsHtml(r.stars)}<p class="quote">« ${esc(r.text)} »</p><p class="src">${esc(r.who)} · Google · ${r.when}</p>`
    if (r.reply) { el.innerHTML = head + `<div class="posted"><small>Votre réponse publiée</small><p>${esc(r.reply)}</p></div></div>`; return }
    el.innerHTML = head + `<div class="reply"><div class="reply-head"><h3>Réponse proposée</h3><div class="tone" role="group" aria-label="Ton de la réponse"><button type="button" data-tone="chaleureux" aria-pressed="${tone === 'chaleureux'}">Chaleureux</button><button type="button" data-tone="sobre" aria-pressed="${tone === 'sobre'}">Sobre</button></div></div>
      <textarea id="replyBox" aria-label="Texte de la réponse"></textarea>
      <div class="row"><span class="hint">Démo : le texte est composé dans votre navigateur à partir de l'avis. Rien n'est envoyé à Google.</span><span style="display:flex;gap:8px"><button class="btn ghost small" id="regen">Proposer une autre</button><button class="btn primary small" id="publish">Publier la réponse</button></span></div></div></div>`
    typeInto($('#replyBox'), compose(r, tone))
  }
  function typeInto(box, text) {
    cancelAnimationFrame(typing)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { box.value = text; return }
    let i = 0, lastT = 0
    const tick = (ts) => {
      if (ts - lastT > 14) { i = Math.min(text.length, i + 2); box.value = text.slice(0, i); lastT = ts }
      if (i < text.length) typing = requestAnimationFrame(tick)
    }
    typing = requestAnimationFrame(tick)
  }
  let variant = 0
  function compose(r, tone) {
    const first = r.who.split(' ')[0], txt = r.text.toLowerCase(), warm = tone === 'chaleureux'
    const lines = []
    lines.push(`Bonjour ${first},`)
    if (r.stars >= 4) {
      const thanks = warm ? ['Merci beaucoup pour ce très joli message !', 'Quel plaisir de vous lire, merci !'] : ['Merci pour votre avis.', 'Merci pour ce retour.']
      lines.push(thanks[variant % 2])
      if (txt.includes('tartare')) lines.push(warm ? 'Notre tartare est préparé à la minute, nous transmettons vos compliments en cuisine.' : 'Nous transmettons vos compliments sur le tartare à la cuisine.')
      if (txt.includes('anniversaire')) lines.push(warm ? 'Nous sommes ravis d’avoir pu rendre cet anniversaire un peu plus doux.' : 'Heureux d’avoir contribué à cet anniversaire.')
      if (txt.includes('service') || txt.includes('équipe')) lines.push(warm ? 'L’équipe de salle sera très touchée par vos mots.' : 'Nous le partageons avec l’équipe de salle.')
      lines.push(warm ? 'Au plaisir de vous accueillir à nouveau, avec vos amis cette fois !' : 'Au plaisir de vous revoir.')
    } else {
      lines.push(warm ? 'Merci d’avoir pris le temps de nous écrire, et désolés que la soirée n’ait pas été à la hauteur.' : 'Merci pour votre retour, nous en tenons compte.')
      if (txt.includes('attente') || txt.includes('minutes')) lines.push('Vingt-cinq minutes pour un plat, c’est trop long : nous en avons parlé avec la cuisine pour mieux répartir les commandes le vendredi soir.')
      if (txt.includes('20 h') || txt.includes('installés')) lines.push('Vous attendre 25 minutes alors que vous aviez réservé n’est pas normal. Nous avons revu la façon dont nous gardons les tables aux heures pleines.')
      if (txt.includes('accueil')) lines.push(warm ? 'Un accueil chaleureux fait partie de ce que nous voulons offrir, et nous l’avons rappelé à l’équipe.' : 'Nous avons rappelé l’importance de l’accueil à l’équipe.')
      lines.push(warm ? 'Nous serions heureux de vous montrer une meilleure soirée lors de votre prochaine visite.' : 'En espérant vous accueillir à nouveau dans de meilleures conditions.')
    }
    lines.push("L'équipe de Chez Lison")
    return lines.join('\n')
  }
  $('#revList').addEventListener('click', (e) => { const b = e.target.closest('.rev'); if (b) { S.revSel = +b.dataset.id; variant = 0; renderReviews(); if (window.innerWidth <= 860) $('#revDetail').scrollIntoView({ behavior: 'smooth' }) } })
  $('#revDetail').addEventListener('click', (e) => {
    const r = S.reviews.find((x) => x.id === S.revSel); if (!r) return
    const tb = e.target.closest('[data-tone]')
    if (tb) { tone = tb.dataset.tone; renderReviewDetail(); return }
    if (e.target.closest('#regen')) { variant++; typeInto($('#replyBox'), compose(r, tone)); return }
    if (e.target.closest('#publish')) {
      cancelAnimationFrame(typing)
      const v = $('#replyBox').value.trim()
      if (!v) return toast('La réponse est vide')
      r.reply = v; renderReviews(); toast('Réponse publiée (démo)')
    }
  })

  /* ---------- clients ---------- */
  function clientRows() {
    const names = new Set([...Object.keys(D.clients), ...S.res.filter((r) => !r.walkin).map((r) => r.name)])
    return [...names].map((n) => {
      const c = D.clients[n] || { visits: 1, last: '—', spend: null, prefs: [], history: [] }
      const r = S.res.find((x) => x.name === n)
      return { name: n, ...c, phone: r ? r.phone : fakePhone(n), tonight: r }
    }).sort((a, b) => b.visits - a.visits || a.name.localeCompare(b.name))
  }
  function renderClients() {
    const q = $('#clientSearch').value.trim().toLowerCase()
    const all = clientRows()
    const rows = all.filter((c) => !q || [c.name, c.phone, ...c.prefs].join(' ').toLowerCase().includes(q))
    $('#clientCount').textContent = `${all.length} clients · ${all.filter((c) => c.visits >= 5).length} habitués`
    if (!rows.length) { $('#clientRows').innerHTML = `<tr class="empty-row"><td colspan="5">Aucun client ne correspond à « ${esc(q)} ».</td></tr>`; return }
    $('#clientRows').innerHTML = rows.map((c) => {
      const open = S.openClient === c.name
      const row = `<tr class="crow${open ? ' open' : ''}" data-n="${esc(c.name)}" tabindex="0" aria-expanded="${open}"><td><div class="cname">${esc(c.name)}</div><div class="cphone">${c.phone}</div></td><td>${c.visits}</td><td>${c.last}</td><td><div class="ctags">${c.prefs.map((p) => `<span class="tag">${esc(p)}</span>`).join('') || '<span class="cphone">—</span>'}</div></td><td class="num">${c.spend ? c.spend + ' €' : '—'}</td></tr>`
      if (!open) return row
      const tonight = c.tonight ? `<p>${fmt(c.tonight.start)} · ${c.tonight.covers} pers. · table ${c.tonight.table}</p><p style="margin-top:8px"><button class="btn ghost small" data-goto="${c.tonight.id}">Voir sur le plan</button></p>` : '<p>Pas de réservation</p>'
      return row + `<tr class="cdetail"><td colspan="5"><div class="box"><div><h4>Ce soir</h4>${tonight}</div><div><h4>Dernières visites</h4>${c.history.length ? c.history.map((h) => `<p>${h}</p>`).join('') : '<p>Première visite</p>'}</div><div><h4>Note</h4><p>${esc(D.notes[c.name] || 'Aucune note')}</p></div></div></td></tr>`
    }).join('')
  }
  $('#clientSearch').addEventListener('input', renderClients)
  $('#clientRows').addEventListener('click', (e) => {
    const g = e.target.closest('[data-goto]')
    if (g) { setTab('service'); selectRes(+g.dataset.goto); return }
    const tr = e.target.closest('.crow'); if (!tr) return
    S.openClient = S.openClient === tr.dataset.n ? null : tr.dataset.n; renderClients()
  })
  $('#clientRows').addEventListener('keydown', (e) => {
    const tr = e.target.closest('.crow')
    if (tr && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); S.openClient = S.openClient === tr.dataset.n ? null : tr.dataset.n; renderClients(); const again = document.querySelector(`.crow[data-n="${CSS.escape(tr.dataset.n)}"]`); if (again) again.focus() }
  })

  /* ---------- tabs, toast, keys ---------- */
  function setTab(name) {
    S.tab = name
    document.querySelectorAll('.tabs [role=tab]').forEach((b) => b.setAttribute('aria-selected', b.dataset.tab === name))
    for (const v of ['service', 'avis', 'clients']) $('#view-' + v).hidden = v !== name
    if (name !== 'service') stopPlay()
    if (name === 'avis') renderReviews()
    if (name === 'clients') renderClients()
  }
  document.querySelectorAll('.tabs [role=tab]').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)))
  let toastT = 0
  function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2600) }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !dlg.open && (S.sel || S.assign)) { S.sel = null; S.assign = null; renderAll() }
  })

  function renderAll() { renderPlan(); renderClock(); renderKpis(); renderList(); renderInspector() }

  $('#dateLine').textContent = 'Vendredi 13 novembre · service du soir'
  buildPlan(); buildTicks(); renderAll(); renderReviews()
})()
