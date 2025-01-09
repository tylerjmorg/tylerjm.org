fetch('/record-inventory/records.json')
.then(response => {
  if (!response.ok) {
    throw new Error('JSON file could not be found.');
  }
  return response.json();
})
.then(data => {
  const header = createHeader();
  const main = document.createElement('main');

  data.forEach(item => {
    if (item.dd_archived_official_timestamp || item.dd_archived_qobuz_timestamp) {
      const record = createRecordSection(item);
      main.append(record);
    }
  });

  const gridContainer = document.getElementById('archive_data');
  gridContainer.innerHTML = '';
  gridContainer.append(header);
  gridContainer.append(main);
});

function createHeader() {
  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = 'Archived Links';
  header.append(title);
  return header;
}

function createRecordSection(item) {
  const record = document.createElement('section');
  record.classList.add('record');

  const recordTitle = createRecordTitle(item);
  record.append(recordTitle);

  if (item.dd_official_url && item.dd_archived_official_timestamp) {
    const artistArchive = createArchiveLink('Artist Website Archive: ', item.dd_archived_official_timestamp, item.dd_official_url);
    record.append(artistArchive);
  }

  if (item.dd_qobuz_url && item.dd_archived_qobuz_timestamp) {
    const qobuzArchive = createArchiveLink('Qobuz Archive: ', item.dd_archived_qobuz_timestamp, item.dd_qobuz_url);
    record.append(qobuzArchive);
  }

  return record;
}

function createRecordTitle(item) {
  const recordTitle = document.createElement('h2');

  const recordTitleName = document.createElement('span');
  recordTitleName.textContent = item.title;
  recordTitle.append(recordTitleName);

  const recordTitleSeperator = document.createElement('span');
  recordTitleSeperator.textContent = ' — ';
  recordTitle.append(recordTitleSeperator);

  const recordArtists = document.createElement('span');
  if (Array.isArray(item.artists)) {
    if (item.artists.includes("Various")) {
      recordArtists.classList.add('italic');
      recordArtists.textContent = item.artists.join(', ');
    } else if (item.artists.length > 2) {
      recordArtists.textContent = item.artists.slice(0, 2).join(', ') + ', ';
      const etAl = document.createElement('span');
      etAl.classList.add('italic');
      etAl.textContent = 'et al.';
      recordArtists.append(etAl);
      recordTitle.append(recordArtists);
    } else {
      recordArtists.textContent = item.artists.join(', ');
    }
  }
  recordTitle.append(recordArtists);

  return recordTitle;
}

function createArchiveLink(labelText, timestamp, url) {
  const archive = document.createElement('p');

  const archiveLabel = document.createElement('span');
  archiveLabel.textContent = labelText;
  archive.append(archiveLabel);

  const archiveLink = document.createElement('a');
  archiveLink.classList.add('italic');
  archiveLink.href = `https://web.archive.org/web/${timestamp}/${url}`;
  archiveLink.textContent = `https://web.archive.org/web/${timestamp}/${url}`;
  archive.append(archiveLink);

  return archive;
}