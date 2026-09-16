import './TopBar.css';

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <span>Home of Quality Gadgets</span>
        <span className="topbar__divider" aria-hidden="true" />
        <span>Nationwide Delivery &middot; Secure Shopping</span>
      </div>
    </div>
  );
}

export default TopBar;
