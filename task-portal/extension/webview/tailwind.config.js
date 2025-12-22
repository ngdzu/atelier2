/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // VS Code theme colors
                'vscode-foreground': 'var(--vscode-foreground)',
                'vscode-background': 'var(--vscode-editor-background)',
                'vscode-button-background': 'var(--vscode-button-background)',
                'vscode-button-foreground': 'var(--vscode-button-foreground)',
                'vscode-button-hoverBackground': 'var(--vscode-button-hoverBackground)',
                'vscode-input-background': 'var(--vscode-input-background)',
                'vscode-input-foreground': 'var(--vscode-input-foreground)',
                'vscode-input-border': 'var(--vscode-input-border)',
                'vscode-focusBorder': 'var(--vscode-focusBorder)',
            }
        },
    },
    plugins: [],
}
