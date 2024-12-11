fetch('/record-inventory/inventory_update.json')
.then(response => {
  if (!response.ok) {
    throw new Error('JSON file could not be found.');
  }
  return response.json();
})
.then(data => {
  let table = document.createElement('ul');
  table.classList.add('update-grid');

  data.forEach((item) => {
    let updateCard = document.createElement('li');
    updateCard.classList.add('update-card');
    
    updateCardContent = document.createElement('div');
    updateCardContent.classList.add('update-card-content');

    if (item.inventory_updated) {
      let inventoryUpdateLabel = document.createElement('span');
      inventoryUpdateLabel.classList.add('label');
      inventoryUpdateLabel.textContent = 'Inventory Updated';
      updateCardContent.append(inventoryUpdateLabel);

      let inventoryUpdateBreak = document.createElement('br');
      updateCardContent.append(inventoryUpdateBreak);

      let inventoryUpdateDatetime = document.createElement('time');
      inventoryUpdateDatetime.setAttribute('datetime', item.inventory_updated);
      inventoryUpdateDatetime.textContent = `${item.inventory_updated} UTC`;
      updateCardContent.append(inventoryUpdateDatetime);
    }

    if (item.last_inventory_check) {
      let lastInventoryCheckLabel = document.createElement('span');
      lastInventoryCheckLabel.classList.add('label');
      lastInventoryCheckLabel.textContent = 'Last Inventory Check';
      updateCardContent.append(lastInventoryCheckLabel);

      let lastInventoryCheckBreak = document.createElement('br');
      updateCardContent.append(lastInventoryCheckBreak);

      let lastInventoryCheckDatetime = document.createElement('time');
      lastInventoryCheckDatetime.setAttribute('datetime', item.last_inventory_check);
      lastInventoryCheckDatetime.textContent = `${item.last_inventory_check} UTC`;
      updateCardContent.append(lastInventoryCheckDatetime);
    }

    if (item.doc_info_updated) {
      let docInfoUpdatedLabel = document.createElement('span');
      docInfoUpdatedLabel.classList.add('label');
      docInfoUpdatedLabel.textContent = 'Doc Info Updated';
      updateCardContent.append(docInfoUpdatedLabel);

      let docInfoUpdatedBreak = document.createElement('br');
      updateCardContent.append(docInfoUpdatedBreak);

      let docInfoUpdatedDatetime = document.createElement('time');
      docInfoUpdatedDatetime.setAttribute('datetime', item.doc_info_updated);
      docInfoUpdatedDatetime.textContent = `${item.doc_info_updated} UTC`;
      updateCardContent.append(docInfoUpdatedDatetime);
    }

    updateCard.append(updateCardContent);

    table.append(updateCard);
  });
  const gridContainer = document.getElementById('update-grid');
  gridContainer.innerHTML = '';
  gridContainer.append(table);
})