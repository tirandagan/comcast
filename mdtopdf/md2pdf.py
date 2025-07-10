#!/usr/bin/env python3
import os
import re
import click
import markdown2
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether, Flowable,
    PageTemplate, Frame, BaseDocTemplate, CondPageBreak,
    Image, NextPageTemplate, KeepInFrame
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.graphics.shapes import Drawing, Rect, Line, String, Circle
from reportlab.graphics import renderPDF
from bs4 import BeautifulSoup
from slugify import slugify
from datetime import datetime


class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []
        self.page_num = 0
        self.total_pages = 0

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.page_num += 1
        
        # Modern design elements with gradient effect
        self.setStrokeColor(colors.HexColor("#E0E0E0"))
        self.setLineWidth(0.5)
        
        # Header line with gradient effect
        for i in range(3):
            opacity = 1.0 - (i * 0.3)
            self.setStrokeColorRGB(0.878, 0.878, 0.878, opacity)
            self.line(inch, letter[1] - inch * 0.75 + i, letter[0] - inch, letter[1] - inch * 0.75 + i)
        
        # Footer line
        self.setStrokeColor(colors.HexColor("#E0E0E0"))
        self.line(inch, inch * 0.75, letter[0] - inch, inch * 0.75)
        
        # Page numbers
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#666666"))
        self.drawRightString(letter[0] - inch, inch * 0.5, f"Page {self.page_num} of {page_count}")
        
        # Copyright notice
        self.drawString(inch, inch * 0.5, "Copyright Tiran Dagan, Signalsphere")
        
        # Header with document title
        self.setFont("Helvetica-Bold", 10)
        self.setFillColor(colors.HexColor("#2C3E50"))
        self.drawCentredString(letter[0] / 2, letter[1] - inch * 0.5, "Sutherland Global Services - AI Innovation Strategy")


class ModernPDFGenerator:
    def __init__(self):
        self.styles = self._create_modern_styles()
        self.toc = TableOfContents()
        self.toc_entries = []
        self.heading_counter = {}
        self.current_page = 1
        self.page_refs = {}  # Store page references for TOC
        
    def _create_modern_styles(self):
        styles = getSampleStyleSheet()
        
        # Title style
        styles.add(ParagraphStyle(
            name='ModernTitle',
            parent=styles['Title'],
            fontSize=26,
            textColor=colors.HexColor("#1A237E"),
            spaceAfter=16,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        ))
        
        # Heading styles with colors - Optimized spacing
        styles.add(ParagraphStyle(
            name='ModernHeading1',
            parent=styles['Heading1'],
            fontSize=20,
            textColor=colors.HexColor("#1565C0"),
            spaceBefore=12,
            spaceAfter=8,
            fontName='Helvetica-Bold',
            keepWithNext=True,
            wordWrap='CJK'
        ))
        
        styles.add(ParagraphStyle(
            name='ModernHeading2',
            parent=styles['Heading2'],
            fontSize=18,
            textColor=colors.HexColor("#1976D2"),
            spaceBefore=10,
            spaceAfter=6,
            fontName='Helvetica-Bold',
            keepWithNext=True,
            wordWrap='CJK'
        ))
        
        styles.add(ParagraphStyle(
            name='ModernHeading3',
            parent=styles['Heading3'],
            fontSize=16,
            textColor=colors.HexColor("#1E88E5"),
            spaceBefore=8,
            spaceAfter=4,
            fontName='Helvetica-Bold',
            keepWithNext=True,
            wordWrap='CJK'
        ))
        
        # Body text
        styles.add(ParagraphStyle(
            name='ModernBody',
            parent=styles['BodyText'],
            fontSize=11,
            textColor=colors.HexColor("#37474F"),
            alignment=TA_JUSTIFY,
            spaceBefore=3,
            spaceAfter=3,
            leading=14
        ))
        
        # List styles with colored bullets
        styles.add(ParagraphStyle(
            name='ModernBullet',
            parent=styles['ModernBody'],
            leftIndent=24,
            bulletIndent=12,
            spaceBefore=2,
            spaceAfter=2,
            bulletColor=colors.HexColor("#2196F3")
        ))
        
        # Code block style
        styles.add(ParagraphStyle(
            name='ModernCode',
            parent=styles['Code'],
            fontSize=9,
            textColor=colors.HexColor("#263238"),
            backColor=colors.HexColor("#ECEFF1"),
            borderWidth=1,
            borderColor=colors.HexColor("#B0BEC5"),
            borderPadding=8,
            borderRadius=4,
            fontName='Courier',
            spaceBefore=4,
            spaceAfter=4
        ))
        
        # Quote/highlight style
        styles.add(ParagraphStyle(
            name='ModernQuote',
            parent=styles['ModernBody'],
            fontSize=12,
            textColor=colors.HexColor("#37474F"),
            backColor=colors.HexColor("#E3F2FD"),
            borderWidth=3,
            borderColor=colors.HexColor("#2196F3"),
            borderPadding=10,
            borderRadius=0,
            leftIndent=20,
            rightIndent=20,
            spaceBefore=6,
            spaceAfter=6
        ))
        
        # TOC styles
        for i in range(4):
            styles.add(ParagraphStyle(
                name=f'TOCHeading{i}',
                parent=styles['Normal'],
                fontSize=12 - i,
                leftIndent=i * 20,
                textColor=colors.HexColor("#1565C0"),
                spaceAfter=3
            ))
            
        return styles
    
    def _parse_markdown(self, md_content):
        html = markdown2.markdown(
            md_content,
            extras=['fenced-code-blocks', 'tables', 'header-ids', 'footnotes']
        )
        return BeautifulSoup(html, 'lxml')
    
    def _process_heading(self, element, level):
        text = element.get_text()
        anchor_id = element.get('id', slugify(text))
        
        # Skip the original "Table of Contents" heading from the markdown
        if text == "Table of Contents":
            return None
            
        # Only add chapter-level headings to TOC
        is_major_chapter = False
        if (level == 1 or 
            (level == 2 and (text.startswith('Chapter') or 
                           text == 'Executive Summary' or 
                           text.startswith('Conclusion') or
                           text.startswith('Appendix')))):
            self.toc_entries.append({
                'level': 0 if level == 1 else 1,
                'text': text,
                'anchor': anchor_id,
                'page': 0
            })
            is_major_chapter = True
        
        style_name = f'ModernHeading{level}'
        if style_name not in self.styles:
            style_name = 'ModernHeading3'
        
        # Create heading with proper wrapping
        heading_html = f'<a name="{anchor_id}"/>{text}'
        heading_para = Paragraph(heading_html, self.styles[style_name])
        
        # Add colored decoration
        flowables = []
        if level == 1:
            # H1: Blue accent bar on left
            decoration = Drawing(500, 25)
            decoration.add(Rect(0, 5, 4, 18, fillColor=colors.HexColor("#3498DB"), strokeColor=None))
            flowables = [decoration, heading_para]
        elif level == 2:
            # H2: Simple heading with color
            flowables = [heading_para]
        else:
            flowables = [heading_para]
        
        # Add page break before major chapters
        if is_major_chapter and level <= 2:
            return [PageBreak()] + flowables
        else:
            # Use KeepTogether with minimum content to prevent orphans
            return KeepTogether(flowables + [Spacer(1, 30)])
    
    def _process_paragraph(self, element):
        text = element.get_text()
        if text.strip():
            # Skip "Main Report" and "Appendices" section headers from original TOC
            if text in ["Main Report", "Appendices"]:
                return None
            
            # Check for key concepts/highlights
            if any(keyword in text.lower() for keyword in ['key', 'important', 'note:', 'critical']):
                style = self.styles['ModernQuote']
            else:
                style = self.styles['ModernBody']
                
            # Handle formatting
            text = re.sub(r'\*\*(.+?)\*\*', r'<b>\\1</b>', text)
            text = re.sub(r'\*(.+?)\*', r'<i>\\1</i>', text)
            text = re.sub(r'`(.+?)`', r'<font name="Courier" color="#D32F2F">\\1</font>', text)
            
            return Paragraph(text, style)
        return None
    
    def _process_list(self, element, ordered=False):
        items = []
        for i, li in enumerate(element.find_all('li', recursive=False)):
            text = li.get_text()
            
            # Skip TOC entries from the original markdown
            if (text.startswith('[Executive Summary]') or 
                text.startswith('[Chapter') or 
                text.startswith('[Conclusion') or
                text.startswith('[Appendix')):
                continue
                
            if ordered:
                bullet_text = f'<font color="#2196F3">{i + 1}.</font> {text}'
            else:
                bullet_text = f'<font color="#2196F3">•</font> {text}'
            items.append(Paragraph(bullet_text, self.styles['ModernBullet']))
        return items
    
    def _process_code_block(self, element):
        code_text = element.get_text()
        return Paragraph(f'<pre>{code_text}</pre>', self.styles['ModernCode'])
    
    def _process_table(self, element):
        data = []
        for row in element.find_all('tr'):
            row_data = []
            for cell in row.find_all(['td', 'th']):
                row_data.append(cell.get_text())
            data.append(row_data)
        
        if not data:
            return None
            
        table = Table(data)
        table.setStyle(TableStyle([
            # Header style
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1565C0")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 11),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            # Body style
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 10),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E0E0E0")),
            # Alternating row colors
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F5F5F5")])
        ]))
        
        return table
    
    def _html_to_flowables(self, soup):
        flowables = []
        skip_until_hr = False
        
        for element in soup.find('body').children:
            # Skip everything until we hit the first HR after Table of Contents
            if element.name == 'h1' and element.get_text() == 'Table of Contents':
                skip_until_hr = True
                continue
            elif skip_until_hr and element.name == 'hr':
                skip_until_hr = False
                continue
            elif skip_until_hr:
                continue
                
            flowable = None
            
            if element.name == 'h1':
                flowable = self._process_heading(element, 1)
            elif element.name == 'h2':
                flowable = self._process_heading(element, 2)
            elif element.name == 'h3':
                flowable = self._process_heading(element, 3)
            elif element.name == 'h4':
                flowable = self._process_heading(element, 4)
            elif element.name == 'p':
                flowable = self._process_paragraph(element)
            elif element.name == 'ul':
                list_items = self._process_list(element, ordered=False)
                if list_items:
                    flowables.extend(list_items)
                continue
            elif element.name == 'ol':
                list_items = self._process_list(element, ordered=True)
                if list_items:
                    flowables.extend(list_items)
                continue
            elif element.name == 'pre':
                flowable = self._process_code_block(element)
            elif element.name == 'table':
                flowable = self._process_table(element)
            elif element.name == 'hr':
                # Simple spacer instead of decorative line to reduce whitespace
                flowable = Spacer(1, 10)
                
            # Add flowable if it's not None
            if flowable:
                if isinstance(flowable, list):
                    flowables.extend(flowable)
                else:
                    flowables.append(flowable)
        
        return flowables
    
    def _create_toc_flowables(self):
        flowables = []
        
        # TOC Title
        flowables.append(Paragraph("Table of Contents", self.styles['ModernTitle']))
        flowables.append(Spacer(1, 20))
        
        # TOC entries with improved styling
        for entry in self.toc_entries:
            level = entry['level']
            text = entry['text']
            anchor = entry['anchor']
            
            # Create clickable TOC entry
            if level == 0:
                # Main chapters - bold
                link_text = f'<b><link href="#{anchor}" color="#1565C0">{text}</link></b>'
            else:
                # Sub-chapters
                link_text = f'<link href="#{anchor}" color="#1976D2">{text}</link>'
                
            para = Paragraph(link_text, self.styles[f'TOCHeading{min(level, 3)}'])
            flowables.append(para)
        
        flowables.append(PageBreak())
        return flowables
    
    def convert(self, markdown_file, output_file):
        # Read markdown content
        with open(markdown_file, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Parse markdown to HTML
        soup = self._parse_markdown(md_content)
        
        # Convert to flowables
        content_flowables = self._html_to_flowables(soup)
        
        # Create document
        doc = SimpleDocTemplate(
            output_file,
            pagesize=letter,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=72,
            title="Sutherland Global Services - AI Innovation Strategy",
            author="Tiran Dagan"
        )
        
        # Build story with TOC
        story = []
        
        # Title page with enhanced design
        story.append(Spacer(1, 1.5 * inch))
        
        # Split long title to prevent overflow
        title1 = Paragraph(
            "<font color='#1A237E'>Accelerating Industry-Centric</font>",
            self.styles['ModernTitle']
        )
        title2 = Paragraph(
            "<font color='#1565C0'>AI Innovation</font>",
            self.styles['ModernTitle']
        )
        title3 = Paragraph(
            "at Sutherland Global Services",
            self.styles['ModernTitle']
        )
        
        story.extend([title1, title2, title3])
        story.append(Spacer(1, 0.5 * inch))
        
        # Decorative line
        drawing = Drawing(400, 20)
        line = Line(150, 10, 250, 10)
        line.strokeColor = colors.HexColor("#1565C0")
        line.strokeWidth = 3
        drawing.add(line)
        story.append(drawing)
        
        story.append(Spacer(1, 0.3 * inch))
        story.append(Paragraph(
            "A Strategic Framework for Transformation",
            self.styles['ModernHeading2']
        ))
        story.append(Spacer(1, 1.5 * inch))
        story.append(Paragraph(
            f"<font color='#607D8B'>Generated on {datetime.now().strftime('%B %d, %Y')}</font>",
            self.styles['ModernBody']
        ))
        story.append(PageBreak())
        
        # Add TOC
        story.extend(self._create_toc_flowables())
        
        # Add content
        story.extend(content_flowables)
        
        # Build PDF with custom canvas
        doc.build(story, canvasmaker=NumberedCanvas)


@click.command()
@click.argument('input_file', type=click.Path(exists=True))
@click.option('--output', '-o', default='output.pdf', help='Output PDF filename')
def main(input_file, output):
    """Convert a Markdown file to a beautifully designed PDF with modern styling."""
    click.echo(f"Converting {input_file} to {output}...")
    
    generator = ModernPDFGenerator()
    try:
        generator.convert(input_file, output)
        click.echo(f"✓ Successfully created {output}")
    except Exception as e:
        click.echo(f"✗ Error: {str(e)}", err=True)
        raise


if __name__ == '__main__':
    main()