function startRecordGrid() {
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
        imgContainer.appendChild(foregroungImg);

        let backgroundImg = document.createElement('img');
        backgroundImg.classList.add('record-img', 'background-img');
        backgroundImg.setAttribute('role', 'presentation');
        backgroundImg.src = `/record-inventory/covers/${item.id}${mod}.avif`;
        imgContainer.appendChild(backgroundImg);

        recordContentWrapper.appendChild(imgContainer);

        let title = '';
        
        if (item.title) {
        title = document.createElement('p');
        title.classList.add('record-title');
        title.textContent = item.title;
        recordContentWrapper.appendChild(title);
        }

        let explicit = '';
        if (item.explicit) {
          explicit = document.createElement('span');
          explicit.id = 'explicit';
          explicit.classList.add('label');
          title.appendChild(explicit);
        }

        let artists = '';
        if (Array.isArray(item.artists)) {
          if (!item.artists.includes("Various")) {
            if (item.artists.length > 2) {
              artists = document.createElement('br');
              title.appendChild(artists);
              let artistSpan = document.createElement('span');
              artistSpan.classList.add('artist');
              artistSpan.textContent = item.artists.slice(0, 2).join(', ');
              artistSpan.textContent += ', ';
              title.appendChild(artistSpan);

              let etAl = document.createElement('span');
              etAl.classList.add('italic');
              etAl.textContent = 'et al.';
              artistSpan.appendChild(etAl);
            } else {
              artists = document.createElement('br');
              title.appendChild(artists);
              let artistSpan = document.createElement('span');
              artistSpan.classList.add('artist');
              artistSpan.textContent = item.artists.join(', ');
              title.appendChild(artistSpan);
            }
          } else if (item.artists.includes("Various")) {
            artists = document.createElement('br');
            title.appendChild(artists);
            let artistSpan = document.createElement('span');
            artistSpan.classList.add('artist', 'italic');
            artistSpan.textContent = item.artists.join(', ');
            title.appendChild(artistSpan);
          }
        }
        card.appendChild(recordContentWrapper);

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
          qty.appendChild(qtyLabel);

          const qtyValue = document.createElement('span');
          qtyValue.textContent = `: ${item.qty}`;
          qty.appendChild(qtyValue);

          recordContent.appendChild(qty);
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
          discColors.appendChild(discColorsLabel);

          const discColorsValue = document.createElement('span');
          discColorsValue.textContent = `: ${colors}`;
          discColors.appendChild(discColorsValue);

          recordContent.appendChild(discColors);
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
          genres.appendChild(genresLabel);

          const genresValue = document.createElement('span');
          genresValue.textContent = `: ${genreNames}`;
          genres.appendChild(genresValue);

          recordContent.appendChild(genres);
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
          if (labelNames) {
          labels = document.createElement('p');
          labelsLabel = document.createElement('span');
          labelsLabel.classList.add('label');
          labelsLabel.textContent = labelsLabelName;
          labels.appendChild(labelsLabel);

          const labelsValue = document.createElement('span');
          labelsValue.textContent = `: ${labelNames}`;
          labels.appendChild(labelsValue);

          recordContent.appendChild(labels);
          }

          let discCountBreak = document.createElement('br');
          recordContent.appendChild(discCountBreak);

          let discCount = document.createElement('p');
          discCountLabel = document.createElement('span');
          discCountLabel.classList.add('label');
          discCountLabel.textContent = 'Disc Count';
          discCount.appendChild(discCountLabel);

          const discCountValue = document.createElement('span');
          discCountValue.textContent = `: ${item.disc_count}`;
          discCount.appendChild(discCountValue);

          recordContent.appendChild(discCount);

          let contentsCount = document.createElement('p');
          contentsCountLabel = document.createElement('span');
          contentsCountLabel.classList.add('label');
          contentsCountLabel.textContent = 'Contents Count';
          contentsCount.appendChild(contentsCountLabel);

          const contentsCountValue = document.createElement('span');
          contentsCountValue.textContent = `: ${item.contents_count}`;
          contentsCount.appendChild(contentsCountValue);

          recordContent.appendChild(contentsCount);

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
        const contentsBreak = document.createElement('br');
        recordContent.appendChild(contentsBreak);

        const contents = document.createElement('p');
        contentsLabel = document.createElement('span');
        contentsLabel.classList.add('label');
        contentsLabel.textContent = 'Contents Description';
        contents.appendChild(contentsLabel);

        const contentsValue = document.createElement('span');
        contentsValue.textContent = ': ';
        contents.appendChild(contentsValue);

        let jacket1 = '';
        if (item.jacket1_qty) {
          jacket1Break = document.createElement('br');
          contents.appendChild(jacket1Break);
          jacket1 = document.createElement('span');
          jacket1.textContent = `${item.jacket1_qty} - ${jacket1Desc}`;
          contents.appendChild(jacket1);
        }

        let jacket2 = '';
        if (item.jacket2_qty) {
          jacket2Break = document.createElement('br');
          contents.appendChild(jacket2Break);
          jacket2 = document.createElement('span');
          jacket2.textContent = `${item.jacket2_qty} - ${jacket2Desc}`;
          contents.appendChild(jacket2);
        }

        let jacket3 = '';
        if (item.jacket3_qty) {
          jacket3Break = document.createElement('br');
          contents.appendChild(jacket3Break);
          jacket3 = document.createElement('span');
          jacket3.textContent = `${item.jacket3_qty} - ${jacket3Desc}`;
          contents.appendChild(jacket3);
        }

        let jacket4 = '';
        if (item.jacket4_qty) {
          jacket4Break = document.createElement('br');
          contents.appendChild(jacket4Break);
          jacket4 = document.createElement('span');
          jacket4.textContent = `${item.jacket4_qty} - ${jacket4Desc}`;
          contents.appendChild(jacket4);
        }

        let innerSleeve = '';
        if (item.inner_sleeve_qty) {
          innerSleeveBreak = document.createElement('br');
          contents.appendChild(innerSleeveBreak);
          innerSleeve = document.createElement('span');
          innerSleeve.textContent = `${item.inner_sleeve_qty} - Inner-sleeve`;
          contents.appendChild(innerSleeve);
        }

        let outerSleeve = '';
        if (item.outer_sleeve_qty) {
          outerSleeveBreak = document.createElement('br');
          contents.appendChild(outerSleeveBreak);
          outerSleeve = document.createElement('span');
          outerSleeve.textContent = `${item.outer_sleeve_qty} - Outer-sleeve`;
          contents.appendChild(outerSleeve);
        }

        let poster = '';
        if (item.poster_qty) {
          posterBreak = document.createElement('br');
          contents.appendChild(posterBreak);
          poster = document.createElement('span');
          poster.textContent = `${item.poster_qty} - Poster`;
          contents.appendChild(poster);
        }

        let envelope = '';
        if (item.envelope_qty) {
          envelopeBreak = document.createElement('br');
          contents.appendChild(envelopeBreak);
          envelope = document.createElement('span');
          envelope.textContent = `${item.envelope_qty} - Envelope`;
          contents.appendChild(envelope);
        }

        let albumPhoto = '';
        if (item.album_photo_qty) {
          albumPhotoBreak = document.createElement('br');
          contents.appendChild(albumPhotoBreak);
          albumPhoto = document.createElement('span');
          albumPhoto.textContent = `${item.album_photo_qty} - Album Photo`;
          contents.appendChild(albumPhoto);
        }

        let songLetter = '';
        if (item.song_letter_qty) {
          songLetterBreak = document.createElement('br');
          contents.appendChild(songLetterBreak);
          songLetter = document.createElement('span');
          songLetter.textContent = `${item.song_letter_qty} - Song Letter`;
          contents.appendChild(songLetter);
        }

        let hypeSticker = '';
        if (item.hype_sticker_qty) {
          hypeStickerBreak = document.createElement('br');
          contents.appendChild(hypeStickerBreak);
          hypeSticker = document.createElement('span');
          hypeSticker.textContent = `${item.hype_sticker_qty} - Hype Sticker`;
          contents.appendChild(hypeSticker);
        }

        let songLyricsBooklet = '';
        if (item.song_lyrics_booklet_qty) {
          songLyricsBookletBreak = document.createElement('br');
          contents.appendChild(songLyricsBookletBreak);
          songLyricsBooklet = document.createElement('span');
          songLyricsBooklet.textContent = `${item.song_lyrics_booklet_qty} - Song Lyrics Booklet`;
          contents.appendChild(songLyricsBooklet);
        }

        let logoPhoto = '';
        if (item.logo_photo_qty) {
          logoPhotoBreak = document.createElement('br');
          contents.appendChild(logoPhotoBreak);
          logoPhoto = document.createElement('span');
          logoPhoto.textContent = `${item.logo_photo_qty} - Logo Photo`;
          contents.appendChild(logoPhoto);
        }

        let photoAlbumBooklet = '';
        if (item.photo_album_booklet_qty) {
          photoAlbumBookletBreak = document.createElement('br');
          contents.appendChild(photoAlbumBookletBreak);
          photoAlbumBooklet = document.createElement('span');
          photoAlbumBooklet.textContent = `${item.photo_album_booklet_qty} - Photo Album Booklet`;
          contents.appendChild(photoAlbumBooklet);
        }

        let other1 = '';
        if (item.other_item1_qty) {
          other1Break = document.createElement('br');
          contents.appendChild(other1Break);
          other1 = document.createElement('span');
          other1.textContent = `${item.other_item1_qty} - ${other1Name}`;
          contents.appendChild(other1);
        }

        let other2 = '';
        if (item.other_item2_qty) {
          other2Break = document.createElement('br');
          contents.appendChild(other2Break);
          other2 = document.createElement('span');
          other2.textContent = `${item.other_item2_qty} - ${other2Name}`;
          contents.appendChild(other2);
        }

        let other3 = '';
        if (item.other_item3_qty) {
          other3Break = document.createElement('br');
          contents.appendChild(other3Break);
          other3 = document.createElement('span');
          other3.textContent = `${item.other_item3_qty} - ${other3Name}`;
          contents.appendChild(other3);
        }

        let other4 = '';
        if (item.other_item4_qty) {
          other4Break = document.createElement('br');
          contents.appendChild(other4Break);
          other4 = document.createElement('span');
          other4.textContent = `${item.other_item4_qty} - ${other4Name}`;
          contents.appendChild(other4);
        }

        let other5 = '';
        if (item.other_item5_qty) {
          other5Break = document.createElement('br');
          contents.appendChild(other5Break);
          other5 = document.createElement('span');
          other5.textContent = `${item.other_item5_qty} - ${other5Name}`;
          contents.appendChild(other5);
        }

        let other6 = '';
        if (item.other_item6_qty) {
          other6Break = document.createElement('br');
          contents.appendChild(other6Break);
          other6 = document.createElement('span');
          other6.textContent = `${item.other_item6_qty} - ${other6Name}`;
          contents.appendChild(other6);
        }

        let digitalDownloadSlip = '';
          if (item.digital_download_slip_qty) {
            digitalDownloadSlipBreak = document.createElement('br');
            contents.appendChild(digitalDownloadSlipBreak);
            digitalDownloadSlip = document.createElement('span');
            digitalDownloadSlip.textContent = `${item.digital_download_slip_qty} - Digital Download Slip ${digitalDownloadSlipFates}`;
            contents.appendChild(digitalDownloadSlip);
          }
          // End contents counting
          recordContent.appendChild(contents);

          //Goldmine
          const goldmineBreak = document.createElement('br');
          recordContent.appendChild(goldmineBreak);
          const goldmine = document.createElement('p');
          const goldmineLabel = document.createElement('span');
          goldmineLabel.classList.add('label');
          goldmineLabel.textContent = 'Goldmine';
          const trademarkSup = document.createElement('sup');
          trademarkSup.textContent = '®';
          const conditionsText = document.createTextNode(' Conditions');

          goldmineLabel.appendChild(trademarkSup);
          goldmineLabel.appendChild(conditionsText);
          goldmine.appendChild(goldmineLabel);

          const goldmineValue = document.createElement('span');
          goldmineValue.textContent = ': ';
          goldmine.appendChild(goldmineValue);


          let jacket1Goldmine = '';
          if (item.jacket1_goldmine) {
            jacket1GoldmineBreak = document.createElement('br');
            goldmine.appendChild(jacket1GoldmineBreak);
            jacket1Goldmine = document.createElement('span');
            jacket1Goldmine.textContent = `${jacket1Name} - ${item.jacket1_goldmine}`;
            goldmine.appendChild(jacket1Goldmine);
          }

          let jacket2Goldmine = '';
          if (item.jacket2_goldmine) {
            jacket2GoldmineBreak = document.createElement('br');
            goldmine.appendChild(jacket2GoldmineBreak);
            jacket2Goldmine = document.createElement('span');
            jacket2Goldmine.textContent = `${jacket2Name} - ${item.jacket2_goldmine}`;
            goldmine.appendChild(jacket2Goldmine);
          }

          let jacket3Goldmine = '';
          if (item.jacket3_goldmine) {
            jacket3GoldmineBreak = document.createElement('br');
            goldmine.appendChild(jacket3GoldmineBreak);
            jacket3Goldmine = document.createElement('span');
            jacket3Goldmine.textContent = `${jacket3Name} - ${item.jacket3_goldmine}`;
            goldmine.appendChild(jacket3Goldmine);
          }

          let jacket4Goldmine = '';
          if (item.jacket4_goldmine) {
            jacket4GoldmineBreak = document.createElement('br');
            goldmine.appendChild(jacket4GoldmineBreak);
            jacket4Goldmine = document.createElement('span');
            jacket4Goldmine.textContent = `${jacket4Name} - ${item.jacket4_goldmine}`;
            goldmine.appendChild(jacket4Goldmine);
          }

          let disc1Goldmine = '';
          if (item.disc1_goldmine) {
            disc1GoldmineBreak = document.createElement('br');
            goldmine.appendChild(disc1GoldmineBreak);
            disc1Goldmine = document.createElement('span');
            disc1Goldmine.textContent = `${disc1Name} - ${item.disc1_goldmine}`;
            goldmine.appendChild(disc1Goldmine);
          }

          let disc2Goldmine = '';
          if (item.disc2_goldmine) {
            disc2GoldmineBreak = document.createElement('br');
            goldmine.appendChild(disc2GoldmineBreak);
            disc2Goldmine = document.createElement('span');
            disc2Goldmine.textContent = `${disc2Name} - ${item.disc2_goldmine}`;
            goldmine.appendChild(disc2Goldmine);
          }

          let disc3Goldmine = '';
          if (item.disc3_goldmine) {
            disc3GoldmineBreak = document.createElement('br');
            goldmine.appendChild(disc3GoldmineBreak);
            disc3Goldmine = document.createElement('span');
            disc3Goldmine.textContent = `${disc3Name} - ${item.disc3_goldmine}`;
            goldmine.appendChild(disc3Goldmine);
          }

          let disc4Goldmine = '';
          if (item.disc4_goldmine) {
            disc4GoldmineBreak = document.createElement('br');
            goldmine.appendChild(disc4GoldmineBreak);
            disc4Goldmine = document.createElement('span');
            disc4Goldmine.textContent = `${disc4Name} - ${item.disc4_goldmine}`;
            goldmine.appendChild(disc4Goldmine);
          }

          let disc5Goldmine = '';
          if (item.disc5_goldmine) {
            disc5GoldmineBreak = document.createElement('br');
            goldmine.appendChild(disc5GoldmineBreak);
            disc5Goldmine = document.createElement('span');
            disc5Goldmine.textContent = `${disc5Name} - ${item.disc5_goldmine}`;
            goldmine.appendChild(disc5Goldmine);
          }

          let disc6Goldmine = '';
          if (item.disc6_goldmine) {
            disc6GoldmineBreak = document.createElement('br');
            goldmine.appendChild(disc6GoldmineBreak);
            disc6Goldmine = document.createElement('span');
            disc6Goldmine.textContent = `${disc6Name} - ${item.disc6_goldmine}`;
            goldmine.appendChild(disc6Goldmine);
          }

          let disc7Goldmine = '';
          if (item.disc7_goldmine) {
            disc7GoldmineBreak = document.createElement('br');
            goldmine.appendChild(disc7GoldmineBreak);
            disc7Goldmine = document.createElement('span');
            disc7Goldmine.textContent = `${disc7Name} - ${item.disc7_goldmine}`;
            goldmine.appendChild(disc7Goldmine);
          }

          let disc8Goldmine = '';
          if (item.disc8_goldmine) {
            disc8GoldmineBreak = document.createElement('br');
            goldmine.appendChild(disc8GoldmineBreak);
            disc8Goldmine = document.createElement('span');
            disc8Goldmine.textContent = `${disc8Name} - ${item.disc8_goldmine}`;
            goldmine.appendChild(disc8Goldmine);
          }
          recordContent.appendChild(goldmine);
          let listened = '';
          if (item.listened) {
            listenedBreak = document.createElement('br');
            recordContent.appendChild(listenedBreak);
            listened = document.createElement('p');
            listenedLabel = document.createElement('span');
            listenedLabel.classList.add('label');
            listenedLabel.textContent = 'Listened';
            listened.appendChild(listenedLabel);

            const listenedValue = document.createElement('span');
            listenedValue.textContent = ': Yes';
            listened.appendChild(listenedValue);

            recordContent.appendChild(listened);
          } else {
            listenedBreak = document.createElement('br');
            recordContent.appendChild(listenedBreak);
            listened = document.createElement('p');
            listenedLabel = document.createElement('span');
            listenedLabel.classList.add('label');
            listenedLabel.textContent = 'Listened';
            listened.appendChild(listenedLabel);

            const listenedValue = document.createElement('span');
            listenedValue.textContent = ': No';
            listened.appendChild(listenedValue);

            recordContent.appendChild(listened);
          }

          const releaseCode = item.id ? `r${item.id}` : '';
          let discogs = '';
          if (item.id) {
            discogs = document.createElement('p');
            discogsLabel = document.createElement('span');
            discogsLabel.classList.add('label');
            discogsLabel.textContent = 'Discogs Release Code';
            discogs.appendChild(discogsLabel);

            const discogsValue = document.createElement('span');
            discogsValue.textContent = ': ';
            discogs.appendChild(discogsValue);

            const discogsLink = document.createElement('a');
            discogsLink.classList.add('content-link');
            discogsLink.setAttribute('tabindex', '-1');
            discogsLink.setAttribute('aria-hidden', 'true');
            discogsLink.href = `https://www.discogs.com/release/${item.id}`;
            discogsLink.textContent = releaseCode;
            discogs.appendChild(discogsLink);

            recordContent.appendChild(discogs);
          }

          let dd = '';
          if (item.dd === 'Yes') {
            if (item.dd_yes_url) {
              dd = document.createElement('p');
              ddLabel = document.createElement('span');
              ddLabel.classList.add('label');
              ddLabel.textContent = 'Digitally Downloaded';
              dd.appendChild(ddLabel);

              let ddValue = document.createElement('span');
              ddValue.textContent = ': ';
              dd.appendChild(ddValue);

              let ddLink = document.createElement('a');
              ddLink.classList.add('content-link');
              ddLink.setAttribute('tabindex', '-1');
              ddLink.setAttribute('aria-hidden', 'true');
              ddLink.href = item.dd_yes_url;
              ddLink.textContent = 'Yes';
              dd.appendChild(ddLink);
            } else {
              dd = document.createElement('p');
              ddLabel = document.createElement('span');
              ddLabel.classList.add('label');
              ddLabel.textContent = 'Digitally Downloaded';
              dd.appendChild(ddLabel);

              let ddValue = document.createElement('span');
              ddValue.textContent = ': Yes';
              dd.appendChild(ddValue);
            }
          } else if (item.dd === 'No') {
            if (item.dd_no_url) {
              dd = document.createElement('p');
              ddLabel = document.createElement('span');
              ddLabel.classList.add('label');
              ddLabel.textContent = 'Digitally Downloaded';
              dd.appendChild(ddLabel);

              let ddValue = document.createElement('span');
              ddValue.textContent = ': ';
              dd.appendChild(ddValue);

              let ddLink = document.createElement('a');
              ddLink.classList.add('content-link');
              ddLink.setAttribute('tabindex', '-1');
              ddLink.setAttribute('aria-hidden', 'true');
              ddLink.href = item.dd_no_url;
              ddLink.textContent = 'No';
              dd.appendChild(ddLink);
            } else {
              dd = document.createElement('p');
              ddLabel = document.createElement('span');
              ddLabel.classList.add('label');
              ddLabel.textContent = 'Digitally Downloaded';
              dd.appendChild(ddLabel);

              let ddValue = document.createElement('span');
              ddValue.textContent = ': No';
              dd.appendChild(ddValue);
            }
          } else if (item.dd === 'N/A') {
            dd = document.createElement('p');
            ddLabel = document.createElement('span');
            ddLabel.classList.add('label');
            ddLabel.textContent = 'Digitally Downloaded';
            dd.appendChild(ddLabel);

            let ddValue = document.createElement('span');
            ddValue.textContent = ': N/A';
            dd.appendChild(ddValue);
          }

        recordContent.appendChild(dd);

        const artistRegions = item.dd_official_regions ? ` [${item.dd_official_regions.join(', ')} Only]` : '';
        const artistFormats = item.dd_official_formats ? ` (${item.dd_official_formats.join(', ')}${artistRegions})` : '';
        
        let downloadWebsites = '';
        if (item.dd === "Yes" || item.dd === "No") {
          downloadWebsitesBreak = document.createElement('br');
          recordContent.appendChild(downloadWebsitesBreak);
          downloadWebsites = document.createElement('p');
          downloadWebsites.textContent = 'Downloads available on';

          if (item.dd_official_url) {
          let artistWebsite = '';
          artistWebsiteBreak = document.createElement('br');
          downloadWebsites.appendChild(artistWebsiteBreak);
          artistWebsite = document.createElement('a');
          artistWebsite.classList.add('content-link');
          artistWebsite.setAttribute('tabindex', '-1');
          artistWebsite.setAttribute('aria-hidden', 'true');
          artistWebsite.href = item.dd_official_url;
          artistWebsite.textContent = `Artist Website${artistFormats}`;
          downloadWebsites.appendChild(artistWebsite);
          }

          if (item.dd_qobuz_url) {
          let qobuz = '';
          qobuzBreak = document.createElement('br');
          downloadWebsites.appendChild(qobuzBreak);
          qobuz = document.createElement('a');
          qobuz.classList.add('content-link');
          qobuz.setAttribute('tabindex', '-1');
          qobuz.setAttribute('aria-hidden', 'true');
          qobuz.href = item.dd_qobuz_url;
          qobuz.textContent = 'Qobuz';
          downloadWebsites.appendChild(qobuz);
          }
          recordContent.appendChild(downloadWebsites);
        }

        card.appendChild(recordContent);

        table.appendChild(card);

    });
    const gridContainer = document.getElementById('record-grid');
      gridContainer.innerHTML = '';
      gridContainer.appendChild(table);

      startCollapsible();
  });

}