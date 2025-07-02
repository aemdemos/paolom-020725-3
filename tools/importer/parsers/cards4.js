/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, exactly as required
  const headerRow = ['Cards (cards4)'];
  // Each card is a direct child <a>
  const cardAnchors = element.querySelectorAll(':scope > a');
  const rows = [headerRow];
  cardAnchors.forEach(cardAnchor => {
    // Image: the first img inside the card anchor
    const img = cardAnchor.querySelector('img');
    // The content div holding all text
    // It's the first <div> after the img, as per structure
    let contentDiv = null;
    if (img) {
      // The contentDiv is the first div sibling after img inside the grid
      // Since both img and contentDiv are children of a grid div, find parent then next sibling
      const gridDiv = img.closest('.w-layout-grid');
      if (gridDiv) {
        // The content is the first div that's NOT .w-layout-grid, after img
        const divs = gridDiv.querySelectorAll(':scope > div');
        divs.forEach(div => {
          if (!div.classList.contains('w-layout-grid') && !contentDiv) {
            contentDiv = div;
          }
        });
      } else {
        // fallback: try nextElementSibling of img
        if (img.nextElementSibling) contentDiv = img.nextElementSibling;
      }
    }
    // If fallback, try any direct div after img
    if (!contentDiv && img && img.parentElement) {
      const divs = img.parentElement.querySelectorAll(':scope > div');
      if (divs.length > 0) contentDiv = divs[divs.length - 1];
    }
    // If still not found, fallback to any div in cardAnchor
    if (!contentDiv) {
      const poss = cardAnchor.querySelectorAll('div');
      if (poss.length) contentDiv = poss[poss.length - 1];
    }
    // Compose the text cell
    const textParts = [];
    if (contentDiv) {
      // Tags/meta: class flex-horizontal align-center flex-gap-xs utility-margin-bottom-1rem
      const tagMeta = contentDiv.querySelector('.flex-horizontal');
      if (tagMeta) {
        // Reference the entire tagMeta div for all tag/meta info
        textParts.push(tagMeta);
      }
      // Heading: h3.h4-heading (may change, allow for all h2-h6)
      const heading = contentDiv.querySelector('h2, h3, h4, h5, h6');
      if (heading) textParts.push(heading);
      // Description: first <p>
      const desc = contentDiv.querySelector('p');
      if (desc) textParts.push(desc);
      // CTA: any div after p (often just 'Read')
      // But only the last <div> (for robustness)
      const divs = contentDiv.querySelectorAll(':scope > div');
      if (divs.length > 1) {
        textParts.push(divs[divs.length - 1]);
      } else if (divs.length === 1 && (!tagMeta || (tagMeta && divs[0] !== tagMeta))) {
        // if only 1, and it's not tagMeta, add it
        textParts.push(divs[0]);
      }
    }
    // Remove any undefined/null
    const cleanedTextParts = textParts.filter(Boolean);
    rows.push([
      img,
      cleanedTextParts
    ]);
  });
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
