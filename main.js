// PestGuard Pro — shared behavior
document.addEventListener("DOMContentLoaded", () => {

  /* Header shrink on scroll */
  const header = document.querySelector(".site-header");
  const floatCta = document.querySelector(".float-cta");
  const onScroll = () => {
    const scrolled = window.scrollY > 30;
    if (header) header.classList.toggle("is-scrolled", scrolled);
    if (floatCta) floatCta.classList.toggle("is-visible", window.scrollY > 500);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("is-open");
      const open = links.classList.contains("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => links.classList.remove("is-open"))
    );
  }

  /* Scroll reveal (fade/slide + perimeter line draw) */
  const revealTargets = document.querySelectorAll(".reveal-item, .perimeter-wrap");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible", "reveal");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("is-visible", "reveal"));
  }

  /* Animated stat counters */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const animateCount = (el) => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(el => cIo.observe(el));
  }

  /* Testimonial slider */
  const track = document.querySelector(".t-track");
  if (track) {
    const cards = track.children.length;
    const dotsWrap = document.querySelector(".slider-dots");
    const visible = window.innerWidth >= 1080 ? 3 : window.innerWidth >= 760 ? 2 : 1;
    const pages = Math.max(cards - visible + 1, 1);
    let index = 0;
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      for (let i = 0; i < pages; i++) {
        const b = document.createElement("button");
        if (i === 0) b.classList.add("is-active");
        b.setAttribute("aria-label", "Go to slide " + (i + 1));
        b.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(b);
      }
    }
    function goTo(i) {
      index = i;
      const cardWidth = track.children[0].getBoundingClientRect().width + 24;
      track.style.transform = `translateX(-${cardWidth * index}px)`;
      if (dotsWrap) {
        [...dotsWrap.children].forEach((d, di) => d.classList.toggle("is-active", di === i));
      }
    }
    let auto = setInterval(() => {
      index = (index + 1) % pages;
      goTo(index);
    }, 5000);
    track.addEventListener("mouseenter", () => clearInterval(auto));
  }

  /* Filter buttons (resources / services) */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const filterItems = document.querySelectorAll("[data-category]");
  if (filterBtns.length && filterItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const cat = btn.getAttribute("data-filter");
        filterItems.forEach(item => {
          const match = cat === "all" || item.getAttribute("data-category") === cat;
          item.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* Contact / quote form — front-end only demo submission */
  const form = document.querySelector("[data-quote-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = document.querySelector(".form-success");
      if (success) success.classList.add("is-visible");
      form.reset();
      form.querySelectorAll("input, select, textarea").forEach(f => f.blur());
      if (success) success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
});
