/**
 * The client script is needed for client-side routing and HMR
 * We don't need it for 1 page production site
 */
const fs = require('node:fs');
const path = require('node:path');

const indexPath = path.join(__dirname, '..', 'src', 'pages', 'index.tsx');
const content = fs.readFileSync(indexPath, 'utf8');
const updatedContent = content.replace(/import '\.\.\/client';\n/, '');
fs.writeFileSync(indexPath, updatedContent);
