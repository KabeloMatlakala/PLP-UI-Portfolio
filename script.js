{"code":"rate-limited","message":"You have hit the rate limit. Please upgrade to keep chatting.","providerLimitHit":false,"isRetryable":true}

// Apply changes function
function applyChanges() {
    // Show loading notification
    showLoadingNotification('Applying changes...');
    
    // Validate all fields first
    if (!validateAllFields()) {
        showNotification('Please fix the errors before applying changes', 'error');
        return;
    }
    
    // Small delay to show loading state
    setTimeout(() => {
        // Personal Info
        const siteTitle = document.getElementById('site-title').value;
        const userName = document.getElementById('user-name').value;
        const userEmail = document.getElementById('user-email').value;
        const userPhone = document.getElementById('user-phone').value;
        const userLocation = document.getElementById('user-location').value;
        
        // Update site title
        document.title = siteTitle;
        document.querySelector('.logo a').innerHTML = '<i class="fas fa-bezier-curve"></i>' + siteTitle;
        
        // Update hero section
        const heroGreeting = document.getElementById('hero-greeting').value;
        const typingPhrases = document.getElementById('typing-phrases').value;
        const heroDescription = document.getElementById('hero-description').value;
        const heroImage = document.getElementById('hero-image').value;
        
        document.querySelector('.hero-text h3').innerHTML = heroGreeting + ' <span>' + userName + '</span>';
        document.querySelector('.hero-text p').textContent = heroDescription;
        if (heroImage) {
            document.querySelector('.hero-image img').src = heroImage;
        }
        
        // Update typing effect
        if (typingPhrases) {
            window.typingPhrases = typingPhrases.split(',').map(phrase => phrase.trim());
            initializeTypingEffect();
        }
        
        // Update about section
        const aboutTitle = document.getElementById('about-title').value;
        const aboutDescription = document.getElementById('about-description').value;
        const aboutImage = document.getElementById('about-image').value;
        
        document.querySelector('.bio-content h2').textContent = aboutTitle;
        document.querySelector('.bio-content p').textContent = aboutDescription;
        if (aboutImage) {
            document.querySelector('.bio-image img').src = aboutImage;
        }
        
        // Update personal details in bio section
        const nameSpan = document.querySelector('.grid-container div:first-child span');
        const locationSpan = document.querySelector('.grid-container div:nth-child(2) span');
        const emailSpan = document.querySelector('.grid-container div:nth-child(3) span');
        const phoneSpan = document.querySelector('.grid-container div:nth-child(4) span');
        
        if (nameSpan) nameSpan.textContent = userName;
        if (locationSpan) locationSpan.textContent = userLocation;
        if (emailSpan) emailSpan.textContent = userEmail;
        if (phoneSpan) phoneSpan.textContent = userPhone;
        
        // Update services section
        const servicesTitle = document.getElementById('services-title').value;
        document.querySelector('.services .section-header h2').textContent = servicesTitle;
        
        // Update skills section
        const skillsTitle = document.getElementById('skills-title').value;
        const skillsDescription = document.getElementById('skills-description').value;
        const skillsImage = document.getElementById('skills-image').value;
        
        document.querySelector('.skills-info h2').textContent = skillsTitle;
        document.querySelector('.skills-info p').textContent = skillsDescription;
        if (skillsImage) {
            document.querySelector('.skills-image img').src = skillsImage;
        }
        
        // Update portfolio section
        const portfolioTitle = document.getElementById('portfolio-title').value;
        document.querySelector('.portfolio .section-header h2').textContent = portfolioTitle;
        
        // Show success notification
        showNotification('Changes applied successfully!', 'success');
    }, 500);
}