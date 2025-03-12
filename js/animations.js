document.querySelectorAll(".animated-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.href;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    this.classList.remove("trigger-animation");
    void this.offsetWidth; 
    this.classList.add("trigger-animation");

    const openLink = () => {
      window.open(href, "_blank");
      this.classList.remove("trigger-animation");
      this.blur();
    };

    if (isMobile) {
      setTimeout(openLink, 800);
    } else {
      openLink();
    }
  });

  link.addEventListener("animationend", function () {
    this.classList.remove("trigger-animation");
    this.blur();
  });
});