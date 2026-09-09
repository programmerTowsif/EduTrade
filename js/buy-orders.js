const buyOrders = [
  { title: 'Introduction to Algorithms', category: 'Books', budget: 700, condition: 'Good condition', user: 'Nusrat Jahan', time: '25 min ago', tag: 'CSE' },
  { title: 'Casio fx-991ES Plus', category: 'Calculators', budget: 850, condition: 'Working condition', user: 'Rafi Ahmed', time: '1 hr ago', tag: 'EEE' },
  { title: 'Digital Logic Design notes', category: 'Notes', budget: 250, condition: 'Any semester', user: 'Mim Chowdhury', time: '3 hrs ago', tag: 'CSE' },
  { title: 'Arduino Uno starter kit', category: 'Electronics', budget: 1200, condition: 'Complete kit preferred', user: 'Sabbir Hasan', time: 'Yesterday', tag: 'EEE' },
  { title: 'Engineering Drawing book', category: 'Books', budget: 450, condition: 'Latest edition preferred', user: 'Afsana Islam', time: 'Yesterday', tag: 'Architecture' },
  { title: 'Linear Algebra notes', category: 'Notes', budget: 200, condition: 'Clear photocopy is fine', user: 'Tania Sultana', time: '2 days ago', tag: 'Math' }
];
const grid = document.querySelector('#orders-grid');
const count = document.querySelector('#order-count');
const empty = document.querySelector('#empty-orders');
const search = document.querySelector('#order-search');
const category = document.querySelector('#category-filter');
const sort = document.querySelector('#sort-orders');
function renderOrders() {
  const query = search.value.trim().toLowerCase();
  let orders = buyOrders.filter((order) => (category.value === 'all' || order.category === category.value) && `${order.title} ${order.category} ${order.tag}`.toLowerCase().includes(query));
  if (sort.value === 'budget') orders = [...orders].sort((a, b) => b.budget - a.budget);
  count.textContent = `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} available`;
  empty.classList.toggle('hidden', orders.length > 0);
  grid.innerHTML = orders.map((order) => `<article class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"><div class="flex items-start justify-between gap-4"><span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">${order.category}</span><span class="text-xs text-slate-400">${order.time}</span></div><h2 class="mt-5 text-xl font-bold text-slate-900">${order.title}</h2><p class="mt-2 text-sm text-slate-500">${order.condition}</p><div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-4"><div><p class="text-xs text-slate-400">Budget</p><p class="text-lg font-extrabold text-slate-900">৳${order.budget}</p></div><span class="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">${order.tag}</span></div><div class="mt-5 flex items-center justify-between"><p class="text-sm font-medium text-slate-700">${order.user}</p><button class="offer-button rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white" data-item="${order.title}">Make offer</button></div></article>`).join('');
}
[search, category, sort].forEach((control) => control.addEventListener('input', renderOrders));
grid.addEventListener('click', (event) => { if (event.target.matches('.offer-button')) { event.target.textContent = 'Offer sent ✓'; event.target.disabled = true; event.target.classList.add('bg-blue-600', 'text-white'); } });
<<<<<<< HEAD
renderOrders();
=======
renderOrders();
>>>>>>> main
