import cn from "classnames";
import PropTypes from "prop-types";

const Student = ({ className }) => (
  <section className={cn(className, "section")}>
    <div className="section__container">
      <h3 className="section__title">Студент</h3>
    </div>
  </section>
);

Student.propTypes = {
  className: PropTypes.string,
};

export default Student;
