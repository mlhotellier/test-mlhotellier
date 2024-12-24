// scripts for modal
function isMobile() {
  return window.innerWidth <= 768;
}

// Show modal
function showModal() {
  const modal = document.getElementById("exit-modal");
  modal.classList.add("visible");
  modal.style.display = "flex";
}

// Hide modal
function closeModal() {
  const modal = document.getElementById("exit-modal");
  modal.classList.remove("visible");
  modal.style.display = "none";
}

// Desktop : Détection de la souris dans le coin supérieur droit
document.addEventListener("mousemove", (event) => {
  const modal = document.getElementById("exit-modal");

  if (!isMobile()) { 
      const isTopRightCorner = event.clientY < 50 && window.innerWidth - event.clientX < 50;
      if (isTopRightCorner && !modal.classList.contains("visible")) {
          showModal();
      }
  }
});

let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const modal = document.getElementById("exit-modal");
  const currentScroll = window.scrollY;

  if (isMobile() && currentScroll < lastScrollTop && currentScroll < 100 && !modal.classList.contains("visible")) {
      showModal();
  }
  lastScrollTop = currentScroll;
});

let inactivityTimeout;
function resetTimer() {
  clearTimeout(inactivityTimeout);
  if (isMobile()) {
      inactivityTimeout = setTimeout(() => {
          showModal();
      }, 60000);  // 60 secondes d'inactivité
  }
}

// Réinitialisation du timer en cas d'interaction (mobile)
document.addEventListener("mousemove", resetTimer);
document.addEventListener("scroll", resetTimer);
document.addEventListener("touchmove", resetTimer);
document.addEventListener("keydown", resetTimer);

// Lancement du timer dès le chargement de la page
resetTimer();

// Fermer la modale en cliquant à l'extérieur
document.addEventListener("click", (event) => {
  const modal = document.getElementById("exit-modal");
  const modalContent = document.querySelector("#exit-modal .modal-content");

  if (modal.classList.contains("visible") && !modalContent.contains(event.target)) {
      closeModal();
  }
});

// script pour client section
document.addEventListener("DOMContentLoaded", function () {
  const logosContainer = document.getElementById("clients-logos-container");

  const clients = [
    { logo: "Airbnb.svg", name: "Airbnb" },
    { logo: "Google.svg", name: "Google" },
    { logo: "BookMyShow.svg", name: "BookMyShow" },
    { logo: "OYO.svg", name: "OYO" },
    { logo: "Amazon.svg", name: "Amazon" },
    { logo: "Microsoft.svg", name: "Microsoft" },
    { logo: "FedEx.svg", name: "FedEx" },
    { logo: "Walmart.svg", name: "Walmart" },
    { logo: "OLA.svg", name: "OLA" },
    { logo: "Hubspot.svg", name: "Hubspot" },
    { logo: "Gatsby.svg", name: "Gatsby" },
    { logo: "Strapi.svg", name: "Strapi" },
    { logo: "Atlassian.svg", name: "Atlassian" },
    { logo: "Servicenow.svg", name: "Servicenow" },
    { logo: "Grubhub.svg", name: "Grubhub" },
  ];

  clients.forEach((client) => {
    const imgElement = document.createElement("img");
    imgElement.src = `/static/clients_logos/${client.logo}`;
    imgElement.alt = `Logo ${client.name}`;
    imgElement.classList.add("client-logo");

    logosContainer.appendChild(imgElement);
  });
});

// Animation pour la section testimonials
const triggerAnimationsOnScroll = () => {
  const rootElement = document.querySelector('#root');
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const testimonialDetails = document.querySelectorAll('.testimonial-details');

  // Vérification si #root est visible dans la fenêtre
  const rootTop = rootElement.getBoundingClientRect().top;
  const rootBottom = rootElement.getBoundingClientRect().bottom;

  if (rootTop < window.innerHeight && rootBottom >= 0) {
    // Ajouter la classe d'animation à tous les éléments .testimonial-item
    testimonialItems.forEach((item) => {
      item.classList.add('fade-in-bubble');
    });

    // Ajouter la classe d'animation à tous les éléments .testimonial-details
    testimonialDetails.forEach((detail) => {
      detail.classList.add('fade-in-details');
    });

    // On n'a plus besoin de vérifier l'élément une fois qu'il est visible
    window.removeEventListener('scroll', triggerAnimationsOnScroll);
  }
};
window.addEventListener('scroll', triggerAnimationsOnScroll);
window.addEventListener('resize', triggerAnimationsOnScroll);

// burger menu 
const burgerIcon = document.querySelector('.burger-icon');
const mobileMenu = document.querySelector('.menu-mobile');
const overlay = document.querySelector('.overlay');

burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('open');
  mobileMenu.classList.toggle('active');
  overlay.classList.toggle('active');

  if (mobileMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Ferme le menu en cliquant à l'extérieur
window.addEventListener('click', (e) => {
  if (!burgerIcon.contains(e.target) && !mobileMenu.contains(e.target)) {
    burgerIcon.classList.remove('open');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});