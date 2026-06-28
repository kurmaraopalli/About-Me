document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scrolled Background ---
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially in case page is refreshed while scrolled

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon between menu and close state
            const isActive = navLinks.classList.contains('active');
            mobileToggle.innerHTML = isActive 
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            });
        });
    }

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once it's revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Contact Form Submission Interaction ---
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Message...';
            submitBtn.style.opacity = '0.7';

            // Simulate server network delay
            setTimeout(() => {
                // Success visual state
                submitBtn.textContent = 'Message Sent Successfully!';
                submitBtn.style.backgroundColor = '#10B981';
                submitBtn.style.borderColor = '#10B981';
                submitBtn.style.color = '#0B0B0C';
                
                // Clear fields
                contactForm.reset();

                // Reset button back to normal state after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                    submitBtn.style.opacity = '';
                }, 3000);
            }, 1500);
        });
    }

    // --- Theme Switcher Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    if (themeToggle) {
        let savedTheme = null;
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (e) {
            console.warn('localStorage access blocked:', e);
        }
        
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = moonIcon;
        } else {
            themeToggle.innerHTML = sunIcon;
        }

        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            try {
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            } catch (e) {
                console.warn('localStorage write blocked:', e);
            }
            themeToggle.innerHTML = isLight ? moonIcon : sunIcon;
        });
    }

    // --- Professional Role Switching Logic ---
    const roleSwitcher = document.getElementById('role-switcher');
    if (roleSwitcher) {
        const roleBtns = roleSwitcher.querySelectorAll('.role-btn');
        roleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active class on buttons
                roleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const selectedRole = btn.getAttribute('data-role');

                // Clear existing role classes from body
                document.body.classList.remove('role-mode-active', 'role-manager', 'role-architect', 'role-developer');

                if (selectedRole !== 'all') {
                    document.body.classList.add('role-mode-active', `role-${selectedRole}`);
                }
            });
        });
    }

    // --- Opportunities Ticker Widget Logic ---
    const ticker = document.getElementById('opportunities-ticker');
    const tickerToggle = document.getElementById('ticker-toggle');
    const tickerClose = document.getElementById('ticker-close');
    const tickerList = document.getElementById('ticker-list');

    // Toggle expand/collapse
    if (tickerToggle && ticker) {
        tickerToggle.addEventListener('click', (e) => {
            if (ticker.classList.contains('collapsed')) {
                ticker.classList.remove('collapsed');
                e.stopPropagation();
            }
        });
    }

    if (tickerClose && ticker) {
        tickerClose.addEventListener('click', (e) => {
            ticker.classList.add('collapsed');
            e.stopPropagation();
        });
    }

    // Fallback jobs list
    const fallbackJobs = [
        { title: "Lead .NET Technical Architect", company: "Mercedes-Benz R&D", location: "Bengaluru (Hybrid)", url: "https://www.linkedin.com/jobs" },
        { title: "Engineering Manager (.NET & Azure)", company: "Optum", location: "Bengaluru (Hybrid)", url: "https://www.linkedin.com/jobs" },
        { title: "Technical Architect - Microservices", company: "Bosch Group", location: "Bengaluru", url: "https://www.linkedin.com/jobs" },
        { title: "Solutions Architect (.NET & Azure)", company: "Persistent Systems", location: "Pune", url: "https://www.linkedin.com/jobs" },
        { title: "Engineering Manager (.NET & Cloud)", company: "Infosys", location: "Pune (Hybrid)", url: "https://www.linkedin.com/jobs" },
        { title: "Senior .NET Architect", company: "Capgemini", location: "Pune", url: "https://www.linkedin.com/jobs" },
        { title: "Principal .NET Architect", company: "EY India", location: "Hyderabad", url: "https://www.linkedin.com/jobs" },
        { title: "Engineering Manager - Backend", company: "LeadSquared", location: "Hyderabad (Hybrid)", url: "https://www.linkedin.com/jobs" },
        { title: "Solution Architect (.NET)", company: "NTT DATA", location: "Hyderabad", url: "https://www.linkedin.com/jobs" },
        { title: "Technical Delivery Manager (.NET)", company: "Ericsson", location: "Gurugram (Hybrid)", url: "https://www.linkedin.com/jobs" },
        { title: "Senior Architect (.NET & Azure)", company: "HCLTech", location: "Noida", url: "https://www.linkedin.com/jobs" },
        { title: "Technical Lead (.NET Architect)", company: "Randstad India", location: "Visakhapatnam (Vizag)", url: "https://www.linkedin.com/jobs" },
        { title: "Backend Engineering Lead", company: "Tech Mahindra", location: "Visakhapatnam (Vizag)", url: "https://www.linkedin.com/jobs" }
    ];

    // HTML sanitizer to prevent XSS from untrusted JSON data
    const escapeHTML = (str) => {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    // Validate URL to prevent javascript: protocol injection
    const sanitizeURL = (url) => {
        try {
            const parsed = new URL(url);
            if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
                return parsed.href;
            }
        } catch (e) { /* invalid URL */ }
        return 'https://www.linkedin.com/jobs';
    };

    // Populate ticker with list items
    const renderJobs = (jobs) => {
        if (!tickerList) return;
        tickerList.innerHTML = '';
        jobs.forEach(job => {
            const li = document.createElement('li');
            li.className = 'ticker-item';
            li.innerHTML = `
                <span class="ticker-job-title">${escapeHTML(job.title || '')}</span>
                <div class="ticker-job-meta">
                    <span>${escapeHTML(job.company || '')} • ${escapeHTML(job.location || '')}</span>
                    <a href="${sanitizeURL(job.url || '')}" target="_blank" rel="noopener noreferrer" class="ticker-job-link">Apply</a>
                </div>
            `;
            tickerList.appendChild(li);
        });

        // Initialize scrolling animation after render
        startTickerScroll();
    };

    // Smooth Scroll Loop
    let scrollInterval = null;
    const startTickerScroll = () => {
        const container = document.querySelector('.ticker-scroll-container');
        if (!container || !tickerList) return;

        // Clear any existing scroll intervals
        if (scrollInterval) clearInterval(scrollInterval);

        // Reset scroll position
        tickerList.style.transform = 'translateY(0)';
        let currentY = 0;

        // Clone list items to create a continuous infinite loop feel
        const items = Array.from(tickerList.children);
        if (items.length <= 2) return; // Don't scroll if too few items

        // Remove any previously cloned items to prevent duplicating clones on re-renders
        const existingClones = tickerList.querySelectorAll('.ticker-clone');
        existingClones.forEach(clone => clone.remove());

        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('ticker-clone');
            tickerList.appendChild(clone);
        });

        // Defer height calculation to allow DOM layouts to stabilize
        setTimeout(() => {
            let listHeight = 0;

            const scrollStep = () => {
                if (ticker.classList.contains('collapsed')) return; // Pause scroll if collapsed

                if (listHeight <= 0) {
                    listHeight = tickerList.scrollHeight / 2;
                    if (listHeight <= 0) return; // Still hidden
                }

                currentY -= 0.5; // Scroll up 0.5px
                
                // Loop back once we scroll past original items
                if (Math.abs(currentY) >= listHeight) {
                    currentY = 0;
                }
                tickerList.style.transform = `translateY(${currentY}px)`;
            };

            // Run smooth animation scroll
            scrollInterval = setInterval(scrollStep, 30);

            // Pause scroll on hover and handle manual wheel scrolling
            container.addEventListener('mouseenter', () => {
                clearInterval(scrollInterval);
            });
            
            container.addEventListener('mouseleave', () => {
                clearInterval(scrollInterval);
                scrollInterval = setInterval(scrollStep, 30);
            });

            container.addEventListener('wheel', (e) => {
                e.preventDefault(); // Stop page scroll
                clearInterval(scrollInterval);
                
                if (listHeight <= 0) {
                    listHeight = tickerList.scrollHeight / 2;
                }
                if (listHeight <= 0) return;

                currentY -= e.deltaY * 0.4; // Scroll scaling factor
                
                // Boundaries check
                if (currentY > 0) {
                    currentY = -listHeight;
                } else if (Math.abs(currentY) >= listHeight) {
                    currentY = 0;
                }
                tickerList.style.transform = `translateY(${currentY}px)`;
            }, { passive: false });

            // Touch Swipe Scroll Support for Mobile Devices
            let touchStartY = 0;
            container.addEventListener('touchstart', (e) => {
                clearInterval(scrollInterval);
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            container.addEventListener('touchmove', (e) => {
                clearInterval(scrollInterval);
                const touchY = e.touches[0].clientY;
                const deltaY = touchStartY - touchY;
                touchStartY = touchY;

                currentY -= deltaY;
                
                if (listHeight <= 0) {
                    listHeight = tickerList.scrollHeight / 2;
                }
                if (listHeight <= 0) return;

                // Boundaries check
                if (currentY > 0) {
                    currentY = -listHeight;
                } else if (Math.abs(currentY) >= listHeight) {
                    currentY = 0;
                }
                tickerList.style.transform = `translateY(${currentY}px)`;
            }, { passive: true });

            container.addEventListener('touchend', () => {
                clearInterval(scrollInterval);
                scrollInterval = setInterval(scrollStep, 30);
            });
        }, 100);
    };

    // Load dynamic opportunities
    fetch('opportunities.json')
        .then(response => {
            if (!response.ok) throw new Error('File not found');
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                renderJobs(data);
            } else {
                renderJobs(fallbackJobs);
            }
        })
        .catch(err => {
            console.log('Using fallback opportunities:', err);
            renderJobs(fallbackJobs);
        });
});
