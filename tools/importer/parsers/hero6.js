/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panes (tabs)
  const panes = element.querySelectorAll('.w-tab-pane');
  // Pick the first tab pane that is active, or just the first
  const activePane = Array.from(panes).find(pane => pane.classList.contains('w--tab-active')) || panes[0];
  if (!activePane) return;

  // Find the grid inside the active tab (contains all hero content)
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children (preserves source order and ALL content)
  const gridChildren = Array.from(grid.children);
  // Find the image (if any)
  const imageEl = gridChildren.find(child => child.tagName && child.tagName.toLowerCase() === 'img');
  // All other children are text/headings/etc
  const contentEls = gridChildren.filter(child => !(child.tagName && child.tagName.toLowerCase() === 'img'));

  // If any text content is inside the grid, it will be as a group of elements (e.g., h3, p, etc)
  // We want to retain all structure, so we provide all contentEls as an array if more than one, or just the element if only one
  let contentCell = '';
  if (contentEls.length === 1) {
    contentCell = contentEls[0];
  } else if (contentEls.length > 1) {
    contentCell = contentEls;
  }

  // Build the block table: header, image, text content
  const rows = [
    ['Hero (hero6)'],
    [imageEl ? imageEl : ''],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
