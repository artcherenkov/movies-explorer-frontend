import cn from "classnames";
import PropTypes from "prop-types";

const Technologies = ({ className }) => (
  <section className={cn(className, "section", "section_gray")}>
    <div className="section__container">
      <h3 className="section__title">Технологии</h3>
    </div>
  </section>
);

Technologies.propTypes = {
  className: PropTypes.string,
};

export default Technologies;
