/**
 * JayaChandran N — Two-Wheeler Service & Repair Workshop
 * Main Interactive Application Script
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DOM Elements
  // =========================================================================
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const bookingForm = document.getElementById('booking-form');
  const dateInput = document.getElementById('pref-date');
  const filterButtons = document.querySelectorAll('#gallery-filters .gallery-btn');
  const galleryItems = document.querySelectorAll('#gallery-grid .gallery-item');
  const galleryModal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');
  const faqToggles = document.querySelectorAll('.faq-toggle');
  const navLinks = document.querySelectorAll('header nav a, #mobile-drawer a');
  const toastEl = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

  // Set min date for booking date picker to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // =========================================================================
  // 2. Scroll Progress Bar & Back-to-Top Button
  // =========================================================================
  window.addEventListener('scroll', function () {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    if (backToTopBtn) {
      if (winScroll > 320) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 3. Mobile Navigation Drawer Toggle
  // =========================================================================
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', function () {
      const isClosed = mobileDrawer.classList.contains('closed');
      const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');

      if (isClosed) {
        mobileDrawer.classList.remove('closed');
        mobileDrawer.classList.add('open');
        if (icon) icon.textContent = 'close';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileDrawer.classList.add('closed');
        mobileDrawer.classList.remove('open');
        if (icon) icon.textContent = 'menu';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu when clicking any nav link
    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileDrawer.classList.add('closed');
        mobileDrawer.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside drawer
    document.addEventListener('click', function (e) {
      if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.add('closed');
          mobileDrawer.classList.remove('open');
          const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
          if (icon) icon.textContent = 'menu';
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // =========================================================================
  // 4. ScrollSpy: Active Navigation Link Highlighting
  // =========================================================================
  const trackedSections = document.querySelectorAll('section[id], header[id="home"]');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    trackedSections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          const href = link.getAttribute('href');
          if (href === '#' + sectionId) {
            link.classList.add('text-primary-container', 'font-semibold', 'border-b-2', 'border-primary-container');
            link.classList.remove('text-on-surface-variant');
          } else if (href && href.startsWith('#')) {
            link.classList.remove('text-primary-container', 'font-semibold', 'border-b-2', 'border-primary-container');
            link.classList.add('text-on-surface-variant');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // =========================================================================
  // 5. Interactive Booking Form & Direct WhatsApp Dispatcher
  // =========================================================================
  if (bookingForm) {
    const requiredInputs = [
      { id: 'cust-name', label: 'Full Name' },
      { id: 'cust-phone', label: 'Phone Number' },
      { id: 'bike-brand', label: 'Bike Brand' },
      { id: 'bike-model', label: 'Bike Model' },
      { id: 'service-type', label: 'Service Needed' },
      { id: 'pref-date', label: 'Preferred Date' },
      { id: 'pref-time', label: 'Preferred Slot' }
    ];

    // Remove error highlights on input
    requiredInputs.forEach(function (item) {
      const el = document.getElementById(item.id);
      if (el) {
        el.addEventListener('input', function () {
          el.classList.remove('border-error', 'ring-1', 'ring-error');
          const errorSpan = el.parentElement.querySelector('.error-msg');
          if (errorSpan) errorSpan.classList.add('hidden');
        });
        el.addEventListener('change', function () {
          el.classList.remove('border-error', 'ring-1', 'ring-error');
          const errorSpan = el.parentElement.querySelector('.error-msg');
          if (errorSpan) errorSpan.classList.add('hidden');
        });
      }
    });

    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      let firstInvalidEl = null;

      requiredInputs.forEach(function (item) {
        const el = document.getElementById(item.id);
        if (!el) return;

        const val = el.value.trim();
        const errorSpan = el.parentElement.querySelector('.error-msg');

        if (!val) {
          isValid = false;
          el.classList.add('border-error', 'ring-1', 'ring-error');
          if (errorSpan) errorSpan.classList.remove('hidden');
          if (!firstInvalidEl) firstInvalidEl = el;
        } else if (item.id === 'cust-phone' && val.replace(/\D/g, '').length < 10) {
          isValid = false;
          el.classList.add('border-error', 'ring-1', 'ring-error');
          if (errorSpan) {
            errorSpan.textContent = 'Please enter a valid 10-digit mobile number';
            errorSpan.classList.remove('hidden');
          }
          if (!firstInvalidEl) firstInvalidEl = el;
        } else {
          el.classList.remove('border-error', 'ring-1', 'ring-error');
          if (errorSpan) errorSpan.classList.add('hidden');
        }
      });

      if (!isValid) {
        if (firstInvalidEl) {
          firstInvalidEl.focus();
        }
        showToast('Please fill in all required fields accurately.', 3500);
        return;
      }

      // Collect data
      const name = document.getElementById('cust-name').value.trim();
      const phone = document.getElementById('cust-phone').value.trim();
      const brand = document.getElementById('bike-brand').value;
      const model = document.getElementById('bike-model').value.trim();
      const service = document.getElementById('service-type').value;
      const date = document.getElementById('pref-date').value;
      const time = document.getElementById('pref-time').value;
      const notesEl = document.getElementById('cust-notes');
      const notes = notesEl ? notesEl.value.trim() : '';

      // Format WhatsApp message
      let message = `*SERVICE APPOINTMENT BOOKING REQUEST*\n`;
      message += `------------------------------------\n`;
      message += `👤 *Customer Name:* ${name}\n`;
      message += `📞 *Phone:* ${phone}\n`;
      message += `🏍️ *Vehicle:* ${brand} - ${model}\n`;
      message += `🛠️ *Service Needed:* ${service}\n`;
      message += `📅 *Date:* ${date}\n`;
      message += `⏰ *Slot:* ${time}\n`;
      if (notes) {
        message += `📝 *Notes/Issues:* ${notes}\n`;
      }
      message += `------------------------------------\n`;
      message += `_Sent via JayaChandran N Workshop Website_`;

      const targetPhone = '919443092866';
      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;

      showToast('Opening WhatsApp with your booking details...', 4000);

      setTimeout(function () {
        window.open(waUrl, '_blank');
      }, 300);
    });
  }

  // =========================================================================
  // 6. Workshop Gallery Filtering
  // =========================================================================
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const category = btn.getAttribute('data-filter');

        filterButtons.forEach(function (b) {
          b.classList.remove('bg-primary-container', 'text-on-primary-container', 'active');
          b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
        });

        btn.classList.add('bg-primary-container', 'text-on-primary-container', 'active');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');

        galleryItems.forEach(function (item) {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
            item.style.opacity = '1';
          } else {
            item.style.display = 'none';
            item.style.opacity = '0';
          }
        });
      });
    });
  }

  // =========================================================================
  // 7. Lightbox Modal
  // =========================================================================
  if (galleryModal && modalImg && modalClose) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const imgEl = item.querySelector('img');
        const titleEl = item.querySelector('h3, h4');
        const badgeEl = item.querySelector('.gallery-badge');

        if (imgEl) {
          modalImg.src = imgEl.src;
          modalImg.alt = imgEl.alt || 'Workshop Image';
        }
        if (modalTitle) {
          const titleText = titleEl ? titleEl.textContent.trim() : 'Workshop Precision Gallery';
          const badgeText = badgeEl ? ` [${badgeEl.textContent.trim()}]` : '';
          modalTitle.textContent = titleText + badgeText;
        }
        galleryModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      galleryModal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    galleryModal.addEventListener('click', function (e) {
      if (e.target === galleryModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !galleryModal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  // =========================================================================
  // 8. FAQ Accordion Handler
  // =========================================================================
  faqToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.faq-icon');
      const isAlreadyOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

      // Close all accordion panels
      document.querySelectorAll('.faq-content').forEach(function (panel) {
        panel.style.maxHeight = null;
      });
      document.querySelectorAll('.faq-icon').forEach(function (ic) {
        ic.style.transform = 'rotate(0deg)';
      });

      // If clicked wasn't already open, open it
      if (!isAlreadyOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Open first FAQ by default
  if (faqToggles.length > 0) {
    const firstContent = faqToggles[0].nextElementSibling;
    const firstIcon = faqToggles[0].querySelector('.faq-icon');
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
      if (firstIcon) firstIcon.style.transform = 'rotate(180deg)';
    }
  }

  // =========================================================================
  // 9. Toast Notification Utility
  // =========================================================================
  let toastTimer = null;
  function showToast(text, duration = 3000) {
    if (!toastEl) return;
    if (toastMessage) toastMessage.textContent = text;
    toastEl.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, duration);
  }

  // =========================================================================
  // 10. Theme Switcher (Apex Orange 🔥 vs Sky Blue ⚡)
  // =========================================================================
  const THEME_KEY = 'jayachandran_workshop_theme';

  function applyTheme(theme) {
    if (theme === 'sky-blue') {
      document.documentElement.setAttribute('data-theme', 'sky-blue');
      themeToggleBtns.forEach(btn => {
        const text = btn.querySelector('.theme-text');
        const icon = btn.querySelector('.material-symbols-outlined');
        if (text) text.textContent = 'Sky Blue';
        if (icon) icon.textContent = 'bolt';
      });
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtns.forEach(btn => {
        const text = btn.querySelector('.theme-text');
        const icon = btn.querySelector('.material-symbols-outlined');
        if (text) text.textContent = 'Apex Orange';
        if (icon) icon.textContent = 'local_fire_department';
      });
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  // Load saved theme or default
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      applyTheme(savedTheme);
    }
  } catch (e) {}

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const isSky = document.documentElement.getAttribute('data-theme') === 'sky-blue';
      applyTheme(isSky ? 'apex-orange' : 'sky-blue');
      showToast(`Switched theme to ${isSky ? 'Apex Orange 🔥' : 'Sky Blue ⚡'}`);
    });
  });

  // Expose toast to global scope if needed
  window.showToast = showToast;

})();
