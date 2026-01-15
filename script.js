/* =========================================================
   MOBILE NAVBAR + ACCORDIONS - CORREGIDO
   ========================================================= */

(function () {

  const MOBILE_BREAKPOINT = 768;
  const nav  = document.querySelector('.navbar');
  const menu = document.getElementById('navMenu');
  const btn  = document.querySelector('.mobile-toggle');

  if (!nav || !menu) return;

  /* ---------------------------------------------------------
     UTILIDADES
  --------------------------------------------------------- */

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function lockScroll(lock) {
    if (lock) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }

  function resetInnerSubmenus(scope) {
    if (!scope) return;

    scope.querySelectorAll('.dropdown-item.has-submenu').forEach(dd => {
      dd.classList.remove('has-open');

      const submenu = dd.querySelector('.submenu');
      const btn = dd.querySelector('.sub-toggle-below');

      if (submenu) {
        submenu.style.maxHeight = '0';
        submenu.style.opacity = '0';
        setTimeout(() => {
          if (!dd.classList.contains('has-open')) {
            submenu.style.display = '';
          }
        }, 300);
      }
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function closeAllNavItems() {
    menu.querySelectorAll('.nav-item.expanded').forEach(li => {
      li.classList.remove('expanded');

      const toggle = li.querySelector('.submenu-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '+';
      }

      const dropdown = li.querySelector('.dropdown');
      if (dropdown) {
        dropdown.style.display = 'none';
      }

      resetInnerSubmenus(li);
    });
  }

  /* ---------------------------------------------------------
     MOBILE MENU OPEN / CLOSE
  --------------------------------------------------------- */

  function openMenu() {
    document.body.classList.add('mobile-open');
    nav.classList.add('open');
    menu.classList.add('active');
    lockScroll(true);

    // Pequeño retraso para que los elementos estén renderizados
    setTimeout(() => {
      initNavAccordions();
      initSubmenuAccordions();
      initLinkClosers();
    }, 50);
  }

  function closeMenu() {
    document.body.classList.remove('mobile-open');
    nav.classList.remove('open');
    menu.classList.remove('active');
    lockScroll(false);

    closeAllNavItems();
  }

  // Exponer función global para el botón
  window.toggleMobileMenu = function () {
    document.body.classList.contains('mobile-open')
      ? closeMenu()
      : openMenu();
  };

  /* ---------------------------------------------------------
     NAV ITEM ACCORDIONS (.nav-item)
  --------------------------------------------------------- */

  function initNavAccordions() {
    if (!isMobile()) return;

    menu.querySelectorAll(':scope > .nav-item').forEach(li => {
      const dropdown = li.querySelector('.dropdown');
      if (!dropdown) return;

      // Verificar si ya está inicializado
      if (li.dataset.navInit === '1') return;
      li.dataset.navInit = '1';

      const link = li.querySelector('.nav-link');
      if (!link) return;

      // Crear botón toggle solo si no existe
      let toggle = li.querySelector('.submenu-toggle');
      if (!toggle) {
        toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'submenu-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '+';
        link.after(toggle);
      }

      // Remover listeners anteriores clonando el botón
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);
      toggle = newToggle;

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isOpening = !li.classList.contains('expanded');

        // Cerrar todos los demás nav-items
        menu.querySelectorAll('.nav-item.expanded').forEach(other => {
          if (other !== li) {
            other.classList.remove('expanded');

            const otherDropdown = other.querySelector('.dropdown');
            if (otherDropdown) {
              otherDropdown.style.display = 'none';
            }

            const t = other.querySelector('.submenu-toggle');
            if (t) {
              t.setAttribute('aria-expanded', 'false');
              t.innerHTML = '+';
            }

            resetInnerSubmenus(other);
          }
        });

        // Toggle del item actual
        if (isOpening) {
          li.classList.add('expanded');
          dropdown.style.display = 'block';
          toggle.setAttribute('aria-expanded', 'true');
          toggle.innerHTML = '-';
        } else {
          li.classList.remove('expanded');
          dropdown.style.display = 'none';
          toggle.setAttribute('aria-expanded', 'false');
          toggle.innerHTML = '+';
          resetInnerSubmenus(li);
        }
      });
    });
  }

  /* ---------------------------------------------------------
     INNER SUBMENUS (.dropdown-item.has-submenu)
  --------------------------------------------------------- */

  function initSubmenuAccordions() {
    if (!isMobile()) return;

    menu.querySelectorAll('.dropdown-item.has-submenu').forEach(dd => {
      // Verificar si ya está inicializado
      if (dd.dataset.subInit === '1') return;
      dd.dataset.subInit = '1';

      const submenu = dd.querySelector('.submenu');
      if (!submenu) return;

      // Crear botón toggle solo si no existe
      let btn = dd.querySelector('.sub-toggle-below');
      if (!btn) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'sub-toggle-below';
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span class="arrow">▾</span>';

        dd.insertBefore(btn, submenu);
      }

      // Estado inicial
      submenu.style.maxHeight = '0';
      submenu.style.opacity = '0';
      dd.classList.remove('has-open');

      // Remover listeners anteriores clonando el botón
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      btn = newBtn;

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isOpening = !dd.classList.contains('has-open');
        const parentDropdown = dd.closest('.dropdown');

        // Cerrar hermanos en el mismo nivel
        if (parentDropdown) {
          parentDropdown
            .querySelectorAll(':scope > .dropdown-item.has-submenu.has-open')
            .forEach(other => {
              if (other !== dd) {
                other.classList.remove('has-open');

                const sm = other.querySelector('.submenu');
                const b  = other.querySelector('.sub-toggle-below');
                
                if (sm) {
                  sm.style.maxHeight = '0';
                  sm.style.opacity = '0';
                }
                if (b) {
                  b.setAttribute('aria-expanded', 'false');
                }
              }
            });
        }

        // Toggle del submenu actual
        if (isOpening) {
          dd.classList.add('has-open');
          btn.setAttribute('aria-expanded', 'true');
          
          // Calcular altura real del contenido
          submenu.style.display = 'block';
          submenu.style.maxHeight = 'none';
          submenu.style.opacity = '1';
          const height = submenu.scrollHeight;
          submenu.style.maxHeight = '0';
          submenu.style.opacity = '0';
          
          // Forzar reflow
          submenu.offsetHeight;
          
          // Animar apertura
          requestAnimationFrame(() => {
            submenu.style.maxHeight = height + 'px';
            submenu.style.opacity = '1';
          });
        } else {
          dd.classList.remove('has-open');
          btn.setAttribute('aria-expanded', 'false');
          submenu.style.maxHeight = '0';
          submenu.style.opacity = '0';
          
          // Ocultar después de la animación
          setTimeout(() => {
            if (!dd.classList.contains('has-open')) {
              submenu.style.display = '';
            }
          }, 300);
        }
      });
    });
  }

  /* ---------------------------------------------------------
     EVENTOS GLOBALES
  --------------------------------------------------------- */

  // Cerrar con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('mobile-open')) {
      closeMenu();
    }
  });

  // Manejar cambio de tamaño de ventana
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!isMobile()) {
        closeMenu();
        // Limpiar inicializaciones
        menu.querySelectorAll('.nav-item').forEach(li => {
          li.dataset.navInit = '';
          const toggle = li.querySelector('.submenu-toggle');
          if (toggle) toggle.remove();
        });
        menu.querySelectorAll('.dropdown-item.has-submenu').forEach(dd => {
          dd.dataset.subInit = '';
          const btn = dd.querySelector('.sub-toggle-below');
          if (btn) btn.remove();
        });
      } else {
        // Re-inicializar si estamos en móvil
        initNavAccordions();
        initSubmenuAccordions();
        initLinkClosers();
      }
    }, 250);
  });

  /* ---------------------------------------------------------
     CERRAR MENÚ AL HACER CLIC EN ENLACES
  --------------------------------------------------------- */

  function initLinkClosers() {
    // Cerrar menú al hacer clic SOLO en enlaces <a> reales
    menu.querySelectorAll('a.dropdown-item, a.submenu-item').forEach(link => {
      // Evitar enlaces duplicados
      if (link.dataset.closerInit === '1') return;
      link.dataset.closerInit = '1';
      
      link.addEventListener('click', function(e) {
        // Pequeño delay para permitir que la navegación inicie
        setTimeout(() => {
          closeMenu();
        }, 150);
      });
    });

    // También cerrar al hacer clic en nav-links de páginas sin dropdown
    menu.querySelectorAll('.nav-item .nav-link').forEach(link => {
      if (link.dataset.closerInit === '1') return;
      
      const navItem = link.closest('.nav-item');
      const hasDropdown = navItem.querySelector('.dropdown');
      
      // Solo si NO tiene dropdown
      if (!hasDropdown) {
        link.dataset.closerInit = '1';
        link.addEventListener('click', function(e) {
          setTimeout(() => {
            closeMenu();
          }, 150);
        });
      }
    });
  }

  /* ---------------------------------------------------------
     INICIALIZACIÓN
  --------------------------------------------------------- */

  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (isMobile()) {
        initNavAccordions();
        initSubmenuAccordions();
        initLinkClosers();
      }
    });
  } else {
    if (isMobile()) {
      initNavAccordions();
      initSubmenuAccordions();
      initLinkClosers();
    }
  }

})();


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

/* Sticky header: activo sólo en escritorio (>768px) */
document.addEventListener('DOMContentLoaded', function() {
  const headerMain = document.querySelector('.header-main');
  const navbar = document.querySelector('.navbar');
  if (!headerMain || !navbar) return;

  let headerOffset = 0;
  let headerPlaceholder = null;
  let stickyEnabled = false;

  function createPlaceholder() {
    if (headerPlaceholder) return;
    headerPlaceholder = document.createElement('div');
    headerPlaceholder.className = 'header-placeholder';
    headerPlaceholder.style.display = 'none';
    headerMain.parentNode.insertBefore(
      headerPlaceholder,
      headerMain.nextSibling
    );
  }

  function removePlaceholder() {
    if (!headerPlaceholder) return;
    headerPlaceholder.remove();
    headerPlaceholder = null;
  }

  function updateMeasurements() {
    headerOffset = headerMain.offsetTop;

    if (headerPlaceholder) {
      headerPlaceholder.style.height =
        (headerMain.offsetHeight + navbar.offsetHeight) + 'px';
    }
  }

  function handleScroll() {
    if (!stickyEnabled) return;

    const y = window.pageYOffset || document.documentElement.scrollTop;

    if (y >= headerOffset) {
      headerMain.classList.add('fixed');
      navbar.classList.add('fixed');

      if (headerPlaceholder) headerPlaceholder.style.display = 'block';

      // solo escritorio usa top dinámico
      navbar.style.top = headerMain.offsetHeight + 'px';
    } else {
      headerMain.classList.remove('fixed');
      navbar.classList.remove('fixed');

      if (headerPlaceholder) headerPlaceholder.style.display = 'none';
      navbar.style.top = '';
    }
  }

  function enableSticky() {
    if (stickyEnabled) return;

    createPlaceholder();
    updateMeasurements();

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    stickyEnabled = true;
  }

  function disableSticky() {
    if (!stickyEnabled) return;

    // limpiar clases
    headerMain.classList.remove('fixed');
    navbar.classList.remove('fixed');

    // limpiar estilos inline que rompen el drawer
    navbar.style.top = '';

    // quitar placeholder
    removePlaceholder();

    window.removeEventListener('scroll', handleScroll);
    stickyEnabled = false;
  }

  function evaluateMode() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      disableSticky();   // 🔴 móvil: sticky OFF
    } else {
      enableSticky();    // 🟢 escritorio: sticky ON
    }
  }

  // inicial
  evaluateMode();

  // resize
  window.addEventListener('resize', function() {
    if (stickyEnabled) updateMeasurements();
    evaluateMode();
  });
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
