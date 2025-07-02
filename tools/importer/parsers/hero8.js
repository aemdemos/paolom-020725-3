/* global WebImporter */
export default function parse(element, { document }) {
  // Block name as header in first row
  const headerRow = ['Hero (hero8)'];

  // Locate the main grid layout that holds the content
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = [];

  if (grid) {
    // Left side: headline and subheading
    const left = grid.children[0];
    if (left) {
      Array.from(left.children).forEach(child => {
        contentCell.push(child);
      });
    }
    // Right side: call-to-action buttons
    const right = grid.children[1];
    if (right) {
      Array.from(right.children).forEach(child => {
        contentCell.push(child);
      });
    }
  } else {
    // Fallback: just include all children
    contentCell = Array.from(element.children);
  }

  // Compose rows: header row, then content row
  const rows = [headerRow, [contentCell]];

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
