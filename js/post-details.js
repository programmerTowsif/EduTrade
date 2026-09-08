const saveButton = document.querySelector('#save-post');
const contactButton = document.querySelector('#contact-seller');
saveButton.addEventListener('click', () => { const saved = saveButton.textContent === '♥'; saveButton.textContent = saved ? '♡' : '♥'; saveButton.classList.toggle('text-rose-500', !saved); });
contactButton.addEventListener('click', () => { contactButton.textContent = 'Request sent ✓'; contactButton.disabled = true; contactButton.classList.add('bg-emerald-600'); document.querySelector('#contact-note').classList.remove('hidden'); });
