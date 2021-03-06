import cn from "classnames";
import PropTypes from "prop-types";

import studentPhoto from "../../images/photo-student.jpg";

const Student = ({ className }) => (
  <section className={cn(className, "section")}>
    <div className="section__container section__container_student">
      <h3 className="section__title">Студент</h3>
      <div className="student">
        <div className="student__info">
          <div className="student__personal">
            <h3 className="student__name">Артём</h3>
            <p className="student__note">Фронтенд-разработчик, 21 год</p>
            <p className="student__about">
              Меня зовут Артём, мне 21 год, я живу в Новосибирске, учусь в НГТУ
              на факультете автоматики и вычислительной техники. Параллельно с
              высшим образование прохожу курсы профессиональной переподготовки в
              Яндекс.Практикуме по специальности "React-разработчик". В работе
              уделяю особенное внимание чистоте кода, люблю писать документации
              и придерживаюсь DRY. Не брезгую рефакторить или переписывать
              legacy-код. Убежден, что каждый день нужно учиться чему-то новому.
            </p>
            <ul className="student__socials">
              <li className="student__social">
                <a
                  className="link student__link"
                  href="https://vk.com/artcherenkov"
                  target="_blank"
                  rel="noreferrer"
                >
                  VK
                </a>
              </li>
              <li className="student__social">
                <a
                  className="link student__link"
                  href="https://github.com/artcherenkov"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="student__photo"
            src={studentPhoto}
            alt="Артем. Фронтенд-разработчик"
          />
        </div>
        <div className="student__portfolio portfolio">
          <h4 className="portfolio__title">Портфолио</h4>
          <ul className="portfolio__links">
            <li className="portfolio__links-item">
              <a
                className="link portfolio__link"
                href="https://how-to-learn.netlify.app/"
                target="_blank"
                rel="noreferrer"
              >
                Статичный сайт
              </a>
            </li>
            <li className="portfolio__links-item">
              <a
                className="link portfolio__link"
                href="https://artcherenkov.github.io/russian-travel/"
                target="_blank"
                rel="noreferrer"
              >
                Адаптивный сайт
              </a>
            </li>
            <li className="portfolio__links-item">
              <a
                className="link portfolio__link"
                href="https://ypmesto.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Одностраничное приложение
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

Student.propTypes = {
  className: PropTypes.string,
};

export default Student;
