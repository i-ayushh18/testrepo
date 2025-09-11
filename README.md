# Sudoku Grid

This project provides a static, accessible 9x9 Sudoku board using only HTML and CSS.

## Features

- **9x9 grid**: Structured using a `<table>`, each cell is square and empty.
- **3x3 sub-grid separation**: Thicker borders visually distinguish the nine 3x3 regions.
- **Responsive design**: Grid scales for smaller screens.
- **Accessibility**: Uses semantic HTML and ARIA labels.

## Usage

1. Open `public/index.html` in any modern browser.
2. The Sudoku board should appear, with bold lines separating the 3x3 sub-grids.

## Structure

- `public/index.html`: Main HTML file containing the Sudoku grid.
- `public/styles/sudoku.css`: CSS for grid layout and styling.
- `README.md`: Project documentation.

## Notes

- No JavaScript is used or required.
- All cells are empty and non-interactive.
- For further development (e.g., adding interactivity), JavaScript can be added later.

## Edge Cases & Validation

- The grid is visually validated to ensure all 3x3 sub-grids are clearly separated.
- Responsive CSS ensures usability on small screens.
- Table structure ensures accessibility for screen readers.

## Error Handling

- If the CSS file is missing or fails to load, the grid will still display but without enhanced styling.
- The HTML is valid and will render in all modern browsers.