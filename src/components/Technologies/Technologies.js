import cn from "classnames";
import PropTypes from "prop-types";

const Technologies = ({ className }) => (
  <section className={cn(className, "section", "section_gray")}>
    <div className="section__container">
      <h3 className="section__title section__title_gray">Технологии</h3>
      <div className="techs">
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">mongoDB</li>
        </ul>
      </div>
    </div>
  </section>
);

Technologies.propTypes = {
  className: PropTypes.string,
};

export default Technologies;
