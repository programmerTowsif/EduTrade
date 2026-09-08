const featuredItems = [
  { icon: '📘', title: 'Data Structures & Algorithms', price: '৳450', detail: 'Books · Good condition' },
  { icon: '🧮', title: 'Casio fx-991ES Plus', price: '৳850', detail: 'Calculator · Like new' },
  { icon: '⚡', title: 'Arduino Uno kit', price: '৳1,100', detail: 'Electronics · Complete set' }
];
document.querySelector('#featured-items').innerHTML = featuredItems.map((item) => `<article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">${item.icon}</div><p class="mt-5 text-sm text-slate-500">${item.detail}</p><h3 class="mt-1 text-lg font-bold text-slate-900">${item.title}</h3><div class="mt-5 flex items-center justify-between"><strong class="text-blue-600">${item.price}</strong><a href="post-details.html" class="text-sm font-bold text-slate-700 hover:text-blue-600">View item →</a></div></article>`).join('');
