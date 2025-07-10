#!/bin/bash

# PDF Conversion Script
# Usage: ./convert_pdf.sh input.md [output.pdf]

if [ $# -lt 1 ]; then
    echo "Usage: $0 input.md [output.pdf]"
    exit 1
fi

INPUT="$1"
OUTPUT="${2:-output.pdf}"

# Activate virtual environment
source venv/bin/activate

# Run converter
echo "Converting $INPUT to $OUTPUT..."
python md2pdf.py "$INPUT" -o "$OUTPUT"