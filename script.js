// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations and interactions
  initCursorFollower()
  initScrollReveal()
  initThemeToggle()
  initSkillBars()
  initTiltEffect()
  initProjectModals()
  initContactForm()

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear()

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
})

// Custom cursor follower
function initCursorFollower() {
  const cursor = document.querySelector(".cursor-follower")
  if (!cursor) return

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  })

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .project-card, .skill-category, input, textarea")

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "50px"
      cursor.style.height = "50px"
      cursor.style.background = "rgba(37, 99, 235, 0.1)"
    })

    el.addEventListener("mouseleave", () => {
      cursor.style.width = "30px"
      cursor.style.height = "30px"
      cursor.style.background = "rgba(37, 99, 235, 0.2)"
    })
  })
}

// Reveal elements on scroll
function initScrollReveal() {
  const sections = document.querySelectorAll("section")
  const skillItems = document.querySelectorAll(".skill-item")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // If it's the skills section, animate the skill bars
        if (entry.target.id === "kenntnisse") {
          animateSkillBars()
        }
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    sectionObserver.observe(section)
  })
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle")

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add("dark")
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")

    // Save theme preference
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
  })
}

// Animate skill bars
function initSkillBars() {
  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item) => {
    const level = item.getAttribute("data-level")
    const progressBar = item.querySelector(".skill-progress")

    if (progressBar) {
      progressBar.style.width = "0%"
    }
  })
}

function animateSkillBars() {
  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item, index) => {
    const level = item.getAttribute("data-level")
    const progressBar = item.querySelector(".skill-progress")

    if (progressBar) {
      setTimeout(() => {
        progressBar.style.width = level + "%"
      }, index * 100)
    }
  })
}

// Tilt effect for cards
function initTiltEffect() {
  const tiltElements = document.querySelectorAll("[data-tilt]")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
    })
  })
}

// Project modals
function initProjectModals() {
  const modal = document.getElementById("project-modal")
  const modalBody = modal.querySelector(".modal-body")
  const modalClose = modal.querySelector(".modal-close")
  const detailButtons = document.querySelectorAll(".btn-details")

  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const projectId = button.getAttribute("data-project")
      const template = document.getElementById(`${projectId}-details`)

      if (template) {
        modalBody.innerHTML = ""
        modalBody.appendChild(template.content.cloneNode(true))
        modal.classList.add("active")
        document.body.style.overflow = "hidden"

        // Initialize gallery thumbnails if they exist
        initGalleryThumbnails()
      }
    })
  })

  modalClose.addEventListener("click", closeModal)

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  function closeModal() {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }

  function initGalleryThumbnails() {
    const thumbnails = document.querySelectorAll(".gallery-thumbnails img")
    const mainImage = document.querySelector(".gallery-main")

    if (thumbnails.length && mainImage) {
      thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", () => {
          mainImage.src = thumb.src
          mainImage.alt = thumb.alt
        })
      })
    }
  }
}

// Contact form
function initContactForm() {
  const form = document.getElementById("contact-form")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = form.querySelector("#name").value
      const email = form.querySelector("#email").value
      const message = form.querySelector("#message").value

      // Simple validation
      if (!name || !email || !message) {
        alert("Bitte füllen Sie alle Felder aus.")
        return
      }

      // Simulate form submission
      const submitButton = form.querySelector('button[type="submit"]')
      submitButton.disabled = true
      submitButton.textContent = "Wird gesendet..."

      setTimeout(() => {
        alert("Vielen Dank für Ihre Nachricht! Ich werde mich so schnell wie möglich bei Ihnen melden.")
        form.reset()
        submitButton.disabled = false
        submitButton.textContent = "Nachricht senden"
      }, 1500)
    })
  }
}

// Add dopamine-triggering micro-interactions
document.addEventListener("DOMContentLoaded", () => {
  // Add confetti effect on project card clicks
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Only trigger if not clicking on the details button
      if (!e.target.classList.contains("btn-details")) {
        createConfetti(e.clientX, e.clientY)
      }
    })
  })

  // Add success animation to contact form
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validate form
      const name = contactForm.querySelector("#name").value
      const email = contactForm.querySelector("#email").value
      const message = contactForm.querySelector("#message").value

      if (name && email && message) {
        // Show success animation
        const button = contactForm.querySelector('button[type="submit"]')
        button.innerHTML = '<span class="success-icon">✓</span> Gesendet!'
        button.classList.add("success")

        // Reset form after delay
        setTimeout(() => {
          contactForm.reset()
          button.innerHTML = "Nachricht senden"
          button.classList.remove("success")
        }, 3000)
      }
    })
  }
})

// Create confetti effect
function createConfetti(x, y) {
  const colors = ["#2563eb", "#10b981", "#8b5cf6", "#f59e0b"]

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div")
    confetti.className = "confetti"
    confetti.style.left = x + "px"
    confetti.style.top = y + "px"
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`

    document.body.appendChild(confetti)

    // Animate confetti
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 100 + 50
    const destinationX = x + Math.cos(angle) * distance
    const destinationY = y + Math.sin(angle) * distance

    confetti.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(${destinationX - x}px, ${destinationY - y}px) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000 + Math.random() * 1000,
        easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
      },
    ).onfinish = () => {
      confetti.remove()
    }
  }
}

// Add this CSS for the confetti
const style = document.createElement("style")
style.textContent = `
  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    pointer-events: none;
    z-index: 9999;
  }
  
  .success-icon {
    display: inline-block;
    animation: pulse 0.5s ease-in-out;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
  }
  
  .btn.success {
    background-color: var(--secondary);
  }
`
document.head.appendChild(style)

// Add this CSS for the modal
const style2 = document.createElement("style")
style2.textContent = `
  .image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
  }
  
  .image-modal img {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
  }

  .project-image {
    cursor: pointer;
  }
`
document.head.appendChild(style2)

// Theme Switcher - This part is now handled by initThemeToggle()
// document.querySelectorAll('.theme-btn').forEach(btn => {
//     btn.addEventListener('click', function() {
//         document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
//         this.classList.add('active');

//         if (this.classList.contains('dark')) {
//             document.querySelector('.interactive-demo').setAttribute('data-theme', 'dark');
//         } else {
//             document.querySelector('.interactive-demo').removeAttribute('data-theme');
//         }
//     });
// });

// Add link to download Fira Code font
const fontLink = document.createElement("link")
fontLink.href = "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
fontLink.rel = "stylesheet"
document.head.appendChild(fontLink)

// Image Gallery Functionality - This is now handled by initProjectModals()
// document.querySelectorAll('.gallery-image, .project-image').forEach(image => {
//   image.addEventListener('click', function() {
//     const modal = document.createElement('div');
//     modal.className = 'image-modal';

//     const modalImg = document.createElement('img');
//     modalImg.src = this.src;

//     modal.appendChild(modalImg);
//     document.body.appendChild(modal);

//     modal.addEventListener('click', () => {
//       modal.remove();
//     });
//   });
// });

// Animate skill bars when they come into view
const observeSkills = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.querySelector('.skill-progress').style.width = `${level}%`;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(skill => {
        observer.observe(skill);
    });
};

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', observeSkills);

