(() => {
  const chapters = [...document.querySelectorAll('.chapter')];
  const select = document.querySelector('#chapter-select');
  const progress = document.querySelector('#progress');
  const position = document.querySelector('#read-position');
  select.addEventListener('change', () => {
    const target = document.getElementById(select.value);
    if (target) {
      history.replaceState(null, '', '#' + select.value);
      target.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }
  });
  let scheduled = false;
  function update() {
    scheduled = false;
    const y = window.scrollY + 150;
    let active = 0;
    chapters.forEach((chapter, index) => { if (chapter.offsetTop <= y) active = index; });
    if (document.activeElement !== select) select.value = chapters[active].id;
    position.textContent = String(active + 1).padStart(2, '0') + ' / 08';
    const start = chapters[0].offsetTop;
    const end = chapters[chapters.length - 1].offsetTop + chapters[chapters.length - 1].offsetHeight - window.innerHeight;
    const fraction = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
    progress.style.width = (fraction * 100) + '%';
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  update();
})();
