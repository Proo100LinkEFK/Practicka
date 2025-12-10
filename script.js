const DEMO_NEWS = [
  {
    id: 1,
    title: 'OpenAI запустила GPT-5 — революция в ИИ',
    content: 'Новая модель демонстрирует невероятные способности к рассуждению, кодированию и мультимодальному восприятию. Исследователи отмечают, что GPT-5 способен решать задачи, недоступные предыдущим поколениям.',
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
    content: 'Команда React представила долгожданное обновление с упрощённой архитектурой и поддержкой серверных компонентов по умолчанию. Новые хуки позволяют писать менее многословный и более эффективный код.',
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
    content: 'Новые M4 Pro и M4 Max обеспечивают до 2× прироста в производительности по сравнению с предыдущим поколением. Особенно впечатляют улучшения в задачах машинного обучения и рендеринга видео.',
    author: 'IT Pulse',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600',
    category: 'Mobile',
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
    likes: 56,
    liked: false,
    saved: false
  }
];

const CATEGORIES = {
  AI: 'Искусственный интеллект',
  Web: 'Веб-разработка',
  Mobile: 'Мобильная разработка',
  Cyber: 'Кибербезопасность',
  Cloud: 'Облака',
  DevOps: 'DevOps'
};

let news = JSON.parse(sessionStorage.getItem('itNews')) || DEMO_NEWS.map(n => ({...n}));

const container = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
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

function saveNews() {
  sessionStorage.setItem('itNews', JSON.stringify(news));
}

function renderNews() {
  const query = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = news
    .filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query);
      const matchesCategory = !category || item.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = '';
  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:var(--text-secondary);">Новостей не найдено</p>';
    return;
  }

  filtered.forEach(item => {
    const cardLink = document.createElement('a');
    cardLink.href = `news-detail.html?id=${item.id}`;
    cardLink.style.textDecoration = 'none';
    cardLink.style.color = 'inherit';
    cardLink.style.display = 'block';

    const card = document.createElement('article');
    card.className = 'news-card';
    const timeToRead = Math.ceil(item.content.split(' ').length / 200);
    const date = new Date(item.date);
    const dateString = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    
    card.innerHTML = `
      <img src="${item.image || 'https://via.placeholder.com/600x200?text=No+Image'}" 
           class="news-image" 
           onerror="this.src='https://via.placeholder.com/600x200?text=Изображение+недоступно'">
      <div class="news-content">
        <span class="news-category">${CATEGORIES[item.category] || item.category}</span>
        <h2 class="news-title">${item.title}</h2>
        <p class="news-excerpt">${item.content.substring(0, 150)}${item.content.length > 150 ? '...' : ''}</p>
        <div class="news-meta">
          <span><i class="far fa-clock"></i> ${timeToRead} мин</span>
          <span><i class="far fa-calendar"></i> ${dateString}</span>
          ${item.author ? `<span><i class="fas fa-user"></i> ${item.author}</span>` : ''}
        </div>
      </div>
    `;
    cardLink.appendChild(card);
    container.appendChild(cardLink);
  });
}

searchInput.addEventListener('input', renderNews);
categoryFilter.addEventListener('change', renderNews);

renderNews();