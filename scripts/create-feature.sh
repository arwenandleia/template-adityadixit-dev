
#!/usr/bin/env bash

set -e

FEATURE_NAME="$1"
FEATURE_DIR="features/$FEATURE_NAME"

if [ -z "$FEATURE_NAME" ]; then
  echo "Usage: $0 <feature-name>"
  exit 1
fi

git switch -c "features/$FEATURE_NAME"

mkdir -p "$FEATURE_DIR"
touch "$FEATURE_DIR/${FEATURE_NAME//-/}.tsx"

mkdir -p "$FEATURE_DIR/components/client"
mkdir -p "$FEATURE_DIR/components/server"
mkdir -p "$FEATURE_DIR/lib/actions"
mkdir -p "$FEATURE_DIR/lib/db"

echo "Feature '$FEATURE_NAME' created successfully."
