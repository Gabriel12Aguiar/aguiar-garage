const viewer = document.querySelector('.photo-viewer');

if (viewer && typeof viewer.showModal === 'function') {
  const fullImage = viewer.querySelector('.photo-full');
  const closeButton = viewer.querySelector('.photo-close');
  let trigger;
  let scrollPosition = 0;
  let savedBodyStyle;

  document.querySelectorAll('.service-list figure img').forEach((image) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'photo-trigger';
    button.setAttribute('aria-label', `Ampliar foto: ${image.alt}`);
    button.setAttribute('aria-haspopup', 'dialog');
    image.before(button);
    button.append(image);

    button.addEventListener('click', () => {
      trigger = button;
      fullImage.src = image.currentSrc || image.src;
      fullImage.alt = image.alt;
      scrollPosition = window.scrollY;
      savedBodyStyle = document.body.getAttribute('style');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      viewer.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) viewer.close();
  });
  // The native dialog also closes with Escape and keeps keyboard focus inside.
  viewer.addEventListener('close', () => {
    if (savedBodyStyle === null) document.body.removeAttribute('style');
    else document.body.setAttribute('style', savedBodyStyle);
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, scrollPosition);
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
    trigger?.focus({ preventScroll: true });
    fullImage.removeAttribute('src');
    fullImage.alt = '';
  });
}
