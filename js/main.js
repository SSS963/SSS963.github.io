/* ============================================================
   Shaivi Sheth — Spatial / 3D Edition · interactions
   ============================================================ */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Nav / progress ---------- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  function onScroll() {
    var y = window.scrollY || 0;
    if (nav) nav.classList.toggle('is-scrolled', y > 18);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.getElementById('burger');
  var navMenu = document.getElementById('navMenu');
  if (burger && navMenu) {
    burger.addEventListener('click', function () {
      var open = navMenu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
    });
    navMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { navMenu.classList.remove('is-open'); burger.classList.remove('is-open'); }
    });
  }

  /* ---------- Active section ---------- */
  var links = {};
  document.querySelectorAll('.nav__menu a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        Object.keys(links).forEach(function (k) { links[k].classList.remove('is-active'); });
        if (links[e.target.id]) links[e.target.id].classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });

  /* ---------- Reveal ---------- */
  var revObs = new IntersectionObserver(function (es, o) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); o.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revObs.observe(el); });

  /* ---------- Cursor glow ---------- */
  var glow = document.getElementById('cursorGlow');
  if (glow && !reduceMotion) {
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- Hero role typewriter ---------- */
  var roleEl = document.getElementById('heroRole');
  if (roleEl && !reduceMotion) {
    var roles = ['AI & Data Engineer', 'Machine-Learning Builder', 'Full-Stack Developer', 'Data Engineer @ DBS'];
    var ri = 0, ci = 0, deleting = false;
    function type() {
      var word = roles[ri];
      roleEl.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) { ci++; setTimeout(type, 70); }
      else if (!deleting && ci === word.length) { deleting = true; setTimeout(type, 1600); }
      else if (deleting && ci > 0) { ci--; setTimeout(type, 35); }
      else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 350); }
    }
    roleEl.textContent = '';
    type();
  }

  /* ---------- 3D Skills Sphere ---------- */
  var sphere = document.getElementById('sphere');
  if (sphere) {
    var skills = [
      { t: 'Python', c: 'hot' }, { t: 'SQL', c: 'hot' }, { t: 'TypeScript', c: 'v' },
      { t: 'Java', c: '' }, { t: 'JavaScript', c: '' }, { t: 'C', c: '' },
      { t: 'Multi-Agent', c: 'hot' }, { t: 'RAG', c: 'hot' }, { t: 'MCP', c: 'hot' },
      { t: 'Dify', c: 'v' }, { t: 'LangChain', c: 'v' }, { t: 'LlamaIndex', c: 'v' },
      { t: 'Embeddings', c: 'hot' }, { t: 'Semantic Search', c: 'hot' }, { t: 'RAGAS', c: '' },
      { t: 'ChromaDB', c: '' }, { t: 'Vector DBs', c: 'v' }, { t: 'NLP', c: '' },
      { t: 'Prompt Eng.', c: 'v' }, { t: 'Context Eng.', c: 'v' }, { t: 'OpenAI API', c: 'hot' },
      { t: 'Claude API', c: 'hot' }, { t: 'Hugging Face', c: '' }, { t: 'scikit-learn', c: '' },
      { t: 'PyTorch', c: '' }, { t: 'TensorFlow', c: '' }, { t: 'Pandas', c: 'm' },
      { t: 'NumPy', c: '' }, { t: 'Power BI', c: 'm' }, { t: 'Power Query', c: 'm' },
      { t: 'Spark', c: '' }, { t: 'Plotly', c: 'm' }, { t: 'Next.js', c: 'v' },
      { t: 'React', c: 'v' }, { t: 'FastAPI', c: '' }, { t: 'Django', c: '' },
      { t: 'Node.js', c: '' }, { t: 'PostgreSQL', c: '' }, { t: 'MongoDB', c: '' },
      { t: 'Supabase', c: '' }, { t: 'Docker', c: 'v' }, { t: 'Git', c: 'hot' },
      { t: 'Vercel', c: '' }, { t: 'Jenkins', c: '' }, { t: 'Grafana', c: 'm' },
      { t: 'Kibana', c: 'm' }, { t: 'Swagger', c: '' }, { t: 'Data Pipelines', c: 'hot' }
    ];
    var R = 165;
    var tags = [];
    var N = skills.length;
    skills.forEach(function (s, i) {
      var el = document.createElement('span');
      el.className = 'sphere__tag' + (s.c ? ' sphere__tag--' + s.c : '');
      el.textContent = s.t;
      sphere.appendChild(el);
      // Fibonacci sphere distribution
      var phi = Math.acos(-1 + (2 * i) / N);
      var theta = Math.sqrt(N * Math.PI) * phi;
      tags.push({
        el: el,
        x: R * Math.cos(theta) * Math.sin(phi),
        y: R * Math.sin(theta) * Math.sin(phi),
        z: R * Math.cos(phi)
      });
    });

    var ax = -0.3, ay = 0.0;       // accumulated rotation
    var vx = 0.0009, vy = 0.0016;  // velocity (radians/frame baseline)
    var dragging = false, lastX = 0, lastY = 0;
    var stage = document.getElementById('sphereStage');
    var hint = document.getElementById('sphereHint');

    function render() {
      var sinX = Math.sin(ax), cosX = Math.cos(ax);
      var sinY = Math.sin(ay), cosY = Math.cos(ay);
      for (var i = 0; i < tags.length; i++) {
        var p = tags[i];
        // rotate Y
        var x1 = p.x * cosY + p.z * sinY;
        var z1 = -p.x * sinY + p.z * cosY;
        var y1 = p.y;
        // rotate X
        var y2 = y1 * cosX - z1 * sinX;
        var z2 = y1 * sinX + z1 * cosX;
        var x2 = x1;
        var depth = (z2 + R) / (2 * R);            // 0 (back) .. 1 (front)
        var scale = 0.55 + depth * 0.7;
        p.el.style.transform = 'translate(-50%,-50%) translate3d(' + x2.toFixed(1) + 'px,' + y2.toFixed(1) + 'px,0) scale(' + scale.toFixed(3) + ')';
        p.el.style.opacity = (0.25 + depth * 0.75).toFixed(3);
        p.el.style.zIndex = Math.round(depth * 100);
        p.el.style.filter = depth < 0.45 ? 'blur(' + ((0.45 - depth) * 3).toFixed(1) + 'px)' : 'none';
      }
    }

    function tick() {
      if (!dragging) {
        ay += vx; ax += vy;
        // ease velocity back toward baseline after a fling
        vx += (0.0009 - vx) * 0.02;
        vy += (0.0016 - vy) * 0.02;
      }
      render();
      requestAnimationFrame(tick);
    }

    function down(e) {
      dragging = true;
      lastX = (e.touches ? e.touches[0].clientX : e.clientX);
      lastY = (e.touches ? e.touches[0].clientY : e.clientY);
      if (hint) hint.classList.add('hide');
    }
    function move(e) {
      if (!dragging) return;
      var cx = (e.touches ? e.touches[0].clientX : e.clientX);
      var cy = (e.touches ? e.touches[0].clientY : e.clientY);
      var dx = cx - lastX, dy = cy - lastY;
      ay += dx * 0.006;
      ax += dy * 0.006;
      vx = dx * 0.0009;
      vy = dy * 0.0009;
      lastX = cx; lastY = cy;
      render();
      if (e.cancelable) e.preventDefault();
    }
    function up() { dragging = false; }

    sphere.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    // subtle parallax from mouse over the whole stage
    if (stage && !reduceMotion) {
      stage.addEventListener('pointermove', function (e) {
        if (dragging) return;
        var r = stage.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5;
        var ny = (e.clientY - r.top) / r.height - 0.5;
        vx += (nx * 0.004 - vx) * 0.05;
        vy += (-ny * 0.004 - vy) * 0.05;
      });
    }

    render();
    if (!reduceMotion) requestAnimationFrame(tick);
  }

  /* ---------- Project filters ---------- */
  var filterBar = document.getElementById('filters');
  var projCards = document.querySelectorAll('#projGrid .proj-card');
  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      filterBar.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.getAttribute('data-filter');
      projCards.forEach(function (card) {
        var cats = (card.getAttribute('data-cat') || '').split(/\s+/);
        var show = f === 'all' || cats.indexOf(f) !== -1;
        card.classList.toggle('is-hidden', !show);
        // reveal any card that was still waiting to animate in
        if (show) card.classList.add('is-visible');
      });
    });
  }

  /* ---------- 3D tilt cards ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      var inner = card.firstElementChild;
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var rx = (0.5 - py) * 10;
        var ry = (px - 0.5) * 12;
        card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
        var glowEl = card.querySelector('.skill3d__glow');
        if (glowEl) { glowEl.style.setProperty('--gx', (px * 100) + '%'); glowEl.style.setProperty('--gy', (py * 100) + '%'); }
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
      });
    });
  }

  /* ---------- Background particle network ---------- */
  var canvas = document.getElementById('bgCanvas');
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var w, h, dpr, parts = [];
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      var count = Math.min(80, Math.floor(window.innerWidth / 16));
      parts = [];
      for (var i = 0; i < count; i++) {
        parts.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25 * dpr,
          vy: (Math.random() - 0.5) * 0.25 * dpr,
          r: (Math.random() * 1.4 + 0.4) * dpr
        });
      }
    }
    var mx = -9999, my = -9999;
    window.addEventListener('pointermove', function (e) { mx = e.clientX * dpr; my = e.clientY * dpr; });
    function draw() {
      ctx.clearRect(0, 0, w, h);
      var link = 130 * dpr;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,229,255,0.55)';
        ctx.fill();
        for (var j = i + 1; j < parts.length; j++) {
          var q = parts[j];
          var dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < link) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(120,140,220,' + (0.10 * (1 - d / link)) + ')';
            ctx.lineWidth = dpr * 0.6;
            ctx.stroke();
          }
        }
        // cursor link
        var cdx = p.x - mx, cdy = p.y - my, cd = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cd < link * 1.4) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my);
          ctx.strokeStyle = 'rgba(155,92,255,' + (0.18 * (1 - cd / (link * 1.4))) + ')';
          ctx.lineWidth = dpr * 0.7;
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
  }
})();
