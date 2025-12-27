// Дані профілю
let profileData = {
    name: "Ваше Ім'я",
    bio: "Тут ваш короткий опис або біографія",
    links: [
        { title: "Мій GitHub", url: "https://github.com", icon: "fab fa-github" },
        { title: "Портфоліо", url: "https://example.com", icon: "fas fa-briefcase" },
        { title: "Instagram", url: "https://instagram.com", icon: "fab fa-instagram" }
    ],
    stats: {
        followers: "1.2K",
        posts: "356",
        rating: "4.8"
    }
};

// Завантаження даних з localStorage
function loadProfileData() {
    const savedData = localStorage.getItem('telegramProfile');
    if (savedData) {
        profileData = JSON.parse(savedData);
    }
    updateProfile();
}

// Оновлення профілю на сторінці
function updateProfile() {
    document.getElementById('name').textContent = profileData.name;
    document.getElementById('bio').textContent = profileData.bio;
    
    document.getElementById('followers').textContent = profileData.stats.followers;
    document.getElementById('posts').textContent = profileData.stats.posts;
    document.getElementById('rating').textContent = profileData.stats.rating;
    
    updateLinks();
}

// Оновлення посилань
function updateLinks() {
    const container = document.getElementById('links-container');
    container.innerHTML = '';
    
    profileData.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.className = "link-item";
        
        linkElement.innerHTML = `
            <div class="link-icon">
                <i class="${link.icon}"></i>
            </div>
            <span>${link.title}</span>
            <i class="fas fa-external-link-alt" style="margin-left: auto;"></i>
        `;
        
        container.appendChild(linkElement);
    });
}

// Додавання нового поля для посилання в редакторі
function addLinkField(title = '', url = '', icon = 'fas fa-link') {
    const editor = document.getElementById('linksEditor');
    const div = document.createElement('div');
    div.className = 'link-input-group';
    div.innerHTML = `
        <input type="text" class="link-title" placeholder="Назва посилання" value="${title}">
        <input type="url" class="link-url" placeholder="https://example.com" value="${url}">
        <select class="link-icon">
            <option value="fab fa-github" ${icon === 'fab fa-github' ? 'selected' : ''}>GitHub</option>
            <option value="fab fa-telegram" ${icon === 'fab fa-telegram' ? 'selected' : ''}>Telegram</option>
            <option value="fab fa-instagram" ${icon === 'fab fa-instagram' ? 'selected' : ''}>Instagram</option>
            <option value="fab fa-twitter" ${icon === 'fab fa-twitter' ? 'selected' : ''}>Twitter</option>
            <option value="fab fa-linkedin" ${icon === 'fab fa-linkedin' ? 'selected' : ''}>LinkedIn</option>
            <option value="fas fa-globe" ${icon === 'fas fa-globe' ? 'selected' : ''}>Сайт</option>
            <option value="fab fa-youtube" ${icon === 'fab fa-youtube' ? 'selected' : ''}>YouTube</option>
            <option value="fas fa-briefcase" ${icon === 'fas fa-briefcase' ? 'selected' : ''}>Портфоліо</option>
            <option value="fas fa-envelope" ${icon === 'fas fa-envelope' ? 'selected' : ''}>Email</option>
            <option value="fas fa-shopping-cart" ${icon === 'fas fa-shopping-cart' ? 'selected' : ''}>Магазин</option>
        </select>
        <button type="button" class="remove-link">
            <i class="fas fa-trash"></i>
        </button>
    `;
    editor.appendChild(div);
    
    // Додаємо обробник для кнопки видалення
    div.querySelector('.remove-link').addEventListener('click', function() {
        div.remove();
    });
}

// Заповнення форми редагування
function fillEditForm() {
    document.getElementById('editName').value = profileData.name;
    document.getElementById('editBio').value = profileData.bio;
    
    const linksEditor = document.getElementById('linksEditor');
    linksEditor.innerHTML = '';
    
    profileData.links.forEach(link => {
        addLinkField(link.title, link.url, link.icon);
    });
}

// Збереження змін
function saveProfile() {
    profileData.name = document.getElementById('editName').value;
    profileData.bio = document.getElementById('editBio').value;
    
    // Отримуємо посилання з форми
    const linkInputs = document.querySelectorAll('.link-input-group');
    profileData.links = [];
    
    linkInputs.forEach(input => {
        const title = input.querySelector('.link-title').value;
        const url = input.querySelector('.link-url').value;
        const icon = input.querySelector('.link-icon').value;
        
        if (title && url) {
            profileData.links.push({ title, url, icon });
        }
    });
    
    // Зберігаємо в localStorage
    localStorage.setItem('telegramProfile', JSON.stringify(profileData));
    
    // Оновлюємо профіль
    updateProfile();
    
    // Закриваємо модальне вікно
    document.getElementById('editModal').style.display = 'none';
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', function() {
    // Завантажуємо дані
    loadProfileData();
    
    // Кнопка редагування
    document.getElementById('editBtn').addEventListener('click', function() {
        fillEditForm();
        document.getElementById('editModal').style.display = 'flex';
    });
    
    // Кнопка додавання посилання
    document.getElementById('addLinkBtn').addEventListener('click', function() {
        addLinkField();
    });
    
    // Кнопка збереження
    document.getElementById('saveBtn').addEventListener('click', saveProfile);
    
    // Кнопка скасування
    document.getElementById('cancelBtn').addEventListener('click', function() {
        document.getElementById('editModal').style.display = 'none';
    });
    
    // Закриття модального вікна при кліку поза ним
    document.getElementById('editModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
    
    // Додаємо перші поля посилань, якщо немає
    if (profileData.links.length === 0) {
        addLinkField();
        addLinkField();
    }
});
