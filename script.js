gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    end: "+=1500",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    pinSpacing: false,
  },
});

// Animate .hero-title h1
tl.to(
  ".hero-title h1",
  {
    scale: 1.5,
    y: -100,
    letterSpacing: "1.5rem",
    opacity: 0.3,
  },
  0
);

// Animate .left text block
tl.to(
  ".left",
  {
    opacity: 0.3,
  },
  0
);

// Animate .right image block
tl.to(
  ".right",
  {
    opacity: 0.3,
  },
  0
);

// Navbar visibility animation
gsap.to(".navbar", {
  scrollTrigger: {
    trigger: ".main",
    start: "top bottom",
    end: "bottom top",
    toggleActions: "play reverse play reverse",
    scrub: false,
  },
  opacity: 1,
  y: 0,
  duration: 1,
});

// gsap.to(".navbar", {
//   scrollTrigger: {
//     trigger: ".hero-section",
//     start: "top top",
//     end: "bottom top",
//     toggleActions: "play reverse play reverse",
//     scrub: false,
//   },
//   opacity: 0,
//   y: -50,
//   duration: 0.3,
// });


document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Create floating dots
function createFloatingDots() {
  const containers = document.querySelectorAll(".floating-elements");
  containers.forEach((container) => {
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement("div");
      dot.className = "floating-dot";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      container.appendChild(dot);

      gsap.to(dot, {
        y: -30,
        x: Math.random() * 50 - 25,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }
  });
}

// Create floating elements for what-we-do section
function createFloatingElements() {
  const container = document.querySelector(".what-we-do .floating-elements");
  if (!container) return;

  // Create dots
  for (let i = 0; i < 15; i++) {
    const dot = document.createElement("div");
    dot.className = "floating-dot";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";
    container.appendChild(dot);

    gsap.to(dot, {
      y: -40,
      x: Math.random() * 60 - 30,
      duration: 4 + Math.random() * 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 3,
    });
  }

  // Create shapes
  for (let i = 0; i < 8; i++) {
    const shape = document.createElement("div");
    shape.className = "floating-shape";
    shape.style.left = Math.random() * 100 + "%";
    shape.style.top = Math.random() * 100 + "%";
    container.appendChild(shape);

    gsap.to(shape, {
      rotation: 360,
      duration: 15 + Math.random() * 10,
      repeat: -1,
      ease: "none",
    });

    gsap.to(shape, {
      y: -20,
      x: Math.random() * 40 - 20,
      duration: 6 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 2,
    });
  }
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("35wnY9blcxEO2DuN2");

  // Handle form submission
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitButton = contactForm.querySelector("button[type='submit']");
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      const formData = {
        name: contactForm.querySelector("#name").value,
        email: contactForm.querySelector("#email").value,
        subject: contactForm.querySelector("#subject").value,
        message: contactForm.querySelector("#message").value,
      };
      emailjs.send("service_lyiwoov", "template_3ezyo3b", formData).then(
        function (response) {
          formMessage.style.display = "block";
          formMessage.style.color = "green";
          formMessage.textContent = "Message sent successfully!";
          contactForm.reset();
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
          setTimeout(() => {
            formMessage.style.display = "none";
          }, 5000);
        },
        function (error) {
          console.error("EmailJS error:", error);
          formMessage.style.display = "block";
          formMessage.style.color = "red";
          formMessage.textContent = `Failed to send message: ${error.text || "Unknown error (check console)"}`;
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
          setTimeout(() => {
            formMessage.style.display = "none";
          }, 5000);
        }
      );
    });
  }

  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("mobile-active");
      navLinks.classList.toggle("visible");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("mobile-active");
        navLinks.classList.remove("visible");
      });
    });
  }

  createFloatingDots();
  createFloatingElements();

  // Section title animation
  gsap.to(".section-title", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section-header",
      start: "top 80%",
    },
  });

  // Section subtitle animation
  gsap.to(".section-subtitle", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section-header",
      start: "top 80%",
    },
  });

  // Content text animation
  gsap.to(".content-text", {
    opacity: 1,
    x: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".content-grid",
      start: "top 70%",
    },
  });

  document.querySelectorAll('.card').forEach((card, index) => {
    gsap.to(card, {
      rotate: 0,
      scale: 1,
      scrollTrigger: {
        trigger: card,
        start: 'top center+=100',
        end: '+=1000',
        scrub: true,
      }
    });
  });

  // Process title animation
  gsap.to(".process-title", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".process-section",
      start: "top 80%",
    },
  });

  // Process steps animation
  gsap.to(".process-step", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".process-steps",
      start: "top 70%",
    },
  });

  // CTA section animation
  gsap.to(".cta-section", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top 80%",
    },
  });

  // Parallax effect for floating elements in what-we-do section
  gsap.to(".what-we-do .floating-elements", {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: ".what-we-do",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  // Parallax effect for floating elements in our-works section
  gsap.to(".our-works .floating-elements", {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: ".our-works",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  // Work cards animation
  gsap.to(".work-card", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".works-grid",
      start: "top 70%",
    },
  });
});