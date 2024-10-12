document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const imageItems = document.querySelectorAll('.image-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxImage = document.querySelector('.lightbox-image');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    const closeButton = document.querySelector('.lightbox-close');
    const navLinks = document.querySelectorAll('nav a');

    let currentImageIndex = 0;
    let visibleImages = [];

    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            visibleImages = Array.from(imageItems).filter(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    return true;
                } else {
                    item.style.display = 'none';
                    return false;
                }
            });

            window.dispatchEvent(new Event('resize'));
        });
    });

    // Lightbox functionality
    imageItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = visibleImages.indexOf(item);
            updateLightboxImage();
            lightbox.style.display = 'block';
        });
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    closeButton.addEventListener('click', closeLightbox);

    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        updateLightboxImage();
    });

    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        updateLightboxImage();
    });

    function updateLightboxImage() {
        const currentImage = visibleImages[currentImageIndex].querySelector('img');
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
    }

    // Initialize visibleImages
    visibleImages = Array.from(imageItems);
});