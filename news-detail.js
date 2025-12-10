const CATEGORIES = {
  AI: 'Искусственный интеллект',
  Web: 'Веб-разработка',
  Mobile: 'Мобильная разработка',
  Cyber: 'Кибербезопасность',
  Cloud: 'Облака',
  DevOps: 'DevOps'
};

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

const urlParams = new URLSearchParams(window.location.search);
const newsId = parseInt(urlParams.get('id'));

if (!newsId) {
  document.getElementById('news-detail').innerHTML = '<p style="padding:30px;text-align:center;">Новость не найдена</p>';
} else {
  const news = JSON.parse(sessionStorage.getItem('itNews')) || [];
  const item = news.find(n => n.id === newsId);

  if (!item) {
    document.getElementById('news-detail').innerHTML = '<p style="padding:30px;text-align:center;">Новость не найдена</p>';
  } else {
    const timeToRead = Math.ceil(item.content.split(' ').length / 200);
    const date = new Date(item.date);
    const dateString = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    document.getElementById('news-detail').innerHTML = `
      <img src="${item.image || 'https://via.placeholder.com/800x300?text=No+Image'}" 
           class="news-detail-image" 
           onerror="this.src='https://via.placeholder.com/800x300?text=Изображение+недоступно'">
      <div class="news-detail-content">
        <span class="news-category">${CATEGORIES[item.category] || item.category}</span>
        <h1>${item.title}</h1>
        <div class="news-detail-meta">
          <span><i class="far fa-clock"></i> ${timeToRead} мин на чтение</span>
          <span><i class="far fa-calendar"></i> ${dateString}</span>
          <span><i class="fas fa-user"></i> ${item.author}</span>
        </div>
        <p>${item.content.replace(/\n/g, '<br>')}</p>
        <div class="news-detail-actions">
          <button class="action-btn like-btn ${item.liked ? 'liked' : ''}" data-id="${item.id}">
            <i class="fas fa-heart"></i> <span>${item.likes}</span>
          </button>
          <button class="action-btn save-btn ${item.saved ? 'saved' : ''}" data-id="${item.id}">
            <i class="fas fa-bookmark"></i>
          </button>
        </div>
      </div>
    `;

    document.querySelector('.like-btn')?.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const allNews = JSON.parse(sessionStorage.getItem('itNews')) || [];
      const newsItem = allNews.find(n => n.id === id);
      if (newsItem && !newsItem.liked) {
        newsItem.liked = true;
        newsItem.likes += 1;
        sessionStorage.setItem('itNews', JSON.stringify(allNews));
        location.reload();
      }
    });

    document.querySelector('.save-btn')?.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const allNews = JSON.parse(sessionStorage.getItem('itNews')) || [];
      const newsItem = allNews.find(n => n.id === id);
      if (newsItem) {
        newsItem.saved = !newsItem.saved;
        sessionStorage.setItem('itNews', JSON.stringify(allNews));
        location.reload();
      }
    });
  }
}