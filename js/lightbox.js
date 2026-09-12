/* ============================================
   GAME WORKS STUDIO™ - Video Lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initVideoLightbox();
});

function initVideoLightbox() {
    const lightbox = document.getElementById('videoLightbox');
    const iframe = document.getElementById('lightboxIframe');
    const closeBtn = document.getElementById('lightboxClose');
    const backdrop = document.getElementById('lightboxBackdrop');
    const triggers = document.querySelectorAll('.video-trigger');
    
    if (!lightbox || !iframe) return;
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const videoId = trigger.getAttribute('data-video');
            if (videoId && videoId !== 'YOUTUBE_VIDEO_ID_X') {
                openLightbox(videoId);
            }
        });
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function openLightbox(videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        
        iframe.src = embedUrl;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            lightbox.querySelector('.lightbox-content').style.transform = 'scale(1)';
        }, 10);
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            iframe.src = '';
        }, 300);
    }
}

/* Helper function to extract YouTube video ID from URL */
function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

/* 
   INSTRUCTIONS FOR ADDING VIDEOS:
   
   1. Get the YouTube video ID from the URL:
      Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
      Video ID: dQw4w9WgXcQ
   
   2. Add the video ID to any element with class "video-trigger":
      <button class="video-trigger" data-video="dQw4w9WgXcQ">
   
   3. The lightbox will automatically load the video when clicked.
*/