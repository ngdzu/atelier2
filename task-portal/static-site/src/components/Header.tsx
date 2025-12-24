import { Stats } from '../types';

interface HeaderProps {
  projectName: string;
}

export function Header({ projectName }: HeaderProps) {
  return (
    <div className="header-navbar">
      <div className="header-left">
        <h1 className="header-logo">📋 {projectName}</h1>
      </div>
      <div className="header-right">
        <span className="project-name">Task Dashboard</span>
      </div>
    </div>
  );
}
