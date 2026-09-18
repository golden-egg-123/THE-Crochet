const productData = [
  {
    id: 1,
    name: 'Daisy Bag',
    category: 'home-decor',
    color: 'pink',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    price: 28,
    rating: 4.8,
    tag: 'Home Decor'
  },
  {
    id: 2,
    name: 'Sunflower Mat',
    category: 'home-decor',
    color: 'beige',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
    price: 18,
    rating: 4.7,
    tag: 'Home Decor'
  },
  {
    id: 3,
    name: 'Flower Pot',
    category: 'gifts',
    color: 'green',
    inStock: false,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    price: 16,
    rating: 4.9,
    tag: 'Gifts'
  },
  {
    id: 4,
    name: 'Bunny Doll',
    category: 'crochet-toys',
    color: 'cream',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    price: 20,
    rating: 4.9,
    tag: 'Crochet Toys'
  },
  {
    id: 5,
    name: 'Rose Flower',
    category: 'gifts',
    color: 'red',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=80',
    price: 14,
    rating: 4.8,
    tag: 'Gifts'
  },
  {
    id: 6,
    name: 'Crochet Hat',
    category: 'accessories',
    color: 'purple',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1524678714210-9917a6c619c1?auto=format&fit=crop&w=900&q=80',
    price: 22,
    rating: 4.6,
    tag: 'Accessories'
  },
  {
    id: 7,
    name: 'Coasters Set',
    category: 'home-decor',
    color: 'beige',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    price: 12,
    rating: 4.7,
    tag: 'Home Decor'
  },
  {
    id: 8,
    name: 'Flower Keychain',
    category: 'accessories',
    color: 'gold',
    inStock: false,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    price: 10,
    rating: 4.8,
    tag: 'Accessories'
  },
  {
    id: 9,
    name: 'Storage Basket',
    category: 'home-decor',
    color: 'lavender',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80',
    price: 25,
    rating: 4.9,
    tag: 'Home Decor'
  },
  {
    id: 10,
    name: 'Little Teddy',
    category: 'crochet-toys',
    color: 'pink',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    price: 24,
    rating: 4.7,
    tag: 'Crochet Toys'
  },
  {
    id: 11,
    name: 'Cosy Pouch',
    category: 'accessories',
    color: 'white',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    price: 19,
    rating: 4.5,
    tag: 'Accessories'
  },
  {
    id: 12,
    name: 'Gift Basket',
    category: 'gifts',
    color: 'pink',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    price: 32,
    rating: 5,
    tag: 'Gifts'
  }
];

let cartCount = 0;
let activeCategory = 'all';
let searchTerm = '';
let minPrice = 5;
let maxPrice = 50;
let selectedColors = [];
let availabilityState = {
  inStock: true,
  preOrder: false
};

function safeQuery(selector, root = document) {
  return root.querySelector(selector);
}

function setActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === window.location.pathname.split('/').pop();
    link.classList.toggle('active', isActive);
  });
}

function setupNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    badge.textContent = cartCount;
  }
}

function bindAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      cartCount += 1;
      updateCartBadge();
      button.textContent = 'Added';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.disabled = false;
      }, 900);
    });
  });
}

function bindWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      button.textContent = button.classList.contains('active') ? '♥' : '♡';
    });
  });
}

function renderProductGrid() {
  const grid = document.getElementById('shop-product-grid');
  if (!grid) return;

  const filtered = productData.filter((product) => {
    const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    const colorMatch = !selectedColors.length || selectedColors.includes(product.color);
    const availabilityMatch =
      (availabilityState.inStock && product.inStock) ||
      (availabilityState.preOrder && !product.inStock) ||
      (!availabilityState.inStock && !availabilityState.preOrder);

    return categoryMatch && searchMatch && priceMatch && colorMatch && availabilityMatch;
  });

  if (!filtered.length) {
    grid.innerHTML = '<p class="empty-state">No products match your search.</p>';
    return;
  }

  grid.innerHTML = filtered.map((product) => `
    <article class="product-card reveal" data-category="${product.category}">
      <button class="wishlist-btn" type="button" aria-label="Add to wishlist">♡</button>
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.tag}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-meta">
          <span>★★★★★</span>
          <small>(${product.rating})</small>
        </div>
        <button class="btn btn-product add-to-cart" type="button">Add to Cart</button>
      </div>
    </article>
  `).join('');

  bindWishlistButtons();
  bindAddToCartButtons();
  initRevealAnimations();
}

function syncPriceLabels() {
  const minLabel = document.getElementById('price-min-label');
  const maxLabel = document.getElementById('price-max-label');
  if (minLabel) minLabel.textContent = `$${minPrice}`;
  if (maxLabel) maxLabel.textContent = maxPrice >= 50 ? '$50+' : `$${maxPrice}`;
}

function setupShopFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('shop-search');
  const minRange = document.getElementById('min-price');
  const maxRange = document.getElementById('max-price');
  const colorButtons = document.querySelectorAll('.color-swatch');
  const availabilityChecks = document.querySelectorAll('[data-availability]');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      activeCategory = button.dataset.category || 'all';
      renderProductGrid();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      searchTerm = event.target.value.trim();
      renderProductGrid();
    });
  }

  if (minRange && maxRange) {
    const syncRanges = () => {
      if (Number(minRange.value) > Number(maxRange.value)) {
        if (document.activeElement === minRange) {
          maxRange.value = minRange.value;
          maxPrice = Number(maxRange.value);
        } else {
          minRange.value = maxRange.value;
          minPrice = Number(minRange.value);
        }
      }

      minPrice = Number(minRange.value);
      maxPrice = Number(maxRange.value);
      syncPriceLabels();
      renderProductGrid();
    };

    minRange.addEventListener('input', syncRanges);
    maxRange.addEventListener('input', syncRanges);
  }

  colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const color = button.dataset.color;
      button.classList.toggle('active');

      if (button.classList.contains('active')) {
        if (!selectedColors.includes(color)) selectedColors.push(color);
      } else {
        selectedColors = selectedColors.filter((item) => item !== color);
      }

      renderProductGrid();
    });
  });

  availabilityChecks.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const value = checkbox.dataset.availability;
      const checked = checkbox.checked;

      if (value === 'in-stock') {
        availabilityState.inStock = checked;
      }

      if (value === 'pre-order') {
        availabilityState.preOrder = checked;
      }

      renderProductGrid();
    });
  });

  syncPriceLabels();
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const message = form.querySelector('.form-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const messageText = String(formData.get('message') || '').trim();

    if (!name || !email || !subject || !messageText) {
      message.textContent = 'Please fill in all required fields.';
      return;
    }

    if (!validateEmail(email)) {
      message.textContent = 'Please enter a valid email address.';
      return;
    }

    if (phone && phone.length < 7) {
      message.textContent = 'Please provide a valid phone number if you include one.';
      return;
    }

    message.textContent = 'Thank you! Your message has been sent successfully.';
    form.reset();
  });
}

function setupNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input) return;

      const emailValue = input.value.trim();
      if (!validateEmail(emailValue)) {
        input.focus();
        input.setAttribute('aria-invalid', 'true');
        input.placeholder = 'Please enter a valid email';
        return;
      }

      input.setAttribute('aria-invalid', 'false');
      input.value = '';
      input.placeholder = 'Thanks for subscribing!';
    });
  });
}

function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((element) => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  setupNavToggle();
  setupShopFilters();
  renderProductGrid();
  bindAddToCartButtons();
  bindWishlistButtons();
  setupContactForm();
  setupNewsletterForms();
  updateCartBadge();
  initRevealAnimations();
});
