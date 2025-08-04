// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    // Close mobile menu if open
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('active');
    document.querySelector('.hamburger i').classList.remove('fa-times');
    document.querySelector('.hamburger i').classList.add('fa-bars');
  });
});

// Fade-in animation
const sections = document.querySelectorAll('.content-section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
}, { threshold: 0.1 });

// Function to check if an element is at least partially in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  return (
      rect.top < windowHeight && // Top is above the bottom of the viewport
      rect.bottom > 0 && // Bottom is below the top of the viewport
      rect.left < windowWidth && // Left is before the right edge
      rect.right > 0 // Right is after the left edge
  );
}

// Observe sections and ensure initial visibility
let hasVisibleSection = false;
sections.forEach((section, index) => {
  // Check if section is at least partially in viewport on load
  if (isInViewport(section)) {
      section.classList.add('visible');
      hasVisibleSection = true;
  } else {
      observer.observe(section);
  }
});

// Fallback: If no sections are initially visible, make the first one visible
if (!hasVisibleSection && sections.length > 0) {
  sections[0].classList.add('visible');
}

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});