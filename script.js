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

// Función para abrir el preview de imagen
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

// Script para hacer el header-main y navbar sticky
document.addEventListener('DOMContentLoaded', function() {
    const headerMain = document.querySelector('.header-main');
    const navbar = document.querySelector('.navbar');
    
    // Guardar la posición inicial del header-main
    const headerOffset = headerMain.offsetTop;
    
    // Crear placeholders para evitar saltos en el contenido
    const headerPlaceholder = document.createElement('div');
    headerPlaceholder.className = 'header-placeholder';
    headerPlaceholder.style.height = (headerMain.offsetHeight + navbar.offsetHeight) + 'px';
    headerMain.parentNode.insertBefore(headerPlaceholder, headerMain.nextSibling);
    
    function handleScroll() {
        const headerHeight = headerMain.offsetHeight;
        
        if (window.pageYOffset >= headerOffset) {
            // Activar modo fixed
            headerMain.classList.add('fixed');
            navbar.classList.add('fixed');
            headerPlaceholder.classList.add('active');
            
            // Ajustar la posición del navbar debajo del header
            navbar.style.top = headerMain.offsetHeight + 'px';
        } else {
            // Desactivar modo fixed
            headerMain.classList.remove('fixed');
            navbar.classList.remove('fixed');
            headerPlaceholder.classList.remove('active');
            navbar.style.top = '0';
        }
    }
    
    // Ejecutar inmediatamente al cargar la página
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
});

// Boton para subir
window.onscroll = function() {
    var scrollBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    var scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        scrollBtn.addEventListener('click', scrollToTop);
    }
});

// Inicializar Swiper
var swiper = new Swiper(".mySwiper-1", {
    direction: "horizontal",
    loop: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    autoplay: {
        delay: 4000
    },

    pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
    }
});

// Función para inicializar Swiper con la dirección correcta
function initSwiper() {
    var swiper = new Swiper(".mySwiper-3", {
        direction: window.innerWidth <= 768 ? "horizontal" : "vertical", // Cambiar la dirección según el tamaño de la pantalla
        loop: true,
        autoplay: {
            delay: 7000, // 7 segundos de intervalo
        },
        slidesPerView: 1, // Solo muestra una imagen a la vez
        spaceBetween: 0, // Sin espacio entre las slides
        pagination: {
            el: ".swiper-pagination",
            type: "bullets", // Paginación en forma de puntos
            clickable: true,
        },
    });

    return swiper;
}

// Inicializa el Swiper al cargar la página
var swiper = initSwiper();

// Actualiza la configuración del Swiper al cambiar el tamaño de la ventana
window.addEventListener('resize', function () {
    swiper.destroy(true, true); // Destruye el Swiper actual
    swiper = initSwiper(); // Reinicializa el Swiper con la nueva configuración
});

// Boton para subir
// Mostrar el botón después de desplazarse una cierta cantidad de píxeles (300px en este caso)
window.onscroll = function() {
    var scrollBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollBtn.style.display = "flex";  // Muestra el botón
    } else {
        scrollBtn.style.display = "none";  // Oculta el botón
    }
};

// Función para desplazarse hacia arriba
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
