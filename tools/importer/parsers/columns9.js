/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns wrapper (the grid layout)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate child elements of the grid - each is a column
  const columns = Array.from(grid.children);

  // Build table: header as a single cell row (not as many cells as columns)
  const rows = [ ['Columns (columns9)'] ];
  rows.push(columns);

  // Create block and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
