const Footer = () => (
  <footer className="footer">
    <p className="footer__note">Учебный проект Яндекс.Практикум х BeatFilm.</p>
    <div className="footer__container">
      <p className="footer__copyright">&copy; 2020</p>
      <nav className="footer__nav">
        <ul className="footer__links">
          <li className="footer__links-item">
            <a className="footer__link" href="https://google.com">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link" href="https://google.com">
              Github
            </a>
          </li>
          <li className="footer__links-item">
            <a className="footer__link" href="https://google.com">
              Facebook
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
