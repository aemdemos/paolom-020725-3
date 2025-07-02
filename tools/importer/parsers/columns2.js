/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all column elements (direct children)
  const columns = Array.from(element.children);
  const numColumns = columns.length;

  // Build the header row as an array with a single cell (the block name)
  // The table rendering logic will set colspan automatically, so this is correct
  const headerRow = ['Columns (columns2)'];

  // The second row contains one cell per column
  const contentRow = columns;

  // Compose the rows
  const tableRows = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
