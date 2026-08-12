(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const gsapReady = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (finePointer) {
    const cursor = document.querySelector('.cursor');
    const label = cursor.querySelector('span');
    window.addEventListener('pointermove', (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0) translate(-50%,-50%)`;
      const nx = (event.clientX / innerWidth - .5) * 2;
      const ny = (event.clientY / innerHeight - .5) * 2;
      document.documentElement.style.setProperty('--mx', nx);
      document.documentElement.style.setProperty('--my', ny);
      const heroVisual = document.querySelector('.hero-visual');
      const heroBackdrop = document.querySelector('.hero-backdrop');
      if (heroVisual && !reduced) heroVisual.style.transform = `translate3d(${nx * 10}px,${ny * 6}px,0)`;
      if (heroBackdrop && !reduced) heroBackdrop.style.marginLeft = `${nx * -8}px`;
    }, { passive: true });
    document.querySelectorAll('a,button,.project-art').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
    document.querySelectorAll('.view-project').forEach((el) => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('is-view'); label.textContent = 'VIEW PROJECT'; });
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-view'));
    });
  }

  document.querySelectorAll('.skill-row button').forEach((button) => {
    button.addEventListener('mouseenter', () => document.querySelector('.skill-description').textContent = button.dataset.desc);
    button.addEventListener('focus', () => document.querySelector('.skill-description').textContent = button.dataset.desc);
  });

  if (finePointer && !reduced) {
    document.querySelectorAll('.magnetic').forEach((link) => {
      link.addEventListener('pointermove', (event) => {
        const rect = link.getBoundingClientRect();
        link.style.transform = `translate3d(${(event.clientX - rect.left - rect.width / 2) * .12}px,${(event.clientY - rect.top - rect.height / 2) * .18}px,0)`;
      });
      link.addEventListener('pointerleave', () => { link.style.transform = 'translate3d(0,0,0)'; });
    });
  }

  if (reduced || !gsapReady) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .15 });
    document.querySelectorAll('.reveal,.timeline-entry').forEach((el) => observer.observe(el));
    document.querySelectorAll('.reveal').forEach((el) => el.style.cssText += ';opacity:1;transform:none');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const ctx = gsap.context(() => {
    gsap.from('.title-line', { yPercent: 110, opacity: 0, duration: 1.05, stagger: .13, ease: 'power4.out', delay: .2 });
    gsap.from('.hero-line', { y: 28, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out', delay: .55 });
    gsap.to('.hero-backdrop', { xPercent: -10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.utils.toArray('.reveal').forEach((el) => gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%', once: true } }));
    gsap.to('.timeline-line i', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 65%', end: 'bottom 60%', scrub: true } });
    gsap.utils.toArray('.timeline-entry').forEach((entry) => {
      gsap.to(entry.querySelector('.timeline-year'), { y: 0, opacity: 1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: entry, start: 'top 72%' } });
      gsap.from(entry.querySelectorAll('time,h3,p,small'), { y: 34, opacity: 0, stagger: .1, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: entry, start: 'top 70%' } });
      ScrollTrigger.create({ trigger: entry, start: 'top 55%', end: 'bottom 55%', toggleClass: 'is-active' });
    });
    gsap.from('.campus-figure img', { scale: .94, opacity: 0, scrollTrigger: { trigger: '.campus-story', start: 'top 65%', end: 'top 25%', scrub: true } });
    gsap.to('.experience-line', { scaleX: 1, duration: 1, ease: 'power3.out', stagger: .12, scrollTrigger: { trigger: '.experience', start: 'top 72%' } });
    gsap.from('.experience-content h2 span', { yPercent: 110, duration: .9, stagger: .1, ease: 'power4.out', scrollTrigger: { trigger: '.experience-content h2', start: 'top 82%' } });
    gsap.from('.experience-details article', { y: 24, opacity: 0, duration: .65, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.experience-details', start: 'top 88%' } });
    gsap.from('.experience-sequence span', { y: 18, opacity: 0, duration: .6, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.experience-sequence', start: 'top 88%' } });
    gsap.from('.projects-heading h2 span', { yPercent: 110, duration: 1, stagger: .12, ease: 'power4.out', scrollTrigger: { trigger: '.projects-heading', start: 'top 82%' } });
    gsap.to('.projects-rule', { scaleX: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.projects-heading', start: 'top 76%' } });
    gsap.utils.toArray('.editorial-project').forEach((project) => {
      const visual = project.querySelector('.project-visual');
      const image = project.querySelector('.project-image img');
      gsap.to(project.querySelector('.project-number'), { y: 0, opacity: .16, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: project, start: 'top 72%' } });
      gsap.from(project.querySelectorAll('h3 span'), { yPercent: 110, duration: .8, stagger: .08, ease: 'power4.out', scrollTrigger: { trigger: project, start: 'top 68%' } });
      gsap.to(visual, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power4.inOut', scrollTrigger: { trigger: project, start: 'top 62%' } });
      gsap.to(project.querySelector('.project-rule'), { scaleX: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: project, start: 'top 58%' } });
      if (image) gsap.to(image, { yPercent: -3, scale: 1, ease: 'none', scrollTrigger: { trigger: project, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });
    gsap.to('.row-left', { xPercent: -14, ease: 'none', scrollTrigger: { trigger: '.skill-wall', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    gsap.to('.row-right', { xPercent: 8, ease: 'none', scrollTrigger: { trigger: '.skill-wall', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
  window.addEventListener('pagehide', () => ctx.revert(), { once: true });
})();
