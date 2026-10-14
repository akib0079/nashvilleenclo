/* Nashville Enclosures — service-area map. Served counties are highlighted in the brand accent. */
(function () {
  var ACCENT = '#957E56';
  function init(el) {
    if (el._neMap || !window.L) return;
    var map = L.map(el, { scrollWheelZoom: false, zoomControl: false, attributionControl: true, zoomSnap: 0.25 });
    L.control.zoom({ position: 'topright' }).addTo(map); // top-left is covered by the info card
    map.attributionControl.setPrefix(false);
    el._neMap = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14, minZoom: 6, subdomains: 'abc',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);
    // wheel zoom only after the visitor interacts, so the page keeps scrolling normally
    map.once('focus click', function () { map.scrollWheelZoom.enable(); });
    fetch(el.getAttribute('data-geo')).then(function (r) { return r.json(); }).then(function (geo) {
      var served = L.geoJSON(geo, {
        filter: function (f) { return f.properties.s === 1; },
        style: { color: ACCENT, weight: 1.6, fillColor: ACCENT, fillOpacity: 0.32 },
        onEachFeature: function (f, layer) {
          layer.bindTooltip(f.properties.n, { permanent: true, direction: 'center', className: 'ne-county-label' });
          layer.on({
            mouseover: function () { layer.setStyle({ fillOpacity: 0.5 }); },
            mouseout: function () { layer.setStyle({ fillOpacity: 0.32 }); }
          });
        }
      });
      L.geoJSON(geo, {
        filter: function (f) { return f.properties.s !== 1; },
        style: { color: '#8a8a8a', weight: 0.7, opacity: 0.55, fill: false },
        interactive: false
      }).addTo(map);
      served.addTo(map);
      var fit = function () {
        var wide = el.clientWidth > 700;
        // leave room for the info card on the left on wide screens
        map.fitBounds(served.getBounds(), { paddingTopLeft: [wide ? 360 : 20, 20], paddingBottomRight: [20, 20] });
      };
      fit();
      L.circleMarker([36.1627, -86.7816], { radius: 7, color: '#fff', weight: 2.5, fillColor: '#1a1a1a', fillOpacity: 1 })
        .bindTooltip('Nashville', { permanent: true, direction: 'top', offset: [0, -8], className: 'ne-city-label' })
        .addTo(map);
      var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { map.invalidateSize(); fit(); }, 200); });
      var labels = function () { el.classList.toggle('ne-labels-off', map.getZoom() < 7.75); };
      map.on('zoomend', labels); labels();
    });
  }
  function boot() {
    var els = document.querySelectorAll('.ne-service-map');
    if (!('IntersectionObserver' in window)) { els.forEach(init); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { init(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '300px' });
    els.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
