/* ============================================
   GAME WORKS STUDIO™ - Blog System
   Loads posts from blog-posts.json
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();
});

async function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    try {
        const response = await fetch('js/blog-posts.json');
        const posts = await response.json();
        
        displayPosts(posts.slice(0, 6));
    } catch (error) {
        displayPlaceholderPosts();
    }
}

function displayPosts(posts) {
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = '';
    
    posts.forEach(post => {
        const card = createBlogCard(post);
        blogGrid.appendChild(card);
    });
    
    initScrollEffects();
}

function createBlogCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-card reveal';
    
    const date = new Date(post.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="blog-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-category">${post.category}</span>
                <span>${formattedDate}</span>
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="blog-post.html?id=${post.id}" class="blog-link hover-target">
                Read More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    `;
    
    return card;
}

function displayPlaceholderPosts() {
    const placeholderPosts = [
        {
            id: 1,
            title: 'Welcome to Our New Website',
            category: 'Announcement',
            date: '2026-09-10',
            image: 'img/blog/welcome.jpg',
            excerpt: 'We are excited to launch our new official website. Stay tuned for updates about our projects.'
        },
        {
            id: 2,
            title: 'Solar Flare - Development Update',
            category: 'Development',
            date: '2026-09-05',
            image: 'img/blog/solar-update.jpg',
            excerpt: 'Progress update on our animated series Solar Flare. New character designs and storyboards.'
        },
        {
            id: 3,
            title: 'Jolly Under Plex - Beta Testing',
            category: 'Release',
            date: '2026-08-28',
            image: 'img/blog/jolly-beta.jpg',
            excerpt: 'Beta testing for Jolly Under Plex is now open. Join our GameJolt community to participate.'
        }
    ];
    
    displayPosts(placeholderPosts);
}

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}