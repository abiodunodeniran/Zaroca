// script.js - Zoroca Wear

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle active class on menu and button
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside (on mobile)
        document.addEventListener('click', (e) => {
            const isMobile = window.innerWidth < 1024;
            if (isMobile && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Close menu on window resize (if resizing to desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== MARQUEE CONTROL =====
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Duplicate content for seamless loop
        marqueeContent.innerHTML += marqueeContent.innerHTML;
    }

    // ===== SEARCH TOGGLE =====
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchBox = document.createElement('div');
            searchBox.className = 'search-overlay';
            searchBox.innerHTML = `
                <div class="search-modal">
                    <input type="text" placeholder="Search collections, events, trustees..." autofocus>
                    <button class="close-search">&times;</button>
                </div>
            `;
            document.body.appendChild(searchBox);

            const closeBtn = searchBox.querySelector('.close-search');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(searchBox);
            });

            searchBox.addEventListener('click', (e) => {
                if (e.target === searchBox) {
                    document.body.removeChild(searchBox);
                }
            });
        });
    }

    // ===== PRODUCT CARD INTERACTION =====
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // ===== FORM VALIDATION (for inquiries page) =====
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('Thank you! We will contact you shortly.');
            this.reset();
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});