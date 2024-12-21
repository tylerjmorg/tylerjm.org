//
// Copyright 2024 Tyler Morgan. All rights reserved.
//

import fs from 'fs';
import { JSDOM } from 'jsdom';
import prettier, { doc } from 'prettier';
import path from 'path';

const TIMESTAMP = () => {
  const now = new Date();
  return now.toISOString();
};

const BUILDER_VERSION = '0.5.0';

const buildInfo = `File built from records.mjs v${BUILDER_VERSION} on ${TIMESTAMP()}`;

const dom = new JSDOM(`<!DOCTYPE html><!--${buildInfo}--><html lang="en" dir="ltr"><head></head><body></body></html>`);

// Access the document object for DOM manipulation
const recordDocument = dom.window.document;

const metaCharset = recordDocument.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
recordDocument.head.append(metaCharset);

const metaViewport = recordDocument.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0';
recordDocument.head.append(metaViewport);

const title = recordDocument.createElement('title');
title.textContent = 'Records';
recordDocument.head.append(title);

const styleMain = recordDocument.createElement('link');
styleMain.rel = 'stylesheet';
styleMain.crossOrigin = 'anonymous';
styleMain.href = 'https://tylermorgan.co/style.css';
recordDocument.head.append(styleMain);

const styleRecord = recordDocument.createElement('link');
styleRecord.rel = 'stylesheet';
styleRecord.href = '/record-inventory/records.css';
recordDocument.head.append(styleRecord);

const webDecription = recordDocument.createElement('meta');
webDecription.name = 'description';
webDecription.content = 'An inventory of Tyler\'s record collection.';
recordDocument.head.append(webDecription);

const iconLightSVG = recordDocument.createElement('link');
iconLightSVG.rel = 'icon';
iconLightSVG.media = '(prefers-color-scheme: light)';
iconLightSVG.type = 'image/svg';
iconLightSVG.crossOrigin = 'anonymous';
iconLightSVG.href = 'https://tylermorgan.co/elements/icons/favicon-day.svg';
recordDocument.head.append(iconLightSVG);

const iconDarkSVG = recordDocument.createElement('link');
iconDarkSVG.rel = 'icon';
iconDarkSVG.media = '(prefers-color-scheme: dark)';
iconDarkSVG.type = 'image/svg';
iconDarkSVG.crossOrigin = 'anonymous';
iconDarkSVG.href = 'https://tylermorgan.co/elements/icons/favicon-night.svg';
recordDocument.head.append(iconDarkSVG);

const iconLightAVIF = recordDocument.createElement('link');
iconLightAVIF.rel = 'icon';
iconLightAVIF.media = '(prefers-color-scheme: light)';
iconLightAVIF.type = 'image/avif';
iconLightAVIF.crossOrigin = 'anonymous';
iconLightAVIF.href = 'https://tylermorgan.co/elements/icons/favicon-day-180.avif';
recordDocument.head.append(iconLightAVIF);

const iconDarkAVIF = recordDocument.createElement('link');
iconDarkAVIF.rel = 'icon';
iconDarkAVIF.media = '(prefers-color-scheme: dark)';
iconDarkAVIF.type = 'image/avif';
iconDarkAVIF.crossOrigin = 'anonymous';
iconDarkAVIF.href = 'https://tylermorgan.co/elements/icons/favicon-night-180.avif';
recordDocument.head.append(iconDarkAVIF);

const iconLightAVIF192 = recordDocument.createElement('link');
iconLightAVIF192.rel = 'icon';
iconLightAVIF192.media = '(prefers-color-scheme: light)';
iconLightAVIF192.type = 'image/avif';
iconLightAVIF192.crossOrigin = 'anonymous';
iconLightAVIF192.setAttribute('sizes', '192x192');
iconLightAVIF192.href = 'https://tylermorgan.co/elements/icons/favicon-day-192.avif';
recordDocument.head.append(iconLightAVIF192);

const iconDarkAVIF192 = recordDocument.createElement('link');
iconDarkAVIF192.rel = 'icon';
iconDarkAVIF192.media = '(prefers-color-scheme: dark)';
iconDarkAVIF192.type = 'image/avif';
iconDarkAVIF192.crossOrigin = 'anonymous';
iconDarkAVIF192.setAttribute('sizes', '192x192');
iconDarkAVIF192.href = 'https://tylermorgan.co/elements/icons/favicon-night-192.avif';
recordDocument.head.append(iconDarkAVIF192);

const appleTouchIcon = recordDocument.createElement('link');
appleTouchIcon.rel = 'apple-touch-icon';
appleTouchIcon.crossOrigin = 'anonymous';
appleTouchIcon.href = 'https://tylermorgan.co/apple-touch-icon.avif';
recordDocument.head.append(appleTouchIcon);

const maskIcon = recordDocument.createElement('link');
maskIcon.rel = 'mask-icon';
maskIcon.crossOrigin = 'anonymous';
maskIcon.href = 'https://tylermorgan.co/elements/icons/mask-icon.svg';
maskIcon.setAttribute('color', '#454D51');
recordDocument.head.append(maskIcon);

const lightThemeColor = recordDocument.createElement('meta');
lightThemeColor.name = 'theme-color';
lightThemeColor.setAttribute('media', '(prefers-color-scheme: light)');
lightThemeColor.content = '#444444';
recordDocument.head.append(lightThemeColor);

const darkThemeColor = recordDocument.createElement('meta');
darkThemeColor.name = 'theme-color';
darkThemeColor.setAttribute('media', '(prefers-color-scheme: dark)');
darkThemeColor.content = '#121111';
recordDocument.head.append(darkThemeColor);

const canonical = recordDocument.createElement('link');
canonical.rel = 'canonical';
canonical.href = 'https://tylerjm.org/record-inventory/';
recordDocument.head.append(canonical);

const keywords = recordDocument.createElement('meta');
keywords.name = 'keywords';
keywords.content = 'record, handbook, tyler morgan, vinyl, tylerjmorg, discogs, goldmine, music, inventory';
recordDocument.head.append(keywords);

const header = recordDocument.createElement('header');
header.classList.add('title-container');

const headerH1 = recordDocument.createElement('h1');
headerH1.classList.add('title', 'ring');
headerH1.ariaLabel = 'Records';

const headerH1SVG = recordDocument.createElement('svg');
headerH1SVG.classList.add('ring-svg');
headerH1SVG.setAttribute('viewBox', '0 0 100 100');
headerH1SVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

const headerH1Path = recordDocument.createElement('path');
headerH1Path.classList.add('ring-circle');
headerH1Path.id = 'circlePath';
headerH1Path.setAttribute('d', 'M 4.1779659,50 A 45.822034,45.822034 0 1 0 95.822034,50 45.822034,45.822034 0 1 0 4.1779658,50');
headerH1SVG.append(headerH1Path);

const headerH1Text = recordDocument.createElement('text');

const headerH1TextPath = recordDocument.createElement('textPath');
headerH1TextPath.setAttribute('href', '#circlePath');
headerH1TextPath.setAttribute('fill', 'var(--primary-color)');
headerH1TextPath.textContent = 'RECORDS · RECORDS · RECORDS · RECORDS · RECORDS ·';
headerH1Text.append(headerH1TextPath);

headerH1SVG.append(headerH1Text);
headerH1.append(headerH1SVG);
header.append(headerH1);

recordDocument.body.append(header);

const main = recordDocument.createElement('main');

const section1 = recordDocument.createElement('section');

const recordsFilePath = path.resolve('records.json');

fs.readFile(recordsFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('JSON file could not be found.', err);
    return;
  }
  
  const parsedRecordData = JSON.parse(data);

  const table = recordDocument.createElement('div');
  table.classList.add('record-grid');

  parsedRecordData.forEach((item, index) => {
    const card = recordDocument.createElement('div');
    card.classList.add('record', 'collapsible-r');
    card.ariaExpanded = 'false';
    card.tabIndex = '0';
    card.ariaPressed = 'false';
    card.role = 'button';
    card.setAttribute('data-target-id', `aboutMeContent-${index}`);
    card.id = `aboutMeButton-${index}`;

    const recordContentWrapper = recordDocument.createElement('div');
    recordContentWrapper.classList.add('record-content-wrapper');

    const imgContainer = recordDocument.createElement('div');
    imgContainer.classList.add('img-container');
    imgContainer.role = 'none';

    let mod = '';
    if (item.mod_id) {
      mod = `-${item.mod_id}`;
    }

    const foregroungImg = recordDocument.createElement('img');
    foregroungImg.classList.add('record-img', 'foreground-img');
    foregroungImg.src = `/record-inventory/covers/${item.id}${mod}.avif`;

    if (item.img_alt) {
      foregroungImg.alt = item.img_alt;
    }
    imgContainer.append(foregroungImg);

    const backgroundImg = recordDocument.createElement('img');
    backgroundImg.classList.add('record-img', 'background-img');
    backgroundImg.role = 'presentation';
    backgroundImg.src = `/record-inventory/covers/${item.id}${mod}.avif`;
    imgContainer.append(backgroundImg);

    recordContentWrapper.append(imgContainer);

    let title = '';
    if (item.title) {
      title = recordDocument.createElement('p');
      title.classList.add('record-title');
      title.textContent = item.title;
      recordContentWrapper.append(title);
    }

    let explicit = '';
    if (item.explicit) {
      explicit = recordDocument.createElement('span');
      explicit.id = 'explicit';
      explicit.classList.add('label');
      title.append(explicit);
    }

    let artists = '';
    if (Array.isArray(item.artists)) {
      if (!item.artists.includes("Various")) {
        if (item.artists.length > 2) {
          const artistsBreak = recordDocument.createElement('br');
          title.append(artistsBreak);

          artists = recordDocument.createElement('span');
          artists.classList.add('artist');
          artists.textContent = item.artists.slice(0, 2).join(', ');
          artists.textContent += ', ';
          title.append(artists);

          const etAl = recordDocument.createElement('span');
          etAl.classList.add('italic');
          etAl.textContent = 'et al.';
          artists.append(etAl);
        } else {
          const artistsBreak = recordDocument.createElement('br');
          title.append(artistsBreak);

          artists = recordDocument.createElement('span');
          artists.classList.add('artist');
          artists.textContent = item.artists.join(', ');
          title.append(artists);
        }
      } else if (item.artists.includes("Various")) {
        const artistsBreak = recordDocument.createElement('br');
        title.append(artistsBreak);

        artists = recordDocument.createElement('span');
        artists.classList.add('artist', 'italic');
        artists.textContent = item.artists.join(', ');
        title.append(artists);
      }
    }
    card.append(recordContentWrapper);

    const recordContent = recordDocument.createElement('div');
    recordContent.classList.add('content-1');
    recordContent.id = `aboutMeContent-${index}`;
    recordContent.ariaHidden = 'true';

    let qty = '';
    if (item.qty) {
      qty = recordDocument.createElement('p');
      const qtyLabel = recordDocument.createElement('span');
      qtyLabel.classList.add('label');
      qtyLabel.textContent = 'Qty';
      qty.append(qtyLabel);

      qty.append(recordDocument.createTextNode(`: ${item.qty}`));

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
      discColors = recordDocument.createElement('p');
      const discColorsLabel = recordDocument.createElement('span');
      discColorsLabel.classList.add('label');
      discColorsLabel.textContent = colorsLabel;
      discColors.append(discColorsLabel);

      discColors.append(recordDocument.createTextNode(`: ${colors}`));

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
      genres = recordDocument.createElement('p');

      const genresLabel = recordDocument.createElement('span');
      genresLabel.classList.add('label');
      genresLabel.textContent = genresLabelName;
      genres.append(genresLabel);

      genres.append(recordDocument.createTextNode(`: ${genreNames}`));

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
      labels = recordDocument.createElement('p');

      const labelsLabel = recordDocument.createElement('span');
      labelsLabel.classList.add('label');
      labelsLabel.textContent = labelsLabelName;
      labels.append(labelsLabel);

      labels.append(recordDocument.createTextNode(`: ${labelNames}`));

      recordContent.append(labels);
    }

    let break1 = '';
    if (item.disc_count || item.contents_count){
      break1 = recordDocument.createElement('br');
      recordContent.append(break1);
    }

    let discCount = '';
    if (item.disc_count) {
      discCount = recordDocument.createElement('p');

      const discCountLabel = recordDocument.createElement('span');
      discCountLabel.classList.add('label');
      discCountLabel.textContent = 'Disc Count';
      discCount.append(discCountLabel);

      discCount.append(recordDocument.createTextNode(`: ${item.disc_count}`));

      recordContent.append(discCount);
    }

    let contentsCount = '';
    if (item.contents_count) {
      contentsCount = recordDocument.createElement('p');

      const contentsCountLabel = recordDocument.createElement('span');
      contentsCountLabel.classList.add('label');
      contentsCountLabel.textContent = 'Contents Count';
      contentsCount.append(contentsCountLabel);

      contentsCount.append(recordDocument.createTextNode(`: ${item.contents_count}`));

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
    } else if (item.jacket3_pocket_qty === 2) {
      jacket3Pocket = ' (Double Pocket)';
    } else if (item.jacket3_pocket_qty === 3) {
      jacket3Pocket = ' (Triple Pocket)';
    }

    let jacket4Pocket = '';
    if (item.jacket4_pocket_qty === 1) {
      jacket4Pocket = ' (Single Pocket)';
    } else if (item.jacket4_pocket_qty === 2) {
      jacket4Pocket = ' (Double Pocket)';
    } else if (item.jacket4_pocket_qty === 3) {
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
      const break2 = recordDocument.createElement('br');
      recordContent.append(break2);

      const contents = recordDocument.createElement('p');
      const contentsLabel = recordDocument.createElement('span');
      contentsLabel.classList.add('label');
      contentsLabel.textContent = 'Contents Description';
      contents.append(contentsLabel);

      contents.append(recordDocument.createTextNode(': '));

      if (item.jacket1_qty) {
        const jacket1Break = recordDocument.createElement('br');
        contents.append(jacket1Break);

        contents.append(recordDocument.createTextNode(`${item.jacket1_qty} - ${jacket1Desc}`));
      }

      if (item.jacket2_qty) {
        const jacket2Break = recordDocument.createElement('br');
        contents.append(jacket2Break);

        contents.append(recordDocument.createTextNode(`${item.jacket2_qty} - ${jacket2Desc}`));
      }

      if (item.jacket3_qty) {
        const jacket3Break = recordDocument.createElement('br');
        contents.append(jacket3Break);

        contents.append(recordDocument.createTextNode(`${item.jacket3_qty} - ${jacket3Desc}`));
      }

      if (item.jacket4_qty) {
        const jacket4Break = recordDocument.createElement('br');
        contents.append(jacket4Break);

        contents.append(recordDocument.createTextNode(`${item.jacket4_qty} - ${jacket4Desc}`));
      }

      if (item.inner_sleeve_qty) {
        const innerSleeveBreak = recordDocument.createElement('br');
        contents.append(innerSleeveBreak);

        contents.append(recordDocument.createTextNode(`${item.inner_sleeve_qty} - Inner-sleeve`));
      }

      if (item.outer_sleeve_qty) {
        const outerSleeveBreak = recordDocument.createElement('br');
        contents.append(outerSleeveBreak);

        contents.append(recordDocument.createTextNode(`${item.outer_sleeve_qty} - Outer-sleeve`));
      }

      if (item.poster_qty) {
        const posterBreak = recordDocument.createElement('br');
        contents.append(posterBreak);

        contents.append(recordDocument.createTextNode(`${item.poster_qty} - Poster`));
      }

      if (item.envelope_qty) {
        const envelopeBreak = recordDocument.createElement('br');
        contents.append(envelopeBreak);

        contents.append(recordDocument.createTextNode(`${item.envelope_qty} - Envelope`));
      }

      if (item.album_photo_qty) {
        const albumPhotoBreak = recordDocument.createElement('br');
        contents.append(albumPhotoBreak);

        contents.append(recordDocument.createTextNode(`${item.album_photo_qty} - Album Photo`));
      }

      if (item.song_letter_qty) {
        const songLetterBreak = recordDocument.createElement('br');
        contents.append(songLetterBreak);

        contents.append(recordDocument.createTextNode(`${item.song_letter_qty} - Song Letter`));
      }

      if (item.hype_sticker_qty) {
        const hypeStickerBreak = recordDocument.createElement('br');
        contents.append(hypeStickerBreak);

        contents.append(recordDocument.createTextNode(`${item.hype_sticker_qty} - Hype Sticker`));
      }

      if (item.song_lyrics_booklet_qty) {
        const songLyricsBookletBreak = recordDocument.createElement('br');
        contents.append(songLyricsBookletBreak);

        contents.append(recordDocument.createTextNode(`${item.song_lyrics_booklet_qty} - Song Lyrics Booklet`));
      }

      if (item.logo_photo_qty) {
        const logoPhotoBreak = recordDocument.createElement('br');
        contents.append(logoPhotoBreak);

        contents.append(recordDocument.createTextNode(`${item.logo_photo_qty} - Logo Photo`));
      }

      if (item.photo_album_booklet_qty) {
        const photoAlbumBookletBreak = recordDocument.createElement('br');
        contents.append(photoAlbumBookletBreak);

        contents.append(recordDocument.createTextNode(`${item.photo_album_booklet_qty} - Photo Album Booklet`));
      }

      if (item.other_item1_qty) {
        const other1Break = recordDocument.createElement('br');
        contents.append(other1Break);

        contents.append(recordDocument.createTextNode(`${item.other_item1_qty} - ${other1Name}`));
      }

      if (item.other_item2_qty) {
        const other2Break = recordDocument.createElement('br');
        contents.append(other2Break);

        contents.append(recordDocument.createTextNode(`${item.other_item2_qty} - ${other2Name}`));
      }

      if (item.other_item3_qty) {
        const other3Break = recordDocument.createElement('br');
        contents.append(other3Break);

        contents.append(recordDocument.createTextNode(`${item.other_item3_qty} - ${other3Name}`));
      }

      if (item.other_item4_qty) {
        const other4Break = recordDocument.createElement('br');
        contents.append(other4Break);

        contents.append(recordDocument.createTextNode(`${item.other_item4_qty} - ${other4Name}`));
      }

      if (item.other_item5_qty) {
        const other5Break = recordDocument.createElement('br');
        contents.append(other5Break);

        contents.append(recordDocument.createTextNode(`${item.other_item5_qty} - ${other5Name}`));
      }

      if (item.other_item6_qty) {
        const other6Break = recordDocument.createElement('br');
        contents.append(other6Break);

        contents.append(recordDocument.createTextNode(`${item.other_item6_qty} - ${other6Name}`));
      }

      if (item.digital_download_slip_qty) {
        const digitalDownloadSlipBreak = recordDocument.createElement('br');
        contents.append(digitalDownloadSlipBreak);

        contents.append(recordDocument.createTextNode(`${item.digital_download_slip_qty} - Digital Download Slip ${digitalDownloadSlipFates}`));
      }
      recordContent.append(contents);
    }
  // End contents counting

      //Goldmine
    if (item.jacket1_goldmine || item.disc1_goldmine) {
      const break3 = recordDocument.createElement('br');
      recordContent.append(break3);

      const goldmine = recordDocument.createElement('p');

      const goldmineLabel = recordDocument.createElement('span');
      goldmineLabel.classList.add('label');
      goldmineLabel.textContent = 'Goldmine';
      const trademarkSup = recordDocument.createElement('sup');
      trademarkSup.textContent = '®';
      const conditionsText = recordDocument.createTextNode(' Conditions');

      goldmineLabel.append(trademarkSup);
      goldmineLabel.append(conditionsText);
      goldmine.append(goldmineLabel);

      goldmine.append(recordDocument.createTextNode(': '));

      if (item.jacket1_goldmine) {
        const jacket1GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(jacket1GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${jacket1Name} - ${item.jacket1_goldmine}`));
      }

      if (item.jacket2_goldmine) {
        const jacket2GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(jacket2GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${jacket2Name} - ${item.jacket2_goldmine}`));
      }

      if (item.jacket3_goldmine) {
        const jacket3GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(jacket3GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${jacket3Name} - ${item.jacket3_goldmine}`));
      }

      if (item.jacket4_goldmine) {
        const jacket4GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(jacket4GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${jacket4Name} - ${item.jacket4_goldmine}`));
      }

      if (item.disc1_goldmine) {
        const disc1GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(disc1GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${disc1Name} - ${item.disc1_goldmine}`));
      }

      if (item.disc2_goldmine) {
        const disc2GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(disc2GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${disc2Name} - ${item.disc2_goldmine}`));
      }

      if (item.disc3_goldmine) {
        const disc3GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(disc3GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${disc3Name} - ${item.disc3_goldmine}`));
      }

      if (item.disc4_goldmine) {
        const disc4GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(disc4GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${disc4Name} - ${item.disc4_goldmine}`));
      }

      if (item.disc5_goldmine) {
        const disc5GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(disc5GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${disc5Name} - ${item.disc5_goldmine}`));
      }

      if (item.disc6_goldmine) {
        const disc6GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(disc6GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${disc6Name} - ${item.disc6_goldmine}`));
      }

      if (item.disc7_goldmine) {
        const disc7GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(disc7GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${disc7Name} - ${item.disc7_goldmine}`));
      }

      if (item.disc8_goldmine) {
        const disc8GoldmineBreak = recordDocument.createElement('br');
        goldmine.append(disc8GoldmineBreak);

        goldmine.append(recordDocument.createTextNode(`${disc8Name} - ${item.disc8_goldmine}`));
      }
      recordContent.append(goldmine);
    }
    
    let break4 = '';
    if (item.listened || item.id || item.dd){
      break4 = recordDocument.createElement('br');
      recordContent.append(break4);
    }

    let listened = '';
    if (item.listened === true) {
      listened = recordDocument.createElement('p');

      const listenedLabel = recordDocument.createElement('span');
      listenedLabel.classList.add('label');
      listenedLabel.textContent = 'Listened';
      listened.append(listenedLabel);

      listened.append(recordDocument.createTextNode(': Yes'));

      recordContent.append(listened);
    } else if (item.listened === false) {
      listened = recordDocument.createElement('p');

      const listenedLabel = recordDocument.createElement('span');
      listenedLabel.classList.add('label');
      listenedLabel.textContent = 'Listened';
      listened.append(listenedLabel);

      listened.append(recordDocument.createTextNode(': No'));

      recordContent.append(listened);
    }

    // Discogs
    const releaseCode = item.id ? `r${item.id}` : '';

    let discogs = '';
    if (item.id) {
      discogs = recordDocument.createElement('p');

      const discogsLabel = recordDocument.createElement('span');
      discogsLabel.classList.add('label');
      discogsLabel.textContent = 'Discogs Release Code';
      discogs.append(discogsLabel);

      discogs.append(recordDocument.createTextNode(': '));

      const discogsLink = recordDocument.createElement('a');
      discogsLink.classList.add('content-link');
      discogsLink.tabIndex = '-1';
      discogsLink.ariaHidden = 'true';
      discogsLink.href = `https://www.discogs.com/release/${item.id}`;
      discogsLink.textContent = releaseCode;
      discogs.append(discogsLink);

      recordContent.append(discogs);
    }

    // Digital Downloads
    let dd = '';
    if (item.dd === 'Yes') {
      if (item.dd_yes_url) {
        dd = recordDocument.createElement('p');

        const ddLabel = recordDocument.createElement('span');
        ddLabel.classList.add('label');
        ddLabel.textContent = 'Digitally Downloaded';
        dd.append(ddLabel);

        dd.append(recordDocument.createTextNode(': '));

        const ddLink = recordDocument.createElement('a');
        ddLink.classList.add('content-link');
        ddLink.tabIndex = '-1';
        ddLink.ariaHidden = 'true';
        ddLink.href = item.dd_yes_url;
        ddLink.textContent = 'Yes';

        dd.append(ddLink);
        recordContent.append(dd);
      } else {
        dd = recordDocument.createElement('p');

        const ddLabel = recordDocument.createElement('span');
        ddLabel.classList.add('label');
        ddLabel.textContent = 'Digitally Downloaded';
        dd.append(ddLabel);

        dd.append(recordDocument.createTextNode(': Yes'));
        recordContent.append(dd);
      }
    } else if (item.dd === 'No') {
      if (item.dd_no_url) {
        dd = recordDocument.createElement('p');

        const ddLabel = recordDocument.createElement('span');
        ddLabel.classList.add('label');
        ddLabel.textContent = 'Digitally Downloaded';
        dd.append(ddLabel);

        dd.append(recordDocument.createTextNode(': '));

        const ddLink = recordDocument.createElement('a');
        ddLink.classList.add('content-link');
        ddLink.tabIndex = '-1';
        ddLink.ariaHidden = 'true';
        ddLink.href = item.dd_no_url;
        ddLink.textContent = 'No';

        dd.append(ddLink);
        recordContent.append(dd);
      } else {
        dd = recordDocument.createElement('p');

        const ddLabel = recordDocument.createElement('span');
        ddLabel.classList.add('label');
        ddLabel.textContent = 'Digitally Downloaded';
        dd.append(ddLabel);

        dd.append(recordDocument.createTextNode(': No'));
        recordContent.append(dd);
      }
    } else if (item.dd === 'N/A') {
      dd = recordDocument.createElement('p');

      const ddLabel = recordDocument.createElement('span');
      ddLabel.classList.add('label');
      ddLabel.textContent = 'Digitally Downloaded';
      dd.append(ddLabel);

      dd.append(recordDocument.createTextNode(': N/A'));
      recordContent.append(dd);
    }

    const artistRegions = item.dd_official_regions ? ` [${item.dd_official_regions.join(', ')} Only]` : '';
    const artistFormats = item.dd_official_formats ? ` (${item.dd_official_formats.join(', ')}${artistRegions})` : '';
    
    let downloadWebsites = '';
    if (item.dd === "Yes" || item.dd === "No") {
      const break5 = recordDocument.createElement('br');
      recordContent.append(break5);
      
      downloadWebsites = recordDocument.createElement('p');
      downloadWebsites.textContent = 'Downloads available on';

      let artistWebsite = '';
      if (item.dd_official_url) {
        const artistWebsiteBreak = recordDocument.createElement('br');
        downloadWebsites.append(artistWebsiteBreak);

        artistWebsite = recordDocument.createElement('a');
        artistWebsite.classList.add('content-link');
        artistWebsite.tabIndex = '-1';
        artistWebsite.ariaHidden = 'true';
        artistWebsite.href = item.dd_official_url;
        artistWebsite.textContent = `Artist Website${artistFormats}`;
        downloadWebsites.append(artistWebsite);
      }

      let qobuz = '';
      if (item.dd_qobuz_url) {
        const qobuzBreak = recordDocument.createElement('br');
        downloadWebsites.append(qobuzBreak);
        
        qobuz = recordDocument.createElement('a');
        qobuz.classList.add('content-link');
        qobuz.tabIndex = '-1';
        qobuz.ariaHidden = 'true';
        qobuz.href = item.dd_qobuz_url;
        qobuz.textContent = 'Qobuz';
        downloadWebsites.append(qobuz);
      }
      recordContent.append(downloadWebsites);

      let notes = '';
      if (item.notes) {
        const break6 = recordDocument.createElement('br');
        recordContent.append(break6);

        notes = recordDocument.createElement('p');

        const notesLabel = recordDocument.createElement('span');
        notesLabel.classList.add('label');
        notesLabel.textContent = 'Notes';
        notes.append(notesLabel);

        const notesBreak = recordDocument.createElement('br');
        notes.append(notesBreak);

        if (item.notes.length === 1) {
          notes.append(recordDocument.createTextNode(item.notes[0]));
          recordContent.append(notes);
        } else {
          item.notes.forEach((note, index) => {
            notes.append(recordDocument.createTextNode(note));
            if (index < item.notes.length - 1) {
              notes.append(recordDocument.createElement('br'));
              notes.append(recordDocument.createElement('br'));
            }
          });
          recordContent.append(notes);
        }
      }
    }

    card.append(recordContent);

    table.append(card);
    
  });

  section1.append(table);

  main.append(section1);

  const section2 = recordDocument.createElement('section');

  const invUpdateFilePath = path.resolve('inventory_update.json');

  fs.readFile(invUpdateFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('JSON file could not be found.', err);
      return; // Exit if there’s an error reading the file
    }

    const parsedInvUpdateData = JSON.parse(data);

  const table = recordDocument.createElement('ul');
  table.classList.add('update-grid');

  parsedInvUpdateData.forEach((item) => {
    const updateCard = recordDocument.createElement('li');
    updateCard.classList.add('update-card');
    
    const updateCardContent = recordDocument.createElement('div');
    updateCardContent.classList.add('update-card-content');

    if (item.inventory_updated) {
      const inventoryUpdateLabel = recordDocument.createElement('span');
      inventoryUpdateLabel.classList.add('label');
      inventoryUpdateLabel.textContent = 'Inventory Updated';
      updateCardContent.append(inventoryUpdateLabel);

      const inventoryUpdateBreak = recordDocument.createElement('br');
      updateCardContent.append(inventoryUpdateBreak);

      const inventoryUpdateDatetime = recordDocument.createElement('time');
      inventoryUpdateDatetime.dateTime = item.inventory_updated;
      inventoryUpdateDatetime.textContent = `${item.inventory_updated} UTC`;
      updateCardContent.append(inventoryUpdateDatetime);
    }

    if (item.last_inventory_check) {
      const lastInventoryCheckLabel = recordDocument.createElement('span');
      lastInventoryCheckLabel.classList.add('label');
      lastInventoryCheckLabel.textContent = 'Last Inventory Check';
      updateCardContent.append(lastInventoryCheckLabel);

      const lastInventoryCheckBreak = recordDocument.createElement('br');
      updateCardContent.append(lastInventoryCheckBreak);

      const lastInventoryCheckDatetime = recordDocument.createElement('time');
      lastInventoryCheckDatetime.dateTime = item.last_inventory_check;
      lastInventoryCheckDatetime.textContent = `${item.last_inventory_check} UTC`;
      updateCardContent.append(lastInventoryCheckDatetime);
    }

    if (item.doc_info_updated) {
      const docInfoUpdatedLabel = recordDocument.createElement('span');
      docInfoUpdatedLabel.classList.add('label');
      docInfoUpdatedLabel.textContent = 'Doc Info Updated';
      updateCardContent.append(docInfoUpdatedLabel);

      const docInfoUpdatedBreak = recordDocument.createElement('br');
      updateCardContent.append(docInfoUpdatedBreak);

      const docInfoUpdatedDatetime = recordDocument.createElement('time');
      docInfoUpdatedDatetime.dateTime = item.doc_info_updated;
      docInfoUpdatedDatetime.textContent = `${item.doc_info_updated} UTC`;
      updateCardContent.append(docInfoUpdatedDatetime);
    }

    updateCard.append(updateCardContent);

    table.append(updateCard);
  });
  section2.append(table);
  main.append(section2);

  const section3 = recordDocument.createElement('section');
  section3.classList.add('bottom-links');

  const definitions = recordDocument.createElement('a');
  definitions.href = '/record-handbook/inventory/defs/';
  definitions.classList.add('bottom-link');
  definitions.textContent = 'Definitions';
  section3.append(definitions);

  const recordHandbook = recordDocument.createElement('a');
  recordHandbook.href = '/record-handbook/';
  recordHandbook.classList.add('bottom-link');
  recordHandbook.textContent = 'The Record Handbook';
  section3.append(recordHandbook);

  main.append(section3);

  recordDocument.body.append(main);

  const footer = recordDocument.createElement('footer');
  footer.classList.add('footer');

  const footerDisclaimer = recordDocument.createElement('p');
  footerDisclaimer.append(recordDocument.createTextNode('Some URLs may be expired or password protected. Check the '));

  const archiveLink = recordDocument.createElement('a');
  archiveLink.href = '/record-inventory/archive/';
  archiveLink.classList.add('content-link');
  archiveLink.textContent = 'archive page';
  footerDisclaimer.append(archiveLink);

  footerDisclaimer.append(recordDocument.createTextNode(' for more info.'));

  footer.append(footerDisclaimer);

  const footerCopyright = recordDocument.createElement('p');
  footerCopyright.append(recordDocument.createTextNode('© '));

  const footerYear = recordDocument.createElement('span');
  footerYear.id = 'year_2024';
  footerCopyright.append(footerYear);

  footerCopyright.append(recordDocument.createTextNode(' '));

  const footerName = recordDocument.createElement('a');
  footerName.href = 'https://tylermorgan.co/';
  footerName.classList.add('content-link');
  footerName.textContent = 'Tyler Morgan';
  footerCopyright.append(footerName);

  footerCopyright.append(recordDocument.createTextNode('. All rights reserved.'));

  footer.append(footerCopyright);

  const privacyPolicy = recordDocument.createElement('p');
  const privacyPolicyLink = recordDocument.createElement('a');
  privacyPolicyLink.classList.add('content-link');
  privacyPolicyLink.rel = 'privacy-policy';
  privacyPolicyLink.href = 'https://tylermorgan.co/privacy-policy/';
  privacyPolicyLink.textContent = 'Privacy Policy';
  privacyPolicy.append(privacyPolicyLink);

  footer.append(privacyPolicy);

  recordDocument.body.append(footer);

  const collapsible = recordDocument.createElement('script');
  collapsible.src = '/record-inventory/collapsible.js';
  recordDocument.body.append(collapsible);

  const yearScript = recordDocument.createElement('script');
  yearScript.src = 'https://tylermorgan.co/year_2024.js'
  yearScript.type = 'module';
  yearScript.crossOrigin = 'anonymous';
  recordDocument.body.append(yearScript);

// Serialize the DOM
const recordHtmlContent = dom.serialize();

// Format the HTML with Prettier and write it to the file
prettier
    .format(recordHtmlContent, { parser: 'html' })
    .then((formattedHTML) => {
        fs.writeFile('index.html', formattedHTML, (err) => {
            if (err) {
                console.error('An error occurred while creating the HTML file:', err);
            } else {
                console.log('HTML file successfully created with readable formatting!');
            }
        });
    })
    .catch((error) => {
        console.error('An error occurred while formatting the HTML:', error);
    });
  });
});


const createCollapsible =
  `// ${buildInfo}
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
  }`;

fs.writeFile('collapsible.js', createCollapsible.toString(), (err) => {
  if (err) {
      console.error('An error occurred while creating the JS file:', err);
  } else {
      console.log('JS file successfully created!');
  }
});

const recordsCSS = 
`/* ${buildInfo} */
:root {
  color: var(--primary-color);
  font-size: 0.89rem;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}
li {
  text-indent: 0px;
  padding: 0;
  list-style-type: none;
}
ul {
  text-indent: 0px;
  padding: 0;
  list-style-type: none;
}
@media (min-width: 1081px){
  .ring-svg {
    height: 450px;
    width: 450px;
    border-radius: 50%;
  }
  .record-grid{
    justify-content: center;
    margin: auto;
    display: grid;
    flex-wrap: wrap;
    max-width: 1350px;
    gap: 30px 10px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    width: 97.5%;
    font-size: 0.92rem;
    text-wrap: pretty;
  }
  .title {
    font-size: 40px;
    text-align: center;
    margin: auto;
    justify-content: center;
    margin-top: -350px;
    margin-bottom: 15px;
    width: 450px;
    border-radius: 50%;
  }
  .record {
    padding: 10px;
    border-radius: 10px;
    display: block;
    background-color: var(--secondary-bkg-color);
  }
  .record-img {
    min-height: 182px;
    min-width: 182px;
  }
  .record-title {
    font: 'Noto Sans', sans-serif;
    height: fit-content;
    font-weight: 400;
    font-size: 0.96rem;
    margin-top: 15px;
    text-align: left;
    text-wrap: pretty;
  }
  .artist {
    font: 'Noto Sans', sans-serif;
    color: #ccc;
    font-size: 0.8rem;
    text-wrap: pretty;
  }
  #explicit::before {
    background: url(/elements/icons/explicit.svg);
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    content: "";
    margin-left: 7px;
    display: inline-block;
  }
  .update-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    gap: 30px 10px;
    grid-template-rows: auto;
    font-size: 0.84rem;
    width: 97.5%;
    max-width: 800px;
    margin: auto;
    justify-content: center;
    padding-top: 20px;
  }
  .update-card-content {
    padding: 10px;
    border-radius: 10px;
    display: block;
    background-color: var(--secondary-bkg-color);
  }
} 
@media (max-width: 1080px){
  .ring-svg {
    height: 450px;
    width: 450px;
    border-radius: 50%;
  }
  .record-grid{
    justify-content: center;
    margin: auto;
    display: grid;
    flex-wrap: wrap;
    gap: 30px 10px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    width: 97.5%;
    font-size: 0.92rem;
    text-wrap: pretty;
  }
  .record {
    padding: 10px;
    border-radius: 10px;
    display: block;
    background-color: var(--secondary-bkg-color);
  }
  .title {
    font-size: 40px;
    text-align: center;
    margin: auto;
    justify-content: center;
    margin-top: -350px;
    margin-bottom: 15px;
    width: 450px;
    border-radius: 50%;
  }
  .record-title {
    font: 'Noto Sans', sans-serif;
    height: fit-content;
    font-weight: 400;
    font-size: 0.92rem;
    margin-top: 15px;
    text-align: left;
  }
  .artist {
    font: 'Noto Sans', sans-serif;
    color: var(--sec-color);
    font-size: 0.88rem;
  }
  #explicit::before {
    background: url(/elements/icons/explicit.svg);
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    content: "";
    margin-left: 7px;
    display: inline-block;
  }
  .record-img {
    min-height: 179px;
    min-width: 179px;
  }
  .update-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    gap: 30px 10px;
    grid-template-rows: auto;
    font-size: 0.84rem;
    width: 97.5%;
    max-width: 800px;
    margin: auto;
    justify-content: center;
    padding-top: 20px;
  }
  .update-card-content {
    padding: 10px;
    border-radius: 10px;
    display: block;
    background-color: var(--secondary-bkg-color);
  }
} 
@media (max-width: 850px){
  .ring-svg {
    height: 450px;
    width: 450px;
    border-radius: 50%;
  }
  .record-grid{
    justify-content: center;
    margin: auto;
    display: grid;
    flex-wrap: wrap;
    gap: 30px 10px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    width: 97.5%;
    font-size: 0.92rem;
    text-wrap: pretty;
  }
  .title {
    font-size: 40px;
    text-align: center;
    margin: auto;
    justify-content: center;
    margin-top: -350px;
    margin-bottom: 15px;
    width: 450px;
    border-radius: 50%;
  }
  .record {
    padding: 10px;
    border-radius: 10px;
    display: block;
    background-color: var(--secondary-bkg-color);
  }
  .record-title {
    font: 'Noto Sans', sans-serif;
    height: fit-content;
    font-weight: 400;
    font-size: 0.94rem;
    margin-top: 15px;
    text-align: left;
  }
  .artist {
    font: 'Noto Sans', sans-serif;
    color: var(--sec-color);
    font-size: 0.88rem;
  }
  #explicit::before {
    background: url(/elements/icons/explicit.svg);
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    content: "";
    margin-left: 7px;
    display: inline-block;
  }
  .update-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    gap: 30px 10px;
    grid-template-rows: auto;
    font-size: 0.84rem;
    width: 97.5%;
    max-width: 800px;
    margin: auto;
    justify-content: center;
    padding-top: 20px;
  }
  .update-card-content {
    padding: 10px;
    border-radius: 10px;
    display: block;
    background-color: var(--secondary-bkg-color);
  }
}
@media (max-width: 640px){
  .record-grid{
    justify-content: center;
    margin: auto;
    display: grid;
    flex-wrap: wrap;
    gap: 30px 10px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    width: 97.5%;
    font-size: 0.92rem;
    text-wrap: pretty;
  }
  .title {
    font-size: 40px;
    text-align: center;
    margin: auto;
    justify-content: center;
    margin-top: -190px;
    margin-bottom: 15px;
    width: 243px;
    border-radius: 50%;
  }
  .ring-svg {
    height: 243px;
    width: 243px;
    border-radius: 50%;
  }
  .record {
    padding: 10px;
    border-radius: 10px;
    display: block;
    background-color: var(--secondary-bkg-color);
  }
  .record-title {
    font: 'Noto Sans', sans-serif;
    height: fit-content;
    font-weight: 400;
    font-size: 0.94rem;
    margin-top: 15px;
    text-align: left;
  }
  .artist {
    font: 'Noto Sans', sans-serif;
    color: var(--sec-color);
    font-size: 0.88rem;
  }
  #explicit::before {
    background: url(/elements/icons/explicit.svg);
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    content: "";
    margin-left: 7px;
    display: inline-block;
  }
  .record-img {
    min-height: 130px;
    min-width: 130px;
  }
  .update-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    text-align: center;
    gap: 10px 10px;
    grid-template-rows: auto;
    font-size: 0.84rem;
    width: 80%;
    max-width: 250px;
    margin: auto;
    justify-content: center;
    padding-top: 20px;
  }
  .update-card-content {
    padding: 10px;
    border-radius: 10px;
    display: block;
    background-color: var(--secondary-bkg-color);
  }
}
.bottom-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  gap: 30px 20px;
  grid-template-rows: auto;
  font-size: 0.84rem;
  width: 90%;
  max-width: 800px;
  margin: auto;
  justify-content: center;
  padding-top: 20px;
}
.bottom-link {
  padding: 10px;
  border-radius: 30px;
  display: block;
  background-color: var(--button-link);
  color: var(--highlight-color);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
  transform: scale(1);
}
.bottom-link:hover {
  background-color: var(--secondary-bkg-color);
  color: var(--primary-color);
  transform: scale(1.05);
}
.record-img {
  width: 100%;
  border-radius: 7px;
}
.italic {
  font-style: italic;
}
.collapsible-r{
  font-family: 'Noto Sans', sans-serif;
  color: var(--primary-color);
  cursor: pointer;
  border: none;
}

.collapsible-r img {
  transform: scale(1);
  transition: background-color 175ms linear, transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
}
.collapsible-r:hover img{
  transform: scale(1.05);
}
.collapsible-r:hover .background-img {
  opacity: 1;
  filter: blur(8px);
  transform: scale(1.05);
}
.collapsible-r .foreground-img {
  transition: all 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
}
.collapsible-r:hover .foreground-img {
  box-shadow: none;
}
.collapsible-r .background-img {
  position: absolute;
  top: 2px;
  left: 0;
  transform: scale(1);
  transition: all 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
  opacity: 0;
  z-index: 1;
}
img {
  pointer-events: none;
}
.active {
  background-color: var(--secondary-bkg-color);

  .background-img {
    opacity: 1;
    filter: blur(4px);
    transform: scale(1.03);
  }
  .foreground-img {
    box-shadow: none;
  }
  img {
    transform: scale(1.03);
  }
}

.collapsible-r:active {
  .background-img {
    opacity: 0.8;
    filter: blur(8px);
    transform: scale(1.02);
  }
  .foreground-img {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
  }
  img {
    transform: scale(1.02);
  }
}

.content-1 > p {
  margin-top: 2px;
  margin-bottom: 2px;
}
.content-1 {
  font-size: 0.9rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.7s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
  background-color: rgba(0, 0, 0, 0);
}
.label {
  font-weight: bold;
}
.footer {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 0.8rem;
}
.img-container {
  position: relative;
}
.foreground-img {
  cursor: pointer;
  position: relative;
  z-index: 2;
  pointer-events: none;
}
.ring {
/* 	--character-width: 1ch; */
  --inner-angle: calc((360 / var(--char-count)) * 1deg);
  --character-width: 1;
  font-family: 'Roboto Flex', sans-serif;
  text-transform: uppercase;
  font-size: calc(var(--font-size, 1) * 1rem);
  position: relative;
  border-radius: 50%;
}
@media (prefers-reduced-motion: no-preference) {
  .ring {
    animation: spin 8s infinite linear;
    transition: all 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
    transform: scale(1);
  }
  .ring:hover {
    animation: spin 1.8s infinite linear;
    transform: scale(1.08);
  }
  @keyframes spin {
    to {
      rotate: 360deg;
    }
  }
}
.ring-circle {
  visibility: hidden;
}
textPath {
  font-family: 'Noto Sans', sans-serif;
  font-size: 0.75rem;
  text-shadow: 1px 5px 8px rgba(0, 0, 0, 0.2);
}
text { text-rendering: geometricPrecision; }`

fs.writeFile('records.css', recordsCSS.toString(), (err) => {
  if (err) {
      console.error('An error occurred while creating the CSS file:', err);
  } else {
      console.log('CSS file successfully created!');
  }
});

const archiveDom = new JSDOM(`<!DOCTYPE html><!--${buildInfo}--><html lang="en" dir="ltr"><head></head><body></body></html>`);

const archiveDocument = archiveDom.window.document;

const archiveMetaCharset = archiveDocument.createElement('meta');
archiveMetaCharset.setAttribute('charset', 'UTF-8');
archiveDocument.head.append(archiveMetaCharset);

const archiveMetaViewport = archiveDocument.createElement('meta');
archiveMetaViewport.name = 'viewport';
archiveMetaViewport.content = 'width=device-width, initial-scale=1.0';
archiveDocument.head.append(archiveMetaViewport);

const archiveTitle = archiveDocument.createElement('title');
archiveTitle.textContent = 'Archive | Records';
archiveDocument.head.append(archiveTitle);

const archiveWebDecription = archiveDocument.createElement('meta');
archiveWebDecription.name = 'description';
archiveWebDecription.content = 'Tyler\'s record archives.';
archiveDocument.head.append(archiveWebDecription);

const archiveStylesheet = archiveDocument.createElement('link');
archiveStylesheet.rel = 'stylesheet';
archiveStylesheet.href = '/record-inventory/archive/archive.css';
archiveDocument.head.append(archiveStylesheet);

const archiveIconLightSVG = archiveDocument.createElement('link');
archiveIconLightSVG.rel = 'icon';
archiveIconLightSVG.media = '(prefers-color-scheme: light)';
archiveIconLightSVG.type = 'image/svg';
archiveIconLightSVG.crossOrigin = 'anonymous';
archiveIconLightSVG.href = 'https://tylermorgan.co/elements/icons/favicon-day.svg';
archiveDocument.head.append(archiveIconLightSVG);

const archiveIconDarkSVG = archiveDocument.createElement('link');
archiveIconDarkSVG.rel = 'icon';
archiveIconDarkSVG.media = '(prefers-color-scheme: dark)';
archiveIconDarkSVG.type = 'image/svg';
archiveIconDarkSVG.crossOrigin = 'anonymous';
archiveIconDarkSVG.href = 'https://tylermorgan.co/elements/icons/favicon-night.svg';
archiveDocument.head.append(archiveIconDarkSVG);

const archiveIconLightAVIF = archiveDocument.createElement('link');
archiveIconLightAVIF.rel = 'icon';
archiveIconLightAVIF.media = '(prefers-color-scheme: light)';
archiveIconLightAVIF.type = 'image/avif';
archiveIconLightAVIF.crossOrigin = 'anonymous';
archiveIconLightAVIF.href = 'https://tylermorgan.co/elements/icons/favicon-day-180.avif';
archiveDocument.head.append(archiveIconLightAVIF);

const archiveIconDarkAVIF = archiveDocument.createElement('link');
archiveIconDarkAVIF.rel = 'icon';
archiveIconDarkAVIF.media = '(prefers-color-scheme: dark)';
archiveIconDarkAVIF.type = 'image/avif';
archiveIconDarkAVIF.crossOrigin = 'anonymous';
archiveIconDarkAVIF.href = 'https://tylermorgan.co/elements/icons/favicon-night-180.avif';
archiveDocument.head.append(archiveIconDarkAVIF);

const archiveIconLightAVIF192 = archiveDocument.createElement('link');
archiveIconLightAVIF192.rel = 'icon';
archiveIconLightAVIF192.media = '(prefers-color-scheme: light)';
archiveIconLightAVIF192.type = 'image/avif';
archiveIconLightAVIF192.crossOrigin = 'anonymous';
archiveIconLightAVIF192.setAttribute('sizes', '192x192');
archiveIconLightAVIF192.href = 'https://tylermorgan.co/elements/icons/favicon-day-192.avif';
archiveDocument.head.append(archiveIconLightAVIF192);

const archiveIconDarkAVIF192 = archiveDocument.createElement('link');
archiveIconDarkAVIF192.rel = 'icon';
archiveIconDarkAVIF192.media = '(prefers-color-scheme: dark)';
archiveIconDarkAVIF192.type = 'image/avif';
archiveIconDarkAVIF192.crossOrigin = 'anonymous';
archiveIconDarkAVIF192.setAttribute('sizes', '192x192');
archiveIconDarkAVIF192.href = 'https://tylermorgan.co/elements/icons/favicon-night-192.avif';
archiveDocument.head.append(archiveIconDarkAVIF192);

const archiveAppleTouchIcon = archiveDocument.createElement('link');
archiveAppleTouchIcon.rel = 'apple-touch-icon';
archiveAppleTouchIcon.crossOrigin = 'anonymous';
archiveAppleTouchIcon.href = 'https://tylermorgan.co/apple-touch-icon.avif';
archiveDocument.head.append(archiveAppleTouchIcon);

const archiveMaskIcon = archiveDocument.createElement('link');
archiveMaskIcon.rel = 'mask-icon';
archiveMaskIcon.crossOrigin = 'anonymous';
archiveMaskIcon.href = 'https://tylermorgan.co/elements/icons/mask-icon.svg';
archiveMaskIcon.setAttribute('color', '#454D51');
archiveDocument.head.append(archiveMaskIcon);

const archiveLightThemeColor = archiveDocument.createElement('meta');
archiveLightThemeColor.name = 'theme-color';
archiveLightThemeColor.setAttribute('media', '(prefers-color-scheme: light)');
archiveLightThemeColor.content = '#FFFFFF'
archiveDocument.head.append(archiveLightThemeColor);

const archiveDarkThemeColor = archiveDocument.createElement('meta');
archiveDarkThemeColor.name = 'theme-color';
archiveDarkThemeColor.setAttribute('media', '(prefers-color-scheme: dark)');
archiveDarkThemeColor.content = '#000000';
archiveDocument.head.append(archiveDarkThemeColor);

const archiveCanonical = archiveDocument.createElement('link');
archiveCanonical.rel = 'canonical';
archiveCanonical.href = 'https://tylerjm.org/record-inventory/archive/';
archiveDocument.head.append(archiveCanonical);

const archiveKeywords = archiveDocument.createElement('meta');
archiveKeywords.name = 'keywords';
archiveKeywords.content = 'record, handbook, tyler morgan, vinyl, tylerjmorg, music, inventory, archive';
archiveDocument.head.append(archiveKeywords);

const archiveFonts = archiveDocument.createElement('link');
archiveFonts.rel = 'stylesheet';
archiveFonts.href = 'https://tylermorgan.co/fonts.css';
archiveDocument.head.append(archiveFonts);

fs.readFile(recordsFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('JSON file could not be found.', err);
    return;
  }
  
  const archiveParsedRecordData = JSON.parse(data);

  let header = archiveDocument.createElement('header');

  let title = archiveDocument.createElement('h1');
    title.textContent = 'Archived Links';
    header.append(title);

  let main = archiveDocument.createElement('main');

  archiveParsedRecordData.forEach((item) => {
    if (item.dd_archived_official_timestamp || item.dd_archived_qobuz_timestamp) {
    let record = archiveDocument.createElement('section');
    record.classList.add('record');

    let recordTitle = archiveDocument.createElement('h2');
    recordTitle.append(archiveDocument.createTextNode(item.title));
    recordTitle.append(archiveDocument.createTextNode(' — '));
    
    let recordArtists = '';
    if (Array.isArray(item.artists)) {
      if (!item.artists.includes("Various")) {
        if (item.artists.length > 2) {
          recordTitle.append(archiveDocument.createTextNode(`${item.artists.slice(0, 2).join(', ')}, `));

          const etAl = archiveDocument.createElement('span');
          etAl.classList.add('italic');
          etAl.textContent = 'et al.';
          recordTitle.append(etAl);
        } else {
          recordTitle.append(archiveDocument.createTextNode(item.artists.join(', ')));
        }
      } else if (item.artists.includes("Various")) {
        recordArtists = archiveDocument.createElement('span');
        recordArtists.classList.add('italic');
        recordArtists.textContent = item.artists.join(', ');
        recordTitle.append(recordArtists);
      }
    }

    record.append(recordTitle);

    const officialArchiveUrl = item.dd_archived_official_timestamp ? `https://web.archive.org/web/${item.dd_archived_official_timestamp}/${item.dd_official_url}` : '';

    let artistArchive = '';
    if (item.dd_official_url && item.dd_archived_official_timestamp) {
      artistArchive = archiveDocument.createElement('p');

      artistArchive.append(archiveDocument.createTextNode('Artist Website Archive: '));

      let artistArchiveLink = archiveDocument.createElement('a');
      artistArchiveLink.classList.add('italic');
      artistArchiveLink.href = officialArchiveUrl;
      artistArchiveLink.textContent = officialArchiveUrl;
      artistArchive.append(artistArchiveLink);

      record.append(artistArchive);
    }

    const qobuzArchiveUrl = item.dd_archived_qobuz_timestamp ? `https://web.archive.org/web/${item.dd_archived_qobuz_timestamp}/${item.dd_qobuz_url}` : '';

    let qobuzArchive = '';
    if (item.dd_archived_qobuz_timestamp && item.dd_qobuz_url) {
      let qobuzArchive = archiveDocument.createElement('p');

      qobuzArchive.append(archiveDocument.createTextNode('Qobuz Archive: '));

      let qobuzArchiveLink = archiveDocument.createElement('a');
      qobuzArchiveLink.classList.add('italic');
      qobuzArchiveLink.href = qobuzArchiveUrl;
      qobuzArchiveLink.textContent = qobuzArchiveUrl;
      qobuzArchive.append(qobuzArchiveLink);

      record.append(qobuzArchive);
    }

    main.append(record);
}});
  archiveDocument.body.append(header);

  const archiveBottomLinks = archiveDocument.createElement('section');
  archiveBottomLinks.classList.add('bottom-links');

  const tylersRecords = archiveDocument.createElement('a');
  tylersRecords.href = '/record-inventory/';
  tylersRecords.classList.add('bottom-link');
  tylersRecords.textContent = 'Tyler\'s Records';
  archiveBottomLinks.append(tylersRecords);

  const archiveRecordHandbook = archiveDocument.createElement('a');
  archiveRecordHandbook.href = '/record-handbook/';
  archiveRecordHandbook.classList.add('bottom-link');
  archiveRecordHandbook.textContent = 'The Record Handbook';
  archiveBottomLinks.append(archiveRecordHandbook);

  main.append(archiveBottomLinks);
  archiveDocument.body.append(main);

  const archiveFooter = archiveDocument.createElement('footer');
  archiveFooter.classList.add('footer');

  const archiveFooterDisclaimer = archiveDocument.createElement('p');
  archiveFooterDisclaimer.textContent = 'Discogs URLs and owner file URLs are not archived.';
  archiveFooter.append(archiveFooterDisclaimer);

  const archiveCopyright = archiveDocument.createElement('p');
  archiveCopyright.textContent = '© ';

  const archivefooterYear = archiveDocument.createElement('span');
  archivefooterYear.id = 'year_2024';
  archiveCopyright.append(archivefooterYear);

  archiveCopyright.append(archiveDocument.createTextNode(' '));

  const archiveTyler = archiveDocument.createElement('a');
  archiveTyler.href = 'https://tylermorgan.co/';
  archiveTyler.classList.add('content-link');
  archiveTyler.textContent = 'Tyler Morgan';
  archiveCopyright.append(archiveTyler);

  archiveCopyright.append(archiveDocument.createTextNode('. All rights reserved.'));

  archiveFooter.append(archiveCopyright);

  const archivePrivacyPolicy = archiveDocument.createElement('p');
  const archivePrivacyPolicyLink = archiveDocument.createElement('a');
  archivePrivacyPolicyLink.classList.add('content-link');
  archivePrivacyPolicyLink.rel = 'privacy-policy';
  archivePrivacyPolicyLink.href = 'https://tylermorgan.co/privacy-policy/';
  archivePrivacyPolicyLink.textContent = 'Privacy Policy';
  archivePrivacyPolicy.append(archivePrivacyPolicyLink);

  archiveFooter.append(archivePrivacyPolicy);

  archiveDocument.body.append(archiveFooter);

  const archiveCopyrightYear = archiveDocument.createElement('script');
  archiveCopyrightYear.src = 'https://tylermorgan.co/year_2024.js';
  archiveCopyrightYear.type = 'module';
  archiveCopyrightYear.crossOrigin = 'anonymous';
  archiveDocument.body.append(archiveCopyrightYear);

// Serialize the DOM
const archiveHtmlContent = archiveDom.serialize();

// Format the HTML with Prettier and write it to the file
prettier
    .format(archiveHtmlContent, { parser: 'html' })
    .then((archiveFormattedHTML) => {
        const directoryPath = 'archive';
        const filePath = path.join(directoryPath, 'index.html');

        // Check if the directory exists, and create it if it doesn't
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        // Write the formatted HTML to the file
        fs.writeFile(filePath, archiveFormattedHTML, (err) => {
            if (err) {
                console.error('An error occurred while creating the HTML file:', err);
            } else {
                console.log('HTML file successfully created with readable formatting!');
            }
        });
    })
    .catch((error) => {
        console.error('An error occurred while formatting the HTML:', error);
    });
  });

const archiveCSS =
`/* ${buildInfo} */
:root {
  color-scheme: light dark;
  --primary-color: light-dark(#000000FF,#FFFFFFFF);
  --body-background: light-dark(#FFFFFFFF,#000000FF);
  --secondary-bkg-color: light-dark(lab(23.52 0 0 / 1),lab(12.39 0.72 -0.51 / 1));
  --highlight-color: light-dark(lab(32.21 -2.48 -3.63 / 1),lab(86.75 0.16 0.61 / 1));
  --button-link: light-dark(lab(86.03 0.16 0.61 / 1),lab(21.31 0.21 0.79 / 1));
  --highlight-color-hover: light-dark(lab(100 0 0 / 1),lab(88.17 0.16 0.61 / 1));
}
body {
  background-color: var(--body-background);
  color: var(--primary-color);
  font-family: 'Noto Sans', sans-serif;
  text-wrap: pretty;
  word-break: break-word;
  margin: 0;
  padding: 0;
}
h1 {
  text-align: center;
}
h2 {
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
}
p {
  font-size: 0.85rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.italic {
  font-style: italic;
}
.record {
  padding-bottom: 1.2rem;
}
.footer {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 0.71rem;
}
.footer p {
  font-size: inherit;
}
.content-link {
  text-decoration: underline solid transparent;
  font-weight: bold;
  color: var(--biolink-color);
  cursor: pointer;
  transition: color 150ms linear, text-decoration 150ms linear;
}
.content-link:hover {
  color: var(--primary-hover);
  text-decoration: underline solid currentColor;
}
.bottom-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  gap: 30px 20px;
  grid-template-rows: auto;
  font-size: 0.84rem;
  width: 90%;
  max-width: 800px;
  margin: auto;
  justify-content: center;
  padding-top: 20px;
}
.bottom-link {
  padding: 10px;
  border-radius: 30px;
  display: block;
  background-color: var(--button-link);
  color: var(--highlight-color);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
  transform: scale(1);
}
.bottom-link:hover {
  background-color: var(--secondary-bkg-color);
  color: var(--highlight-color-hover);
  transform: scale(1.05);
}`;

const directoryPath = 'archive';
const filePathCSS = path.join(directoryPath, 'archive.css');

if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
}

fs.writeFile(filePathCSS, archiveCSS, (err) => {
    if (err) {
        console.error('An error occurred while creating the CSS file:', err);
    } else {
        console.log('CSS file successfully created with readable formatting!');
    }
});

//
// Copyright 2024 Tyler Morgan. All rights reserved.
//
