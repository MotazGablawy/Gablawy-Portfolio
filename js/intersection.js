document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.getElementById("about");
  const observerSection = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutSection.classList.add("in-view");
        observerSection.unobserve(aboutSection);
      }
    });
  }, { threshold: 0.3 });

  observerSection.observe(aboutSection);

  const contactSection = document.getElementById("contact");
  const observerContact = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        contactSection.classList.add("in-view");
        observerContact.unobserve(contactSection);
      }
    });
  }, { threshold: 0.3 });

  observerContact.observe(contactSection);

  // li cutting effect
  const items = document.querySelectorAll(".info-grid li");
  const observerItems = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observerItems.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  items.forEach((item) => observerItems.observe(item));
});