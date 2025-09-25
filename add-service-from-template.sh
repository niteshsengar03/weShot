#!/bin/bash

# ✅ CONFIGURATION
TEMPLATE_REPO="git@github.com:niteshsengar03/express-typescript-template.git"

# ✅ 1. Check if service name is given
if [ -z "$1" ]; then
  echo "❌ Error: Please provide a service name"
  echo "Usage: ./add-service-from-template.sh <ServiceName>"
  exit 1
fi

SERVICE_NAME=$1

# ✅ 2. Create a temp folder and clone the template
echo "🚀 Cloning template repo..."
git clone "$TEMPLATE_REPO" temp-template

# ✅ 3. Remove .git folder so it’s not a repo
echo "🧹 Removing .git folder..."
rm -rf temp-template/.git

# ✅ 4. Move it to your monorepo under the new service name
echo "📁 Moving files to ./$SERVICE_NAME..."
mv temp-template "$SERVICE_NAME"

# ✅ 5. Clean up
echo "✅ Added service: $SERVICE_NAME"
echo "💡 Don't forget to: git add $SERVICE_NAME && git commit -m 'Add $SERVICE_NAME'"
