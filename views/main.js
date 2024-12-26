// Script detecting if app is running on Desktop or Mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Scripts for open/close modal
function showModal() {
  const modal = document.getElementById("exit-modal");
  modal.classList.add("visible");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("exit-modal");
  modal.classList.remove("visible");
  modal.style.display = "none";
}

// Detection to start modal appearance on Desktop
document.addEventListener("mousemove", (event) => {
  const modal = document.getElementById("exit-modal");

  if (!isMobile()) { 
      const isTopRightCorner = event.clientY < 50 && window.innerWidth - event.clientX < 50;
      if (isTopRightCorner && !modal.classList.contains("visible")) {
          showModal();
      }
  }
});

// Detection to start modal appearance on Mobile on scrool
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const modal = document.getElementById("exit-modal");
  const currentScroll = window.scrollY;

  if (isMobile() && currentScroll < lastScrollTop && currentScroll < 100 && !modal.classList.contains("visible")) {
      showModal();
  }
  lastScrollTop = currentScroll;
});

// Detection to start modal appearance on Mobile on inactivity
let inactivityTimeout;
function resetTimer() {
  clearTimeout(inactivityTimeout);
  if (isMobile()) {
      inactivityTimeout = setTimeout(() => {
          showModal();
      }, 60000);  // 60 secondes d'inactivité
  }
}

// Timer reset in case of interaction on Mobile
document.addEventListener("mousemove", resetTimer);
document.addEventListener("scroll", resetTimer);
document.addEventListener("touchmove", resetTimer);
document.addEventListener("keydown", resetTimer);

// Launch the timer as soon as the page loads
resetTimer();

// Close the modal by clicking outside
document.addEventListener("click", (event) => {
  const modal = document.getElementById("exit-modal");
  const modalContent = document.querySelector("#exit-modal .modal-content");

  if (modal.classList.contains("visible") && !modalContent.contains(event.target)) {
      closeModal();
  }
});

// Script to display logos of clients
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
    imgElement.classList.add("fade-in");
    imgElement.loading = "lazy";

    logosContainer.appendChild(imgElement);
  });
});

// Adding classs for animation for the testimonials section
const triggerAnimationsOnScroll = () => {
  const rootElement = document.querySelector('#root');
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const testimonialDetails = document.querySelectorAll('.testimonial-details');

  const rootTop = rootElement.getBoundingClientRect().top;
  const rootBottom = rootElement.getBoundingClientRect().bottom;

  if (rootTop < window.innerHeight && rootBottom >= 0) {
    testimonialItems.forEach((item) => {
      item.classList.add('fade-in-bubble');
    });
    testimonialDetails.forEach((detail) => {
      detail.classList.add('fade-in-details');
    });
  }
};
window.addEventListener('scroll', triggerAnimationsOnScroll);
window.addEventListener('resize', triggerAnimationsOnScroll);

// Scripts for open/close burger menu
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

// Close the menu by clicking outside
window.addEventListener('click', (e) => {
  if (!burgerIcon.contains(e.target) && !mobileMenu.contains(e.target)) {
    burgerIcon.classList.remove('open');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});