/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion table header as in example
  const rows = [['Accordion']];

  // All direct children representing accordion items
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title cell extraction
    let titleElem;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Find the title div inside toggle
      titleElem = toggle.querySelector('.paragraph-lg') || toggle.querySelector(':scope > div:not(.dropdown-icon)');
    }
    let titleCell;
    if (titleElem) {
      // Reference existing element for the cell, wrap in <p> if not already a <p>
      if (titleElem.tagName.toLowerCase() === 'p') {
        titleCell = titleElem;
      } else {
        titleCell = document.createElement('p');
        titleCell.textContent = titleElem.textContent.trim();
      }
    } else {
      // fallback: empty cell
      titleCell = document.createElement('p');
      titleCell.textContent = '';
    }

    // Content cell extraction
    let contentCell;
    const nav = item.querySelector('.accordion-content');
    if (nav) {
      // Look for the direct child that contains the rich text
      const contentWrapper = nav.querySelector(':scope > div');
      if (contentWrapper) {
        // Use the .rich-text if it exists, otherwise the wrapper div
        contentCell = contentWrapper.querySelector('.rich-text') || contentWrapper;
      } else {
        contentCell = nav;
      }
    } else {
      // fallback: empty cell
      contentCell = document.createElement('div');
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
