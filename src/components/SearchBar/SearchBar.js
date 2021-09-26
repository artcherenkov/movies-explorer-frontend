import { useState } from "react";
import Toggle from "../Toggle/Toggle";

const SearchBar = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSearch({ search, isShort: isChecked });
  };

  const onIsShortChange = (evt) => {
    setIsChecked(evt.target.checked);
    props.onSearch({ search, isShort: evt.target.checked });
  };

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__input-container">
            <label className="search__label" htmlFor="search" />
            <input
              className="search__input"
              type="text"
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              id="search"
              placeholder="Фильм"
            />
            <button className="search__button button">Найти</button>
          </div>

          <Toggle isChecked={isChecked} onChange={onIsShortChange}>
            Короткометражки
          </Toggle>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
