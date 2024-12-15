//
// Copyright 2024 Tyler Morgan. All rights reserved.
//

import fs from 'fs';
import { JSDOM } from 'jsdom';
import prettier, { doc } from 'prettier';
import path from 'path';

const dom = new JSDOM(`<!DOCTYPE html><html lang="en" dir="ltr"><head></head><body></body></html>`);

// Access the document object for DOM manipulation
const document = dom.window.document;

const metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
document.head.append(metaCharset);

const metaViewport = document.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
document.head.append(metaViewport);

const title = document.createElement('title');
title.textContent = 'Records';
document.head.append(title);

const styleMain = document.createElement('link');
styleMain.setAttribute('rel', 'stylesheet');
styleMain.setAttribute('crossorigin', '');
styleMain.href = 'https://tylermorgan.co/style.css';
document.head.append(styleMain);

const styleRecord = document.createElement('link');
styleRecord.setAttribute('rel', 'stylesheet');
styleRecord.href = '/record-inventory/records.css';
document.head.append(styleRecord);

const webDecription = document.createElement('meta');
webDecription.setAttribute('name', 'description');
webDecription.setAttribute('content', 'An inventory of Tyler\'s record collection.');
document.head.append(webDecription);

const iconLightSVG = document.createElement('link');
iconLightSVG.setAttribute('rel', 'icon');
iconLightSVG.setAttribute('media', '(prefers-color-scheme: light)');
iconLightSVG.setAttribute('type', 'image/svg');
iconLightSVG.href = 'https://tylermorgan.co/elements/icons/favicon-day.svg';
document.head.append(iconLightSVG);

const iconDarkSVG = document.createElement('link');
iconDarkSVG.setAttribute('rel', 'icon');
iconDarkSVG.setAttribute('media', '(prefers-color-scheme: dark)');
iconDarkSVG.setAttribute('type', 'image/svg');
iconDarkSVG.href = 'https://tylermorgan.co/elements/icons/favicon-night.svg';
document.head.append(iconDarkSVG);

const iconLightAVIF = document.createElement('link');
iconLightAVIF.setAttribute('rel', 'icon');
iconLightAVIF.setAttribute('media', '(prefers-color-scheme: light)');
iconLightAVIF.setAttribute('type', 'image/avif');
iconLightAVIF.href = 'https://tylermorgan.co/elements/icons/favicon-day-180.avif';
document.head.append(iconLightAVIF);

const iconDarkAVIF = document.createElement('link');
iconDarkAVIF.setAttribute('rel', 'icon');
iconDarkAVIF.setAttribute('media', '(prefers-color-scheme: dark)');
iconDarkAVIF.setAttribute('type', 'image/avif');
iconDarkAVIF.href = 'https://tylermorgan.co/elements/icons/favicon-night-180.avif';
document.head.append(iconDarkAVIF);

const iconLightAVIF192 = document.createElement('link');
iconLightAVIF192.rel = 'icon';
iconLightAVIF192.media = '(prefers-color-scheme: light)';
iconLightAVIF192.type = 'image/avif';
iconLightAVIF192.sizes = '192x192';
iconLightAVIF192.href = 'https://tylermorgan.co/elements/icons/favicon-day-192.avif';
document.head.append(iconLightAVIF192);

const iconDarkAVIF192 = document.createElement('link');
iconDarkAVIF192.rel = 'icon';
iconDarkAVIF192.media = '(prefers-color-scheme: dark)';
iconDarkAVIF192.type = 'image/avif';
iconDarkAVIF192.sizes = '192x192';
iconDarkAVIF192.href = 'https://tylermorgan.co/elements/icons/favicon-night-192.avif';
document.head.append(iconDarkAVIF192);

const appleTouchIcon = document.createElement('link');
appleTouchIcon.rel = 'apple-touch-icon';
appleTouchIcon.href = 'https://tylermorgan.co/apple-touch-icon.avif';
document.head.append(appleTouchIcon);

const maskIcon = document.createElement('link');
maskIcon.rel = 'mask-icon';
maskIcon.href = 'https://tylermorgan.co/elements/icons/mask-icon.svg';
maskIcon.color = '#454D51';
document.head.append(maskIcon);

const lightThemeColor = document.createElement('meta');
lightThemeColor.name = 'theme-color';
lightThemeColor.media = '(prefers-color-scheme: light)';
lightThemeColor.content = '#444444'
document.head.append(lightThemeColor);

const darkThemeColor = document.createElement('meta');
darkThemeColor.name = 'theme-color';
darkThemeColor.media = '(prefers-color-scheme: dark)';
darkThemeColor.content = '#121111';
document.head.append(darkThemeColor);

const canonical = document.createElement('link');
canonical.rel = 'canonical';
canonical.href = 'https://tylermorgan.co/record-inventory/';
document.head.append(canonical);

const keywords = document.createElement('meta');
keywords.name = 'keywords';
keywords.content = 'record, handbook, tyler morgan, vinyl, tylerjmorg, discogs, goldmine, music, inventory';
document.head.append(keywords);

const buildDate = () => {
  const now = new Date();
  return now.toISOString();
};

const comment = document.createComment("note");
comment.textContent = `This document was built on ${buildDate()}.`;
document.body.append(comment);

const header = document.createElement('header');
header.classList.add('title-container');

let headerH1 = document.createElement('h1');

headerH1.classList.add('title', 'ring');
headerH1.ariaLabel = 'Records';

let headerH1SVG = document.createElement('svg');
headerH1SVG.classList.add('ring-svg');
headerH1SVG.setAttribute('viewBox', '0 0 100 100');
headerH1SVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

let headerH1Path = document.createElement('path');
headerH1Path.classList.add('ring-circle');
headerH1Path.id = 'circlePath';
headerH1Path.setAttribute('d', 'M 4.1779659,50 A 45.822034,45.822034 0 1 0 95.822034,50 45.822034,45.822034 0 1 0 4.1779658,50');
headerH1SVG.append(headerH1Path);

let headerH1Text = document.createElement('text');

let headerH1TextPath = document.createElement('textPath');
headerH1TextPath.setAttribute('href', '#circlePath');
headerH1TextPath.setAttribute('fill', 'var(--primary-color)');
headerH1TextPath.textContent = 'RECORDS · RECORDS · RECORDS · RECORDS · RECORDS ·';
headerH1Text.append(headerH1TextPath);

headerH1SVG.append(headerH1Text);

headerH1.append(headerH1SVG);

header.append(headerH1);

document.body.append(header);

const main = document.createElement('main');

const section1 = document.createElement('section');

const recordsFilePath = path.resolve('records.json');

fs.readFile(recordsFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('JSON file could not be found.', err);
    return;
  }
  
  const parsedRecordData = JSON.parse(data);

  let table = document.createElement('ul');
  table.classList.add('record-grid');

  parsedRecordData.forEach((item, index) => {
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
      let qtyLabel = document.createElement('span');
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
      let discColorsLabel = document.createElement('span');
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

      let genresLabel = document.createElement('span');
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

      let labelsLabel = document.createElement('span');
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

      let discCountLabel = document.createElement('span');
      discCountLabel.classList.add('label');
      discCountLabel.textContent = 'Disc Count';
      discCount.append(discCountLabel);

      discCount.append(document.createTextNode(`: ${item.disc_count}`));

      recordContent.append(discCount);
    }

    if (item.contents_count) {
      let contentsCount = document.createElement('p');
      let contentsCountLabel = document.createElement('span');
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
      let contentsLabel = document.createElement('span');
      contentsLabel.classList.add('label');
      contentsLabel.textContent = 'Contents Description';
      contents.append(contentsLabel);

      contents.append(document.createTextNode(': '));

      if (item.jacket1_qty) {
        let jacket1Break = document.createElement('br');
        contents.append(jacket1Break);

        contents.append(document.createTextNode(`${item.jacket1_qty} - ${jacket1Desc}`));
      }

      if (item.jacket2_qty) {
        let jacket2Break = document.createElement('br');
        contents.append(jacket2Break);

        contents.append(document.createTextNode(`${item.jacket2_qty} - ${jacket2Desc}`));
      }

      if (item.jacket3_qty) {
        let jacket3Break = document.createElement('br');
        contents.append(jacket3Break);

        contents.append(document.createTextNode(`${item.jacket3_qty} - ${jacket3Desc}`));
      }

      if (item.jacket4_qty) {
        let jacket4Break = document.createElement('br');
        contents.append(jacket4Break);

        contents.append(document.createTextNode(`${item.jacket4_qty} - ${jacket4Desc}`));
      }

      if (item.inner_sleeve_qty) {
        let innerSleeveBreak = document.createElement('br');
        contents.append(innerSleeveBreak);

        contents.append(document.createTextNode(`${item.inner_sleeve_qty} - Inner-sleeve`));
      }

      if (item.outer_sleeve_qty) {
        let outerSleeveBreak = document.createElement('br');
        contents.append(outerSleeveBreak);

        contents.append(document.createTextNode(`${item.outer_sleeve_qty} - Outer-sleeve`));
      }

      if (item.poster_qty) {
        let posterBreak = document.createElement('br');
        contents.append(posterBreak);

        contents.append(document.createTextNode(`${item.poster_qty} - Poster`));
      }

      if (item.envelope_qty) {
        let envelopeBreak = document.createElement('br');
        contents.append(envelopeBreak);

        contents.append(document.createTextNode(`${item.envelope_qty} - Envelope`));
      }

      if (item.album_photo_qty) {
        let albumPhotoBreak = document.createElement('br');
        contents.append(albumPhotoBreak);

        contents.append(document.createTextNode(`${item.album_photo_qty} - Album Photo`));
      }

      if (item.song_letter_qty) {
        let songLetterBreak = document.createElement('br');
        contents.append(songLetterBreak);

        contents.append(document.createTextNode(`${item.song_letter_qty} - Song Letter`));
      }

      if (item.hype_sticker_qty) {
        let hypeStickerBreak = document.createElement('br');
        contents.append(hypeStickerBreak);

        contents.append(document.createTextNode(`${item.hype_sticker_qty} - Hype Sticker`));
      }

      if (item.song_lyrics_booklet_qty) {
        let songLyricsBookletBreak = document.createElement('br');
        contents.append(songLyricsBookletBreak);

        contents.append(document.createTextNode(`${item.song_lyrics_booklet_qty} - Song Lyrics Booklet`));
      }

      if (item.logo_photo_qty) {
        let logoPhotoBreak = document.createElement('br');
        contents.append(logoPhotoBreak);

        contents.append(document.createTextNode(`${item.logo_photo_qty} - Logo Photo`));
      }

      if (item.photo_album_booklet_qty) {
        let photoAlbumBookletBreak = document.createElement('br');
        contents.append(photoAlbumBookletBreak);

        contents.append(document.createTextNode(`${item.photo_album_booklet_qty} - Photo Album Booklet`));
      }

      if (item.other_item1_qty) {
        let other1Break = document.createElement('br');
        contents.append(other1Break);

        contents.append(document.createTextNode(`${item.other_item1_qty} - ${other1Name}`));
      }

      if (item.other_item2_qty) {
        let other2Break = document.createElement('br');
        contents.append(other2Break);

        contents.append(document.createTextNode(`${item.other_item2_qty} - ${other2Name}`));
      }

      if (item.other_item3_qty) {
        let other3Break = document.createElement('br');
        contents.append(other3Break);

        contents.append(document.createTextNode(`${item.other_item3_qty} - ${other3Name}`));
      }

      if (item.other_item4_qty) {
        let other4Break = document.createElement('br');
        contents.append(other4Break);

        contents.append(document.createTextNode(`${item.other_item4_qty} - ${other4Name}`));
      }

      if (item.other_item5_qty) {
        let other5Break = document.createElement('br');
        contents.append(other5Break);

        contents.append(document.createTextNode(`${item.other_item5_qty} - ${other5Name}`));
      }

      if (item.other_item6_qty) {
        let other6Break = document.createElement('br');
        contents.append(other6Break);

        contents.append(document.createTextNode(`${item.other_item6_qty} - ${other6Name}`));
      }

      if (item.digital_download_slip_qty) {
        let digitalDownloadSlipBreak = document.createElement('br');
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
        let jacket1GoldmineBreak = document.createElement('br');
        goldmine.append(jacket1GoldmineBreak);

        goldmine.append(document.createTextNode(`${jacket1Name} - ${item.jacket1_goldmine}`));
      }

      if (item.jacket2_goldmine) {
        let jacket2GoldmineBreak = document.createElement('br');
        goldmine.append(jacket2GoldmineBreak);

        goldmine.append(document.createTextNode(`${jacket2Name} - ${item.jacket2_goldmine}`));
      }

      if (item.jacket3_goldmine) {
        let jacket3GoldmineBreak = document.createElement('br');
        goldmine.append(jacket3GoldmineBreak);

        goldmine.append(document.createTextNode(`${jacket3Name} - ${item.jacket3_goldmine}`));
      }

      if (item.jacket4_goldmine) {
        let jacket4GoldmineBreak = document.createElement('br');
        goldmine.append(jacket4GoldmineBreak);

        goldmine.append(document.createTextNode(`${jacket4Name} - ${item.jacket4_goldmine}`));
      }

      if (item.disc1_goldmine) {
        let disc1GoldmineBreak = document.createElement('br');
        goldmine.append(disc1GoldmineBreak);

        goldmine.append(document.createTextNode(`${disc1Name} - ${item.disc1_goldmine}`));
      }

      if (item.disc2_goldmine) {
        let disc2GoldmineBreak = document.createElement('br');
        goldmine.append(disc2GoldmineBreak);

        goldmine.append(document.createTextNode(`${disc2Name} - ${item.disc2_goldmine}`));
      }

      if (item.disc3_goldmine) {
        let disc3GoldmineBreak = document.createElement('br');
        goldmine.append(disc3GoldmineBreak);

        goldmine.append(document.createTextNode(`${disc3Name} - ${item.disc3_goldmine}`));
      }

      if (item.disc4_goldmine) {
        let disc4GoldmineBreak = document.createElement('br');
        goldmine.append(disc4GoldmineBreak);

        goldmine.append(document.createTextNode(`${disc4Name} - ${item.disc4_goldmine}`));
      }

      if (item.disc5_goldmine) {
        let disc5GoldmineBreak = document.createElement('br');
        goldmine.append(disc5GoldmineBreak);

        goldmine.append(document.createTextNode(`${disc5Name} - ${item.disc5_goldmine}`));
      }

      if (item.disc6_goldmine) {
        let disc6GoldmineBreak = document.createElement('br');
        goldmine.append(disc6GoldmineBreak);

        goldmine.append(document.createTextNode(`${disc6Name} - ${item.disc6_goldmine}`));
      }

      if (item.disc7_goldmine) {
        let disc7GoldmineBreak = document.createElement('br');
        goldmine.append(disc7GoldmineBreak);

        goldmine.append(document.createTextNode(`${disc7Name} - ${item.disc7_goldmine}`));
      }

      if (item.disc8_goldmine) {
        let disc8GoldmineBreak = document.createElement('br');
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

      let listenedLabel = document.createElement('span');
      listenedLabel.classList.add('label');
      listenedLabel.textContent = 'Listened';
      listened.append(listenedLabel);

      listened.append(document.createTextNode(': Yes'));

      recordContent.append(listened);
    } else if (item.listened === false) {
      listened = document.createElement('p');

      let listenedLabel = document.createElement('span');
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
      let discogsLabel = document.createElement('span');
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

        let ddLabel = document.createElement('span');
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
        let ddLabel = document.createElement('span');
        ddLabel.classList.add('label');
        ddLabel.textContent = 'Digitally Downloaded';
        dd.append(ddLabel);

        dd.append(document.createTextNode(': Yes'));
      }
    } else if (item.dd === 'No') {
      if (item.dd_no_url) {
        dd = document.createElement('p');
        let ddLabel = document.createElement('span');
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
        let ddLabel = document.createElement('span');
        ddLabel.classList.add('label');
        ddLabel.textContent = 'Digitally Downloaded';
        dd.append(ddLabel);

        dd.append(document.createTextNode(': No'));
      }
    } else if (item.dd === 'N/A') {
      dd = document.createElement('p');
      let ddLabel = document.createElement('span');
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
      let break5 = document.createElement('br');
      recordContent.append(break5);
      
      downloadWebsites = document.createElement('p');
      downloadWebsites.textContent = 'Downloads available on';

      let artistWebsite = '';
      if (item.dd_official_url) {
        let artistWebsiteBreak = document.createElement('br');
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
        let qobuzBreak = document.createElement('br');
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

  section1.append(table);

  main.append(section1);

  const section2 = document.createElement('section');

  const invUpdateFilePath = path.resolve('inventory_update.json');

  fs.readFile(invUpdateFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('JSON file could not be found.', err);
      return; // Exit if there’s an error reading the file
    }

    const parsedInvUpdateData = JSON.parse(data);

  let table = document.createElement('ul');
  table.classList.add('update-grid');

  parsedInvUpdateData.forEach((item) => {
    let updateCard = document.createElement('li');
    updateCard.classList.add('update-card');
    
    let updateCardContent = document.createElement('div');
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
  section2.append(table);
  main.append(section2);

  const section3 = document.createElement('section');
  section3.classList.add('bottom-links');

  let definitions = document.createElement('a');
  definitions.href = '/record-handbook/inventory/defs/';
  definitions.classList.add('bottom-link');
  definitions.textContent = 'Definitions';
  section3.append(definitions);

  let recordHandbook = document.createElement('a');
  recordHandbook.href = '/record-handbook/';
  recordHandbook.classList.add('bottom-link');
  recordHandbook.textContent = 'The Record Handbook';
  section3.append(recordHandbook);

  main.append(section3);

  document.body.append(main);

  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const footerDisclaimer = document.createElement('p');
  footerDisclaimer.append(document.createTextNode('Some URLs may be expired or password protected. Check the '));

  const archiveLink = document.createElement('a');
  archiveLink.href = '/record-inventory/archive/';
  archiveLink.classList.add('content-link');
  archiveLink.textContent = 'archive page';
  footerDisclaimer.append(archiveLink);

  footerDisclaimer.append(document.createTextNode(' for more info.'));

  footer.append(footerDisclaimer);

  const footerCopyright = document.createElement('p');
  footerCopyright.append(document.createTextNode('© '));

  const footerYear = document.createElement('span');
  footerYear.id = 'year_2024';
  footerCopyright.append(footerYear);

  footerCopyright.append(document.createTextNode(' '));

  const footerName = document.createElement('a');
  footerName.href = 'https://tylermorgan.co/';
  footerName.classList.add('content-link');
  footerName.textContent = 'Tyler Morgan';
  footerCopyright.append(footerName);

  footerCopyright.append(document.createTextNode('. All rights reserved.'));

  footer.append(footerCopyright);

  const privacyPolicy = document.createElement('p');
  const privacyPolicyLink = document.createElement('a');
  privacyPolicyLink.classList.add('content-link');
  privacyPolicyLink.setAttribute('rel', 'privacy-policy');
  privacyPolicyLink.href = 'https://tylermorgan.co/privacy-policy/';
  privacyPolicyLink.textContent = 'Privacy Policy';
  privacyPolicy.append(privacyPolicyLink);

  footer.append(privacyPolicy);

  document.body.append(footer);

  let collapsible = document.createElement('script');
  collapsible.src = '/record-inventory/collapsible.js';
  document.body.append(collapsible);

  let yearScript = document.createElement('script');
  yearScript.src = 'https://tylermorgan.co/year_2024.js'
  yearScript.type = 'module';
  document.body.append(yearScript);

// Serialize the DOM
const htmlContent = dom.serialize();

// Format the HTML with Prettier and write it to the file
prettier
    .format(htmlContent, { parser: 'html' }) // Prettier formatting returns a Promise
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

//
// Copyright 2024 Tyler Morgan. All rights reserved.
//