function startCollapsible() {
  // Select all elements with the class 'collapsible-r' (instead of 'collapsible')
  let coll = document.getElementsByClassName("collapsible-r");

  for (let i = 0; i < coll.length; i++) {
    // Function to handle toggling content and aria attributes
    const toggleContent = function() {
      // Toggle the 'active' class on the clicked div (instead of button)
      this.classList.toggle("active");

      // Get the target content element (using the 'data-target-id' attribute)
      let content = document.getElementById(this.getAttribute("data-target-id"));
      let parentComic = this.closest('.record-grid');

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

      // Update the aria-expanded attribute on the clicked element
      let expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", expanded ? "false" : "true");

      let pressed = this.getAttribute("aria-pressed") === "true";
      this.setAttribute("aria-pressed", pressed ? "false" : "true");

      // Update the aria-hidden and tabindex attributes of the content and its links
      if (content) {
        let contentLinks = content.querySelectorAll(".content-link, .dark-btn, a");
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

    // Add the click event listener
    coll[i].addEventListener("click", toggleContent);

    // Add the 'keydown' event listener to handle keyboard navigation (Enter or Space key)
    coll[i].addEventListener("keydown", function(event) {
      if (event.key === "Enter" || event.key === " ") {
        // Prevent default action for Space (scrolling)
        event.preventDefault();
        toggleContent.call(this);  // Trigger the same function as the click event
      }
    });

    // Make the div focusable for keyboard navigation
    coll[i].setAttribute("tabindex", "0");
  }

  console.log('Collapsible initialized');
}
