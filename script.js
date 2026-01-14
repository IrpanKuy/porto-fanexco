// Fanexco Landing Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    observer.observe(card);
  });

  // Observe portfolio cards
  document.querySelectorAll(".portfolio-card").forEach((card) => {
    observer.observe(card);
  });

  // Close modal when clicking outside
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay").forEach((modal) => {
        if (!modal.classList.contains("hidden")) {
          closeModal(modal.id);
        }
      });
    }
  });
});

// Open modal function
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";

    // Add animation
    setTimeout(() => {
      modal.querySelector(".modal-content").classList.add("modal-animate-in");
    }, 10);
  }
}

// Close modal function
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    const content = modal.querySelector(".modal-content");
    content.classList.remove("modal-animate-in");
    content.classList.add("modal-animate-out");

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      content.classList.remove("modal-animate-out");
      document.body.style.overflow = "";
    }, 200);
  }
}

// Add animation class styles dynamically
const style = document.createElement("style");
style.textContent = `
    .service-card,
    .portfolio-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate-in,
    .portfolio-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card:nth-child(1),
    .portfolio-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2),
    .portfolio-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3),
    .portfolio-card:nth-child(3) { transition-delay: 0.3s; }
    .portfolio-card:nth-child(4) { transition-delay: 0.1s; }
    .portfolio-card:nth-child(5) { transition-delay: 0.2s; }
    .portfolio-card:nth-child(6) { transition-delay: 0.3s; }

    .modal-content {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .modal-content.modal-animate-in {
        opacity: 1;
        transform: scale(1) translateY(0);
    }

    .modal-content.modal-animate-out {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
    }
`;
document.head.appendChild(style);
