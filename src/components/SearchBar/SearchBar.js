import { useState } from "react";
import Toggle from "../Toggle/Toggle";

const SearchBar = () => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (evt) => setIsChecked(evt.target.checked);

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__input-container">
            <label className="search__label" htmlFor="search" />
            <input
              className="search__input"
              type="text"
              id="search"
              placeholder="Фильм"
            />
            <button className="search__button button">Найти</button>
          </div>

          <Toggle isChecked={isChecked} onChange={onChange}>
            Короткометражки
          </Toggle>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
