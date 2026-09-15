/* --- APP CONFIGURATION --- */
const config = {
  restaurant: {
    phones: ["01208611197", "01208611198", "01004451689"],
    whatsapp: "201004451689",
    address: {
      ar: "الإسكندرية<br>العجمي الكيلو 21<br>قبل مدخل أكتوبر بجوار فرع أورنج",
      en: "Alexandria<br>Agami Kilo 21<br>Next to Orange branch"
    }
  },
  deliveryFee: 25,
  payment: {
    instapay: { enabled: true, account: "01004451689" },
    wallet: { enabled: true, number: "01004451689" }
  }
};

/* --- API SERVICE ABSTRACTIONS --- */
const api = {
  generateOrderId() {
    return 'FK' + Math.floor(1000 + Math.random() * 9000);
  },

  async submitOrder(payload) {
    console.log("API: Submitting Order", payload);
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, orderId: payload.orderId }), 1200));
  },

  async getOrderStatus(orderId) {
    return new Promise(resolve => setTimeout(() => resolve('preparing'), 800));
  },

  async callWaiter(payload) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
  },

  async requestBill(payload) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
  }
};

const paymentProofService = {
  async uploadPaymentProof(file) {
    console.log("Mock Payment Service: Uploading Proof for", file.name);
    // Explicitly returning a simulated URI to maintain backend-readiness architecture
    return new Promise(resolve => setTimeout(() => resolve({ success: true, url: "[Mocked_URL_Waiting_For_Storage_Backend_Integration]" }), 1500));
  },
  async getPaymentProofUrl(mockId) { return "[Mocked_URL]"; },
  async deletePaymentProof(mockId) { return { success: true }; }
};

/* --- LOCALIZATION --- */
const locales = {
  ar: {
    brand: "فخارة", status_ready: "جاهزين لطلبك",
    search: "بحث في المنيو...", filter_all: "الكل", filter_popular: "الأكثر طلبًا", filter_spicy: "حار", filter_veg: "نباتي", filter_new: "جديد",
    cart_title: "سلة الطلبات", empty_cart: "السلة فارغة حاليا. أضف بعض الأطباق اللذيذة!", checkout: "متابعة الدفع", call_waiter: "طلب الجرسون", request_bill: "طلب الحساب",
    add_to_cart: "إضافة للسلة", qty: "الكمية", addons_title: "إضافات", total: "الإجمالي", req_sent: "تم إرسال طلبك", order_success: "تم استلام الطلب",
    egp: "جنيه", sold_out: "غير متاح", choice: "حسب الاختيار", featured: "اختيار مميز", normal: "منيو فخارة", subtitle: "اختيارات فخارة من القائمة الأصلية",
    remove: "إزالة", table: "طاولة", subtotal: "المجموع الفرعي", wait: "جاري الإرسال...", error: "حدث خطأ بالشبكة، حاول مجدداً",
    contact_en: "", contact_ar: "تواصل مع فخارة", delivery: "للطلب والتوصيل", address_tag: "العنوان",
    footer1: "طعم شرقي", footer2: "جودة بلدي", footer3: "مطعم فخارة",
    order_received: "استلام الطلب", order_preparing: "جاري التجهيز", order_ready: "جاهز للتسليم", order_completed: "مكتمل",
    offers_title_en: "FAMILY OFFERS", offers_title_ar: "عروض العيلة", offers_subtitle: "اختيارات كبيرة للمشاركة والقيمة الأفضل",
    order_number: "رقم الطلب", prompt_table: "يرجى إدخال رقم الطاولة الخاص بك لإتمام الطلب:",

    // Phase 4 additions
    type_delivery: "توصيل", type_dine_in: "داخل المطعم", type_pickup: "استلام من المطعم", full_name: "الاسم بالكامل", phone_number: "رقم الهاتف",
    address: "عنوان التوصيل (كامل)", area: "المنطقة", building: "العمارة", floor: "الدور", apartment: "الشقة", notes: "تفاصيل إضافية",
    payment_method: "طريقة الدفع", instapay: "إنستاباي (InstaPay)", wallet: "محفظة إلكترونية", upload_proof: "رفع صورة إثبات الدفع",
    upload_proof_sub: "اضغط لاختيار صورة (JPG, PNG)", delivery_fee: "التوصيل", order_summary: "مراجعة الطلب", confirm_order: "تأكيد الطلب عبر واتساب",
    payment_info: "بيانات الدفع", required_field: "هذا الحقل مطلوب لتأكيد الطلب", next: "مراجعة الطلب", checkout_details: "بيانات الإستلام",
    remove_img: "تغيير الصورة", back_to_cart: "العودة للسلة", transfer_to: "يرجى تحويل مبلغ", via: "عبر",
  },
  en: {
    brand: "Fokhara", status_ready: "Ready for orders",
    search: "Search menu...", filter_all: "All", filter_popular: "Popular", filter_spicy: "Spicy", filter_veg: "Veg", filter_new: "New",
    cart_title: "Shopping Cart", empty_cart: "Cart is empty. Add some delicious dishes!", checkout: "Proceed to Checkout", call_waiter: "Call Waiter", request_bill: "Request Bill",
    add_to_cart: "Add to Cart", qty: "Quantity", addons_title: "Add-ons", total: "Total", req_sent: "Request Sent", order_success: "Order Received",
    egp: "EGP", sold_out: "Sold Out", choice: "Upon Choice", featured: "Featured", normal: "Fokhara Menu", subtitle: "Selections from Fokhara's original menu",
    remove: "Remove", table: "Table", subtotal: "Subtotal", wait: "Sending...", error: "Network error occurred, please try again",
    contact_en: "CONTACT", contact_ar: "Fokhara", delivery: "Order & Delivery", address_tag: "Address",
    footer1: "Oriental Taste", footer2: "Original Quality", footer3: "Fokhara Restaurant",
    order_received: "Order Received", order_preparing: "Preparing", order_ready: "Ready", order_completed: "Completed",
    offers_title_en: "FAMILY OFFERS", offers_title_ar: "Promotions", offers_subtitle: "Best value selections for sharing",
    order_number: "Order No", prompt_table: "Please enter your Table Number to proceed:",

    // Phase 4 additions
    type_delivery: "Delivery", type_dine_in: "Dine-in", type_pickup: "Pickup", full_name: "Full Name", phone_number: "Mobile Number",
    address: "Full Address", area: "Area", building: "Building", floor: "Floor", apartment: "Apartment", notes: "Additional Notes",
    payment_method: "Payment Method", instapay: "InstaPay", wallet: "Mobile Wallet", upload_proof: "Upload Payment Screenshot",
    upload_proof_sub: "Tap to select image (JPG, PNG)", delivery_fee: "Delivery", order_summary: "Review Order", confirm_order: "Confirm via WhatsApp",
    payment_info: "Payment Info", required_field: "This field is required", next: "Review Order", checkout_details: "Checkout Details",
    remove_img: "Change Image", back_to_cart: "Back to Cart", transfer_to: "Please transfer", via: "via",
  }
};

/* --- RAW DATA STRUCTURES --- */
const rawOffers = [
  { active: true, isBig: true, tagAr: 'عرض مميز', tagEn: 'Special Offer', titleAr: 'فرخة مشوية مع الأرز والمحاشي', titleEn: 'Grilled Chicken with Rice', descAr: 'فرخة مشوية مع أرز ومحاشي وشوربة ضمن اختيارات عروض العيلة.', descEn: 'Grilled chicken with rice, stuffed veggies, and soup.', price: 420 },
  { active: true, isBig: false, tagAr: 'قيمة أفضل', tagEn: 'Best Value', titleAr: 'تشكيلات فخارة', titleEn: 'Fokhara Mix', descAr: 'تشكيلات عائلية متنوعة من المشويات والأرز والمحاشي حسب القائمة الأصلية.', descEn: 'Variety of grilled meats, rice, and stuffed veggies.', price: 450 },
  { active: false, isBig: false, tagAr: 'منتهي', tagEn: 'Expired', titleAr: 'عرض منتهي', titleEn: 'Expired Offer', descAr: '', descEn: '', price: 100 }
];

const generalAddons = [
  { nameAr: 'إضافة بطاطس', nameEn: 'Extra Fries', price: 20 },
  { nameAr: 'إضافة كولا', nameEn: 'Extra Cola', price: 15 },
  { nameAr: 'إضافة مخلل', nameEn: 'Extra Pickles', price: 5 }
];

const rawSections = [
  {
    key: 'chicken', title: 'الفراخ', en: 'CHICKEN', items: [
      ['فرخة مشوية', 'Grilled Chicken', '', 'Authentic grilled chicken', null, 'grill.jpg'],
      ['فرخة شيش', 'Shish Chicken', '', 'Marinated shish chicken pieces', null],
      ['فرخة محشية', 'Stuffed Chicken', 'رز ومحشي', 'With rice and stuffed vegetables', null],
      ['فرخة رستو', 'Roast Chicken', 'بطاطس بالفرن وأرز', 'With oven potatoes and rice', null]
    ]
  },
  {
    key: 'grills', title: 'اللحوم المشوية', en: 'GRILLS', items: [
      ['سدق مشوي', 'Grilled Sausage', '', 'Oriental grilled sausage', [[150, 'ربع'], [225, 'تلت'], [300, 'نص']]],
      ['شيش طاووق', 'Shish Tawook', '', 'Grilled chicken skewers', [[175, 'ربع'], [225, 'تلت'], [300, 'نص']]],
      ['كفتة', 'Kofta', '', 'Charcoal grilled meat kofta', [[175, 'ربع'], [265, 'تلت'], [350, 'نص']]],
      ['طرب', 'Tarb', '', 'Grilled tarb (meat wrapped in fat)', [[200, 'ربع'], [300, 'تلت'], [400, 'نص']]],
      ['لحم مشوي روزبيف', 'Grilled Roastbeef', '', 'Premium grilled beef cuts', [[225, 'ربع'], [340, 'تلت'], [450, 'نص']]],
      ['مكس فخارة', 'Fokhara Mix', '', 'Special signature mix grill', [[225, 'ربع'], [340, 'تلت'], [450, 'نص']]],
      ['كباب ضاني', 'Lamb Kebab', '', 'Premium lamb kebab pieces', [[300, 'ربع'], [450, 'تلت'], [600, 'نص']]],
      ['ريش ضاني', 'Lamb Chops', '', 'Charcoal grilled lamb chops', [[300, 'ربع'], [450, 'تلت'], [600, 'نص']]],
      ['مشكل', 'Mixed Grill', '', 'Kofta and Kebab traditional mix', [[240, 'ربع'], [350, 'تلت'], [475, 'نص']]]
    ]
  },
  {
    key: 'tagens', title: 'الطواجن الشرقية', en: 'EASTERN TAGINES', items: [
      ['طاجن خضار باللحمة', 'Vegetable & Meat Casserole', '', 'Slow cooked stew', [[200, '']]],
      ['طاجن بامية باللحمة', 'Okra & Meat Casserole', '', 'Traditional okra stew', [[210, '']]],
      ['طاجن كوارع', 'Trotters Casserole', '', 'Authentic beef trotters', [[300, '']]],
      ['طاجن عكاوي', 'Oxtail Casserole', '', 'Slow cooked oxtail', [[300, '']]],
      ['طاجن ورق عنب بالعكاوي', 'Oxtail Vine Leaves', '', 'Vine leaves topped with oxtail bits', [[330, '']]],
      ['طاجن روز بيف بورق العنب', 'Roast Beef Vine Leaves', '', 'Vine leaves with premium beef', [[350, '']]]
    ]
  },
  {
    key: 'sandwiches', title: 'السندوتشات', en: 'SANDWICHES', items: [
      ['سندوتش سدق', 'Sausage Sandwich', '', 'In traditional bread', [[60, '']], null, generalAddons],
      ['سندوتش شيش', 'Shish Sandwich', '', 'In traditional bread', [[60, '']], null, generalAddons],
      ['سندوتش كفتة', 'Kofta Sandwich', '', 'In traditional bread', [[60, '']], null, generalAddons]
    ]
  },
  {
    key: 'sides', title: 'الأطباق الجانبية', en: 'SIDES', items: [
      ['أرز أبيض', 'White Rice', '', 'Plain steamed rice', [[30, 'وسط'], [40, 'كبير']]],
      ['أرز بسمتي', 'Basmati Rice', '', 'Yellow spiced rice', [[50, 'وسط']]],
      ['محاشي مشكل', 'Mixed Mahshi', '', 'Stuffed veggies variation', [[120, 'وسط'], [150, 'كبير']]],
      ['بطاطس فريت', 'French Fries', '', 'Crispy potato fries', [[70, 'وسط'], [100, 'كبير']]]
    ]
  }
];

/* --- APP LOGIC --- */
const app = {
  lang: localStorage.getItem('fokhara_lang') || 'ar',
  cart: JSON.parse(localStorage.getItem('fokhara_cart') || '[]'),
  table: new URLSearchParams(window.location.search).get('table') || sessionStorage.getItem('fokhara_table'),
  filter: 'all',
  searchQuery: '',
  data: [],

  // Modals & States
  qty: 1,
  selectedOptionIndex: 0,
  selectedAddons: {},
  currentItem: null,
  activeOrderNumber: null,

  checkoutState: {
    type: 'dine_in', // dine_in | delivery
    customer: { name: '', phone: '' },
    delivery: { address: '', area: '', building: '', floor: '', apartment: '', notes: '' },
    payment: { method: null, screenshotFile: null }
  },

  esc(str) {
    return (str || '').toString().replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
  },

  init() {
    this.injectConfig();

    if (this.table) {
      sessionStorage.setItem('fokhara_table', this.table);
      const b = document.getElementById('table-badge');
      if (b) {
        b.style.display = 'inline-flex';
        b.innerHTML = `<i class="fa-solid fa-utensils"></i> <span id="table-number">${this.t('table')} ${this.esc(this.table)}</span>`;
      }
    }

    let idCounter = 1;
    this.data = rawSections.map((s, sectIdx) => {
      let _s = { ...s };
      _s.items = s.items.map((x, i) => {
        const configItem = x[7] || {}; // E.g. raw explicit properties if they exist
        return {
          id: 'item_' + idCounter++,
          nameAr: x[0],
          nameEn: x[1] || x[0],
          descAr: x[2] || 'طعم شرقي أصيل',
          descEn: x[3] ? x[3] : 'Authentic oriental taste',
          options: x[4],
          image: x[5] || null,
          isPopular: configItem.isPopular || false,
          isSpicy: configItem.isSpicy || false,
          isVeg: configItem.isVeg || false,
          isNew: configItem.isNew || false,
          isAvailable: true,
          addons: x[6] || []
        };
      });
      return _s;
    });

    this.toggleLang(this.lang);
  },

  injectConfig() {
    const pContainer = document.getElementById('phones-container');
    if (pContainer) {
      pContainer.innerHTML = config.restaurant.phones.map(p => `<div class="phone" role="link" tabindex="0"><a href="tel:${p}" style="color:inherit; text-decoration:none">${p}</a></div>`).join('');
    }
  },

  t(key) { return locales[this.lang][key] || key; },

  toggleLang(setLang) {
    if (setLang) this.lang = setLang;
    else this.lang = this.lang === 'ar' ? 'en' : 'ar';

    localStorage.setItem('fokhara_lang', this.lang);
    document.documentElement.lang = this.lang;
    document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = this.lang === 'ar' ? 'EN' : 'عربي';

    if (this.table) {
      const badge = document.getElementById('table-number');
      if (badge) badge.textContent = `${this.t('table')} ${this.table}`;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-address]').forEach(el => {
      el.innerHTML = config.restaurant.address[this.lang];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.setAttribute('placeholder', this.t(el.getAttribute('data-i18n-placeholder')));
    });

    this.render();
  },

  search(q) {
    this.searchQuery = q.toLowerCase();
    this.renderMenu();
  },

  setFilter(f) {
    this.filter = f;
    document.querySelectorAll('.filters-scroll .chip').forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-pressed', 'false');
    });
    const btn = document.querySelector(`.filters-scroll .chip[data-filter="${f}"]`);
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    }
    this.renderMenu();
  },

  render() {
    this.renderNav();
    this.renderMenu();
    this.renderOffers();
    this.renderCartFloat();

    const reqWaiter = document.getElementById('req-waiter');
    const reqBill = document.getElementById('req-bill');
    if (reqWaiter) { reqWaiter.innerHTML = `<i class="fas fa-bell"></i> ${this.t('call_waiter')}`; reqWaiter.setAttribute('aria-label', this.t('call_waiter')); }
    if (reqBill) { reqBill.innerHTML = `<i class="fas fa-receipt"></i> ${this.t('request_bill')}`; reqBill.setAttribute('aria-label', this.t('request_bill')); }

    const tableActions = document.getElementById('table-actions');
    if (tableActions) { tableActions.style.display = this.table ? 'flex' : 'none'; }
    document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = this.t(el.getAttribute('data-i18n')));
  },

  renderOffers() {
    const c = document.getElementById('offers-container');
    if (!c) return;
    const activeOffers = rawOffers.filter(o => o.active);
    if (activeOffers.length === 0) { c.innerHTML = ''; return; }

    const itemsHtml = activeOffers.map((o) => {
      const tag = this.lang === 'ar' ? o.tagAr : o.tagEn;
      const title = this.lang === 'ar' ? o.titleAr : o.titleEn;
      const desc = this.lang === 'ar' ? o.descAr : o.descEn;
      return `<article class="card offer ${o.isBig ? 'big' : ''}" role="banner">
        <div class="tag">${tag}</div>
        <h3>${title}</h3><p class="desc">${desc}</p>
        <div class="offer-price">${o.price} <small>${this.t('egp')}</small></div>
      </article>`;
    }).join('');

    c.innerHTML = `<section class="section" id="offers">
      <div class="section-head"><h2><span>${this.t('offers_title_en')}</span>${this.t('offers_title_ar')}</h2><p>${this.t('offers_subtitle')}</p></div>
      <div class="offer-grid">${itemsHtml}</div>
    </section>`;
  },

  renderNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    nav.innerHTML = '';
    this.data.forEach((s, i) => {
      const b = document.createElement('button');
      b.className = 'chip' + (i === 0 ? ' active' : '');
      b.setAttribute('role', 'tab');
      b.textContent = this.lang === 'ar' ? s.title : s.en;
      b.onclick = () => {
        document.getElementById(s.key)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('#nav .chip').forEach(c => c.classList.remove('active'));
        b.classList.add('active');
      };
      nav.appendChild(b);
    });
  },

  renderMenu() {
    const main = document.getElementById('menu');
    if (!main) return;
    main.innerHTML = '';

    this.data.forEach((s) => {
      const filteredItems = s.items.filter(item => {
        const query = this.searchQuery.trim();
        const mSearch = !query ||
          item.nameAr.toLowerCase().includes(query) ||
          item.nameEn.toLowerCase().includes(query) ||
          item.descAr.includes(query) ||
          item.descEn.includes(query);

        if (!mSearch) return false;
        if (this.filter === 'popular' && !item.isPopular) return false;
        if (this.filter === 'spicy' && !item.isSpicy) return false;
        if (this.filter === 'veg' && !item.isVeg) return false;
        if (this.filter === 'new' && !item.isNew) return false;
        return true;
      });

      if (filteredItems.length === 0) return;

      const sec = document.createElement('section');
      sec.className = 'section';
      sec.id = s.key;
      sec.setAttribute('role', 'region');
      sec.setAttribute('aria-label', s.title);

      const title = this.lang === 'ar' ? s.title : s.en;
      const subtitle = this.lang === 'ar' ? s.en : s.title;

      const itemsHtml = filteredItems.map((x, j) => {
        const tag = j === 0 || x.isPopular ? this.t('featured') : this.t('normal');
        const name = this.lang === 'ar' ? x.nameAr : x.nameEn;
        const desc = this.lang === 'ar' ? x.descAr : x.descEn;
        const soldOutClass = x.isAvailable ? '' : 'sold-out';
        const soldOutBadge = x.isAvailable ? '' : `<div class="sold-out-badge">${this.t('sold_out')}</div>`;

        let priceHtml = '';
        if (!x.options) priceHtml = `<div class="single-price" style="font-size:12px; color:var(--red); border:1px solid var(--red); display:inline-block; padding:2px 6px; border-radius:6px; margin-top:5px;">Price Configuration Required</div>`;
        else {
          priceHtml = `<div class="prices">` + x.options.map(opt => `<span class="price"><small>${app.esc(opt[1]) || ''}</small>${app.esc(opt[0])}</span>`).join('') + `</div>`;
        }

        return `
        <article class="card ${j < 2 ? 'featured' : ''} ${soldOutClass}" 
                 role="button" tabindex="0" aria-label="${app.esc(name)}, ${app.esc(desc)}"
                 onclick="${x.isAvailable ? `app.openItemModal('${s.key}', '${x.id}')` : ''}" style="${x.isAvailable ? 'cursor:pointer;' : ''}">
          ${soldOutBadge}
          ${x.image ? `<img class="photo" src="assets/${x.image}" alt="${app.esc(name)}" loading="lazy">` : ''}
          ${x.isPopular || j === 0 ? `<div class="tag">${app.esc(tag)}</div>` : ''}
          <h3 class="name">${app.esc(name)}</h3><p class="desc">${app.esc(desc)}</p>
          <div class="price-row">${priceHtml}</div>
        </article>`;
      }).join('');

      sec.innerHTML = `<div class="section-head"><h2><span>${subtitle}</span>${title}</h2><p>${this.t('subtitle')}</p></div><div class="grid">${itemsHtml}</div>`;
      main.appendChild(sec);
    });

    if (main.innerHTML === '') {
      main.innerHTML = `<div style="text-align:center; padding: 60px 20px; color: var(--muted);"><img src="assets/logo.png" style="width:80px; filter:grayscale(1); opacity:0.3; margin-bottom:15px; border-radius:50%;"><p style="font-size:18px; font-weight:800; color:#fff5df;">لا توجد نتائج</p><p>We couldn't find anything matching your search.</p></div>`;
    }
  },

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) {
      m.classList.remove('active');
      setTimeout(() => m.remove(), 300);
    }
  },

  openItemModal(secKey, itemId) {
    const sec = this.data.find(s => s.key === secKey);
    const item = sec.items.find(x => x.id === itemId);
    if (!item || !item.isAvailable) return;
    this.currentItem = item;
    this.qty = 1;
    this.selectedOptionIndex = 0;
    this.selectedAddons = {};

    const container = document.getElementById('modals-container');
    container.innerHTML = `
      <div class="modal-overlay" id="item-modal" role="dialog" aria-modal="true" aria-labelledby="modal-item-title">
        <div class="bottom-sheet" onclick="event.stopPropagation()">
          <button class="modal-close" onclick="app.closeModal('item-modal')" aria-label="Close">✕</button>
          <div id="modal-content"></div>
        </div>
      </div>
    `;
    requestAnimationFrame(() => document.getElementById('item-modal').classList.add('active'));
    document.getElementById('item-modal').addEventListener('click', () => this.closeModal('item-modal'));
    this.renderItemModalContent();
  },

  renderItemModalContent() {
    const item = this.currentItem;
    const content = document.getElementById('modal-content');
    if (!content) return;

    let optionsHtml = '';
    if (item.options) {
      optionsHtml = `<div style="margin-bottom:20px;">` + item.options.map((opt, idx) => {
        const active = this.selectedOptionIndex === idx ? 'active' : '';
        const optName = opt[1] || this.t('choice');
        return `<button class="addon-row ${active}" aria-pressed="${active ? 'true' : 'false'}" onclick="app.selectOption(${idx})">
          <span class="addon-name">${optName}</span><span class="addon-price">${opt[0]} ${this.t('egp')}</span></button>`;
      }).join('') + `</div>`;
    }

    let addonsHtml = '';
    if (item.addons && item.addons.length) {
      addonsHtml = `<h4 class="addon-group-title">${this.t('addons_title')}</h4><div style="margin-bottom:20px;">` + item.addons.map((a, idx) => {
        const active = this.selectedAddons[idx] ? 'active' : '';
        const aName = this.lang === 'ar' ? a.nameAr : a.nameEn;
        return `<button class="addon-row ${active}" aria-pressed="${active ? 'true' : 'false'}" onclick="app.toggleAddon(${idx})">
          <span class="addon-name">${aName}</span><span class="addon-price">+${a.price} ${this.t('egp')}</span></button>`;
      }).join('') + `</div>`;
    }

    const title = this.lang === 'ar' ? item.nameAr : item.nameEn;
    const desc = this.lang === 'ar' ? item.descAr : item.descEn;
    const img = item.image ? `<img src="assets/${item.image}" class="modal-img" alt="${title}" style="display:block;">` : '';

    content.innerHTML = `
      ${img}<h3 class="modal-title" id="modal-item-title">${title}</h3><p class="modal-desc">${desc}</p>
      ${optionsHtml}${addonsHtml}
      <div class="qty-control" role="group" aria-label="Quantity">
        <span>${this.t('qty')}</span>
        <div style="display:flex;gap:15px;align-items:center;">
          <button class="qty-btn" aria-label="Decrease" onclick="app.updateQty(-1)">-</button>
          <span class="qty-num" aria-live="polite">${this.qty}</span>
          <button class="qty-btn" aria-label="Increase" onclick="app.updateQty(1)">+</button>
        </div>
      </div>
      <div class="modal-footer row">
        <div class="modal-total"><span id="modal-total-price">${this.calculateItemTotal()}</span> ${this.t('egp')}</div>
        <button class="btn btn-main" style="flex:0 0 150px" onclick="app.addToCart()">${this.t('add_to_cart')}</button>
      </div>
    `;
  },

  selectOption(idx) { this.selectedOptionIndex = idx; this.renderItemModalContent(); },
  toggleAddon(idx) { if (this.selectedAddons[idx]) delete this.selectedAddons[idx]; else this.selectedAddons[idx] = true; this.renderItemModalContent(); },
  updateQty(dir) { this.qty += dir; if (this.qty < 1) this.qty = 1; if (this.qty > 50) this.qty = 50; this.renderItemModalContent(); },

  calculateItemTotal() {
    if (!this.currentItem) return 0;
    let base = this.currentItem.options ? this.currentItem.options[this.selectedOptionIndex][0] : 0;
    let addonSum = 0;
    Object.keys(this.selectedAddons).forEach(k => addonSum += this.currentItem.addons[k].price);
    return (base + addonSum) * this.qty;
  },

  addToCart() {
    let item = this.currentItem;
    let baseOpt = item.options ? item.options[this.selectedOptionIndex] : null;

    // Prevent adding 0 EGP incorrectly un-configured items
    if (!baseOpt || baseOpt[0] === 0) {
      alert("This item is missing crucial price configurations setup (0 EGP blocked). Please contact restaurant admin.");
      this.closeModal('item-modal');
      return;
    }

    let addonsList = Object.keys(this.selectedAddons).map(k => item.addons[k]);

    const existingIndex = this.cart.findIndex(c => {
      if (c.item.id !== item.id) return false;
      if (c.optionName !== (baseOpt[1] || '')) return false;
      if (c.addons.length !== addonsList.length) return false;

      const cAddonKeys = c.addons.map(a => a.nameEn).sort().join(',');
      const nAddonKeys = addonsList.map(a => a.nameEn).sort().join(',');
      return cAddonKeys === nAddonKeys;
    });

    if (existingIndex !== -1) {
      this.cart[existingIndex].qty += this.qty;
      const addonSum = this.cart[existingIndex].addons.reduce((sum, a) => sum + a.price, 0);
      this.cart[existingIndex].total = (this.cart[existingIndex].optionPrice + addonSum) * this.cart[existingIndex].qty;
    } else {
      this.cart.push({
        cartId: Math.random().toString(36).substr(2, 9), item: item, optionPrice: baseOpt[0],
        optionName: baseOpt[1] || '', addons: addonsList, qty: this.qty, total: this.calculateItemTotal()
      });
    }

    this.saveCart();
    this.closeModal('item-modal');
    this.renderCartFloat();
  },

  saveCart() { localStorage.setItem('fokhara_cart', JSON.stringify(this.cart)); },

  renderCartFloat() {
    const c = document.getElementById('cart-btn-container');
    if (!c) return;
    if (this.cart.length === 0) { c.innerHTML = ''; return; }

    const totalQty = this.cart.reduce((s, x) => s + x.qty, 0);
    c.innerHTML = `
      <button class="cart-float" aria-label="Open Cart" onclick="app.openCartModal()">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l.17-.75z"/></svg>
        <div class="cart-badge">${totalQty}</div>
      </button>
    `;
  },

  openCartModal() {
    const container = document.getElementById('modals-container');
    container.innerHTML = `
      <div class="modal-overlay" id="cart-modal" role="dialog" aria-modal="true" aria-labelledby="modal-cart-title">
        <div class="bottom-sheet" onclick="event.stopPropagation()" style="max-height:95vh;">
          <button class="modal-close" aria-label="Close" onclick="app.closeModal('cart-modal')">✕</button>
          <h3 class="modal-title" id="modal-cart-title">${this.t('cart_title')}</h3>
          <div id="cart-content" style="margin-top:20px;"></div>
        </div>
      </div>
    `;
    requestAnimationFrame(() => document.getElementById('cart-modal').classList.add('active'));
    document.getElementById('cart-modal').addEventListener('click', () => this.closeModal('cart-modal'));
    this.renderCartContent();
  },

  renderCartContent() {
    const content = document.getElementById('cart-content');
    if (!content) return;

    if (this.cart.length === 0) {
      content.innerHTML = `<div style="text-align:center; padding:40px 0; color:var(--muted)">${this.t('empty_cart')}</div>`;
      return;
    }

    let subtotal = 0;
    const itemsHtml = this.cart.map((cartItem, index) => {
      subtotal += cartItem.total;
      const name = this.lang === 'ar' ? cartItem.item.nameAr : cartItem.item.nameEn;
      let meta = cartItem.optionName ? `<div>${app.esc(cartItem.optionName)}</div>` : '';
      if (cartItem.addons.length) meta += cartItem.addons.map(a => this.lang === 'ar' ? app.esc(a.nameAr) : app.esc(a.nameEn)).join(' + ');

      return `
       <div class="cart-item">
         <div class="cart-item-info">
           <div class="cart-item-title">${app.esc(name)}</div>${meta ? `<div class="cart-item-meta">${meta}</div>` : ''}
           <div class="cart-item-price">${cartItem.total} ${this.t('egp')}</div>
         </div>
         <div class="cart-item-actions">
           <div class="qty-control" style="margin:0; padding:4px 8px;">
             <button class="qty-btn" aria-label="Decrease" style="width:24px;height:24px;font-size:16px;" onclick="app.updateCartQty(${index}, -1)">-</button>
             <span class="qty-num" style="font-size:14px; min-width:14px;">${cartItem.qty}</span>
             <button class="qty-btn" aria-label="Increase" style="width:24px;height:24px;font-size:16px;" onclick="app.updateCartQty(${index}, 1)">+</button>
           </div>
           <button class="remove-btn" aria-label="Remove" onclick="app.removeFromCart(${index})">${this.t('remove')}</button>
         </div>
       </div>`;
    }).join('');

    content.innerHTML = `
      <div class="cart-list">${itemsHtml}</div>
      <div class="modal-footer">
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
          <span style="color:var(--muted)">${this.t('subtotal')}</span><span style="font-weight:bold">${subtotal} ${this.t('egp')}</span>
        </div>
        <button class="btn btn-main" style="width:100%" onclick="app.startCheckoutFlow()">${this.t('checkout')} (${subtotal} ${this.t('egp')})</button>
      </div>
    `;
  },

  updateCartQty(index, dir) {
    const ci = this.cart[index]; ci.qty += dir;
    if (ci.qty < 1) { this.removeFromCart(index); return; }
    if (ci.qty > 50) ci.qty = 50;
    const addonSum = ci.addons.reduce((sum, a) => sum + a.price, 0);
    ci.total = (ci.optionPrice + addonSum) * ci.qty;
    this.saveCart(); this.renderCartContent(); this.renderCartFloat();
  },

  removeFromCart(index) {
    this.cart.splice(index, 1); this.saveCart(); this.renderCartContent(); this.renderCartFloat();
    if (this.cart.length === 0) setTimeout(() => this.closeModal('cart-modal'), 500);
  },

  /* --- STAGE 4: CHECKOUT FLOW & WHATSAPP --- */

  startCheckoutFlow() {
    this.closeModal('cart-modal');
    this.checkoutState.type = this.table ? 'dine_in' : 'delivery';
    this.checkoutState.payment.method = null;
    this.checkoutState.payment.screenshotFile = null;

    const container = document.getElementById('modals-container');
    container.innerHTML = `
      <div class="modal-overlay" id="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div class="bottom-sheet" onclick="event.stopPropagation()" style="max-height:95vh;">
          <button class="modal-close" aria-label="Close" onclick="app.closeModal('checkout-modal')">✕</button>
          <h3 class="modal-title" id="checkout-title">${this.t('checkout_details')}</h3>
          <div id="checkout-content" style="margin-top:20px;"></div>
        </div>
      </div>
    `;
    requestAnimationFrame(() => document.getElementById('checkout-modal').classList.add('active'));
    document.getElementById('checkout-modal').addEventListener('click', () => this.closeModal('checkout-modal'));
    this.renderCheckoutForm();
  },

  setOrderType(type) {
    this.checkoutState.type = type;
    this.renderCheckoutForm();
  },
  setPaymentMethod(method) {
    this.checkoutState.payment.method = method;
    this.renderCheckoutForm();
  },
  handleFileUpload(input) {
    if (input.files && input.files[0]) {
      this.checkoutState.payment.screenshotFile = input.files[0];
      this.renderCheckoutForm();
    }
  },

  renderCheckoutForm() {
    const c = document.getElementById('checkout-content');
    if (!c) return;
    const st = this.checkoutState;

    const navTabs = `
      <div class="order-type-tabs" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:20px;">
        <button class="order-type-btn ${st.type === 'dine_in' ? 'active' : ''}" style="padding:10px 5px;" onclick="app.setOrderType('dine_in')"><i class="fas fa-utensils" style="display:block; margin-bottom:6px; font-size:20px;"></i> <span>${this.t('type_dine_in')}</span></button>
        <button class="order-type-btn ${st.type === 'delivery' ? 'active' : ''}" style="padding:10px 5px;" onclick="app.setOrderType('delivery')"><i class="fas fa-motorcycle" style="display:block; margin-bottom:6px; font-size:20px;"></i> <span>${this.t('type_delivery')}</span></button>
        <button class="order-type-btn ${st.type === 'pickup' ? 'active' : ''}" style="padding:10px 5px;" onclick="app.setOrderType('pickup')"><i class="fas fa-shopping-bag" style="display:block; margin-bottom:6px; font-size:20px;"></i> <span>${this.t('type_pickup')}</span></button>
      </div>`;

    const basicFields = `
      <div class="form-group">
        <label class="form-label">${this.t('full_name')} *</label>
        <input type="text" class="form-input" id="cf-name" value="${st.customer.name}" placeholder="${this.t('full_name')}">
      </div>
      <div class="form-group">
        <label class="form-label">${this.t('phone_number')} *</label>
        <input type="tel" class="form-input" id="cf-phone" value="${st.customer.phone}" placeholder="01...">
      </div>
    `;

    let deliveryFields = '';
    if (st.type === 'delivery') {
      deliveryFields = `
        <div class="form-group"><label class="form-label">${this.t('address')} *</label>
          <input type="text" class="form-input" id="cf-address" value="${st.delivery.address}"></div>
        <div class="form-group"><label class="form-label">${this.t('area')} *</label>
          <input type="text" class="form-input" id="cf-area" value="${st.delivery.area}"></div>
        <div style="display:flex;gap:10px;">
          <div class="form-group" style="flex:1"><label class="form-label">${this.t('building')}</label>
            <input type="text" class="form-input" id="cf-building" value="${st.delivery.building}"></div>
          <div class="form-group" style="flex:1"><label class="form-label">${this.t('floor')}</label>
            <input type="text" class="form-input" id="cf-floor" value="${st.delivery.floor}"></div>
          <div class="form-group" style="flex:1"><label class="form-label">${this.t('apartment')}</label>
            <input type="text" class="form-input" id="cf-apt" value="${st.delivery.apartment}"></div>
        </div>
        <div class="form-group"><label class="form-label">${this.t('notes')}</label>
          <input type="text" class="form-input" id="cf-notes" value="${st.delivery.notes}"></div>
      `;
    }

    let paymentFields = `
      <h4 class="addon-group-title" style="margin-top:25px;">${this.t('payment_method')} *</h4>
      <div class="payment-cards">
        <button class="payment-card ${st.payment.method === 'instapay' ? 'active' : ''}" onclick="app.setPaymentMethod('instapay')">
          <img src="assets/instapay-logo.png" alt="InstaPay" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
          <i class="fas fa-bolt" style="display:none; color:#00c05a;"></i>
          <div class="payment-card-name">InstaPay</div>
          <div class="payment-card-desc">Pay securely via InstaPay</div>
        </button>
        <button class="payment-card ${st.payment.method === 'wallet' ? 'active' : ''}" onclick="app.setPaymentMethod('wallet')">
          <img src="assets/wallet-logo.png" alt="Wallet" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
          <i class="fas fa-wallet" style="display:none; color:#007df0;"></i>
          <div class="payment-card-name">Mobile Wallet</div>
          <div class="payment-card-desc">الدفع عن طريق المحفظة</div>
        </button>
      </div>
    `;

    // Dynamic Payment Info Box & Upload Proof
    if (st.payment.method) {
      const subtotal = this.cart.reduce((s, x) => s + x.total, 0);
      const transferTotal = st.type === 'delivery' ? subtotal + config.deliveryFee : subtotal;
      const pAccount = config.payment.instapay.account; // Using explicit mapped structures now
      const pNumber = config.payment.wallet.number;     // As per the prompt configuration fix
      const pVal = st.payment.method === 'instapay' ? pAccount : pNumber;
      const typeStr = st.payment.method === 'instapay' ? 'InstaPay' : 'Wallet';

      let uploadHtml;
      if (st.payment.screenshotFile) {
        const objUrl = URL.createObjectURL(st.payment.screenshotFile);
        uploadHtml = `
            <div style="text-align:center;">
              <img src="${objUrl}" class="file-upload-preview" style="display:block;">
              <button class="remove-btn" onclick="app.checkoutState.payment.screenshotFile=null; app.renderCheckoutForm()">${this.t('remove_img')}</button>
            </div>
          `;
      } else {
        uploadHtml = `
            <div class="file-upload-box" onclick="document.getElementById('pr-input').click()">
              <input type="file" id="pr-input" accept="image/png, image/jpeg" style="display:none" onchange="app.handleFileUpload(this)">
              <i class="fas fa-cloud-upload-alt" style="font-size:24px; color:var(--gold); margin-bottom:10px;"></i>
              <div style="font-weight:bold">${this.t('upload_proof')} *</div>
              <div style="font-size:12px; color:var(--muted); margin-top:5px;">${this.t('upload_proof_sub')}</div>
            </div>
          `;
      }

      paymentFields += `
         <div class="payment-info-box">
           <strong>${this.t('payment_info')}</strong><br>
           ${this.t('transfer_to')} <b>${transferTotal} ${this.t('egp')}</b> ${this.t('via')} ${typeStr} <br>
           <b>${pVal}</b>
         </div>
         ${uploadHtml}
       `;
    }

    c.innerHTML = `
      ${navTabs}
      ${basicFields}
      ${deliveryFields}
      ${paymentFields}
      <div class="modal-message" id="checkout-msg" role="alert" style="display:none; margin-top:15px;"></div>
      <div class="modal-footer" style="padding-bottom:10px;">
        <button class="btn btn-main" style="width:100%" onclick="app.validateAndShowSummary()">${this.t('next')}</button>
      </div>
    `;

    // Persist input states organically since we redraw
    document.querySelectorAll('.form-input').forEach(el => {
      el.addEventListener('input', (e) => {
        const id = e.target.id;
        if (id === 'cf-name') st.customer.name = e.target.value;
        if (id === 'cf-phone') st.customer.phone = e.target.value;
        if (id === 'cf-address') st.delivery.address = e.target.value;
        if (id === 'cf-area') st.delivery.area = e.target.value;
        if (id === 'cf-building') st.delivery.building = e.target.value;
        if (id === 'cf-floor') st.delivery.floor = e.target.value;
        if (id === 'cf-apt') st.delivery.apartment = e.target.value;
        if (id === 'cf-notes') st.delivery.notes = e.target.value;
      });
    });
  },

  validateAndShowSummary() {
    const st = this.checkoutState;
    const msg = document.getElementById('checkout-msg');
    const err = (t) => { msg.style.display = 'block'; msg.className = 'modal-message error'; msg.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ` + t; };
    msg.style.display = 'none';

    if (!st.customer.name || !st.customer.phone) return err(this.t('required_field'));
    if (st.type === 'delivery' && (!st.delivery.address || !st.delivery.area)) return err(this.t('required_field'));
    if (!st.payment.method) return err(this.t('required_field') + ' (' + this.t('payment_method') + ')');
    if (!st.payment.screenshotFile) return err(this.t('required_field') + ' (' + this.t('upload_proof') + ')');

    // The prompt requirement states: do not force table number, no blocking prompts.
    // We let the table be omitted if they selected dine-in but have no table (e.g. they order at counter)


    this.renderCheckoutSummary();
  },

  renderCheckoutSummary() {
    const c = document.getElementById('checkout-content');
    const st = this.checkoutState;
    const subtotal = this.cart.reduce((s, x) => s + x.total, 0);
    const dFee = st.type === 'delivery' ? config.deliveryFee : 0;
    const total = subtotal + dFee;

    let itemsSumHTML = this.cart.map(x => `<div class="summary-row"><span>${x.qty}x ${this.lang === 'ar' ? x.item.nameAr : x.item.nameEn}</span><span>${x.total} ${this.t('egp')}</span></div>`).join('');

    let html = `
      <div class="checkout-summary-box">
        <h4 class="addon-group-title" style="color:var(--gold)">${this.t('full_name')} / ${this.t('phone_number')}</h4>
        <div class="summary-row"><span>${st.customer.name}</span></div>
        <div class="summary-row"><span>${st.customer.phone}</span></div>
      </div>
    `;

    if (st.type === 'delivery') {
      html += `
       <div class="checkout-summary-box">
         <h4 class="addon-group-title" style="color:var(--gold)">${this.t('address')}</h4>
         <div class="summary-row"><span>${st.delivery.address}, ${st.delivery.area}</span></div>
         ${st.delivery.building ? `<div class="summary-row"><span>Bldg: ${st.delivery.building}, Floor: ${st.delivery.floor}, Apt: ${st.delivery.apartment}</span></div>` : ''}
       </div>`;
    } else if (st.type === 'pickup') {
      html += `<div class="checkout-summary-box">
         <h4 class="addon-group-title" style="color:var(--gold)">Pickup from:</h4>
         <div class="summary-row"><span>Fokhara Restaurant</span></div>
       </div>`;
    } else {
      html += `<div class="checkout-summary-box"><div class="summary-row"><span>${this.t('type_dine_in')} (Table: ${this.table})</span></div></div>`;
    }

    html += `
      <div class="checkout-summary-box">
         ${itemsSumHTML}
         <div class="summary-row bold" style="color:#fff;"><span>${this.t('subtotal')}</span><span>${subtotal} ${this.t('egp')}</span></div>
         ${st.type !== 'dine_in' ? `<div class="summary-row"><span>${st.type === 'delivery' ? this.t('delivery_fee') : (this.lang === 'ar' ? 'استلام من المطعم' : 'Pickup')}</span><span>${dFee} ${this.t('egp')}</span></div>` : ''}
         <div class="summary-row bold"><span>${this.t('total')}</span><span>${total} ${this.t('egp')}</span></div>
      </div>
      <div class="checkout-summary-box">
         <div class="summary-row"><span>${this.t('payment_method')}</span><span>${st.payment.method === 'instapay' ? this.t('instapay') : this.t('wallet')}</span></div>
         <div class="summary-row" style="color:var(--gold)"><i class="fas fa-check"></i> ${this.t('upload_proof')}</div>
      </div>
      <div class="modal-message" id="checkout-msg" role="alert" style="display:none; margin-top:15px;"></div>
      <div class="modal-footer" style="padding-bottom:10px;">
        <button class="btn btn-main" style="width:100%" onclick="app.finalSubmitWhatsApp()">${this.t('confirm_order')} (${total} ${this.t('egp')})</button>
      </div>
    `;
    c.innerHTML = html;
  },

  async finalSubmitWhatsApp() {
    const msg = document.getElementById('checkout-msg');
    msg.style.display = 'block';
    msg.className = 'modal-message';
    msg.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> ${this.t('wait')}`;

    // 1. Upload mock proof
    let proofUrl = "N/A";
    try {
      const upload = await api.uploadPaymentProof(this.checkoutState.payment.screenshotFile);
      proofUrl = upload.url;
    } catch (err) {
      console.error(err);
      // fallback without stopping flow entirely if upload fails
    }

    // 2. Build final structure
    const subtotal = this.cart.reduce((s, x) => s + x.total, 0);
    const orderId = api.generateOrderId();
    const st = this.checkoutState;
    const finalOrder = {
      orderId,
      orderType: st.type,
      customer: st.customer,
      table: st.type === 'dine_in' ? this.table : null,
      delivery: st.type === 'delivery' ? { ...st.delivery, fee: config.deliveryFee } : null,
      items: this.cart,
      pricing: { subtotal, deliveryFee: st.type === 'delivery' ? config.deliveryFee : 0, total: subtotal + (st.type === 'delivery' ? config.deliveryFee : 0) },
      payment: { method: st.payment.method, status: 'Screenshot Uploaded', proofUrl },
      timestamp: new Date().toISOString()
    };

    // 3. Generate EXACT WhatsApp text payload requested by User
    const isAr = this.lang === 'ar';
    let text = `${isAr ? 'طلب جديد من منيو فخارة' : 'New Order from Fokhara Menu'}\n\n`;
    text += `${isAr ? 'رقم الطلب' : 'Order No'}: #${orderId}\n\n`;

    let typeTxt = '';
    if (st.type === 'delivery') typeTxt = this.t('type_delivery');
    else if (st.type === 'pickup') typeTxt = this.t('type_pickup');
    else typeTxt = isAr ? 'داخل المطعم' : 'Dine-in';
    text += `${isAr ? 'نوع الطلب' : 'Order Type'}:\n${typeTxt}\n\n`;

    text += `${isAr ? 'بيانات العميل' : 'Customer Info'}:\n`;
    text += `${isAr ? 'الاسم' : 'Name'}: ${st.customer.name}\n`;
    text += `${isAr ? 'رقم الهاتف' : 'Phone'}: ${st.customer.phone}\n\n`;

    if (st.type === 'delivery') {
      text += `${isAr ? 'العنوان' : 'Location'}:\n`;
      text += `${isAr ? 'المنطقة' : 'Area'}: ${st.delivery.area}\n`;
      text += `${isAr ? 'العنوان' : 'Address'}: ${st.delivery.address}\n`;
      if (st.delivery.building) text += `${isAr ? 'العمارة' : 'Building'}: ${st.delivery.building}\n`;
      if (st.delivery.floor) text += `${isAr ? 'الدور' : 'Floor'}: ${st.delivery.floor}\n`;
      if (st.delivery.apartment) text += `${isAr ? 'الشقة' : 'Apartment'}: ${st.delivery.apartment}\n`;
      if (st.delivery.notes) text += `${isAr ? 'ملاحظات' : 'Notes'}: ${st.delivery.notes}\n\n`;
    } else if (st.type === 'dine_in') {
      text += `${isAr ? 'الترابيزة' : 'Table'}:\n${this.table ? this.table : 'N/A'}\n\n`;
    }

    text += `${isAr ? 'الطلب' : 'Order Items'}:\n`;
    this.cart.forEach(c => {
      const itemName = isAr ? c.item.nameAr : c.item.nameEn;
      text += `${c.qty} × ${itemName}\n`;
    });

    const hasAddons = this.cart.some(c => c.addons.length > 0 || c.optionName);
    if (hasAddons) {
      text += `\n${isAr ? 'الإضافات' : 'Add-ons'}:\n`;
      this.cart.forEach(c => {
        if (c.optionName) text += `${c.optionName}\n`;
        if (c.addons.length) {
          text += `${c.addons.map(a => isAr ? a.nameAr : a.nameEn).join(' + ')}\n`;
        }
      });
    }

    text += `\n${isAr ? 'الحساب' : 'Pricing'}:\n`;
    text += `Subtotal: ${finalOrder.pricing.subtotal} ${this.t('egp')}\n`;
    if (st.type === 'delivery') text += `Delivery: ${finalOrder.pricing.deliveryFee} ${this.t('egp')}\n`;
    else if (st.type === 'pickup') text += `Pickup: 0 ${this.t('egp')}\n`;
    text += `TOTAL: ${finalOrder.pricing.total} ${this.t('egp')}\n\n`;

    text += `${isAr ? 'طريقة الدفع' : 'Payment Method'}:\n${finalOrder.payment.method === 'instapay' ? 'InstaPay' : 'Wallet'}\n\n`;
    text += `${isAr ? 'حالة الدفع' : 'Payment Status'}:\n${finalOrder.payment.status}\n`;
    if (proofUrl !== "N/A") {
      text += `(* Proof Attached | URL: ${proofUrl} *)\n`;
    }

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${config.restaurant.whatsapp}?text=${encodedText}`;

    this.activeOrderNumber = orderId;
    this.cart = [];
    this.saveCart();
    this.renderCartFloat();

    // Redirect to WhatsApp implicitly assuming user action!
    window.open(waUrl, '_blank');

    this.openOrderTracker();
  },

  async requestService(type) {
    if (window._lastReq && (Date.now() - window._lastReq) < 5000) return; // debounce
    window._lastReq = Date.now();

    if (!this.table) return;

    if (!confirm(this.t(type === 'waiter' ? 'call_waiter' : 'request_bill') + " - " + this.t('table') + " " + this.table + "?")) return;

    const btn = document.getElementById('req-' + type);
    const orgHtml = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> ${this.t('wait')}`;

    try {
      if (type === 'waiter') await api.callWaiter({ table: this.table });
      else await api.requestBill({ table: this.table });
      btn.innerHTML = `<i class="fas fa-check"></i> ${this.t('req_sent')}`;
      setTimeout(() => btn.innerHTML = orgHtml, 3000);
    } catch (e) {
      btn.innerHTML = `<i class="fas fa-times"></i> ${this.t('error')}`;
      setTimeout(() => btn.innerHTML = orgHtml, 3000);
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  app.init();
});
