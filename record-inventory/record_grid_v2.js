fetch('/record-inventory/records.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('JSON file could not be found.');
    }
    return response.json();
  })
  .then(data => {
    let table = document.createElement('ul');
    table.classList.add('record-grid');

    data.forEach((item, index) => {
      let card = document.createElement('li');
      card.classList.add('record', 'collapsible-r');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute('data-target-id', `aboutMeContent-${index}`)
      card.id = `aboutMeButton-${index}`;

      let recordContentWrapper = document.createElement('div');
      recordContentWrapper.classList.add('record-content-wrapper');

      let imgContainer = document.createElement('div');
      imgContainer.classList.add('img-container');
      imgContainer.setAttribute('role', 'none');

      let mod = '';
      if (item.mod_id) {
        mod = `-${item.mod_id}`;
      }

      const foregroungImg = document.createElement('img');
      foregroungImg.classList.add('record-img', 'foreground-img');
      foregroungImg.src = `/record-inventory/covers/${item.id}${mod}.avif`;

      if (item.img_alt) {
        foregroungImg.setAttribute('alt', item.img_alt);
      }
      imgContainer.append(foregroungImg);

      let backgroundImg = document.createElement('img');
      backgroundImg.classList.add('record-img', 'background-img');
      backgroundImg.setAttribute('role', 'presentation');
      backgroundImg.src = `/record-inventory/covers/${item.id}${mod}.avif`;
      imgContainer.append(backgroundImg);

      recordContentWrapper.append(imgContainer);

      let title = '';
      if (item.title) {
        title = document.createElement('p');
        title.classList.add('record-title');
        title.textContent = item.title;
        recordContentWrapper.append(title);
      }

      let explicit = '';
      if (item.explicit) {
        explicit = document.createElement('span');
        explicit.id = 'explicit';
        explicit.classList.add('label');
        title.append(explicit);
      }

      let artists = '';
      if (Array.isArray(item.artists)) {
        if (!item.artists.includes("Various")) {
          if (item.artists.length > 2) {
            artists = document.createElement('br');
            title.append(artists);

            let artistSpan = document.createElement('span');
            artistSpan.classList.add('artist');
            artistSpan.textContent = item.artists.slice(0, 2).join(', ');
            artistSpan.textContent += ', ';
            title.append(artistSpan);

            let etAl = document.createElement('span');
            etAl.classList.add('italic');
            etAl.textContent = 'et al.';
            artistSpan.append(etAl);
          } else {
            artists = document.createElement('br');
            title.append(artists);
            let artistSpan = document.createElement('span');
            artistSpan.classList.add('artist');
            artistSpan.textContent = item.artists.join(', ');
            title.append(artistSpan);
          }
        } else if (item.artists.includes("Various")) {
          artists = document.createElement('br');
          title.append(artists);
          let artistSpan = document.createElement('span');
          artistSpan.classList.add('artist', 'italic');
          artistSpan.textContent = item.artists.join(', ');
          title.append(artistSpan);
        }
      }
      card.append(recordContentWrapper);

      let recordContent = document.createElement('div');
      recordContent.classList.add('content-1');
      recordContent.id = `aboutMeContent-${index}`;
      recordContent.setAttribute('aria-hidden', 'true');

      let qty = '';
      if (item.qty) {
        qty = document.createElement('p');
        qtyLabel = document.createElement('span');
        qtyLabel.classList.add('label');
        qtyLabel.textContent = 'Qty';
        qty.append(qtyLabel);

        qty.append(document.createTextNode(`: ${item.qty}`));

        recordContent.append(qty);
      }

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

      let discColors = '';
      if (colors) {
        discColors = document.createElement('p');
        discColorsLabel = document.createElement('span');
        discColorsLabel.classList.add('label');
        discColorsLabel.textContent = colorsLabel;
        discColors.append(discColorsLabel);

        discColors.append(document.createTextNode(`: ${colors}`));

        recordContent.append(discColors);
      }

      const genresArray = item.genres;
      const genreNames = Array.isArray(genresArray) ? genresArray.join(', ') : value;
      let genresLabelName = 'Genres';
        if (Array.isArray(genresArray)) {
          if (genresArray.length === 1) {
            genresLabelName = 'Genre';
          }
        } else {
            genresLabelName = 'Genre';
        }
        
      let genres = '';
      if (genreNames) {
        genres = document.createElement('p');

        genresLabel = document.createElement('span');
        genresLabel.classList.add('label');
        genresLabel.textContent = genresLabelName;
        genres.append(genresLabel);

        genres.append(document.createTextNode(`: ${genreNames}`));

        recordContent.append(genres);
      }

      const labelsArray = item.labels;
      const labelNames = Array.isArray(labelsArray) ? labelsArray.join(', ') : value;
      let labelsLabelName = 'Record Labels';
        if (Array.isArray(labelsArray)) {
          if (labelsArray.length === 1) {
            labelsLabelName = 'Record Label';
          }
        } else {
          labelsLabelName = 'Record Label';
        }

      let labels = '';
      if (item.labels) {
        labels = document.createElement('p');

        labelsLabel = document.createElement('span');
        labelsLabel.classList.add('label');
        labelsLabel.textContent = labelsLabelName;
        labels.append(labelsLabel);

        labels.append(document.createTextNode(`: ${labelNames}`));

        recordContent.append(labels);
      }

      let break1 = '';
      if (item.disc_count || item.contents_count){
        break1 = document.createElement('br');
        recordContent.append(break1);
      }

      let discCount = '';
      if (item.disc_count) {
        discCount = document.createElement('p');

        discCountLabel = document.createElement('span');
        discCountLabel.classList.add('label');
        discCountLabel.textContent = 'Disc Count';
        discCount.append(discCountLabel);

        discCount.append(document.createTextNode(`: ${item.disc_count}`));

        recordContent.append(discCount);
      }

      if (item.contents_count) {
        let contentsCount = document.createElement('p');
        contentsCountLabel = document.createElement('span');
        contentsCountLabel.classList.add('label');
        contentsCountLabel.textContent = 'Contents Count';
        contentsCount.append(contentsCountLabel);

        contentsCount.append(document.createTextNode(`: ${item.contents_count}`));

        recordContent.append(contentsCount);
      }

      // Start contents naming
      const jacket1DescName = item.jacket1_type ? `${item.jacket1_type}` : 'Jacket';
      const jacket2DescName = item.jacket2_type ? `${item.jacket2_type}` : '';
      const jacket3DescName = item.jacket3_type ? `${item.jacket3_type}` : '';
      const jacket4DescName = item.jacket4_type ? `${item.jacket4_type}` : '';

      const jacket1Name = item.jacket2_qty ? `${item.jacket1_type}` : 'Jacket';
      const jacket2Name = item.jacket2_type ? `${item.jacket2_type}` : '';
      const jacket3Name = item.jacket3_type ? `${item.jacket3_type}` : '';
      const jacket4Name = item.jacket4_type ? `${item.jacket4_type}` : '';

      let jacket1Pocket = '';
      if (item.jacket1_pocket_qty === 1) {
        jacket1Pocket = ' (Single Pocket)';
      } else if (item.jacket1_pocket_qty === 2) {
        jacket1Pocket = ' (Double Pocket)';
      } else if (item.jacket1_pocket_qty === 3) {
        jacket1Pocket = ' (Triple Pocket)';
      }
      
      let jacket2Pocket = '';
      if (item.jacket2_pocket_qty === 1) {
        jacket2Pocket = ' (Single Pocket)';
      } else if (item.jacket2_pocket_qty === 2) {
        jacket2Pocket = ' (Double Pocket)';
      } else if (item.jacket2_pocket_qty === 3) {
        jacket2Pocket = ' (Triple Pocket)';
      }

      let jacket3Pocket = '';
      if (item.jacket3_pocket_qty === 1) {
        jacket3Pocket = ' (Single Pocket)';
      }
      if (item.jacket3_pocket_qty === 2) {
        jacket3Pocket = ' (Double Pocket)';
      }
      if (item.jacket3_pocket_qty === 3) {
        jacket3Pocket = ' (Triple Pocket)';
      }

      let jacket4Pocket = '';
      if (item.jacket4_pocket_qty === 1) {
        jacket4Pocket = ' (Single Pocket)';
      }
      if (item.jacket4_pocket_qty === 2) {
        jacket4Pocket = ' (Double Pocket)';
      }
      if (item.jacket4_pocket_qty === 3) {
        jacket4Pocket = ' (Triple Pocket)';
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
      if (item.jacket1_qty || item.inner_sleeve_qty || item.outer_sleeve_qty || item.poster_qty || item.envelope_qty || item.album_photo_qty || item.song_letter_qty || item.hype_sticker_qty || item.song_lyrics_booklet_qty || item.logo_photo_qty || item.photo_album_booklet_qty || item.other_item1_qty) {
        const break2 = document.createElement('br');
        recordContent.append(break2);

        const contents = document.createElement('p');
        contentsLabel = document.createElement('span');
        contentsLabel.classList.add('label');
        contentsLabel.textContent = 'Contents Description';
        contents.append(contentsLabel);

        contents.append(document.createTextNode(': '));

        if (item.jacket1_qty) {
          jacket1Break = document.createElement('br');
          contents.append(jacket1Break);

          contents.append(document.createTextNode(`${item.jacket1_qty} - ${jacket1Desc}`));
        }

        if (item.jacket2_qty) {
          jacket2Break = document.createElement('br');
          contents.append(jacket2Break);

          contents.append(document.createTextNode(`${item.jacket2_qty} - ${jacket2Desc}`));
        }

        if (item.jacket3_qty) {
          jacket3Break = document.createElement('br');
          contents.append(jacket3Break);

          contents.append(document.createTextNode(`${item.jacket3_qty} - ${jacket3Desc}`));
        }

        if (item.jacket4_qty) {
          jacket4Break = document.createElement('br');
          contents.append(jacket4Break);

          contents.append(document.createTextNode(`${item.jacket4_qty} - ${jacket4Desc}`));
        }

        if (item.inner_sleeve_qty) {
          innerSleeveBreak = document.createElement('br');
          contents.append(innerSleeveBreak);

          contents.append(document.createTextNode(`${item.inner_sleeve_qty} - Inner-sleeve`));
        }

        if (item.outer_sleeve_qty) {
          outerSleeveBreak = document.createElement('br');
          contents.append(outerSleeveBreak);

          contents.append(document.createTextNode(`${item.outer_sleeve_qty} - Outer-sleeve`));
        }

        if (item.poster_qty) {
          posterBreak = document.createElement('br');
          contents.append(posterBreak);

          contents.append(document.createTextNode(`${item.poster_qty} - Poster`));
        }

        if (item.envelope_qty) {
          envelopeBreak = document.createElement('br');
          contents.append(envelopeBreak);

          contents.append(document.createTextNode(`${item.envelope_qty} - Envelope`));
        }

        if (item.album_photo_qty) {
          albumPhotoBreak = document.createElement('br');
          contents.append(albumPhotoBreak);

          contents.append(document.createTextNode(`${item.album_photo_qty} - Album Photo`));
        }

        if (item.song_letter_qty) {
          songLetterBreak = document.createElement('br');
          contents.append(songLetterBreak);

          contents.append(document.createTextNode(`${item.song_letter_qty} - Song Letter`));
        }

        if (item.hype_sticker_qty) {
          hypeStickerBreak = document.createElement('br');
          contents.append(hypeStickerBreak);

          contents.append(document.createTextNode(`${item.hype_sticker_qty} - Hype Sticker`));
        }

        if (item.song_lyrics_booklet_qty) {
          songLyricsBookletBreak = document.createElement('br');
          contents.append(songLyricsBookletBreak);

          contents.append(document.createTextNode(`${item.song_lyrics_booklet_qty} - Song Lyrics Booklet`));
        }

        if (item.logo_photo_qty) {
          logoPhotoBreak = document.createElement('br');
          contents.append(logoPhotoBreak);

          contents.append(document.createTextNode(`${item.logo_photo_qty} - Logo Photo`));
        }

        if (item.photo_album_booklet_qty) {
          photoAlbumBookletBreak = document.createElement('br');
          contents.append(photoAlbumBookletBreak);

          contents.append(document.createTextNode(`${item.photo_album_booklet_qty} - Photo Album Booklet`));
        }

        if (item.other_item1_qty) {
          other1Break = document.createElement('br');
          contents.append(other1Break);

          contents.append(document.createTextNode(`${item.other_item1_qty} - ${other1Name}`));
        }

        if (item.other_item2_qty) {
          other2Break = document.createElement('br');
          contents.append(other2Break);

          contents.append(document.createTextNode(`${item.other_item2_qty} - ${other2Name}`));
        }

        if (item.other_item3_qty) {
          other3Break = document.createElement('br');
          contents.append(other3Break);

          contents.append(document.createTextNode(`${item.other_item3_qty} - ${other3Name}`));
        }

        if (item.other_item4_qty) {
          other4Break = document.createElement('br');
          contents.append(other4Break);

          contents.append(document.createTextNode(`${item.other_item4_qty} - ${other4Name}`));
        }

        if (item.other_item5_qty) {
          other5Break = document.createElement('br');
          contents.append(other5Break);

          contents.append(document.createTextNode(`${item.other_item5_qty} - ${other5Name}`));
        }

        if (item.other_item6_qty) {
          other6Break = document.createElement('br');
          contents.append(other6Break);

          contents.append(document.createTextNode(`${item.other_item6_qty} - ${other6Name}`));
        }

        if (item.digital_download_slip_qty) {
          digitalDownloadSlipBreak = document.createElement('br');
          contents.append(digitalDownloadSlipBreak);

          contents.append(document.createTextNode(`${item.digital_download_slip_qty} - Digital Download Slip ${digitalDownloadSlipFates}`));
        }
        recordContent.append(contents);
      }
    // End contents counting

        //Goldmine
      if (item.jacket1_goldmine || item.disc1_goldmine) {
        const break3 = document.createElement('br');
        recordContent.append(break3);
        const goldmine = document.createElement('p');
        const goldmineLabel = document.createElement('span');
        goldmineLabel.classList.add('label');
        goldmineLabel.textContent = 'Goldmine';
        const trademarkSup = document.createElement('sup');
        trademarkSup.textContent = '®';
        const conditionsText = document.createTextNode(' Conditions');

        goldmineLabel.append(trademarkSup);
        goldmineLabel.append(conditionsText);
        goldmine.append(goldmineLabel);

        goldmine.append(document.createTextNode(': '));

        if (item.jacket1_goldmine) {
          jacket1GoldmineBreak = document.createElement('br');
          goldmine.append(jacket1GoldmineBreak);

          goldmine.append(document.createTextNode(`${jacket1Name} - ${item.jacket1_goldmine}`));
        }

        if (item.jacket2_goldmine) {
          jacket2GoldmineBreak = document.createElement('br');
          goldmine.append(jacket2GoldmineBreak);

          goldmine.append(document.createTextNode(`${jacket2Name} - ${item.jacket2_goldmine}`));
        }

        if (item.jacket3_goldmine) {
          jacket3GoldmineBreak = document.createElement('br');
          goldmine.append(jacket3GoldmineBreak);

          goldmine.append(document.createTextNode(`${jacket3Name} - ${item.jacket3_goldmine}`));
        }

        if (item.jacket4_goldmine) {
          jacket4GoldmineBreak = document.createElement('br');
          goldmine.append(jacket4GoldmineBreak);

          goldmine.append(document.createTextNode(`${jacket4Name} - ${item.jacket4_goldmine}`));
        }

        if (item.disc1_goldmine) {
          disc1GoldmineBreak = document.createElement('br');
          goldmine.append(disc1GoldmineBreak);

          goldmine.append(document.createTextNode(`${disc1Name} - ${item.disc1_goldmine}`));
        }

        if (item.disc2_goldmine) {
          disc2GoldmineBreak = document.createElement('br');
          goldmine.append(disc2GoldmineBreak);

          goldmine.append(document.createTextNode(`${disc2Name} - ${item.disc2_goldmine}`));
        }

        if (item.disc3_goldmine) {
          disc3GoldmineBreak = document.createElement('br');
          goldmine.append(disc3GoldmineBreak);

          goldmine.append(document.createTextNode(`${disc3Name} - ${item.disc3_goldmine}`));
        }

        if (item.disc4_goldmine) {
          disc4GoldmineBreak = document.createElement('br');
          goldmine.append(disc4GoldmineBreak);

          goldmine.append(document.createTextNode(`${disc4Name} - ${item.disc4_goldmine}`));
        }

        if (item.disc5_goldmine) {
          disc5GoldmineBreak = document.createElement('br');
          goldmine.append(disc5GoldmineBreak);

          goldmine.append(document.createTextNode(`${disc5Name} - ${item.disc5_goldmine}`));
        }

        if (item.disc6_goldmine) {
          disc6GoldmineBreak = document.createElement('br');
          goldmine.append(disc6GoldmineBreak);

          goldmine.append(document.createTextNode(`${disc6Name} - ${item.disc6_goldmine}`));
        }

        if (item.disc7_goldmine) {
          disc7GoldmineBreak = document.createElement('br');
          goldmine.append(disc7GoldmineBreak);

          goldmine.append(document.createTextNode(`${disc7Name} - ${item.disc7_goldmine}`));
        }

        if (item.disc8_goldmine) {
          disc8GoldmineBreak = document.createElement('br');
          goldmine.append(disc8GoldmineBreak);

          goldmine.append(document.createTextNode(`${disc8Name} - ${item.disc8_goldmine}`));
        }
        recordContent.append(goldmine);
      }
      
      let break4 = '';
      if (item.listened || item.id || item.dd){
        break4 = document.createElement('br');
        recordContent.append(break4);
      }

      let listened = '';
      if (item.listened === true) {
        listened = document.createElement('p');

        listenedLabel = document.createElement('span');
        listenedLabel.classList.add('label');
        listenedLabel.textContent = 'Listened';
        listened.append(listenedLabel);

        listened.append(document.createTextNode(': Yes'));

        recordContent.append(listened);
      } else if (item.listened === false) {
        listened = document.createElement('p');

        listenedLabel = document.createElement('span');
        listenedLabel.classList.add('label');
        listenedLabel.textContent = 'Listened';
        listened.append(listenedLabel);

        listened.append(document.createTextNode(': No'));

        recordContent.append(listened);
      }

      // Discogs
      const releaseCode = item.id ? `r${item.id}` : '';

      let discogs = '';
      if (item.id) {
        discogs = document.createElement('p');
        discogsLabel = document.createElement('span');
        discogsLabel.classList.add('label');
        discogsLabel.textContent = 'Discogs Release Code';
        discogs.append(discogsLabel);

        discogs.append(document.createTextNode(': '));

        const discogsLink = document.createElement('a');
        discogsLink.classList.add('content-link');
        discogsLink.setAttribute('tabindex', '-1');
        discogsLink.setAttribute('aria-hidden', 'true');
        discogsLink.href = `https://www.discogs.com/release/${item.id}`;
        discogsLink.textContent = releaseCode;
        discogs.append(discogsLink);

        recordContent.append(discogs);
      }

      // Digital Downloads
      let dd = '';
      if (item.dd === 'Yes') {
        if (item.dd_yes_url) {
          dd = document.createElement('p');

          ddLabel = document.createElement('span');
          ddLabel.classList.add('label');
          ddLabel.textContent = 'Digitally Downloaded';
          dd.append(ddLabel);

          dd.append(document.createTextNode(': '));

          let ddLink = document.createElement('a');
          ddLink.classList.add('content-link');
          ddLink.setAttribute('tabindex', '-1');
          ddLink.setAttribute('aria-hidden', 'true');
          ddLink.href = item.dd_yes_url;
          ddLink.textContent = 'Yes';
          dd.append(ddLink);
        } else {
          dd = document.createElement('p');
          ddLabel = document.createElement('span');
          ddLabel.classList.add('label');
          ddLabel.textContent = 'Digitally Downloaded';
          dd.append(ddLabel);

          dd.append(document.createTextNode(': Yes'));
        }
      } else if (item.dd === 'No') {
        if (item.dd_no_url) {
          dd = document.createElement('p');
          ddLabel = document.createElement('span');
          ddLabel.classList.add('label');
          ddLabel.textContent = 'Digitally Downloaded';
          dd.append(ddLabel);

          dd.append(document.createTextNode(': '));

          let ddLink = document.createElement('a');
          ddLink.classList.add('content-link');
          ddLink.setAttribute('tabindex', '-1');
          ddLink.setAttribute('aria-hidden', 'true');
          ddLink.href = item.dd_no_url;
          ddLink.textContent = 'No';
          dd.append(ddLink);
        } else {
          dd = document.createElement('p');
          ddLabel = document.createElement('span');
          ddLabel.classList.add('label');
          ddLabel.textContent = 'Digitally Downloaded';
          dd.append(ddLabel);

          dd.append(document.createTextNode(': No'));
        }
      } else if (item.dd === 'N/A') {
        dd = document.createElement('p');
        ddLabel = document.createElement('span');
        ddLabel.classList.add('label');
        ddLabel.textContent = 'Digitally Downloaded';
        dd.append(ddLabel);

        dd.append(document.createTextNode(': N/A'));
      }

      recordContent.append(dd);

      const artistRegions = item.dd_official_regions ? ` [${item.dd_official_regions.join(', ')} Only]` : '';
      const artistFormats = item.dd_official_formats ? ` (${item.dd_official_formats.join(', ')}${artistRegions})` : '';
      
      let downloadWebsites = '';
      if (item.dd === "Yes" || item.dd === "No") {
        break5 = document.createElement('br');
        recordContent.append(break5);
        
        downloadWebsites = document.createElement('p');
        downloadWebsites.textContent = 'Downloads available on';

        let artistWebsite = '';
        if (item.dd_official_url) {
          artistWebsiteBreak = document.createElement('br');
          downloadWebsites.append(artistWebsiteBreak);

          artistWebsite = document.createElement('a');
          artistWebsite.classList.add('content-link');
          artistWebsite.setAttribute('tabindex', '-1');
          artistWebsite.setAttribute('aria-hidden', 'true');
          artistWebsite.href = item.dd_official_url;
          artistWebsite.textContent = `Artist Website${artistFormats}`;
          downloadWebsites.append(artistWebsite);
        }

        let qobuz = '';
        if (item.dd_qobuz_url) {
          qobuzBreak = document.createElement('br');
          downloadWebsites.append(qobuzBreak);
          
          qobuz = document.createElement('a');
          qobuz.classList.add('content-link');
          qobuz.setAttribute('tabindex', '-1');
          qobuz.setAttribute('aria-hidden', 'true');
          qobuz.href = item.dd_qobuz_url;
          qobuz.textContent = 'Qobuz';
          downloadWebsites.append(qobuz);
        }
        recordContent.append(downloadWebsites);
      }

      card.append(recordContent);

      table.append(card);

    });
    const gridContainer = document.getElementById('record-grid');
    gridContainer.innerHTML = '';
    gridContainer.append(table);

    startCollapsible();
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
    document.getElementById('record-grid').innerText = 'Error loading records.';
  }
);