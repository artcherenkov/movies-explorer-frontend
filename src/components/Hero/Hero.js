import PropTypes from "prop-types";
import cn from "classnames";

const Hero = ({ className }) => (
  <section className={cn(className, "hero")}>
    <div className="hero__container">
      <h2 className="hero__title">
        Учебный проект студента факультета
        <br />
        Веб-разработки.
      </h2>
      <p className="hero__text">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <a href="/" className="link hero__button">
        Узнать больше
      </a>
    </div>
  </section>
);

Hero.propTypes = {
  className: PropTypes.string,
};

export default Hero;
