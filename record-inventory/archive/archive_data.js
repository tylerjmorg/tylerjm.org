fetch('/record-inventory/records.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('JSON file could not be found.');
      }
      return response.json();
    })
    .then(data => {
      let header = document.createElement('header');

      let title = document.createElement('h1');
        title.textContent = 'Archived Links';
        header.append(title);

      let main = document.createElement('main');

      data.forEach((item) => {
        if (item.dd_archived_official_timestamp || item.dd_archived_qobuz_timestamp) {
        let record = document.createElement('section');
        record.classList.add('record');

        let recordTitle = document.createElement('h2');
        let recordTitleName = document.createElement('span');
        recordTitleName.textContent = item.title;
        recordTitle.append(recordTitleName);

        let recordTitleSeperator = document.createElement('span');
        recordTitleSeperator.textContent = ' — ';
        recordTitle.append(recordTitleSeperator);
        
        let recordArtists = '';
        if (Array.isArray(item.artists)) {
          if (!item.artists.includes("Various")) {
            if (item.artists.length > 2) {
              recordArtists = document.createElement('span');
              recordArtists.textContent = item.artists.slice(0, 2).join(', ');
              recordArtists.textContent += ', ';
              recordTitle.append(recordArtists);

              let etAl = document.createElement('span');
              etAl.classList.add('italic');
              etAl.textContent = 'et al.';
              recordTitle.append(etAl);
            } else {
              recordArtists = document.createElement('span');
              recordArtists.textContent = item.artists.join(', ');
              recordTitle.append(recordArtists);
            }
          } else if (item.artists.includes("Various")) {
            recordArtists = document.createElement('span');
            recordArtists.classList.add('italic');
            recordArtists.textContent = item.artists.join(', ');
            recordTitle.append(recordArtists);
          }
        }

        record.append(recordTitle);

        const officialArchiveUrl = item.dd_archived_official_timestamp ? `https://web.archive.org/web/${item.dd_archived_official_timestamp}/${item.dd_official_url}` : '';

        let artistArchive = '';
        if (item.dd_official_url && item.dd_archived_official_timestamp) {
          let artistArchive = document.createElement('p');

          let artistArchiveLabel = document.createElement('span');
          artistArchiveLabel.textContent = 'Artist Website Archive: ';
          artistArchive.append(artistArchiveLabel);

          let artistArchiveLink = document.createElement('a');
          artistArchiveLink.classList.add('italic');
          artistArchiveLink.href = officialArchiveUrl;
          artistArchiveLink.textContent = officialArchiveUrl;
          artistArchive.append(artistArchiveLink);

          record.append(artistArchive);
        }

        const qobuzArchiveUrl = item.dd_archived_qobuz_timestamp ? `https://web.archive.org/web/${item.dd_archived_qobuz_timestamp}/${item.dd_qobuz_url}` : '';
    
        let qobuzArchive = '';
        if (item.dd_archived_qobuz_timestamp && item.dd_qobuz_url) {
          let qobuzArchive = document.createElement('p');

          let qobuzArchiveLabel = document.createElement('span');

          qobuzArchiveLabel.textContent = 'Qobuz Archive: ';
          qobuzArchive.append(qobuzArchiveLabel);

          let qobuzArchiveLink = document.createElement('a');
          qobuzArchiveLink.classList.add('italic');
          qobuzArchiveLink.href = qobuzArchiveUrl;
          qobuzArchiveLink.textContent = qobuzArchiveUrl;
          qobuzArchive.append(qobuzArchiveLink);

          record.append(qobuzArchive);
        }

        main.append(record);
    }});
      const gridContainer = document.getElementById('archive_data');
      gridContainer.innerHTML = '';
      gridContainer.append(header);
      gridContainer.append(main);
    });