// World-Class JavaScript for Stack Fire Ball Game Website

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== GAME CONTROLS =====
    const gameWindow = document.getElementById('gameWindow');
    const gameFrame = document.querySelector('.game-frame iframe');
    const restartBtn = document.getElementById('restartBtn');
    const soundBtn = document.getElementById('soundBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    // Restart Game
    if (restartBtn && gameFrame) {
        restartBtn.addEventListener('click', function() {
            const currentSrc = gameFrame.src;
            gameFrame.src = '';
            setTimeout(() => {
                gameFrame.src = currentSrc;
            }, 100);

            // Visual feedback
            restartBtn.innerHTML = '🔄 Restarting...';
            setTimeout(() => {
                restartBtn.innerHTML = '🔄 Restart';
            }, 1000);
        });
    }

    // Sound Toggle
    let soundEnabled = true;
    if (soundBtn) {
        soundBtn.addEventListener('click', function() {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                soundBtn.innerHTML = '🔊 Sound';
                soundBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            } else {
                soundBtn.innerHTML = '🔇 Muted';
                soundBtn.style.background = 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)';
            }

            // Note: Actual sound control would need to be implemented in the game itself
            showNotification(soundEnabled ? 'Sound Enabled' : 'Sound Muted');
        });
    }

    // Fullscreen Toggle
    if (fullscreenBtn && gameFrame) {
        fullscreenBtn.addEventListener('click', function() {
            const gameContainer = document.querySelector('.game-frame');

            if (!document.fullscreenElement) {
                if (gameContainer.requestFullscreen) {
                    gameContainer.requestFullscreen();
                } else if (gameContainer.webkitRequestFullscreen) {
                    gameContainer.webkitRequestFullscreen();
                } else if (gameContainer.msRequestFullscreen) {
                    gameContainer.msRequestFullscreen();
                }
                fullscreenBtn.innerHTML = '🔳 Exit Fullscreen';
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                fullscreenBtn.innerHTML = '⚡ Fullscreen';
            }
        });
    }

    // Share functionality removed

    // ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // ===== SCROLL ANIMATIONS =====
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

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Parallax effect removed - hero content now stays static

    // ===== NAVBAR BACKGROUND ON SCROLL =====
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.nav-header');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease-out;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ===== COPY TO CLIPBOARD =====
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            showNotification('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
            showNotification('Failed to copy link');
        }

        document.body.removeChild(textarea);
    }

    // ===== GAME FRAME LOADING =====
    if (gameFrame) {
        gameFrame.addEventListener('load', function() {
            const gameContainer = document.querySelector('.game-frame');
            gameContainer.classList.add('loaded');
        });

        gameFrame.addEventListener('error', function() {
            showNotification('Failed to load game. Please try refreshing the page.');
        });
    }

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Press 'F' for fullscreen when game is visible
        if (e.key === 'f' || e.key === 'F') {
            const gameWindow = document.getElementById('gameWindow');
            if (gameWindow && gameWindow.style.display !== 'none') {
                fullscreenBtn.click();
            }
        }

        // Press 'R' to restart when game is visible
        if (e.key === 'r' || e.key === 'R') {
            const gameWindow = document.getElementById('gameWindow');
            if (gameWindow && gameWindow.style.display !== 'none') {
                restartBtn.click();
            }
        }

        // Press 'M' to toggle sound
        if (e.key === 'm' || e.key === 'M') {
            soundBtn.click();
        }

        // Press 'ESC' to exit fullscreen
        if (e.key === 'Escape') {
            if (document.fullscreenElement) {
                fullscreenBtn.click();
            }
        }
    });

    // ===== PERFORMANCE MONITORING =====
    let performanceMonitor = {
        startTime: Date.now(),
        frames: 0,

        update() {
            this.frames++;
            const currentTime = Date.now();
            const elapsed = currentTime - this.startTime;

            if (elapsed >= 1000) {
                const fps = Math.round((this.frames * 1000) / elapsed);
                this.frames = 0;
                this.startTime = currentTime;

                // Log FPS for debugging (remove in production)
                if (window.location.hostname === 'localhost') {
                    console.log(`FPS: ${fps}`);
                }
            }
        }
    };

    // Monitor performance (optional, can be removed)
    if ('requestAnimationFrame' in window) {
        function animate() {
            performanceMonitor.update();
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }

    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        showNotification('An error occurred. Please refresh the page.');
    });

    // ===== INITIALIZATION COMPLETE =====
    console.log('Stack Fire Ball website initialized successfully!');
    showNotification('Welcome to Stack Fire Ball! 🎮');
});