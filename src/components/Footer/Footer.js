const Footer = () => (
  <footer className="footer">
    <p className="footer__note">Учебный проект Яндекс.Практикум х BeatFilm.</p>
    <div className="footer__container">
      <p className="footer__copyright">&copy; 2020</p>
      <nav className="footer__nav">
        <ul className="footer__links">
          <li className="footer__links-item">
            <a
              className="link footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__links-item">
            <a
              className="link footer__link"
              href="https://github.com/artcherenkov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__links-item">
            <a
              className="link footer__link"
              href="https://vk.com/artcherenkov"
              target="_blank"
              rel="noreferrer"
            >
              VK
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
