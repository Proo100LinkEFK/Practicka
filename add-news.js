const DEMO_NEWS = [
  {
    id: 1,
    title: 'OpenAI запустила GPT-5 — революция в ИИ',
    content: 'Новая модель демонстрирует невероятные способности к рассуждению, кодированию и мультимодальному восприятию.',
    author: 'IT Pulse',
    image: 'https://images.unsplash.com/photo-1677442135722-5f11f06a5e3a?auto=format&fit=crop&w=600',
    category: 'AI',
    date: new Date(Date.now() - 86400000).toISOString(),
    likes: 42,
    liked: false,
    saved: false
  },
  {
    id: 2,
    title: 'React 19 выходит с новыми хуками и улучшениями производительности',
    content: 'Команда React представила долгожданное обновление.',
    author: 'IT Pulse',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600',
    category: 'Web',
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    likes: 28,
    liked: false,
    saved: false
  },
  {
    id: 3,
    title: 'Apple представила новые чипы для MacBook Pro',
    content: 'Новые M4 Pro и M4 Max обеспечивают до 2× прироста в производительности.',
    author: 'IT Pulse',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600',
    category: 'Mobile',
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
    likes: 56,
    liked: false,
    saved: false
  }
];

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('theme-dark', savedTheme === 'dark');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('theme-dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
});

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  icon.className = document.body.classList.contains('theme-dark') 
    ? 'fas fa-sun' 
    : 'fas fa-moon';
}

const form = document.getElementById('news-form');
const notification = document.getElementById('notification');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const author = document.getElementById('author').value.trim() || 'Аноним';
  const image = document.getElementById('image').value.trim();
  const category = document.getElementById('category').value;

  if (!category) {
    notification.textContent = 'Выберите категорию!';
    notification.className = 'notification error show';
    setTimeout(() => notification.classList.remove('show'), 3000);
    return;
  }

  let news = JSON.parse(sessionStorage.getItem('itNews')) || DEMO_NEWS.map(n => ({...n}));

  const newItem = {
    id: Date.now(),
    title,
    content,
    author,
    image: image || '',
    category,
    date: new Date().toISOString(),
    likes: 0,
    liked: false,
    saved: false
  };

  news.unshift(newItem);
  sessionStorage.setItem('itNews', JSON.stringify(news));

  notification.textContent = 'Новость успешно добавлена!';
  notification.className = 'notification success show';
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
});