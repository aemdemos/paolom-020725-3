/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards3)'];

  // Gather all direct card divs
  const cards = element.querySelectorAll(':scope > div');
  const cardRows = [];
  cards.forEach((card) => {
    // Get icon (prefer the entire .icon wrapper for context and styling)
    const iconWrapper = card.querySelector('.icon');
    // Get the text content (the p tag)
    const textContent = card.querySelector('p');
    // Defensive: Only push valid rows with both icon and text
    if (iconWrapper && textContent) {
      cardRows.push([iconWrapper, textContent]);
    }
  });

  // Build the table data array
  const tableData = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
