document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll(".lazy");

  const lazyLoad = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => {
          img.classList.add("loaded");
        };
        observer.unobserve(img);
      }
    });
  };

  const observer = new IntersectionObserver(lazyLoad, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  lazyImages.forEach((img) => observer.observe(img));
});
