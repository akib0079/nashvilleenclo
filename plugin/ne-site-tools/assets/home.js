/* Nashville Enclosures — home hero slideshow (crossfade + slow Ken Burns zoom, progress, arrows, swipe). */
(function () {
  function init(h) {
    var slides = [].slice.call(h.querySelectorAll('.nh-slide'));
    if (!slides.length) return;
    var i = 0, dur = +h.getAttribute('data-interval') || 6500, timer = null, paused = false;
    var num = h.querySelector('.nh-num'), bar = h.querySelector('.nh-bar i');
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    h.style.setProperty('--nh-dur', dur + 'ms');
    function load(s) {
      var img = s && s.querySelector('img');
      if (!img) return;
      if (img.getAttribute('data-srcset')) { img.srcset = img.getAttribute('data-srcset'); img.removeAttribute('data-srcset'); }
      if (img.getAttribute('data-src')) { img.src = img.getAttribute('data-src'); img.removeAttribute('data-src'); }
    }
    function progress() {
      if (!bar) return;
      bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
      h.classList.toggle('nh-paused', paused);
    }
    function go(n) {
      var prev = slides[i];
      i = (n + slides.length) % slides.length;
      if (slides[i] === prev) return;
      load(slides[i]); load(slides[(i + 1) % slides.length]);
      prev.classList.remove('is-active'); prev.classList.add('is-leaving');
      setTimeout(function () { prev.classList.remove('is-leaving'); }, 1600);
      slides[i].classList.add('is-active');
      if (num) num.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
      schedule();
    }
    function schedule() { clearTimeout(timer); progress(); if (!paused) timer = setTimeout(function () { go(i + 1); }, dur); }
    h.querySelector('.nh-next').addEventListener('click', function () { go(i + 1); });
    h.querySelector('.nh-prev').addEventListener('click', function () { go(i - 1); });
    document.addEventListener('visibilitychange', function () { paused = document.hidden; schedule(); });
    var x0 = null;
    h.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    h.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 45) go(dx < 0 ? i + 1 : i - 1); x0 = null; });
    h.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); });
    if (reduce) h.classList.add('nh-reduce');
    // preload the second slide once the first has painted
    window.addEventListener('load', function () { load(slides[1]); });
    h.classList.add('nh-ready');
    schedule();
  }
  function boot() { [].forEach.call(document.querySelectorAll('.ne-hero2'), init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
