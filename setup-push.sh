#!/bin/bash
# Setup GitHub push for del-avenir
# Usage: bash setup-push.sh <GITHUB_PAT>

PAT="$1"
REPO_URL="https://${PAT}@github.com/fakhrialwin5/del-avenir.git"

cd ~/del-avenir

# Create repo on GitHub via API
curl -s -X POST https://api.github.com/user/repos \
  -H "Authorization: token $PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"name":"del-avenir","description":"Del Avenir - Pesantren Baitul Quran Sragen | Next.js + Supabase","private":false}' > /dev/null 2>&1

# Configure remote
git remote set-url origin "$REPO_URL" 2>/dev/null || git remote add origin "$REPO_URL"

# Stage and commit
git add -A
git commit -m "feat: add Supabase backend integration

- Supabase client (server + browser)
- TypeScript database types
- SQL schema with RLS policies
- Data fetching hooks (achievements, gallery, registration)
- Updated components to use live Supabase data
- Seed data migration from constants" 2>/dev/null

# Push
git push -u origin main 2>&1
echo "DONE"
