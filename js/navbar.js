document.addEventListener('DOMContentLoaded', async () => {
  const mount = document.querySelector('[data-navbar]');
  if (!mount) return;

  try {
    const response = await fetch('navbar.html');
    if (!response.ok) throw new Error('Navbar could not be loaded');
    mount.innerHTML = await response.text();
  } catch (error) {
    mount.innerHTML = '<p class="bg-red-50 px-4 py-2 text-center text-sm text-red-700">Navigation is unavailable.</p>';
    return;
  }

  const nav = document.querySelector('#site-navbar');
  const toggle = document.querySelector('#nav-toggle');
  const links = document.querySelector('#nav-links');
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('[data-nav]').forEach((link) => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) link.classList.add('is-active');
  });

  toggle?.addEventListener('click', () => {
    const isOpen = links.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow-md', window.scrollY > 8);
  }, { passive: true });
});
