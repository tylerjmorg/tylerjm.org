// File built from records.mjs v0.5.9 on 2025-01-09T12:57:20.916Z
  let coll = document.getElementsByClassName('collapsible-r');

  for (let i = 0; i < coll.length; i++) {
    const toggleContent = function() {
      this.classList.toggle('active');

      let content = document.getElementById(this.getAttribute('data-target-id'));
      let parentComic = this.closest('.record-grid');

      if (content && content.classList.contains("content-1")) {
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          parentComic.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          parentComic.style.maxHeight = parentComic.scrollHeight + content.scrollHeight + 'px';
        }
      } else {
        console.error('No content element found for:', this);
      }

      let expanded = this.getAttribute('aria-expanded') === 'true';
      this.ariaExpanded = expanded ? 'false' : 'true';

      let pressed = this.getAttribute('aria-pressed') === 'true';
      this.ariaPressed = pressed ? 'false' : 'true';

      if (content) {
        let contentLinks = content.querySelectorAll('.content-link, a');
        if (expanded) {
          content.ariaHidden = 'true';
          contentLinks.forEach(link => link.tabIndex = '-1');
          contentLinks.forEach(link => link.ariaHidden = 'true');
        } else {
          content.ariaHidden = 'false';
          contentLinks.forEach(link => link.tabIndex = '0');
          contentLinks.forEach(link => link.ariaHidden = 'false');
        }
      }
    };

    coll[i].addEventListener('click', toggleContent);

    coll[i].addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleContent.call(this);
      }
    });

    coll[i].tabIndex = '0';
  }