/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct child anchors (tab links)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));
  // Extract tab label text from their child divs (if present) or textContent
  const tabLabels = tabLinks.map(a => {
    const div = a.querySelector('div');
    if (div && div.textContent.trim()) {
      return div.textContent.trim();
    }
    return a.textContent.trim();
  });
  // Compose the table: header row is a single cell ['Tabs']
  const cells = [ ['Tabs'] ];
  // Each tab row is [label, ''] (2 columns: label, content)
  tabLabels.forEach(label => {
    cells.push([label, '']);
  });
  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
