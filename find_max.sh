#!/bin/bash

# Get the hostname
hostname=$(hostname)

# Find top 10 largest directories and their sizes
find . -maxdepth 1 -type d -print0 | while IFS= read -r -d $'\0' dir; do
  du -sh "$dir" 2>/dev/null
done | sort -rh | head -n 10 | awk -v host="$hostname" '{print $0, host}'