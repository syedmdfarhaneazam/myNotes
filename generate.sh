#!/bin/bash

# Clear or create the output file
> code.txt

# Find files recursively excluding node_modules and matching the given extensions
find . -type d -name node_modules -prune -o \
  -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.mjs" \) -print | while read -r file; do
  echo "<$file>" >> code.txt
  cat "$file" >> code.txt
  echo "" >> code.txt
done

