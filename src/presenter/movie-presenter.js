import CardFilmView from '../view/card-view.js';
import { remove, render, RenderPosition, replace } from '../utils/render.js';

export default class MoviePresenter {
  #filmListContainer = null;
  #handleOpenPopup = null;
  #filmComponent = null;
  #film = null;
  #changeData = null;
  #prevFilmCardComponent = null;

  constructor(filmListContainer, changeData, handleOpenPopup) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#handleOpenPopup = handleOpenPopup;
  }

  init = (film) => {
    this.#film = film;

    this.#filmComponent = new CardFilmView(film);
    this.#filmComponent.setOpenPopupHandler(this.#handleOpenPopup);
    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlist);
    this.#filmComponent.setWatchedClickHandler(this.#handleWatched);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavorite);
    render(this.#filmListContainer.container, this.#filmComponent, RenderPosition.BEFOREEND);

    if (this.#prevFilmCardComponent === null) {
      render(this.#filmListContainer.container, this.#filmComponent, RenderPosition.BEFOREEND);
    }
    else {
      replace(this.#filmComponent, this.#prevFilmCardComponent);
    }
    this.#prevFilmCardComponent = this.#filmComponent;
  };

  //удалить компоненты
  destroy = () => {
    remove(this.#filmComponent);
  };

  #handleWatchlist = () => {
    this.#changeData({...this.#film, isWatchlist: !this.#film.isWatchlist});
  }

  #handleWatched = () => {
    this.#changeData({...this.#film, isWatched: !this.#film.isWatched});
  }

  #handleFavorite = () => {
    this.#changeData({...this.#film, isFavorites: !this.#film.isFavorites});
  }
}
