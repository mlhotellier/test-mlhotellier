// scripts for modal
document.addEventListener("mousemove", (event) => {
    const modal = document.getElementById("exit-modal");
  
    // Détecter le coin supérieur droit (exemple: moins de 50px du haut et 50px du bord droit)
    const isTopRightCorner =
      event.clientY < 50 && window.innerWidth - event.clientX < 50;
  
    if (isTopRightCorner && !modal.classList.contains("visible")) {
      showModal();
    }
  });
  
  // Fonction pour afficher la modale
  function showModal() {
    const modal = document.getElementById("exit-modal");
    modal.classList.add("visible");
    modal.style.display = "flex";
  }
  
  // Fonction pour fermer la modale
  function closeModal() {
    const modal = document.getElementById("exit-modal");
    modal.classList.remove("visible");
    modal.style.display = "none";
  }
  
  // Fermer la modale si l'utilisateur clique en dehors
  document.addEventListener("click", (event) => {
    const modal = document.getElementById("exit-modal");
    const modalContent = document.querySelector("#exit-modal .modal-content");
  
    if (
      modal.classList.contains("visible") && 
      !modalContent.contains(event.target)
    ) {
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
    testimonialItems.forEach((item, index) => {
      item.classList.add('fade-in-bubble');
    });

    // Ajouter la classe d'animation à tous les éléments .testimonial-details
    testimonialDetails.forEach((detail, index) => {
      detail.classList.add('fade-in-details');
    });

    // On n'a plus besoin de vérifier l'élément une fois qu'il est visible
    window.removeEventListener('scroll', triggerAnimationsOnScroll);
  }
};
window.addEventListener('scroll', triggerAnimationsOnScroll);

