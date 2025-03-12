document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var form = this;
  var formData = new FormData(form);
  var result = document.getElementById("result");

  fetch(form.action, { method: "POST", body: formData })
    .then((response) => response.text())
    .then((text) => {
      result.innerHTML = text;
      result.style.display = "block";
      result.offsetWidth;
      result.style.opacity = 1;
      setTimeout(() => {
        result.style.opacity = 0;
        setTimeout(() => result.style.display = "none", 1000);
      }, 3000);
      form.reset();
    })
    .catch((error) => {
      result.innerHTML = "An error occurred: " + error;
      result.style.display = "block";
      result.style.opacity = 1;
      setTimeout(() => {
        result.style.opacity = 0;
        setTimeout(() => result.style.display = "none", 1000);
      }, 3000);
    });
});