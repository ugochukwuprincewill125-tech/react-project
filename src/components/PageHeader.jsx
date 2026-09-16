import './PageHeader.css';

function PageHeader({ kicker, title, sub }) {
  return (
    <div className="page-header">
      <div className="container">
        {kicker && <span className="section-kicker">{kicker}</span>}
        <h1 className="page-header__title">{title}</h1>
        {sub && <p className="page-header__sub">{sub}</p>}
      </div>
    </div>
  );
}

export default PageHeader;
