// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS library for fade-up animations
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out'
    });

    // Handle Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Handle Mobile Menu Pop-up
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuPopup = document.getElementById('mobile-menu-popup');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuToggle && mobileMenuPopup && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuPopup.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenuPopup.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Initialize Typed.js for the animated text
    const typedElement = document.querySelector('.typed-text-element');
    if (typedElement) {
        new Typed(typedElement, {
            strings: ["Awesome Websites", "Digital Experiences", "Creative Brands"],
            typeSpeed: 70,
            backSpeed: 50,
            loop: true
        });
    }

    // Handle Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Snowfall Effect - Modified to be a toggle
    const snowfallContainer = document.getElementById('snowfall-container');
    const snowfallToggleBtn = document.getElementById('snowfall-toggle-btn');
    let snowfallInterval = null; // Initialize as null to indicate no active interval

    const createSnowflake = () => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        const startX = Math.random() * window.innerWidth;
        snowflake.style.left = `${startX}px`;

        const size = Math.random() * 5 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        const duration = Math.random() * 8 + 5; // Snowfall duration
        const delay = Math.random() * 0.5; // Small delay for more natural start

        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;

        snowfallContainer.appendChild(snowflake);

        // Remove snowflake after its animation is done to prevent DOM bloat
        setTimeout(() => {
            snowflake.remove();
        }, (duration + delay) * 1000);
    };

    // Main function to start or stop the snowfall
    const toggleSnowfall = () => {
        if (snowfallInterval) {
            // Snowfall is active, so we stop it
            clearInterval(snowfallInterval);
            snowfallInterval = null; // Reset interval
            snowfallContainer.innerHTML = ''; // Clears all existing snowflakes immediately
            snowfallToggleBtn.innerHTML = '<i class="fas fa-cog"></i>'; // Gear icon for OFF state
            snowfallToggleBtn.classList.remove('active'); // Remove active class
        } else {
            // Snowfall is not active, so we start it
            snowfallInterval = setInterval(createSnowflake, 100); // Creates a new snowflake every 100ms
            snowfallToggleBtn.innerHTML = '<i class="fas fa-fan"></i>'; // Fan icon for ON state, implies motion/activity
            snowfallToggleBtn.classList.add('active'); // Add active class
        }
    };

    // Attach the click event to the new button
    if (snowfallToggleBtn) {
        snowfallToggleBtn.addEventListener('click', toggleSnowfall);

        // Start snowfall on page load by default (initial call)
        toggleSnowfall();
    }
    /*----------------------------------------------------------
        Coming Soon Countdown Timer
    ------------------------------------------------------------*/
    const countdown = () => {
        // Set the launch date (YYYY-MM-DD)
        const launchDate = new Date('2025-12-31T00:00:00').getTime();

        // Update the countdown every second
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            // Calculate days, hours, minutes, and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result
            document.getElementById('days').innerText = days < 10 ? `0${days}` : days;
            document.getElementById('hours').innerText = hours < 10 ? `0${hours}` : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;

            // If the countdown is over, show a message
            if (distance < 0) {
                clearInterval(interval);
                document.getElementById('countdown').innerHTML = '<h2>We are Live!</h2>';
            }
        }, 1000);
    };

    // Check if the countdown container exists before running the function
    if (document.getElementById('countdown')) {
        countdown();
    }
    /*----------------------------------------------------------
        Dark Mode Toggle
    ------------------------------------------------------------*/
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Check if the button exists on the page
    if (themeToggleBtn) {
        // Function to set the theme and icon
        function setTheme(theme) {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        }

        // Load the saved theme preference on page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('light');
        }

        // Add click event listener to the toggle button
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        });
    }

});