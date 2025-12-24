/**
 * Header component - Renders the navigation header
 */
export interface HeaderProps {
    projectName: string;
}

export function Header({ projectName }: HeaderProps): string {
    return `
    <header class="header-navbar">
      <div class="header-left">
        <h1 class="header-logo">Task Portal</h1>
      </div>
      <div class="header-right">
        <span class="project-name">${projectName}</span>
      </div>
    </header>
  `;
}
