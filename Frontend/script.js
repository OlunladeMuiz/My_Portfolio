// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    }

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.nav-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255,255,255,0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'transparent';
        }
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Scroll to Top Button
    const scrollTopButton = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            try {
                const response = await axios.post('https://onielsteve.herokuapp.com/api/users', formData);
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('Error sending message. Please try again.', 'error');
            }
        });
    }

    // Notification System
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '5px',
            color: '#fff',
            backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
            zIndex: '1000',
            transition: '0.3s ease',
            opacity: '0'
        });
        
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Fade out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Typing Animation for Skills
    const dynamicTexts = document.querySelector('.dynamic-texts');
    if (dynamicTexts) {
        const texts = dynamicTexts.children;
        let currentIndex = 0;

        function updateText() {
            texts[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % texts.length;
            texts[currentIndex].style.display = 'block';
        }

        // Initially show first text
        texts[0].style.display = 'block';
        for (let i = 1; i < texts.length; i++) {
            texts[i].style.display = 'none';
        }

        setInterval(updateText, 3000);
    }

    // CV Download Handler
document.querySelector('.secondary-btn[download]').addEventListener('click', async function(e) {
    e.preventDefault();
    
    try {
        // Show loading state
        const btnContent = this.querySelector('.btn-content span');
        const originalText = btnContent.textContent;
        btnContent.textContent = 'Downloading...';
        
        // Get the Google Drive file ID
        const fileId = '1HK3VHJJyg1T5GFYN4NjKqn4s84SypyKP';
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
        // Fetch the file
        const response = await fetch(downloadUrl);
        const blob = await response.blob();
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'Onah_Stephen_CV.pdf';
        
        // Trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Reset button text
        btnContent.textContent = originalText;
        
        // Show success notification
        showNotification('CV downloaded successfully!', 'success');
        
    } catch (error) {
        console.error('Download failed:', error);
        showNotification('Download failed. Please try again.', 'error');
    }
});

// Add this if you don't already have a notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '5px',
        color: '#fff',
        backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
        zIndex: '1000',
        opacity: '0',
        transition: '0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
});