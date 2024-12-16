function startRecordGrid() {
  fetch('/record-inventory/records.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('JSON file could not be found.');
      }
      return response.json();
    })
    .then(data => {
      let table = '<ul class="record-grid">';
      data.forEach((item, index) => {
        table += `<li class="record collapsible-r" role="button" aria-pressed="false" aria-expanded="false" tabindex="0" id="aboutMeButton-${index}" data-target-id="aboutMeContent-${index}">`;

        table += `<div class="record-content-wrapper">`

        const mod = item.mod_id ? `-${item.mod_id}` : '';
        const alt = item.img_alt ? ` alt="${item.img_alt}"` : '';
        table += `<div class="img-container" role="none"><img class="record-img foreground-img" src="/record-inventory/covers/${item.id}${mod}.avif"${alt}><img class="record-img background-img" role="presentation" src="/record-inventory/covers/${item.id}${mod}.avif"></div>`;

        const title = item.title ? `<p class="record-title">${item.title}` : '';
        const explicit = item.explicit ? '<span id="explicit" aria-label="Explicit"></span>' : '';
        table += `${title}${explicit}`
        
        let artists = '';
        if (Array.isArray(item.artists)) {
          if (!item.artists.includes("Various")) {
            if (item.artists.length > 2) {
              artists = `<br><span class="artist">${item.artists.slice(0, 2).join(', ')}, <span class="italic">et al.</span></span></p>`;
            } else {
              artists = `<br><span class="artist">${item.artists.join(', ')}</span></p>`;
            }
          } else if (item.artists.includes("Various")) {
            artists = `<br><span class="artist italic">${item.artists}</span></p>`;
          }};
          table += `${artists}`;

          const qty = item.qty ? `<div id="aboutMeContent-${index}" class="content-1" aria-hidden="true"><p><span class="label">Qty</span>: ${item.qty}</p>` : '';
          table += `${qty}`;

          const colorsArray = item.disc_colors;
          const colors = Array.isArray(colorsArray) ? colorsArray.join(', ') : value;
          let colorsLabel = 'Disc Colors';
            if (Array.isArray(colorsArray)) {
                if (colorsArray.length === 1) {
                  colorsLabel = 'Disc Color';
                }
            } else {
              colorsLabel = 'Disc Color';
            }
          table += `<p><span class="label">${colorsLabel}</span>: ${colors}</p>`;

          const genresArray = item.genres;
          const genres = Array.isArray(genresArray) ? genresArray.join(', ') : value;
          let genresLabel = 'Genres';
            if (Array.isArray(genresArray)) {
                if (genresArray.length === 1) {
                  genresLabel = 'Genre';
                }
            } else {
              genresLabel = 'Genre';
            }
          table += `<p><span class="label">${genresLabel}</span>: ${genres}</p>`;

          const labelsArray = item.labels;
          const labels = Array.isArray(labelsArray) ? labelsArray.join(', ') : value;
          let labelsLabel = 'Record Labels';
            if (Array.isArray(labelsArray)) {
                if (labelsArray.length === 1) {
                  labelsLabel = 'Record Label';
                }
            } else {
              labelsLabel = 'Record Label';
            }
          table += `<p><span class="label">${labelsLabel}</span>: ${labels}</p>`;

          table += `<br><p><span class="label">Disc Count</span>: ${item.disc_count}</p>`;
          table += `<p><span class="label">Contents Count</span>: ${item.contents_count}</p>`;
          
          // Start contents naming
          const jacket1DescName = item.jacket1_type ? `${item.jacket1_type}` : 'Jacket';
          const jacket2DescName = item.jacket2_type ? `${item.jacket2_type}` : '';
          const jacket3DescName = item.jacket3_type ? `${item.jacket3_type}` : '';
          const jacket4DescName = item.jacket4_type ? `${item.jacket4_type}` : '';

          const jacket1Name = item.jacket2_qty ? `${item.jacket1_type}` : 'Jacket';
          const jacket2Name = item.jacket2_type ? `${item.jacket2_type}` : '';
          const jacket3Name = item.jacket3_type ? `${item.jacket3_type}` : '';
          const jacket4Name = item.jacket4_type ? `${item.jacket4_type}` : '';

          let jacket1Pocket;
          if (item.jacket1_pocket_qty === 1) {
            jacket1Pocket = ' (Single Pocket)';
          } else if (item.jacket1_pocket_qty === 2) {
            jacket1Pocket = ' (Double Pocket)';
          } else if (item.jacket1_pocket_qty === 3) {
            jacket1Pocket = ' (Triple Pocket)';
          } else {
            jacket1Pocket = '';
          }
          
          let jacket2Pocket;
          if (item.jacket2_pocket_qty === 1) {
            jacket2Pocket = ' (Single Pocket)';
          } else if (item.jacket2_pocket_qty === 2) {
            jacket2Pocket = ' (Double Pocket)';
          } else if (item.jacket2_pocket_qty === 3) {
            jacket2Pocket = ' (Triple Pocket)';
          } else {
            jacket2Pocket = '';
          }

          let jacket3Pocket;
          if (item.jacket3_pocket_qty === 1) {
            jacket3Pocket = ' (Single Pocket)';
          }
          if (item.jacket3_pocket_qty === 2) {
            jacket3Pocket = ' (Double Pocket)';
          }
          if (item.jacket3_pocket_qty === 3) {
            jacket3Pocket = ' (Triple Pocket)';
          } else {
            jacket3Pocket = '';
          }

          let jacket4Pocket;
          if (item.jacket4_pocket_qty === 1) {
            jacket4Pocket = ' (Single Pocket)';
          }
          if (item.jacket4_pocket_qty === 2) {
            jacket4Pocket = ' (Double Pocket)';
          }
          if (item.jacket4_pocket_qty === 3) {
            jacket4Pocket = ' (Triple Pocket)';
          } else {
            jacket4Pocket = '';
          }

          const digitalDownloadSlip1Fate = item.digital_download_slip1_fate ? `${item.digital_download_slip1_fate}` : '';
          const digitalDownloadSlip2Fate = item.digital_download_slip2_fate ? `, 2nd is ${item.digital_download_slip2_fate}` : '';
          const digitalDownloadSlip3Fate = item.digital_download_slip3_fate ? `, 3rd is ${item.digital_download_slip3_fate}` : '';
          const digitalDownloadSlipFates = item.digital_download_slip1_fate ? `(${digitalDownloadSlip1Fate}${digitalDownloadSlip2Fate}${digitalDownloadSlip3Fate})` : '';

          const jacket1Desc = `${jacket1DescName}${jacket1Pocket}`;
          const jacket2Desc = `${jacket2DescName}${jacket2Pocket}`;
          const jacket3Desc = `${jacket3DescName}${jacket3Pocket}`;
          const jacket4Desc = `${jacket4DescName}${jacket4Pocket}`;
          const disc1Name = item.disc1_type ? `${item.disc1_type}` : 'Disc';
          const disc2Name = item.disc2_type ? `${item.disc2_type}` : '';
          const disc3Name = item.disc3_type ? `${item.disc3_type}` : '';
          const disc4Name = item.disc4_type ? `${item.disc4_type}` : '';
          const disc5Name = item.disc5_type ? `${item.disc5_type}` : '';
          const disc6Name = item.disc6_type ? `${item.disc6_type}` : '';
          const disc7Name = item.disc7_type ? `${item.disc7_type}` : '';
          const disc8Name = item.disc8_type ? `${item.disc8_type}` : '';
          const other1Name = item.other_item1_type ? `${item.other_item1_type}` : '';
          const other2Name = item.other_item2_type ? `${item.other_item2_type}` : '';
          const other3Name = item.other_item3_type ? `${item.other_item3_type}` : '';
          const other4Name = item.other_item4_type ? `${item.other_item4_type}` : '';
          const other5Name = item.other_item5_type ? `${item.other_item5_type}` : '';
          const other6Name = item.other_item6_type ? `${item.other_item6_type}` : '';
          // End contents naming

          // Start contents counting
          const jacket1 = item.jacket1_qty ? `<br>${item.jacket1_qty} - ${jacket1Desc}` : '';
          const jacket2 = item.jacket2_qty ? `<br>${item.jacket2_qty} - ${jacket2Desc}` : '';
          const jacket3 = item.jacket3_qty ? `<br>${item.jacket3_qty} - ${jacket3Desc}` : '';
          const jacket4 = item.jacket4_qty ? `<br>${item.jacket4_qty} - ${jacket4Desc}` : '';
          const innerSleeve = item.inner_sleeve_qty ? `<br>${item.inner_sleeve_qty} - Inner-sleeve` : '';
          const outerSleeve = item.outer_sleeve_qty ? `<br>${item.outer_sleeve_qty} - Outer-sleeve` : '';
          const poster = item.poster_qty ? `<br>${item.poster_qty} - Poster` : '';
          const envelope = item.envelope_qty ? `<br>${item.envelope_qty} - Envelope` : '';
          const albumPhoto = item.album_photo_qty ? `<br>${item.album_photo_qty} - Album Photo` : '';
          const songLetter = item.song_letter_qty ? `<br>${item.song_letter_qty} - Song Letter` : '';
          const hypeSticker = item.hype_sticker_qty ? `<br>${item.hype_sticker_qty} - Hype Sticker` : '';
          const songLyricsBooklet = item.song_lyrics_booklet_qty ? `<br>${item.song_lyrics_booklet_qty} - Song Lyrics Booklet` : '';
          const logoPhoto = item.logo_photo_qty ? `<br>${item.logo_photo_qty} - Logo Photo` : '';
          const photoAlbumBooklet = item.photo_album_booklet_qty ? `<br>${item.photo_album_booklet_qty} - Photo Album Booklet` : '';
          const other1 = item.other_item1_qty ? `<br>${item.other_item1_qty} - ${other1Name}` : '';
          const other2 = item.other_item2_qty ? `<br>${item.other_item2_qty} - ${other2Name}` : '';
          const other3 = item.other_item3_qty ? `<br>${item.other_item3_qty} - ${other3Name}` : '';
          const other4 = item.other_item4_qty ? `<br>${item.other_item4_qty} - ${other4Name}` : '';
          const other5 = item.other_item5_qty ? `<br>${item.other_item5_qty} - ${other5Name}` : '';
          const other6 = item.other_item6_qty ? `<br>${item.other_item6_qty} - ${other6Name}` : '';
          const digitalDownloadSlip = item.digital_download_slip_qty ? `<br>${item.digital_download_slip_qty} - Digital Download Slip ${digitalDownloadSlipFates}` : '';
          const contents = `${jacket1}${jacket2}${jacket3}${jacket4}${innerSleeve}${outerSleeve}${poster}${envelope}${albumPhoto}${songLetter}${hypeSticker}${songLyricsBooklet}${logoPhoto}${photoAlbumBooklet}${other1}${other2}${other3}${other4}${other5}${other6}${digitalDownloadSlip}`;
          // End contents counting

          table += `<br><p><span class="label">Contents Description</span>:${contents}</p>`;

          //Goldmine
          const jacket1Goldmine = item.jacket1_goldmine ? `<br>${jacket1Name} - ${item.jacket1_goldmine}` : '';
          const jacket2Goldmine = item.jacket2_goldmine ? `<br>${jacket2Name} - ${item.jacket2_goldmine}` : '';
          const jacket3Goldmine = item.jacket3_goldmine ? `<br>${jacket3Name} - ${item.jacket3_goldmine}` : '';
          const jacket4Goldmine = item.jacket4_goldmine ? `<br>${jacket4Name} - ${item.jacket4_goldmine}` : '';
          const disc1Goldmine = item.disc1_goldmine ? `<br>${disc1Name} - ${item.disc1_goldmine}` : '';
          const disc2Goldmine = item.disc2_goldmine ? `<br>${disc2Name} - ${item.disc2_goldmine}` : '';
          const disc3Goldmine = item.disc3_goldmine ? `<br>${disc3Name} - ${item.disc3_goldmine}` : '';
          const disc4Goldmine = item.disc4_goldmine ? `<br>${disc4Name} - ${item.disc4_goldmine}` : '';
          const disc5Goldmine = item.disc5_goldmine ? `<br>${disc5Name} - ${item.disc5_goldmine}` : '';
          const disc6Goldmine = item.disc6_goldmine ? `<br>${disc6Name} - ${item.disc6_goldmine}` : '';
          const disc7Goldmine = item.disc7_goldmine ? `<br>${disc7Name} - ${item.disc7_goldmine}` : '';
          const disc8Goldmine = item.disc8_goldmine ? `<br>${disc8Name} - ${item.disc8_goldmine}` : '';
          const goldmines = `${jacket1Goldmine}${jacket2Goldmine}${jacket3Goldmine}${jacket4Goldmine}${disc1Goldmine}${disc2Goldmine}${disc3Goldmine}${disc4Goldmine}${disc5Goldmine}${disc6Goldmine}${disc7Goldmine}${disc8Goldmine}`;

          table += `<br><p><span class="label">Goldmine<sup>®</sup> Conditions</span>:${goldmines}</p>`;
          //Goldmine

          const listened = item.listened ? '<br><p><span class="label">Listened</span>: Yes</span></p>' : '<br><p><span class="label">Listened</span>: No</span></p>';
          table += listened;

          const releaseCode = item.id ? `r${item.id}` : '';
          table += `<p><span class="label">Discogs Release Code</span>: <a href="https://www.discogs.com/release/${item.id}" tabindex="-1" aria-hidden="true" class="content-link">${releaseCode}</a></p>`;
          
          const ddYes = item.dd_yes_url ? `<a href="${item.dd_yes_url}" tabindex="-1" class="content-link">Yes</a>` : 'Yes';
          const ddNo = item.dd_no_url ? `<a href="${item.dd_no_url}" tabindex="-1" class="content-link">No</a>` : `No`;
          const ddNA = item.dd ? 'N/A' : '';
          let dd;
          if (item.dd === 'Yes') {
            dd = ddYes;
          } else if (item.dd === 'No') {
            dd = ddNo;
          } else if (item.dd === 'N/A') {
            dd = ddNA;
          } else {
            dd = ''; // Optional, in case dd is undefined or has an unexpected value
          }
          table += `<p><span class="label">Digitally Downloaded</span>: ${dd}</p>`;

          const artistRegions = item.dd_official_regions ? ` [${item.dd_official_regions.join(', ')} Only]` : '';
          const artistFormats = item.dd_official_formats ? ` (${item.dd_official_formats.join(', ')}${artistRegions})` : '';
          const artistWebsite = item.dd_official_url ? `<br><a href="${item.dd_official_url}" aria-hidden="true" tabindex="-1" class="content-link">Artist Website${artistFormats}</a>` : '';
          const qobuz = item.dd_qobuz_url ? `<br><a href="${item.dd_qobuz_url}" aria-hidden="true" tabindex="-1" class="content-link">Qobuz</a>` : '';

          let downloadWebsites;
          if (item.dd === "Yes" || item.dd === "No") {
            downloadWebsites = `<br><p>Downloads available on${artistWebsite}${qobuz}</p>`;
          } else {
            downloadWebsites = '';
          }

          table += downloadWebsites;

        table += '</div></li>';
      });
      table += '</ul>'; // Ensure the <ul> is closed properly
      document.getElementById('record-grid').innerHTML = table;
      startCollapsible();
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
      document.getElementById('record-grid').innerHTML = 'Error loading records.';
    });
  }
