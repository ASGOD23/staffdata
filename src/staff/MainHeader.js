import './MainHeader.css';

export default function MainHeader() {
  return (
    <header className="main-header">
      <div className="main-header__left-logo">
        <img src="/logos/left-logo.png" alt="Left Logo" />
      </div>
      <h1 className="main-header__company-name">Nexus Computing</h1>
      <div className="main-header__right-logo">
        <img src="/logos/right-logo.png" alt="Right Logo" />
      </div>
    </header>
  );
}