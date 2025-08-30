# New Enterprise Sanitation

A clean, responsive website with a tiny Express backend to handle the contact/quote form and serve static files.

## Quick Start
1. Install Node.js (v18+ recommended).
2. In a terminal:
   ```bash
   cd new-enterprise-sanitation
   npm install
   npm run start
   ```
3. Open http://localhost:3000

## Structure
- `public/` – static site (HTML/CSS/JS). Update copy, images, and links here.
- `server.js` – Express app serving `public/` and saving contact form submissions to `data/leads.json`.
- `data/leads.json` – Stored quote requests (JSON array).
- `package.json` – Scripts and dependencies.

## Notes
- Replace placeholder phone, email, and portal link with your real details.
- To add email notifications, integrate a mail service in `server.js` after saving leads.