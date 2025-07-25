#!/usr/bin/env sh

# This script installs a ReUI component using the shadcn CLI.
# Usage: ./scripts/reui.sh <component_name>

if [ -z "$1" ]; then
  echo "Usage: $0 <component_name>"
  exit 1
fi

COMPONENT="$1"

# Install the component using shadcn
echo "Installing ReUI component: $COMPONENT..."

pnpm dlx shadcn@latest add "https://reui.io/r/$COMPONENT.json"
