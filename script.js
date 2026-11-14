/* ============================================================
 * 全球最富有的十二个人 TOP12
 * 数据 + 渲染 + 中英文切换 + 3D 人物插槽预留
 * ============================================================ */

/* ---------- i18n 字典 ---------- */
const I18N = {
  zh: {
    title: "全球最富有的十二个人",
    subtitle: "估算净资产",
    unit: "单位：亿美元",
    hint3d: "预留 3D 人物插槽，可在此切换",
    btn3d_off: "3D 人物效果：关闭",
    btn3d_on: "3D 人物效果：开启",
    age_unit: "岁",
    country_us: "美国",
    networth_unit: "亿美元",
    footer: "数据截至 2026 年 10 月 13 日（Bloomberg Billionaires Index），净资产每日波动。",
    three_badge: "3D",
  },
  en: {
    title: "The 12 Richest People in the World",
    subtitle: "Estimated Net Worth",
    unit: "Unit: USD 100M",
    hint3d: "3D character slot reserved — toggle here",
    btn3d_off: "3D Effect: OFF",
    btn3d_on: "3D Effect: ON",
    age_unit: "yrs",
    country_us: "United States",
    networth_unit: "B USD",
    footer: "As of Oct 13, 2026 (Bloomberg Billionaires Index). Net worth fluctuates daily.",
    three_badge: "3D",
  },
};

let lang = "zh";

function t(key) {
  return I18N[lang][key] || key;
}

const PEOPLE = [
  {
    rank: 1,
    nameCn: "埃隆·马斯克",
    nameEn: "Elon Musk",
    age: 55,
    country: "美国",
    networth: 9660,
    photo: "https://i.pravatar.cc/400?img=12",
    companies: [
      { name: "Tesla", cls: "tesla" },
      { name: "SpaceX", cls: "spacex" },
    ],
  },
  {
    rank: 2,
    nameCn: "杰夫·贝索斯",
    nameEn: "Jeff Bezos",
    age: 62,
    country: "美国",
    networth: 3690,
    photo: "https://i.pravatar.cc/400?img=15",
    companies: [
      { name: "amazon", cls: "amazon" },
      { name: "Blue Origin", cls: "blueorigin" },
    ],
  },
  {
    rank: 3,
    nameCn: "拉里·佩奇",
    nameEn: "Larry Page",
    age: 53,
    country: "美国",
    networth: 3020,
    photo: "https://i.pravatar.cc/400?img=33",
    companies: [{ name: "Google", cls: "google" }],
  },
  {
    rank: 4,
    nameCn: "谢尔盖·布林",
    nameEn: "Sergey Brin",
    age: 53,
    country: "美国",
    networth: 2810,
    photo: "https://i.pravatar.cc/400?img=51",
    companies: [{ name: "Google", cls: "google" }],
  },
  {
    rank: 5,
    nameCn: "马克·扎克伯格",
    nameEn: "Mark Zuckerberg",
    age: 42,
    country: "美国",
    networth: 2690,
    photo: "https://i.pravatar.cc/400?img=8",
    companies: [{ name: "Meta", cls: "meta" }],
  },
  {
    rank: 6,
    nameCn: "迈克尔·戴尔",
    nameEn: "Michael Dell",
    age: 61,
    country: "美国",
    networth: 2640,
    photo: "https://i.pravatar.cc/400?img=68",
    companies: [{ name: "DELL Technologies", cls: "dell" }],
  },
  {
    rank: 7,
    nameCn: "拉里·埃里森",
    nameEn: "Larry Ellison",
    age: 82,
    country: "美国",
    networth: 1940,
    photo: "https://i.pravatar.cc/400?img=59",
    companies: [{ name: "ORACLE", cls: "oracle" }],
  },
  {
    rank: 8,
    nameCn: "史蒂夫·鲍尔默",
    nameEn: "Steve Ballmer",
    age: 70,
    country: "美国",
    networth: 1900,
    photo: "https://i.pravatar.cc/400?img=60",
    companies: [{ name: "Microsoft", cls: "microsoft" }],
  },
  {
    rank: 9,
    nameCn: "黄仁勋",
    nameEn: "Jensen Huang",
    age: 63,
    country: "美国",
    networth: 1890,
    photo: "https://i.pravatar.cc/400?img=53",
    companies: [{ name: "NVIDIA", cls: "nvidia" }],
  },
  {
    rank: 10,
    nameCn: "沃伦·巴菲特",
    nameEn: "Warren Buffett",
    age: 96,
    country: "美国",
    networth: 1480,
    photo: "https://i.pravatar.cc/400?img=52",
    companies: [{ name: "Berkshire Hathaway", cls: "berkshire" }],
  },
  {
    rank: 11,
    nameCn: "吉姆·沃尔顿",
    nameEn: "Jim Walton",
    age: 78,
    country: "美国",
    networth: 1420,
    photo: "https://i.pravatar.cc/400?img=65",
    companies: [{ name: "Walmart", cls: "walmart" }],
  },
  {
    rank: 12,
    nameCn: "罗布·沃尔顿",
    nameEn: "Rob Walton",
    age: 81,
    country: "美国",
    networth: 1390,
    photo: "https://i.pravatar.cc/400?img=58",
    companies: [{ name: "Walmart", cls: "walmart" }],
  },
];

/* ---------- render ---------- */
function formatNumber(n) {
  return n.toLocaleString("en-US");
}

function countryLabel(cn) {
  // 当前所有人物均为美国，按语言返回；后续可扩展为映射表
  return t("country_us");
}

function networthDisplay(v) {
  // zh: 9660 亿美元；en: 换算为十亿美元 966 B USD
  if (lang === "en") {
    return `${formatNumber(Math.round(v / 10))}<span class="unit"> ${t("networth_unit")}</span>`;
  }
  return `${formatNumber(v)}<span class="unit"> ${t("networth_unit")}</span>`;
}

function renderCards() {
  const grid = document.getElementById("cardGrid");
  grid.innerHTML = PEOPLE.map((p) => {
    const companiesHtml = p.companies
      .map((c) => `<span class="company ${c.cls}">${c.name}</span>`)
      .join("");

    const primaryName = lang === "zh" ? p.nameCn : p.nameEn;
    const secondaryName = lang === "zh" ? p.nameEn : p.nameCn;

    return `
      <article class="card" data-rank="${p.rank}">
        <div class="card-rank">${p.rank}</div>
        <div class="card-portrait" data-3d-slot data-person="${p.nameEn.replace(/\s+/g, "-").toLowerCase()}">
          <img class="portrait-img" src="${p.photo}" alt="${primaryName}" loading="lazy" />
          <span class="three-badge">${t("three_badge")}</span>
        </div>
        <div class="card-body">
          <div class="name-cn">${primaryName}</div>
          <div class="name-en">${secondaryName}</div>
          <div class="meta">${p.age}${t("age_unit")} ｜ ${countryLabel(p.country)}</div>
          <div class="networth">${networthDisplay(p.networth)}</div>
          <div class="companies">${companiesHtml}</div>
        </div>
      </article>
    `;
  }).join("");
}

/* ---------- 应用静态文案翻译 ---------- */
function applyStaticI18n() {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = `${t("title")} TOP12`;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
}

function setLanguage(next) {
  if (next === lang) return;
  lang = next;
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
  applyStaticI18n();
  renderCards();
  // 若 3D 模式开启，重建画布以更新 badge 文案
  if (mode3D) {
    destroy3DCharacters();
    init3DCharacters();
  }
  update3DButton();
}

/* ============================================================
 * 3D 人物效果 —— 预留插槽
 * ------------------------------------------------------------
 * 开启后会在每个 .card-portrait[data-3d-slot] 内插入一个
 * <canvas>，并把原照片淡化。后续只需把 load3DModel() 替换为
 * 真实的 Three.js / model-viewer 加载逻辑即可。
 * ============================================================ */

let mode3D = false;

function init3DCharacters() {
  const slots = document.querySelectorAll(".card-portrait[data-3d-slot]");
  slots.forEach((slot) => {
    if (slot.querySelector("canvas")) return;
    const canvas = document.createElement("canvas");
    canvas.title = "3D 人物模型插槽";
    slot.appendChild(canvas);
    drawPlaceholder3D(canvas, slot.dataset.person || "person");
  });
}

function destroy3DCharacters() {
  document.querySelectorAll(".card-portrait canvas").forEach((c) => c.remove());
}

/* 简易占位动画：旋转的线框人头，示意 3D 效果位置 */
function drawPlaceholder3D(canvas, label) {
  const ctx = canvas.getContext("2d");
  let t = 0;
  let raf;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  function frame() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2 + 6;
    const r = Math.min(w, h) * 0.28;

    // 旋转的人头轮廓
    ctx.save();
    ctx.translate(cx, cy);
    const angle = t * 0.02;
    const sx = Math.cos(angle);
    ctx.scale(sx, 1);

    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -r * 0.3, r * 0.55, 0, Math.PI * 2);
    ctx.stroke();

    // 肩部
    ctx.beginPath();
    ctx.moveTo(-r, r * 0.9);
    ctx.quadraticCurveTo(0, r * 0.1, r, r * 0.9);
    ctx.stroke();

    // 经纬线
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.3, r * 0.55, (r * 0.55 * Math.abs(i)) / 2.5, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 标签
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("3D model slot", cx, h - 10);

    t += 1;
    raf = requestAnimationFrame(frame);
  }
  frame();

  canvas._cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
}

function update3DButton() {
  const btn = document.getElementById("toggle3d");
  const label = mode3D ? t("btn3d_on") : t("btn3d_off");
  btn.innerHTML = `<span class="dot"></span> ${label}`;
}

function set3DMode(on) {
  mode3D = on;
  document.body.classList.toggle("mode-3d", on);
  const btn = document.getElementById("toggle3d");
  btn.classList.toggle("active", on);
  update3DButton();
  if (on) init3DCharacters();
  else destroy3DCharacters();
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyStaticI18n();
  renderCards();

  document.getElementById("toggle3d").addEventListener("click", () => {
    set3DMode(!mode3D);
  });

  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.addEventListener("click", () => setLanguage(b.dataset.lang));
  });
});
