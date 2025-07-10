# Markdown to PDF Converter

A terminal application that converts markdown files to beautifully designed PDFs with modern styling.

## Features

- **Modern, clean PDF design** with professional typography
- **Clickable table of contents** (chapter-level only) with working links
- **Page numbers** and headers/footers on every page
- **Copyright notice** ("Copyright Tiran Dagan, Signalsphere") on all pages
- **Colored headings** with decorative elements:
  - H1: Blue accent bar with gradient effect
  - H2-H3: Colored text with optimized spacing
- **Page breaks** before major chapters
- **Orphan control** to prevent headings at page bottom
- **Colored content sections**:
  - Key concepts highlighted with blue background
  - Colored bullets and numbering
  - Enhanced code blocks with gray background
  - Tables with blue headers and alternating row colors
- **Text wrapping** for long titles to prevent overflow
- **Optimized spacing** throughout the document

## Installation

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Using the convenience script:
```bash
./convert_pdf.sh input.md output.pdf
```

### Direct usage:
```bash
python md2pdf.py input.md -o output.pdf
```

## Example

```bash
# Convert the Sutherland report
./convert_pdf.sh sutherland_report.md sutherland_report.pdf

# Or directly with Python
python md2pdf.py sutherland_report.md -o sutherland_report.pdf
```

## Features Supported

- Headings (H1-H4) with proper hierarchy and wrapping
- Bold and italic text formatting
- Colored inline code (red with monospace font)
- Lists (ordered and unordered) with blue bullets
- Code blocks with gray background and border
- Tables with blue headers and alternating row colors
- Horizontal rules converted to simple spacers
- Internal links and anchors for navigation
- Automatic page breaks for chapters
- No orphaned headings (headings always have content following)

## Output Quality

The generated PDF includes:
- Professional title page with split title for proper formatting
- Clickable table of contents with chapter-level entries
- Consistent header/footer on every page
- Page numbers in "Page X of Y" format
- Modern color scheme with blue accents
- Optimized spacing to minimize whitespace while maintaining readability