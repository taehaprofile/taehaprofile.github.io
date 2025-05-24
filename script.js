// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgm = document.getElementById('bgm');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sceneContents = document.querySelectorAll('.scene-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const navBurger = document.querySelector('.nav-burger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // BGM Control
    let isPlaying = false;
    
    bgmToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgm.pause();
            bgmToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            bgmToggle.classList.remove('playing');
            isPlaying = false;
        } else {
            bgm.play().then(() => {
                bgmToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                bgmToggle.classList.add('playing');
                isPlaying = true;
            }).catch(error => {
                console.log('Audio play failed:', error);
                // Fallback for browsers that require user interaction
                showAudioMessage();
            });
        }
    });
    
    // Show audio message for autoplay restrictions
    function showAudioMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(41, 128, 185, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 0.9rem;
            z-index: 1001;
            backdrop-filter: blur(10px);
        `;
        message.textContent = '브라우저 정책으로 인해 사용자 상호작용 후 재생됩니다';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    // Set initial BGM volume
    bgm.volume = 0.3;
    
    // Scene Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(tab => tab.classList.remove('active'));
            sceneContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Smooth Scrolling for Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navLinksContainer.classList.contains('mobile-open')) {
                navLinksContainer.classList.remove('mobile-open');
                navBurger.classList.remove('active');
            }
        });
    });
    
    // Mobile Navigation Toggle
    if (navBurger) {
        navBurger.addEventListener('click', function() {
            navLinksContainer.classList.toggle('mobile-open');
            navBurger.classList.toggle('active');
        });
    }
    
    // Scroll Effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.nav-bar');
        
        // Navbar background on scroll
        if (scrolled > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
        
        // Parallax effect for hero image
        const heroImage = document.querySelector('.main-portrait');
        if (heroImage) {
            const rate = scrolled * -0.3;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
        
        // Fade in elements on scroll
        observeElements();
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    function observeElements() {
        const elements = document.querySelectorAll('.info-card, .scene-content, .download-card, .profile-img');
        elements.forEach(el => {
            if (!el.classList.contains('observed')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                observer.observe(el);
                el.classList.add('observed');
            }
        });
    }
    
    // Initialize animations
    observeElements();
    
    // Typewriter Effect Enhancement
    function enhanceTypewriter() {
        const typewriters = document.querySelectorAll('.typewriter');
        typewriters.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.width = '0';
            
            setTimeout(() => {
                let i = 0;
                const timer = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                        // Remove cursor after animation
                        setTimeout(() => {
                            element.style.borderRight = 'none';
                        }, 1000);
                    }
                }, 100);
            }, index * 3000);
        });
    }
    
    // Glitch Effect Enhancement
    function enhanceGlitch() {
        const glitchElement = document.querySelector('.glitch');
        if (glitchElement) {
            setInterval(() => {
                glitchElement.style.textShadow = `
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00d4ff,
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #e74c3c
                `;
                
                setTimeout(() => {
                    glitchElement.style.textShadow = 'none';
                }, 150);
            }, 3000 + Math.random() * 5000);
        }
    }
    
    // Particle Animation
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(${Math.random() > 0.5 ? '41, 128, 185' : '0, 212, 255'}, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 20 + 10}s infinite linear;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        
        .mobile-open {
            display: flex !important;
            flex-direction: column !important;
            position: absolute !important;
            top: 70px !important;
            left: 0 !important;
            right: 0 !important;
            background: rgba(10, 10, 10, 0.98) !important;
            backdrop-filter: blur(20px) !important;
            padding: 20px !important;
            border-top: 1px solid #34495e !important;
        }
        
        .nav-burger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-burger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-burger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize enhancements
    createParticles();
    enhanceGlitch();
    
    // Image lazy loading
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.remove('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }
    
    lazyLoadImages();
    
    // Error handling for missing images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log('Image failed to load:', this.src);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navLinksContainer.classList.contains('mobile-open')) {
            navLinksContainer.classList.remove('mobile-open');
            navBurger.classList.remove('active');
        }
        
        // Space to toggle BGM
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            bgmToggle.click();
        }
    });
    
    // Performance optimization
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    function updateScrollEffects() {
        // Update scroll-dependent effects here
        ticking = false;
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Resize handler
    window.addEventListener('resize', function() {
        // Recreate particles on resize
        const particlesContainer = document.getElementById('particles');
        particlesContainer.innerHTML = '';
        createParticles();
    });
    
    console.log('권태하 사이트가 로드되었습니다.');
    console.log('💭 "불면의 밤, 너란 해답"');
}); 