import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  const onGoBackClick = () => history.goBack();

  return (
    <section className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__message">Страница не найдена</p>
        <button className="not-found__button link" onClick={onGoBackClick}>
          Назад
        </button>
      </div>
    </section>
  );
};

export default NotFound;
