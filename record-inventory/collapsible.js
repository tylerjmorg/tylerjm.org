// Document built: 2024-12-17T00:23:25.733Z v0.3.0
  let coll = document.getElementsByClassName("collapsible-r");

  for (let i = 0; i < coll.length; i++) {
    const toggleContent = function() {
      this.classList.toggle("active");

      let content = document.getElementById(this.getAttribute("data-target-id"));
      let parentComic = this.closest('.record-grid');

      if (content && content.classList.contains("content-1")) {
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          parentComic.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          parentComic.style.maxHeight = parentComic.scrollHeight + content.scrollHeight + "px";
        }
      } else {
        console.error("No content element found for:", this);
      }

      let expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", expanded ? "false" : "true");

      let pressed = this.getAttribute("aria-pressed") === "true";
      this.setAttribute("aria-pressed", pressed ? "false" : "true");

      if (content) {
        let contentLinks = content.querySelectorAll(".content-link, a");
        if (expanded) {
          content.setAttribute("aria-hidden", "true");
          contentLinks.forEach(link => link.setAttribute("tabindex", "-1"));
          contentLinks.forEach(link => link.setAttribute("aria-hidden", "true"));
        } else {
          content.setAttribute("aria-hidden", "false");
          contentLinks.forEach(link => link.setAttribute("tabindex", "0"));
          contentLinks.forEach(link => link.setAttribute("aria-hidden", "false"));
        }
      }
    };

    coll[i].addEventListener("click", toggleContent);

    coll[i].addEventListener("keydown", function(event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleContent.call(this);
      }
    });

    coll[i].setAttribute("tabindex", "0");
  }