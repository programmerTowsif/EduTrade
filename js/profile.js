const defaultUser = {
  fullName: 'Student Name',
  email: 'student@email.com',
  phone: '01XXXXXXXXX',
  university: 'Premier University',
  department: 'Computer Science'
};

const fields = ['fullName', 'email', 'phone', 'university', 'department'];
const displayIds = {
  fullName: ['profileName', 'accountName'],
  email: ['profileEmail', 'accountEmail'],
  phone: ['profilePhone', 'accountPhone'],
  university: ['profileUniversity', 'accountUniversity'],
  department: ['profileDepartment', 'accountDepartment']
};
const editIds = { fullName: 'editName', email: 'editEmail', phone: 'editPhone', university: 'editUniversity', department: 'editDepartment' };
const modal = document.querySelector('#editModal');
const form = document.querySelector('#editProfileForm');

function currentUser() {
  return { ...defaultUser, ...(JSON.parse(localStorage.getItem('currentUser')) || {}) };
}

function showUser(user) {
  fields.forEach((field) => {
    displayIds[field].forEach((id) => { document.querySelector(`#${id}`).textContent = user[field] || defaultUser[field]; });
  });
}

function openModal() {
  const user = currentUser();
  fields.forEach((field) => { document.querySelector(`#${editIds[field]}`).value = user[field] || ''; });
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.querySelector('#editName').focus();
}

function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

document.querySelector('#editProfileBtn').addEventListener('click', openModal);
document.querySelector('#closeModal').addEventListener('click', closeModal);
document.querySelector('#cancelEdit').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const updatedUser = currentUser();
  fields.forEach((field) => {
    const id = editIds[field];
    updatedUser[field] = document.querySelector(`#${id}`).value.trim();
  });

  if (fields.some((field) => !updatedUser[field])) {
    alert('Please complete every profile field.');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex((user) => user.email === updatedUser.email || user.id === updatedUser.id);
  if (userIndex >= 0) { users[userIndex] = { ...users[userIndex], ...updatedUser }; localStorage.setItem('users', JSON.stringify(users)); }
  showUser(updatedUser);
  closeModal();
});

document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
showUser(currentUser());

document.querySelector('#recentPosts').innerHTML = `<article class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><p class="text-sm font-semibold text-green-700">SELL</p><h3 class="mt-2 text-lg font-bold">Introduction to Algorithms</h3><p class="mt-1 text-sm text-gray-500">Posted today · ৳700</p><a href="post-details.html" class="mt-4 inline-block font-medium text-green-700 hover:text-green-800">View post →</a></article>`;
