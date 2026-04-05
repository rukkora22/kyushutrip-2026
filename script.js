// ========== HAMBURGER MENU ==========
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const navDrawer = document.getElementById('navDrawer');
const navOverlay = document.getElementById('navOverlay');

function openNav() {
  navDrawer.classList.add('open');
  navOverlay.classList.add('active');
  navDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navDrawer.classList.remove('open');
  navOverlay.classList.remove('active');
  navDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openNav);
closeBtn.addEventListener('click', closeNav);
navOverlay.addEventListener('click', closeNav);

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// ========== SCHEDULE TABS ==========
const mapImages = {
  1: 'img/map.png',
  2: 'img/map.png',
  3: 'img/map.png',
};

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.schedule-panel');
const mapImg = document.getElementById('mapImg');

let currentDay = 1;

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const day = parseInt(tab.dataset.day);
    const direction = day > currentDay ? 'right' : 'left';

    // Update tabs
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    // Update panels with slide animation
    panels.forEach(p => {
      p.classList.remove('active', 'slide-in-left', 'slide-in-right');
    });
    const activePanel = document.querySelector(`.schedule-panel[data-day="${day}"]`);
    if (activePanel) {
      activePanel.classList.add('active', direction === 'right' ? 'slide-in-right' : 'slide-in-left');
    }

    currentDay = day;

    // Update map image
    if (mapImg && mapImages[day]) {
      mapImg.src = mapImages[day];
    }
  });
});

// ========== KEYBOARD ACCESSIBILITY ==========
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
    closeNav();
  }
  if (e.key === 'Escape' && bottomSheet.classList.contains('open')) {
    closeBottomSheet();
  }
});

// ========== BOTTOM SHEET MODAL ==========


// section types:
//  'text'      — accentColor, heading, text, mapUrl?
//  'tags'      — accentColor, heading, rows:[{tag,tagColor,text}], note?, mapUrl?
//  'checklist' — accentColor, heading, items:[string]
//  'budget'    — accentColor, heading, price, note?, breakdownUrl?

const SPOTS = {
  // ===== DAY 1 =====
  kumamoto: {
    dayLabel: 'DAY 1', date: '4/11 Sat', title: '熊本空港にて合流',
    sections: [
      { type: 'tags', accentColor: 'yellow', heading: 'The journey so far',
        rows: [
          { tag: '#宮下家', tagColor: 'blue',  text: '7:15 成田空港出発 → 09:20 熊本空港着' },
          { tag: '#宮﨑家', tagColor: 'green', text: '8:00 福岡宅出発' },
        ], mapUrl: 'https://maps.app.goo.gl/2Rifnp8tW3swDiqV8' },
    ],
  },
  takachiho: {
    dayLabel: 'DAY 1', date: '4/11 Sat', title: '高千穂峡',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: '熊本空港から車で約1時間半', mapUrl: 'https://maps.app.goo.gl/7jNXWFPvv9oLLeHJ9' },
      { type: 'tags', accentColor: 'pink', heading: 'Overview',
        rows: [
          { tag: '#宮下家', tagColor: 'blue',  text: '12:00の回予約' },
          { tag: '#宮﨑家', tagColor: 'green', text: '13:00の回予約' },
        ], note: '空き時間にそれぞれお昼ご飯をとっておくこと🍙' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['ボートに乗って川の秘境めぐり', '周りを散策'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥11,200', note: 'ボート一隻¥5,100×2 + 駐車場¥1,000',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  udo: {
    dayLabel: 'DAY 1', date: '4/11 Sat', title: '鵜戸神宮',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: '高千穂峡から車で約２時間半', mapUrl: 'https://maps.app.goo.gl/bBf73zsNSeZDqBUp6' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: '洞窟内に本殿がある海岸沿いの神社。幸運を祈って投げ入れると願いがかなうという、「運」の文字を刻んだ素焼きの運玉を授与している。',
        linkUrl: 'https://www.udojingu.or.jp/', linkLabel: '公式サイトを確認' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['海岸沿いの鳥居⛩️', '御朱印'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥0',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  'miyazaki-dinner': {
    dayLabel: 'DAY 1', date: '4/11 Sat', title: '宮﨑飯を堪能する夜ご飯',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: 'ホテルに向かう途中でさがす' },
      { type: 'checklist', accentColor: 'green', heading: 'Selection',
        items: ['丸万焼鳥本店（炭火焼き）', '募集中...'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥0',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  nango: {
    dayLabel: 'DAY 1', date: '4/11 Sat', title: '日南海岸南郷プリンスホテル',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: 'ごはんたべてから向かう', mapUrl: 'https://maps.app.goo.gl/up3fBaUW6RRvcsMH9' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: '素泊まりで２部屋予約、予約者はみのりん' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['早起きして朝日を浴びる'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        paidTag: true, price: '¥28,884', note: '1泊×２部屋',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  // ===== DAY 2 =====
  sunrise: {
    dayLabel: 'DAY 2', date: '4/12 Sun', title: '早起きして朝日を拝む',
    sections: [],
  },
  toizaki: {
    dayLabel: 'DAY 2', date: '4/12 Sun', title: '都井岬',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: 'ホテルから車で約４０分', mapUrl: 'https://maps.app.goo.gl/qmunKiGsNdu1TBgo8' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: '野生馬が生息する風光明媚な岬。海を見渡せる昔ながらの灯台があります。',
        linkUrl: 'https://kushima-city.jp/toi/', linkLabel: '公式サイトを確認' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['野生馬と戯れ', '灯台から海を眺める'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥400', note: '駐車場代',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  'kirishima-lunch': {
    dayLabel: 'DAY 2', date: '4/12 Sun', title: '霧島神宮周辺でランチ',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: '都井岬から１時間４５分（霧島神宮まで）', mapUrl: 'https://maps.app.goo.gl/XUh77UH9XdegaFdX7' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: 'うっそうとした森の中にある神社。周辺のカフェやレストランで食事' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['神宮に参拝', 'お昼ご飯'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥0',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  'kirishima-art': {
    dayLabel: 'DAY 2', date: '4/12 Sun', title: '霧島アートの森',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: '霧島神宮から車で４０分', mapUrl: 'https://maps.app.goo.gl/uhCQ9W8PoNPpKfhF8' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: '国内外のアーティストの作品を展示する独創的な複合アート施設。屋内と屋外、両方の展示があります。',
        linkUrl: 'http://open-air-museum.org/', linkLabel: '公式サイトを確認' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: [
          '草間彌生「シャングリラの華」・「あなたこそアート」',
          'ダニ・カラヴァン「べレシート（初めに）」',
          'チェ・ジョンファ「あなたこそアート」',
          'カサグランデ＆リンターラ「森の観測所」',
        ] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥1,280', note: 'チケット代（320円）×４人',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  pulse: {
    dayLabel: 'DAY 2', date: '4/12 Sun', title: 'ザ・パルス霧島',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: '霧島アートの森から車で約４０分', mapUrl: 'https://maps.app.goo.gl/x4g4YZsfkW8AQFth7' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: '夕朝食付き１部屋、15:00からチェックイン可\n予約者ははるか' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['宮﨑飯や堪能ビッフェ', 'ドリンク飲み放題', 'テラスで星空', 'サウナ'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        paidTag: true, price: '¥51,183', note: '1泊×１部屋',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  // ===== DAY 3 =====
  checkout: {
    dayLabel: 'DAY 3', date: '4/13 Mon', title: 'ホテル出発',
    sections: [],
  },
  matsumura: {
    dayLabel: 'DAY 3', date: '4/13 Mon', title: '松むら',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: 'ホテルから車で約２時間５分', mapUrl: 'https://maps.app.goo.gl/h1tCTciP8e25XJhJ7' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: 'おいしい馬刺し屋さん',
        linkUrl: 'https://www.instagram.com/matsu3981/', linkLabel: 'SNSを確認' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['新鮮な馬刺しを堪能する'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥6,000', note: 'ランチ代一人1,500円換算',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  daikanbo: {
    dayLabel: 'DAY 3', date: '4/13 Mon', title: '大観峰展望所',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: '松むらから車で約１時間３０分', mapUrl: 'https://maps.app.goo.gl/DizBrA7YCb7gsvrX8' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: '阿蘇山のカルデラと周辺の渓谷の絶景を楽しめるポイント。軽食を提供する売店もあります。',
        linkUrl: 'https://kumamoto-aso.com/daikambotembojo/', linkLabel: '公式サイトを確認' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['ソフトクリーム'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥1,000', note: 'ソフトクリーム４つ',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  kusasenri: {
    dayLabel: 'DAY 3', date: '4/13 Mon', title: '草千里ヶ浜',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: '大観峰展望所から車で約４５分', mapUrl: 'https://maps.app.goo.gl/zAdSu2KXT9YsVQ1R8' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: '火口跡にあるのどかな草原。遊歩道があり、日本最大の活火山である阿蘇山を一望できます。',
        linkUrl: 'https://kumamoto.guide/spots/detail/210', linkLabel: '公式サイトを確認' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['焙煎所で珈琲ブレイク'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥2,400', note: '珈琲４杯',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  'hakata-dinner': {
    dayLabel: 'DAY 3', date: '4/13 Mon', title: '福岡で最後の晩餐',
    sections: [
      { type: 'text', accentColor: 'yellow', heading: 'The journey so far',
        text: '草千里ヶ浜から車で約２時間（福岡空港）', mapUrl: 'https://maps.app.goo.gl/dg51cBzMG6gFsehNA' },
      { type: 'text', accentColor: 'pink', heading: 'Overview',
        text: '宮﨑家プレゼンツ最高福岡飯' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['募集中'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥0',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
  'hakata-airport': {
    dayLabel: 'DAY 3', date: '4/13 Mon', title: '福岡空港にて解散',
    sections: [
      { type: 'tags', accentColor: 'yellow', heading: 'The journey so far',
        rows: [
          { tag: '#宮下家', tagColor: 'blue',  text: '20:30 福岡空港出発 → 22:30 成田空港着' },
          { tag: '#宮﨑家', tagColor: 'green', text: '19:30 福岡空港出発' },
        ], mapUrl: 'https://maps.app.goo.gl/dg51cBzMG6gFsehNA' },
      { type: 'checklist', accentColor: 'green', heading: 'Must to do',
        items: ['旅の精算', '旅の思い出話', '写真と動画の振り返り'] },
      { type: 'budget', accentColor: 'blue', heading: 'Budget',
        price: '¥0',
        buttonLabel: 'ワリカに入力', buttonUrl: 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ' },
    ],
  },
};

const bsOverlay   = document.getElementById('bsOverlay');
const bottomSheet = document.getElementById('bottomSheet');
const bsClose     = document.getElementById('bsClose');
const bsSubtitle  = document.getElementById('bsSubtitle');
const bsTitle     = document.getElementById('bsTitle');
const bsSlot      = document.getElementById('bsSlot');

function buildMapBtn(url, label = 'Google Map') {
  const btn = document.createElement('a');
  btn.href      = url || '#';
  btn.target    = '_blank';
  btn.rel       = 'noopener';
  btn.className = 'bs-map-btn';
  btn.innerHTML = `${label} <img src="img/icon:map.svg" width="16" height="16" alt="" style="display:block;">`;
  return btn;
}

const WALICA_ICON = `<img src="img/icon:en.svg" width="12" height="12" alt="" style="display:block;">`;

function buildSmallBtn(url, label) {
  const btn = document.createElement('a');
  btn.href      = url || '#';
  btn.target    = '_blank';
  btn.rel       = 'noopener';
  btn.className = 'bs-small-btn';
  btn.innerHTML = `${label} ${WALICA_ICON}`;
  return btn;
}

const WALICA_URL = 'https://walica.jp/group/01KN25PTHR19R27M1BG1SP5XCZ';

function buildSlot(spot) {
  bsSlot.innerHTML = '';

  spot.sections.forEach(section => {

    // ---- BUDGET CARD ----
    if (section.type === 'budget') {
      const card = document.createElement('div');
      card.className = 'bs-budget-card';

      const header = document.createElement('div');
      header.className = 'bs-budget-header';
      const headingHtml = `<div class="bs-group-heading"><span class="bs-group-accent ${section.accentColor}"></span>${section.heading}</div>`;
      const tagHtml = section.paidTag ? `<span class="bs-tag pink">✔️精算済み</span>` : '';
      header.innerHTML = headingHtml + tagHtml;
      card.appendChild(header);

      if (section.price) {
        const price = document.createElement('p');
        price.className = 'bs-price';
        price.textContent = section.price;
        card.appendChild(price);
      }
      if (section.note) {
        const note = document.createElement('p');
        note.className = 'bs-text';
        note.textContent = section.note;
        card.appendChild(note);
      }
      if (section.buttonLabel) {
        card.appendChild(buildSmallBtn(section.buttonUrl, section.buttonLabel));
      }

      bsSlot.appendChild(card);
      return;
    }

    // ---- STANDARD GROUP ----
    const group = document.createElement('div');
    group.className = 'bs-group';

    const headingEl = document.createElement('div');
    headingEl.className = 'bs-group-heading';
    headingEl.innerHTML = `<span class="bs-group-accent ${section.accentColor}"></span>${section.heading}`;
    group.appendChild(headingEl);

    // TEXT
    if (section.type === 'text') {
      if (section.text) {
        const p = document.createElement('p');
        p.className = 'bs-text';
        p.textContent = section.text;
        group.appendChild(p);
      }
      if (section.linkUrl) {
        const a = document.createElement('a');
        a.href = section.linkUrl;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'bs-link-btn';
        a.textContent = section.linkLabel || section.linkUrl;
        group.appendChild(a);
      }
      if (section.mapUrl !== undefined) group.appendChild(buildMapBtn(section.mapUrl));
    }

    // TAGS
    if (section.type === 'tags') {
      (section.rows || []).forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'bs-tag-row';
        rowEl.innerHTML = `<span class="bs-tag ${row.tagColor}">${row.tag}</span><span class="bs-tag-text">${row.text}</span>`;
        group.appendChild(rowEl);
      });
      if (section.note) {
        const note = document.createElement('p');
        note.className = 'bs-note';
        note.textContent = section.note;
        group.appendChild(note);
      }
      if (section.mapUrl !== undefined) group.appendChild(buildMapBtn(section.mapUrl));
    }

    // CHECKLIST
    if (section.type === 'checklist') {
      (section.items || []).forEach(item => {
        const label = document.createElement('label');
        label.className = 'bs-check-label';
        label.innerHTML = `<input type="checkbox" class="checkbox-input"><span class="checkbox-custom"></span><span class="checkbox-text">${item}</span>`;
        group.appendChild(label);
      });
    }

    bsSlot.appendChild(group);
  });
}

function openBottomSheet(spotId) {
  const spot = SPOTS[spotId];
  if (!spot) return;

  bsSubtitle.textContent = `${spot.dayLabel}  ${spot.date}`;
  bsTitle.textContent    = spot.title;
  buildSlot(spot);

  bsOverlay.classList.add('active');
  bottomSheet.classList.add('open');
  bottomSheet.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeBottomSheet() {
  bsOverlay.classList.remove('active');
  bottomSheet.classList.remove('open');
  bottomSheet.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

bsClose.addEventListener('click', closeBottomSheet);
bsOverlay.addEventListener('click', closeBottomSheet);

// Swipe down to close
let touchStartY = 0;
let touchCurrentY = 0;
let isSwiping = false;

bottomSheet.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
  touchCurrentY = touchStartY;
  isSwiping = true;
  bottomSheet.style.transition = 'none';
}, { passive: true });

bottomSheet.addEventListener('touchmove', e => {
  if (!isSwiping) return;
  touchCurrentY = e.touches[0].clientY;
  const diff = touchCurrentY - touchStartY;
  if (diff > 0) {
    bottomSheet.style.transform = `translateX(-50%) translateY(${diff}px)`;
  }
}, { passive: true });

bottomSheet.addEventListener('touchend', () => {
  if (!isSwiping) return;
  isSwiping = false;
  bottomSheet.style.transition = '';
  const diff = touchCurrentY - touchStartY;
  if (diff > 80) {
    bottomSheet.style.transform = '';
    closeBottomSheet();
  } else {
    bottomSheet.style.transform = '';
  }
});

document.querySelectorAll('.sc-content[data-spot]').forEach(el => {
  el.addEventListener('click', () => openBottomSheet(el.dataset.spot));
});

// ========== ANIMATIONS ==========

// 1. Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.revealDelay) || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll([
  '.member-card',
  '.schedule-card',
  '.checklist-group',
  '.h2-heading',
  '.map-container',
  '.schedule-catchcopy',
  '.tabs',
  '.memories-banner',
  '.section-inner > *',
].join(', ')).forEach((el, idx) => {
  el.classList.add('reveal');
  el.dataset.revealDelay = (idx % 5) * 60;
  revealObserver.observe(el);
});

// Fallback: ensure all reveal elements become visible after 2s
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
}, 2000);

// 2. Catchcopy char pop-in
const catchcopy = document.querySelector('.schedule-catchcopy');
if (catchcopy) {
  const html = catchcopy.innerHTML;
  const lines = html.split('<br>');
  let charIndex = 0;
  catchcopy.innerHTML = lines.map(line =>
    [...line].map(char => {
      const delay = charIndex++ * 40;
      if (char === ' ' || char === '\u3000') return char;
      return `<span class="catchcopy-char" style="animation-delay:${delay}ms">${char}</span>`;
    }).join('')
  ).join('<br>');
}
