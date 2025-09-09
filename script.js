// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector("header");

  // Function to handle scroll
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.remove("transparent");
      header.classList.add("scrolled");
    } else {
      header.classList.add("transparent");
      header.classList.remove("scrolled");
    }
  }

  // Initial call to set correct state
  handleScroll();

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = themeToggle.querySelector("i");

  // Check if there's a saved theme preference in localStorage
  const savedTheme = localStorage.getItem("theme");

  // Apply saved theme if it exists
  if (savedTheme) {
    body.classList.remove("dark-theme", "light-theme");
    body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);
  } else {
    // Default to dark theme if no saved preference
    body.classList.add("dark-theme");
    updateThemeIcon("dark-theme");
  }

  // Toggle theme when the button is clicked
  themeToggle.addEventListener("click", () => {
    // Check current theme
    if (body.classList.contains("dark-theme")) {
      // Switch to light theme
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      localStorage.setItem("theme", "light-theme");
      updateThemeIcon("light-theme");
    } else {
      // Switch to dark theme
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark-theme");
      updateThemeIcon("dark-theme");
    }
  });

  // Function to update the theme icon based on current theme
  function updateThemeIcon(theme) {
    if (theme === "light-theme") {
      themeIcon.className = "fas fa-moon";
    } else {
      themeIcon.className = "fas fa-sun";
    }
  }

  // Dropdown menu functionality
  const dropdown = document.querySelector(".dropdown");
  dropdown.addEventListener("click", function () {
    this.classList.toggle("active");
  });

  // Back to top button functionality
  const backToTopButton = document.querySelector(".back-to-top");

  // Show/hide back to top button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  // Scroll to top when back to top button is clicked
  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add animation to progress bars when they come into view
  const progressBars = document.querySelectorAll(".progress-bar");
  const animateProgressBars = () => {
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = true;
      // const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0

      if (isVisible) {
        const width = bar.style.width;
        console.log(width);
        
        bar.style.width = width;
        // setTimeout(() => {
        //   bar.style.width = width
        // }, 100)
      }
    });
  };

  // Portfolio Maker functionality
  initializePortfolioMaker();
  // Run once on page load
  animateProgressBars();

  // Add scroll event for animation
  window.addEventListener("scroll", animateProgressBars);
});

// Typing effect - separate from DOM loaded event
const typingText = document.getElementById("typing-text");
const phrases = ["Freelancer", "Web Designer", "Web Developer", "Photographer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    // Deleting text
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50; // Faster when deleting
  } else {
    // Typing text
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100; // Normal speed when typing
  }

  // If word is complete, start deleting after a pause
  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 1000; // Pause at the end of the word
  }
  // If deletion is complete, move to next word
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500; // Pause before starting new word
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start the typing effect
setTimeout(typeEffect, 1000);

// Portfolio Maker Functions
function initializePortfolioMaker() {
  const portfolioMaker = document.getElementById("portfolio-maker");
  const openMakerBtn = document.getElementById("open-maker");
  const toggleMakerBtn = document.getElementById("toggle-maker");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Open/Close portfolio maker
  openMakerBtn.addEventListener("click", () => {
    portfolioMaker.classList.add("active");
    openMakerBtn.classList.add("hidden");
  });

  toggleMakerBtn.addEventListener("click", () => {
    portfolioMaker.classList.remove("active");
    openMakerBtn.classList.remove("hidden");
  });

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab;
      
      // Remove active class from all tabs and contents
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));
      
      // Add active class to clicked tab and corresponding content
      btn.classList.add("active");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });
}

// Initialize portfolio maker with current content
function initializePortfolioMaker() {
  // Initialize services
  initializeServices();
  
  // Initialize skills
  initializeSkills();
  
  // Initialize portfolio items
  initializePortfolioItems();
}

// Services Management
function initializeServices() {
  const servicesList = document.getElementById("services-list");
  const services = [
    {
      icon: "fas fa-code",
      title: "Web Development",
      description: "Building responsive and functional websites using the latest technologies."
    },
    {
      icon: "fas fa-mobile-alt",
      title: "App Development", 
      description: "Developing cross-platform mobile applications with seamless functionality."
    },
    {
      icon: "fas fa-camera",
      title: "Photography",
      description: "Capturing high-quality images for various commercial and personal projects."
    }
  ];
  
  services.forEach((service, index) => {
    addServiceToForm(service, index);
  });
}

function addService() {
  const service = {
    icon: "fas fa-star",
    title: "New Service",
    description: "Service description here..."
  };
  const index = document.querySelectorAll(".service-item").length;
  addServiceToForm(service, index);
}

function addServiceToForm(service, index) {
  const servicesList = document.getElementById("services-list");
  const serviceDiv = document.createElement("div");
  serviceDiv.className = "service-item";
  serviceDiv.innerHTML = `
    <button class="remove-btn" onclick="removeService(this)">×</button>
    <div class="form-group">
      <label>Icon Class</label>
      <input type="text" value="${service.icon}" data-field="icon" data-index="${index}">
    </div>
    <div class="form-group">
      <label>Service Title</label>
      <input type="text" value="${service.title}" data-field="title" data-index="${index}">
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea rows="3" data-field="description" data-index="${index}">${service.description}</textarea>
    </div>
  `;
  servicesList.appendChild(serviceDiv);
}

function removeService(btn) {
  btn.parentElement.remove();
}

// Skills Management
function initializeSkills() {
  const skillsList = document.getElementById("skills-list");
  const skills = [
    { name: "UI/UX Design", percentage: 95 },
    { name: "Ideas & Technology", percentage: 90 },
    { name: "Branding Design", percentage: 80 },
    { name: "Responsive Web Design", percentage: 85 }
  ];
  
  skills.forEach((skill, index) => {
    addSkillToForm(skill, index);
  });
}

function addSkill() {
  const skill = { name: "New Skill", percentage: 50 };
  const index = document.querySelectorAll(".skill-item-form").length;
  addSkillToForm(skill, index);
}

function addSkillToForm(skill, index) {
  const skillsList = document.getElementById("skills-list");
  const skillDiv = document.createElement("div");
  skillDiv.className = "skill-item-form";
  skillDiv.innerHTML = `
    <button class="remove-btn" onclick="removeSkill(this)">×</button>
    <div class="form-group">
      <label>Skill Name</label>
      <input type="text" value="${skill.name}" data-field="name" data-index="${index}">
    </div>
    <div class="form-group">
      <label>Percentage</label>
      <input type="range" min="0" max="100" value="${skill.percentage}" data-field="percentage" data-index="${index}">
      <span class="percentage-display">${skill.percentage}%</span>
    </div>
  `;
  skillsList.appendChild(skillDiv);
  
  // Add event listener for range input
  const rangeInput = skillDiv.querySelector('input[type="range"]');
  const percentageDisplay = skillDiv.querySelector('.percentage-display');
  rangeInput.addEventListener('input', (e) => {
    percentageDisplay.textContent = e.target.value + '%';
  });
}

function removeSkill(btn) {
  btn.parentElement.remove();
}

// Portfolio Items Management
function initializePortfolioItems() {
  const portfolioList = document.getElementById("portfolio-list");
  const portfolioItems = [
    {
      title: "E-commerce Website",
      category: "Web Development",
      image: "https://wp.w3layouts.com/ui-portfolio/wp-content/themes/ui-portfolio/assets/images/blog1.jpg"
    },
    {
      title: "Mobile App UI",
      category: "UI Design", 
      image: "https://wp.w3layouts.com/ui-portfolio/wp-content/themes/ui-portfolio/assets/images/blog2.jpg"
    },
    {
      title: "Product Photography",
      category: "Photography",
      image: "https://wp.w3layouts.com/ui-portfolio/wp-content/themes/ui-portfolio/assets/images/blog3.jpg"
    }
  ];
  
  portfolioItems.forEach((item, index) => {
    addPortfolioItemToForm(item, index);
  });
}

function addPortfolioItem() {
  const item = {
    title: "New Project",
    category: "Category",
    image: "https://via.placeholder.com/300x200"
  };
  const index = document.querySelectorAll(".portfolio-item-form").length;
  addPortfolioItemToForm(item, index);
}

function addPortfolioItemToForm(item, index) {
  const portfolioList = document.getElementById("portfolio-list");
  const itemDiv = document.createElement("div");
  itemDiv.className = "portfolio-item-form";
  itemDiv.innerHTML = `
    <button class="remove-btn" onclick="removePortfolioItem(this)">×</button>
    <div class="form-group">
      <label>Project Title</label>
      <input type="text" value="${item.title}" data-field="title" data-index="${index}">
    </div>
    <div class="form-group">
      <label>Category</label>
      <input type="text" value="${item.category}" data-field="category" data-index="${index}">
    </div>
    <div class="form-group">
      <label>Image URL</label>
      <input type="url" value="${item.image}" data-field="image" data-index="${index}">
    </div>
  `;
  portfolioList.appendChild(itemDiv);
}

function removePortfolioItem(btn) {
  btn.parentElement.remove();
}

// Apply Changes Function
function applyChanges() {
  // Update personal info
  updatePersonalInfo();
  
  // Update hero section
  updateHeroSection();
  
  // Update about section
  updateAboutSection();
  
  // Update services
  updateServices();
  
  // Update skills
  updateSkills();
  
  // Update portfolio
  updatePortfolio();
  
  // Show success message
  showNotification("Portfolio updated successfully!", "success");
}

function updatePersonalInfo() {
  const siteTitle = document.getElementById("site-title").value;
  const userName = document.getElementById("user-name").value;
  const userEmail = document.getElementById("user-email").value;
  const userPhone = document.getElementById("user-phone").value;
  const userLocation = document.getElementById("user-location").value;
  
  // Update logo
  document.querySelector(".logo a").innerHTML = `<i class="fas fa-bezier-curve"></i>${siteTitle}`;
  
  // Update name in hero and about sections
  document.querySelector(".hero-text h3 span").textContent = userName;
  document.querySelector(".grid-container div:nth-child(1) span").textContent = userName;
  document.querySelector(".grid-container div:nth-child(2) span").textContent = userLocation;
  document.querySelector(".grid-container div:nth-child(3) span").textContent = userEmail;
  document.querySelector(".grid-container div:nth-child(4) span").textContent = userPhone;
  
  // Update footer
  document.querySelector(".footer-info-item:nth-child(2)").innerHTML = `<i class="fas fa-envelope"></i>${userEmail}`;
  document.querySelector(".footer-info-item:nth-child(1)").innerHTML = `<i class="fas fa-phone"></i>${userPhone}`;
}

function updateHeroSection() {
  const greeting = document.getElementById("hero-greeting").value;
  const typingPhrasesText = document.getElementById("typing-phrases").value;
  const description = document.getElementById("hero-description").value;
  const heroImageUrl = document.getElementById("hero-image").value;
  
  // Update greeting
  const heroH3 = document.querySelector(".hero-text h3");
  const userName = document.getElementById("user-name").value;
  heroH3.innerHTML = `${greeting} <span>${userName}</span>`;
  
  // Update typing phrases
  const newPhrases = typingPhrasesText.split(",").map(phrase => phrase.trim());
  phrases.length = 0;
  phrases.push(...newPhrases);
  
  // Update description
  document.querySelector(".hero-text p").textContent = description;
  
  // Update hero image
  document.querySelector(".hero-image img").src = heroImageUrl;
}

function updateAboutSection() {
  const title = document.getElementById("about-title").value;
  const description = document.getElementById("about-description").value;
  const imageUrl = document.getElementById("about-image").value;
  
  document.querySelector(".bio-content h2").textContent = title;
  document.querySelector(".bio-content p").textContent = description;
  document.querySelector(".bio-image img").src = imageUrl;
}

function updateServices() {
  const servicesTitle = document.getElementById("services-title").value;
  document.querySelector(".services .section-header h2").textContent = servicesTitle;
  
  const servicesGrid = document.querySelector(".services-grid");
  servicesGrid.innerHTML = "";
  
  const serviceItems = document.querySelectorAll(".service-item");
  serviceItems.forEach((item, index) => {
    const icon = item.querySelector('[data-field="icon"]').value;
    const title = item.querySelector('[data-field="title"]').value;
    const description = item.querySelector('[data-field="description"]').value;
    
    const serviceCard = document.createElement("div");
    serviceCard.className = "service-card";
    serviceCard.innerHTML = `
      <div class="service-icon">
        <i class="${icon}"></i>
      </div>
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="#" class="learn-more">Learn More <i class="fas fa-arrow-right"></i></a>
    `;
    servicesGrid.appendChild(serviceCard);
  });
}

function updateSkills() {
  const skillsTitle = document.getElementById("skills-title").value;
  const skillsDescription = document.getElementById("skills-description").value;
  const skillsImageUrl = document.getElementById("skills-image").value;
  
  document.querySelector(".skills-info h2").textContent = skillsTitle;
  document.querySelector(".skills-info p").textContent = skillsDescription;
  document.querySelector(".skills-image img").src = skillsImageUrl;
  
  const skillBars = document.querySelector(".skill-bars");
  skillBars.innerHTML = "";
  
  const skillItems = document.querySelectorAll(".skill-item-form");
  skillItems.forEach((item) => {
    const name = item.querySelector('[data-field="name"]').value;
    const percentage = item.querySelector('[data-field="percentage"]').value;
    
    const skillItem = document.createElement("div");
    skillItem.className = "skill-item";
    skillItem.innerHTML = `
      <div class="skill-name">${name}</div>
      <div class="skill-progress">
        <div class="progress-bar" style="width: ${percentage}%"></div>
      </div>
    `;
    skillBars.appendChild(skillItem);
  });
}

function updatePortfolio() {
  const portfolioTitle = document.getElementById("portfolio-title").value;
  document.querySelector(".portfolio .section-header h2").textContent = portfolioTitle;
  
  const portfolioGrid = document.querySelector(".portfolio-grid");
  portfolioGrid.innerHTML = "";
  
  const portfolioItems = document.querySelectorAll(".portfolio-item-form");
  portfolioItems.forEach((item) => {
    const title = item.querySelector('[data-field="title"]').value;
    const category = item.querySelector('[data-field="category"]').value;
    const image = item.querySelector('[data-field="image"]').value;
    
    const portfolioItem = document.createElement("div");
    portfolioItem.className = "portfolio-item";
    portfolioItem.innerHTML = `
      <img src="${image}" alt="${title}">
      <div class="portfolio-overlay">
        <h3>${title}</h3>
        <p>${category}</p>
        <a href="#" class="view-project">View Project</a>
      </div>
    `;
    portfolioGrid.appendChild(portfolioItem);
  });
}

// Export Portfolio Function
function exportPortfolio() {
  const htmlContent = document.documentElement.outerHTML;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-portfolio.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification("Portfolio exported successfully!", "success");
}

// Reset to Default Function
function resetToDefault() {
  if (confirm("Are you sure you want to reset all changes? This cannot be undone.")) {
    location.reload();
  }
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 10001;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
