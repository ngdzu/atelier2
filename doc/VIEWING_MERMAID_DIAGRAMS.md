# Viewing Mermaid Diagrams in Cursor IDE

This guide explains how to view and preview Mermaid diagrams in Cursor IDE (which is based on VS Code).

## Method 1: Markdown Preview with Mermaid Support (Recommended)

### Option A: Built-in Markdown Preview (if Mermaid is enabled)

1. Open a Markdown file containing Mermaid diagrams (e.g., `doc/DASHBOARD_REQUIREMENTS.md`)
2. Press `Cmd+Shift+V` (Mac) or `Ctrl+Shift+V` (Windows/Linux) to open Markdown preview
3. If Mermaid diagrams don't render, you'll need to install an extension (see below)

### Option B: Install "Markdown Preview Mermaid Support" Extension

1. Open Extensions view: `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)
2. Search for: **"Markdown Preview Mermaid Support"** by `bierner`
3. Click **Install**
4. Reload Cursor if prompted
5. Open your Markdown file and use `Cmd+Shift+V` / `Ctrl+Shift+V` to preview

**Extension ID:** `bierner.markdown-mermaid`

### Option C: Install "Markdown Preview Enhanced" Extension

This is a more feature-rich alternative:

1. Open Extensions view: `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)
2. Search for: **"Markdown Preview Enhanced"** by `shd101wyy`
3. Click **Install**
4. Reload Cursor if prompted
5. Right-click on a Markdown file and select **"Markdown Preview Enhanced: Open Preview"**
   - Or use command palette: `Cmd+Shift+P` → "Markdown Preview Enhanced: Open Preview"

**Extension ID:** `shd101wyy.markdown-preview-enhanced`

**Features:**
- Live preview with auto-reload
- Mermaid diagram support
- Math equations
- Code execution
- PDF export

## Method 2: Mermaid Preview Extension (For .mmd files)

If you want to preview standalone `.mmd` files directly:

1. Open Extensions view: `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)
2. Search for: **"Mermaid Preview"** by `vstirbu`
3. Click **Install**
4. Open a `.mmd` file (e.g., `doc/diagrams/dashboard-use-cases.mmd`)
5. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
6. Type: **"Mermaid: Preview"** and select it
7. A preview pane will open showing the rendered diagram

**Extension ID:** `vstirbu.vscode-mermaid-preview`

## Method 3: View in Browser (Online Mermaid Editor)

If extensions don't work, you can use the online Mermaid Live Editor:

1. Go to: https://mermaid.live/
2. Copy the contents of your `.mmd` file
3. Paste into the editor
4. View the rendered diagram

## Method 4: Generate SVG Files

Generate SVG files that can be viewed in any image viewer or browser:

```bash
# Install mermaid-cli globally (optional)
npm install -g @mermaid-js/mermaid-cli

# Or use npx (no installation needed)
cd doc/diagrams
npx @mermaid-js/mermaid-cli -i dashboard-use-cases.mmd -o dashboard-use-cases.svg
npx @mermaid-js/mermaid-cli -i dashboard-user-roles.mmd -o dashboard-user-roles.svg
npx @mermaid-js/mermaid-cli -i dashboard-system-context.mmd -o dashboard-system-context.svg
npx @mermaid-js/mermaid-cli -i dashboard-feature-overview.mmd -o dashboard-feature-overview.svg
```

Then open the `.svg` files in:
- Cursor IDE (they'll render as images)
- Any web browser
- Any image viewer

## Recommended Setup

For the best experience, we recommend:

1. **Install "Markdown Preview Mermaid Support"** - Lightweight and works with built-in preview
2. **Install "Mermaid Preview"** - For standalone `.mmd` file previews

### Quick Installation Commands

You can also install extensions via command line:

```bash
# Using Cursor/VS Code CLI
code --install-extension bierner.markdown-mermaid
code --install-extension vstirbu.vscode-mermaid-preview
```

## Viewing Diagrams in DASHBOARD_REQUIREMENTS.md

1. Open `doc/DASHBOARD_REQUIREMENTS.md`
2. Install "Markdown Preview Mermaid Support" extension (if not already installed)
3. Press `Cmd+Shift+V` (Mac) or `Ctrl+Shift+V` (Windows/Linux)
4. Navigate to the "Diagrams" section
5. All Mermaid diagrams should render automatically

## Troubleshooting

### Diagrams Not Rendering

1. **Check Extension is Installed:**
   - Open Extensions view (`Cmd+Shift+X`)
   - Search for "mermaid" and verify extensions are installed and enabled

2. **Reload Window:**
   - Press `Cmd+Shift+P` → "Developer: Reload Window"

3. **Check Mermaid Syntax:**
   - Ensure your Mermaid code blocks use proper syntax
   - Verify code blocks are marked as `mermaid` (not `markdown` or `text`)

4. **Try Alternative Extension:**
   - If one extension doesn't work, try "Markdown Preview Enhanced"

### Preview Not Updating

- Some extensions require manual refresh
- Try closing and reopening the preview
- Save the file to trigger auto-refresh (if supported)

## Keyboard Shortcuts

- **Open Markdown Preview:** `Cmd+Shift+V` (Mac) / `Ctrl+Shift+V` (Windows/Linux)
- **Open Preview to Side:** `Cmd+K V` (Mac) / `Ctrl+K V` (Windows/Linux)
- **Command Palette:** `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows/Linux)

## Additional Resources

- [Mermaid Documentation](https://mermaid.js.org/)
- [Mermaid Live Editor](https://mermaid.live/)
- [VS Code Markdown Extensions](https://marketplace.visualstudio.com/vscode)

---

**Note:** Since Cursor is based on VS Code, all VS Code extensions should work in Cursor. If you encounter any issues, check the Cursor documentation or try the extensions in VS Code first to verify compatibility.

