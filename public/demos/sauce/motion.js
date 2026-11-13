/* Tiny motion engine shared by the demo sites.
   Every animated value is a function of (time since load, scroll position), so the same
   page runs live in a browser and can also be rendered frame by frame for video:
   the renderer calls window.__tick(t) and the live loop stops. */
(function () {
  var clamp = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  var outCubic = function (x) { return 1 - Math.pow(1 - x, 3); };
  var outExpo = function (x) { return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); };
  var L = { render: false };

  function q(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function docTop(el) { var y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }

  function measure() {
    L.rv.forEach(function (el) { el._top = docTop(el.parentElement.classList.contains('mask') ? el.parentElement : el); });
    L.par.forEach(function (el) { el._top = docTop(el.parentElement); el._h = el.parentElement.offsetHeight; });
    L.draw.forEach(function (el) { el._top = docTop(el.closest('[data-draw-box]') || el.ownerSVGElement); });
    L.marq.forEach(function (el) { el._w = el.scrollWidth / 2; });
  }

  function init() {
    L.intro = q('[data-in]'); L.rv = q('[data-rv]'); L.par = q('[data-par]');
    L.marq = q('[data-marq]'); L.spin = q('[data-spin]'); L.draw = q('[data-draw]');
    L.show = q('[data-show]'); L.pulse = q('[data-pulse]');
    L.draw.forEach(function (p) { var n = p.getTotalLength(); p.style.strokeDasharray = n; p._len = n; });
    measure();
    frame(0);
  }

  function apply(el, kind, p) {
    switch (kind) {
      case 'mask': el.style.transform = 'translate3d(0,' + (1 - p) * 108 + '%,0)'; break;
      case 'zoom': el.style.transform = 'scale(' + (1.22 - 0.22 * p) + ')'; break;
      case 'fade': el.style.opacity = p; break;
      case 'clip': el.style.clipPath = 'inset(' + (1 - p) * 100 + '% 0 0 0)'; break;
      case 'clipx': el.style.clipPath = 'inset(0 ' + (1 - p) * 100 + '% 0 0)'; break;
      case 'line': el.style.transform = 'scaleX(' + p + ')'; break;
      case 'pop': el.style.opacity = p; el.style.transform = 'scale(' + (0.6 + 0.4 * p) + ') rotate(' + (1 - p) * -25 + 'deg)'; break;
      default: el.style.opacity = p; el.style.transform = 'translate3d(0,' + (1 - p) * 56 + 'px,0)';
    }
  }

  function frame(t) {
    var vh = window.innerHeight, sy = window.scrollY;
    L.intro.forEach(function (el) {
      var d = +el.dataset.in || 0, dur = +(el.dataset.dur || 1.1);
      apply(el, el.dataset.k || 'up', outExpo(clamp((t - d) / dur)));
    });
    L.rv.forEach(function (el) {
      var delay = +(el.dataset.d || 0) * vh;
      var p = clamp((sy + vh * 0.9 - el._top - delay) / (vh * 0.32));
      apply(el, el.dataset.rv || 'up', outCubic(p));
    });
    L.par.forEach(function (el) {
      var c = (el._top + el._h / 2 - (sy + vh / 2)) / vh;
      el.style.transform = 'translate3d(0,' + (c * (+el.dataset.par) * 100).toFixed(2) + 'px,0) scale(' + (el.dataset.sc || 1.18) + ')';
    });
    L.marq.forEach(function (el) {
      var sp = +el.dataset.marq, w = el._w || 1;
      var off = ((t * sp + sy * 0.55 * (sp < 0 ? -1 : 1)) % w + w) % w;
      el.style.transform = 'translate3d(' + (-off).toFixed(2) + 'px,0,0)';
    });
    L.spin.forEach(function (el) { el.style.transform = 'rotate(' + (t * (+el.dataset.spin) + sy * 0.12).toFixed(2) + 'deg)'; });
    L.draw.forEach(function (el) {
      var p = outCubic(clamp((sy + vh * 0.8 - el._top) / (vh * 0.3)));
      el.style.strokeDashoffset = el._len * (1 - p);
    });
    L.show.forEach(function (el) {
      var p = outCubic(clamp((sy - (+el.dataset.show)) / 140));
      el.style.opacity = p; el.style.transform = 'translate3d(0,' + (1 - p) * 120 + '%,0)';
      el.style.pointerEvents = p > 0.5 ? 'auto' : 'none';
    });
    L.pulse.forEach(function (el) { el.style.opacity = 0.55 + 0.45 * Math.sin(t * 3.2); });
  }

  window.__tick = function (t) { L.render = true; frame(t); };
  window.__measure = measure;

  var t0 = null;
  function loop(now) {
    if (L.render) return;
    if (t0 === null) t0 = now;
    frame((now - t0) / 1000);
    requestAnimationFrame(loop);
  }

  function start() { init(); requestAnimationFrame(loop); window.addEventListener('resize', measure); }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
