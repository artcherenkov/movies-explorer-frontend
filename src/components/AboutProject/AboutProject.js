import cn from "classnames";
import PropTypes from "prop-types";

const AboutProject = ({ className }) => (
  <section className={cn(className, "section")}>
    <div className="section__container">
      <h3 className="section__title">О проекте</h3>
      <div className="diploma">
        <div className="diploma__columns">
          <div className="diploma__column">
            <h4 className="diploma__about">
              Дипломный проект включал 5 этапов
            </h4>
            <p className="diploma__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="diploma__column">
            <h4 className="diploma__about">
              На выполнение диплома ушло 5 недель
            </h4>
            <p className="diploma__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="diploma__progress-bar">
          <div className="diploma__bar-segment diploma__bar-segment_width_1">
            <div className="diploma__segment-legend diploma__segment-legend_highlight">
              1 неделя
            </div>
            <div className="diploma__segment-title">Back-end</div>
          </div>
          <div className="diploma__bar-segment diploma__bar-segment_width_5">
            <div className="diploma__segment-legend">4 недели</div>
            <div className="diploma__segment-title">Front-end</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

AboutProject.propTypes = {
  className: PropTypes.string,
};

export default AboutProject;
