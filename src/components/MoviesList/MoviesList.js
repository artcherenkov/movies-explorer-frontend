import Movie from "../Movie/Movie";
import moviePic1 from "../../images/movie-pic-1.jpg";
import moviePic2 from "../../images/movie-pic-2.jpg";
import moviePic3 from "../../images/movie-pic-3.jpg";
import moviePic4 from "../../images/movie-pic-4.jpg";

const MoviesList = () => (
  <section className="movies">
    <ul className="movies__list">
      <li className="movies__item">
        <Movie src={moviePic1} isFavorite />
      </li>
      <li className="movies__item">
        <Movie src={moviePic2} />
      </li>
      <li className="movies__item">
        <Movie src={moviePic3} />
      </li>
      <li className="movies__item">
        <Movie src={moviePic4} isFavorite />
      </li>
      <li className="movies__item">
        <Movie src={moviePic1} isFavorite />
      </li>
      <li className="movies__item">
        <Movie src={moviePic2} />
      </li>
      <li className="movies__item">
        <Movie src={moviePic3} />
      </li>
      <li className="movies__item">
        <Movie src={moviePic4} isFavorite />
      </li>
      <li className="movies__item">
        <Movie src={moviePic1} isFavorite />
      </li>
      <li className="movies__item">
        <Movie src={moviePic2} />
      </li>
      <li className="movies__item">
        <Movie src={moviePic3} />
      </li>
      <li className="movies__item">
        <Movie src={moviePic4} isFavorite />
      </li>
    </ul>
    <button className="link movies__button-more">Ещё</button>
  </section>
);

export default MoviesList;
