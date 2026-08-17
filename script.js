// ==========================================
// 1. Multi-Language (i18n) Data & Logic
// ==========================================
const translations = {
  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_greeting: "Hello, I am",
    hero_name: "Soumalya Mukherjee",
    hero_tagline: "An Indie ",
    hero_desc: "I build lightweight, user-centric, and viral Android utility apps. Passionate about solving real-world user needs with clean UI and high performance.",
    btn_projects: "View Projects",
    btn_resume: "Download Resume",
    title_about: "About Me",
    desc_about: "I am an independent App Creator specializing in Java and Kotlin. My focus is on creating lightweight and viral Android applications like 'PromptMast AI' that deliver seamless experiences across all devices. I manage the entire product lifecycle from conceptualization to APK deployment.",
    title_projects: "Featured Apps",
    project_1_desc: "A viral AI-driven prompt utility application designed for fast and effective prompt generation. Lightweight and zero-lag performance.",
    btn_download_apk: "Download on APKPure"
  },
  bn: {
    nav_about: "আমার সম্পর্কে",
    nav_skills: "দক্ষতা",
    nav_projects: "অ্যাপসমূহ",
    nav_contact: "যোগাযোগ",
    hero_greeting: "নমস্কার, আমি",
    hero_name: "সৌমাল্য মুখার্জী",
    hero_tagline: "আমি একজন ",
    hero_desc: "আমি হালকা, দ্রুতগতির এবং ভাইরাল অ্যান্ড্রয়েড অ্যাপ তৈরি করি। ইউজারদের প্রয়োজন বুঝে ক্লিন UI ও দারুণ পারফরম্যান্স নিশ্চিত করাই আমার লক্ষ্য।",
    btn_projects: "প্রজেক্ট দেখুন",
    btn_resume: "সিভি ডাউনলোড",
    title_about: "আমার সম্পর্কে",
    desc_about: "আমি জাভা এবং কোটলিনে পারদর্শী একজন ইন্ডিপেন্ডেন্ট অ্যাপ ক্রিয়েটর। 'PromptMast AI'-এর মতো হালকা এবং ভাইরাল অ্যাপ তৈরি করা আমার কাজ। অ্যাপের আইডিয়া থেকে শুরু করে কোডিং এবং এপিকে (APK) রিলিজ করা পর্যন্ত পুরো প্রসেস আমি একাই ম্যানেজ করি।",
    title_projects: "আমার অ্যাপসমূহ",
    project_1_desc: "এটি একটি ভাইরাল এআই (AI) প্রম্পট ইউটিলিটি অ্যাপ। দ্রুত প্রম্পট জেনারেট করার জন্য এটি অত্যন্ত হালকা এবং ল্যাগ-ফ্রি ভাবে ডিজাইন করা হয়েছে।",
    btn_download_apk: "APKPure থেকে ডাউনলোড"
  }
};

// Typing Words for different languages
const typingWords = {
  en: ["App Developer", "Creator", "Problem Solver"],
  bn: ["অ্যাপ ডেভেলপার", "ক্রিয়েটর", "প্রবলেম সলভার"]
};

let currentLang = 'en';

const langSelect = document.getElementById('langSelect');
langSelect.addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateLanguage(currentLang);
});

function updateLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

// ==========================================
// 2. Typing Animation (Dynamic Language)
// ==========================================
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typingElement = document.getElementById("typewriter");

function typeEffect() {
  const words = typingWords[currentLang]; // Get words based on current language
  if (wordIndex >= words.length) wordIndex = 0; // fallback reset
  
  const currentWord = Array.from(words[wordIndex]);
  
  if (isDeleting) {
    typingElement.textContent = currentWord.slice(0, charIndex - 1).join("");
    charIndex--;
  } else {
    typingElement.textContent = currentWord.slice(0, charIndex + 1).join("");
    charIndex++;
  }

  let speed = isDeleting ? 50 : 100;
  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }
  setTimeout(typeEffect, speed);
}
document.addEventListener("DOMContentLoaded", typeEffect);


// ==========================================
// 3. Theme Toggle (With SVG Icon Swap)
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const savedTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'light') {
    iconMoon.style.display = 'none';
    iconSun.style.display = 'block';
  } else {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  }
}

// Initial Load
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  localStorage.setItem('theme', theme);
});

// ==========================================
// 4. Mobile Menu Toggle
// ==========================================
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});
