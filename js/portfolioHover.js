document.querySelectorAll(".portfolio-box").forEach((box) => {
  const video = box.querySelector("video");
  if (video) {
    box.addEventListener("mouseenter", () => video.play());
    box.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});
