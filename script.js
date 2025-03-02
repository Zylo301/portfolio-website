// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Reveal sections on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Add dynamic year to footer
document.querySelector('footer p').innerHTML = 
  `© ${new Date().getFullYear()} Lean Mele - Portfolio`;

// Image Gallery Functionality
document.querySelectorAll('.gallery-image, .project-image').forEach(image => {
  image.addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    const modalImg = document.createElement('img');
    modalImg.src = this.src;
    
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', () => {
      modal.remove();
    });
  });
});

// Add this CSS for the modal
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// Theme Switcher
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        if (this.classList.contains('dark')) {
            document.querySelector('.interactive-demo').setAttribute('data-theme', 'dark');
        } else {
            document.querySelector('.interactive-demo').removeAttribute('data-theme');
        }
    });
});

// Add tilt effect to showcase cards
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Add link to download Fira Code font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink); 