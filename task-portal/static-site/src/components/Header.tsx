import { Stats } from '../types';

interface HeaderProps {
  projectName: string;
}

export function Header({ projectName }: HeaderProps) {
  return (
    <div className="header-navbar">
      <div className="header-left">
        <div className="brand-mark">
          <span className="brand-initials">TP</span>
        </div>
        <div className="brand-copy">
          <div className="brand-title">Task Portal</div>
        </div>
      </div>
      <div className="header-right">
        <div className="pill badge-primary">Velocity mode</div>
        <div className="pill badge-neutral">Project: {projectName}</div>
      </div>
    </div>
  );
}
