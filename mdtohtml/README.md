# Markdown to Beautiful HTML Converter

A Python terminal application that converts markdown files to beautiful, modern, self-contained HTML with advanced navigation features.

## Features

- **Modern, Responsive Design**: Beautiful CSS styling with light/dark theme support
- **Advanced Navigation**: 
  - Interactive table of contents with active section highlighting
  - Full-text search functionality
  - Progress indicator showing reading position
  - Mobile-friendly sidebar navigation
- **Enhanced Formatting**:
  - Syntax highlighting for code blocks (Monokai theme)
  - Support for tables, footnotes, and extended markdown features
  - Smart typography with proper quotes and dashes
  - Responsive images and media
- **Self-Contained Output**: All CSS and JavaScript embedded in a single HTML file
- **Print-Friendly**: Optimized print styles for clean output
- **Accessibility**: Semantic HTML with proper ARIA attributes

## Installation

The converter requires Python 3.6+ and the following dependencies:

```bash
pip install markdown pygments
```

Or use the provided requirements file:

```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

Convert a single markdown file:

```bash
python3 md2html.py document.md
```

This creates `document.html` in the same directory.

### Specify Output File

```bash
python3 md2html.py document.md -o output.html
```

### Batch Processing

Convert multiple files at once:

```bash
python3 md2html.py *.md --batch
```

### Verbose Output

Show detailed conversion information:

```bash
python3 md2html.py document.md -v
```

### Control Table of Contents Depth

By default, only level 1 headings (`#`) appear in the sidebar navigation. You can include deeper heading levels:

```bash
# Include only # headings (default)
python3 md2html.py document.md -d 1

# Include # and ## headings
python3 md2html.py document.md -d 2

# Include #, ##, and ### headings
python3 md2html.py document.md -d 3

# Include up to 6 levels of headings
python3 md2html.py document.md -d 6
```

## Example

To test with the provided Sutherland report:

```bash
python3 md2html.py sutherland_report_enhanced.md
```

Then open `sutherland_report_enhanced.html` in your web browser.

## Features in Detail

### Interactive Navigation

- **Sidebar TOC**: Automatically generated from headings with smooth scrolling
- **Active Section Highlighting**: Current section highlighted in the TOC
- **Search**: Real-time search with text highlighting
- **Mobile Menu**: Collapsible sidebar for mobile devices

### Theme Support

- Click the "🌓 Theme" button to toggle between light and dark modes
- Theme preference is saved in localStorage

### Sharing & Printing

- **Share Button**: Copy the current URL to clipboard
- **Print Button**: Optimized print layout with hidden navigation

### Code Highlighting

Supports syntax highlighting for multiple languages:

```python
def hello_world():
    print("Hello, World!")
```

### Responsive Design

- Desktop: Full sidebar navigation
- Tablet: Collapsible sidebar
- Mobile: Hidden sidebar with menu toggle

## Customization

The HTML template can be customized by modifying the `_get_html_template()` method in `md2html.py`. Key customization areas:

- **Colors**: Modify CSS variables in `:root`
- **Fonts**: Change `--font-sans` and `--font-mono` variables
- **Layout**: Adjust sidebar width and content max-width
- **Code Theme**: Replace Pygments style (currently Monokai)

## License

This converter is provided as-is for educational and personal use.