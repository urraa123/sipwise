# Sipwise

Made with DigSil Coder.

## Run it on your computer

1. Install **Node.js** (the "LTS" version) from https://nodejs.org. Restart your computer if asked.
2. Unzip this folder.
3. Open a terminal in this folder:
   - **Windows:** open the folder, click the address bar, type `cmd` and press Enter.
   - **Mac:** right-click the folder and choose "New Terminal at Folder".
4. Type `npm install` and press Enter. Wait until it finishes (the first time takes a minute).
5. Type `npm run dev` and press Enter.
6. Open the link it shows (usually http://localhost:5173) in your browser.

To stop it, press **Ctrl + C** in the terminal.

## Put it online

1. In the same terminal, type `npm run build`. This creates a folder called **dist**.
2. Go to https://app.netlify.com/drop and drag the **dist** folder onto the page.
   You get a live link in a few seconds. Any host for static websites works too.

Or use **Publish on GitHub** in DigSil Coder to get a live link without these steps.
