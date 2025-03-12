document.addEventListener("DOMContentLoaded", function () {
  const emailLink = document.getElementById("emailLink");
  function isDesktop() {
    return window.innerWidth > 768;
  }

  emailLink.addEventListener("click", function (e) {
    if (isDesktop()) {
      e.preventDefault();
      const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=motazismailmohamed@gmail.com";
      window.open(gmailComposeUrl, "_blank");
    }
  });
});
