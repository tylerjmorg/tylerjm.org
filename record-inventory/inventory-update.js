fetch('/record-inventory/inventory-update.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('JSON file could not be found.');
      }
      return response.json();
    })
    .then(data => {
      let table = '<ul class="update-grid">';
      data.forEach((item, index) => {
        table += '<li class="update-card">';
        table += '<div class="update-card-content">';

        const inventoryUpdate = item.inventory_updated ? `<span class="label">Inventory Updated</span><br><time datetime="${item.inventory_updated}">${item.inventory_updated} UTC</time>` : '';
        const lastInventoryCheck = item.last_inventory_check ? `<span class="label">Last Inventory Check</span><br><time datetime="${item.last_inventory_check}">${item.last_inventory_check} UTC</time>` : '';
        const docInfoUpdated = item.doc_info_updated ? `<span class="label">Doc Info Updated</span><br><time datetime="${item.doc_info_updated}">${item.doc_info_updated} UTC</time>` : '';

        table += inventoryUpdate;
        table += lastInventoryCheck;
        table += docInfoUpdated;
        table += '</div></li>';
      });
      table += '</ul>';
      document.getElementById('update-grid').innerHTML = table;
    })