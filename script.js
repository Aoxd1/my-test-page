function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Carousel functionality
function goToSlide(dot, slideIndex) {
    const carousel = dot.closest('.project-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function nextSlide(button) {
    const carousel = button.closest('.project-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const currentSlide = carousel.querySelector('.carousel-slide.active');
    const currentIndex = Array.from(slides).indexOf(currentSlide);
    const nextIndex = (currentIndex + 1) % slides.length;
    
    goToSlide(dots[nextIndex], nextIndex);
}

function prevSlide(button) {
    const carousel = button.closest('.project-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const currentSlide = carousel.querySelector('.carousel-slide.active');
    const currentIndex = Array.from(slides).indexOf(currentSlide);
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    
    goToSlide(dots[prevIndex], prevIndex);
}

// Auto-slide functionality
function startAutoSlide() {
    const carousels = document.querySelectorAll('.project-carousel');
    carousels.forEach(carousel => {
        setInterval(() => {
            const nextButton = carousel.querySelector('.carousel-arrow.next');
            nextSlide(nextButton);
        }, 4000);
    });
}

// Filter functionality
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter projects
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category.includes(category)) {
            project.style.display = 'block';
            project.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
            project.style.display = 'none';
        }
    });
}

// Initialize auto-slide when page loads
window.addEventListener('load', startAutoSlide);

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Función para abrir el preview de imagen (similar al código de referencia)
function openPreview(previewId) {
    const preview = document.getElementById(previewId);
    preview.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

// Función para cerrar el preview
function closePreview(previewId) {
    const preview = document.getElementById(previewId);
    preview.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar preview al hacer clic fuera de la imagen
document.addEventListener('click', function(event) {
    const previews = document.querySelectorAll('.preview');
    previews.forEach(preview => {
        if (event.target === preview) {
            preview.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Cerrar preview con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const previews = document.querySelectorAll('.preview');
        previews.forEach(preview => {
            preview.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});