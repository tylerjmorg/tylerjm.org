function startCollapsible() {
// Select all elements with the class 'collapsible-r' (instead of 'collapsible')
let coll = document.getElementsByClassName("collapsible-r");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // Toggle the 'active' class on the clicked div (instead of button)
    this.classList.toggle("active");

    // Get the target content element (using the 'data-target-id' attribute)
    let content = document.getElementById(this.getAttribute("data-target-id"));
    let parentComic = this.closest('.record-grid');

    // Debugging: Check if content is found
    console.log("Clicked element:", this);
    console.log("Next sibling element:", content);

    // Handle case when content is null
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
      // Optional: Provide feedback to the user or take alternative actions
    }
  });
}

// Accessible for screen readers and tab indexing (for div elements)
document.querySelectorAll("[id^='aboutMeButton-']").forEach(li => {
  li.addEventListener("click", function() {
    let targetId = this.getAttribute("data-target-id");
    let element = document.getElementById(targetId);
    let contentLinks = element ? element.querySelectorAll(".content-link, .dark-btn, a") : [];

    if (this.getAttribute("aria-expanded") === "true") {
      this.setAttribute("aria-expanded", "false");
      if (element) {
        element.setAttribute("aria-hidden", "true");
        contentLinks.forEach(link => link.setAttribute("tabindex", "-1"));
      }
    } else {
      this.setAttribute("aria-expanded", "true");
      if (element) {
        element.setAttribute("aria-hidden", "false");
        contentLinks.forEach(link => link.setAttribute("tabindex", "0"));
      }
    }
  });
});

console.log('Collapsible initialized');
}